<template>
  <BuilderLayout
    :builder="builder"
    @export="submit"
    @preview="preview"
    @save="save"
    >
    <div class="artboard is-editable" id="artboard" ref="artboard"
      :class="{
        'is-sorting': $builder.isSorting,
        'is-editable': $builder.isEditing,
        'fp-scroll': currentLanding.settings.fullPageScroll === 'yes'
      }">
      <component
          v-for="section in $builder.sections"
          :key="section.id"
          :is="section.name"
          :id="section.id"
          :class="{ 'video-background': section.data.mainStyle.backgroundType === 'video' }"
          @click.native="selectSidebarSection(section)"
          @dblclick.native="showSettingsBar(section)">
          <video
              v-if="section.data.mainStyle.backgroundType === 'video' && section.data.mainStyle.backgroundVideo"
              :id="`bg-video-${ section.id }`"
              slot="video"
              autoplay
              muted
              loop>
            <source :src="section.data.mainStyle.backgroundVideo">
          </video>
      </component>
      <div class="controller-intro" v-if="emptySections">
        <h3>&larr; Choose layout from the menu</h3>
      </div>
      <div class="controller-intro" v-if="showIntro && !this.$builder.sections.length">
        <label for="projectName">Hello, start your project</label>
        <input class="controller-input" id="projectName" placeholder="project name" v-model="title"/>
        <template v-if="themes">
          <div class="controller-themes">
            <button class="controller-theme" v-for="(theme, index) in themes" :key="index" @click="addTheme(theme)">{{ theme.name }}</button>
          </div>
        </template>
      </div>
    </div>
  </BuilderLayout>
</template>

<script>
import VuseIcon from './VuseIcon'
import BuilderLayout from './BuilderLayout.vue'
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

import { sectionsGroups } from '@cscripts/sectionsGroups'

export default {
  name: 'VuseBuilder',

  components: {
    VuseIcon,
    BuilderLayout
  },

  props: {
    showIntro: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => ({
        title: '',
        sections: []
      })
    }
  },
  data () {
    return {
      title: null,
      groups: {},
      isSectionsInited: false,
      sections: this.getSections()
    }
  },

  computed: {
    ...mapState([
      'currentLanding'
    ]),
    emptySections: function () {
      return !this.showIntro && !this.$builder.sections.length
    },

    builder () {
      return this.$builder
    }
  },

  watch: {
    title (value) {
      this.$builder.title = value
      document.title = value
    },

    currentLanding (value) {
      this.initSettings()
    }
  },

  created () {
    // sets the initial data.
    this.$builder.set(this.data)
    this.$builder.settings = {}
    this.title = this.$builder.title
    this.themes = this.$builder.themes

    if (this.$route.params.slug !== 'new') {

    }

    this.groups = this.generateGroups()
    this.updateBuilderSections(this.sections)
    this.updateBuilderGroups(this.groups)
  },
  mounted () {
    this.$builder.rootEl = this.$refs.artboard
    this.initSettings()
  },

  updated () {
    if (this.$builder.scrolling) {
      this.$builder.scrolling(this.$refs.artboard)
    }

    let groupList = this.$builder.sections.map(section => {
      return _.find(this.sections, { name: section.name }).group
    })

    this.$store.dispatch('Landing/updateGroups', groupList)

    this.observeGroups()
  },

  beforeDestroy () {
    this.$builder.clear()
  },
  methods: {
    ...mapActions('Sidebar', [
      'updateBuilderSections',
      'updateBuilderGroups',
      'updateSectionGroups',
      'setSettingSection'
    ]),
    initSettings () {
      const settings = this.currentLanding.settings
      this.$builder.landing = this.$route.params.slug
      this.$builder.settings = settings

      // Open current landing/preset
      if (!this.isSectionsInited) {
        // We need to do it only once
        // otherwise sections will be overwriten on Site Settings save
        if (this.currentLanding.sections) {
          this.addTheme(this.currentLanding)
        } else {
          this.addTheme(Object.assign(this.data, this.currentLanding.theme))
        }
        this.isSectionsInited = true
      }

      this.styleArtboard(settings.styles)
      this.updateVideo()
    },
    addTheme (theme) {
      this.$builder.set(theme)
    },
    toggleSort () {
      this.$builder.isSorting = !this.$builder.isSorting
      this.$builder.isEditing = !this.$builder.isSorting
      if (!this.$builder.isSorting && this.sortable) {
        this.sortable.option('sort', false)
        this.sortable.option('disabled', true)
        return
      }
      this.sortable.option('disabled', false)
      this.sortable.option('sort', true)
    },
    toggleGroupVisibility (e) {
      const element = e.target
      const group = element.closest('.menu-group')
      group.classList.toggle('is-visiable')
    },
    save () {
      this.$emit('save', this.$builder)
    },
    submit () {
      this.$emit('saved', this.$builder)
    },
    preview: function () {
      this.$emit('preview', this.$builder)
    },
    backToLandings () {
      this.save()
      this.$router.push({ path: `/dashboard` })
    },
    styleArtboard (styles) {
      Object.keys(styles).forEach((styleName) => {
        let value = styles[styleName]
        if (styleName === 'backgroundImage' && value) {
          value = `url(${value})`
        } else if (
          (styleName === 'backgroundPositionX' || styleName === 'backgroundPositionY') &&
            !isNaN(Number(value)) &&
            value
        ) {
          value = `${value}rem`
        }
        this.$refs.artboard.style[styleName] = value
      })
    },
    updateVideo () {
      const settings = this.currentLanding.settings
      if (document.getElementById('video_bg')) {
        document.getElementById('video_bg').remove() // rm old video if exist
      }

      if (!settings.video) {
        return
      }

      const node = document.createElement('video')
      node.id = 'video_bg'
      node.setAttribute('autoplay', 'autoplay')
      node.setAttribute('loop', 'loop')
      node.setAttribute('muted', true)
      if (settings.videoPosition) {
        node.classList.add(settings.videoPosition)
      }
      node.innerHTML = `<source src="${settings.video}" type="video/mp4"></source>`
      this.$refs.artboard.appendChild(node)
    },
    getSections () {
      let sections = []
      // get sections data
      sections = Object.keys(this.$builder.components).map((sec) => {
        return {
          name: sec,
          group: this.$builder.components[sec].options.group,
          cover: this.$builder.components[sec].options.cover,
          schema: this.$builder.components[sec].options.$schema
        }
      })
      return sections
    },

    generateGroups () {
      let groups = { random: [] }
      // group sections together
      this.sections.forEach((section) => {
        let sectionGroup = section.group
        if (!sectionGroup) {
          groups.random.push(section)
          return
        }
        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section]
          return
        }
        groups[sectionGroup].push(section)
      })
      return groups
    },

    async selectSidebarSection (section) {
      let menuItem = document.getElementById(`menu-item-${section.id}`)
      if (!menuItem) {
        return
      }
      // --- coz directive v-scroll-to is called
      await this.$nextTick()
      // --- rm class/es from menu items
      document
        .querySelectorAll('.b-menu-subitem_selected')
        .forEach(el => el.classList.remove('b-menu-subitem_selected'))
      // --- add selected class and scroll to el
      menuItem.classList.add('b-menu-subitem_selected')
      menuItem.scrollIntoView()
    },

    showSettingsBar (section) {
      this.setSettingSection(section)
    },

    observeGroups () {
      let groups = []
      let sectionsNodes = Array.from(this.$refs.artboard.children)

      this.removeGroupClasses(sectionsNodes)

      this.$builder.sections.forEach((section, index) => {
        if (section.data.mainStyle.absorb > 0) {
          let group = {}
          group.main = section
          group.main_element = sectionsNodes[index]
          group.absorb = section.data.mainStyle.absorb
          group.childrenNodes = sectionsNodes.slice(index + 1, index + section.data.mainStyle.absorb + 1)
          group.children = this.$builder.sections
            .slice(index + 1, index + section.data.mainStyle.absorb + 1)
            .map(section => section.id)

          // set attrs to calculate
          group.main_element.classList.add('ptah-g-main')
          group.main_element.dataset.absorb = group.absorb
          group.childrenNodes.forEach((el) => el.classList.add('ptah-g-child'))

          section.isMain = true

          groups.push(group)
        } else {
          section.isMain = false
        }
      })

      sectionsGroups()

      // store groups
      this.updateSectionGroups(groups)
    },

    removeGroupClasses (nodes) {
      nodes.forEach((node) => {
        node.classList.remove('ptah-g-main')
        node.classList.remove('ptah-g-child')
      })
    }
  }
}
</script>

<style lang="sass">
.artboard
  transform-origin: top center
  margin: 0 auto
  transition: 0.2s
  min-height: 100vh
  position: relative
  &.is-editable .is-editable
    outline: none
    &:hover, &.styler-active
      box-shadow: inset 0 0 0.5rem 0.2rem #6BC1FF
  &.fp-scroll section
    height: 100vh !important
  &:before,
  &:after
    content: ''
    background-color: #9E9E9E
    position: absolute
    top: 0
    bottom: 0
    width: 10000rem
    z-index: 1
  &:before
    right: 100%
  &:after
    left: 100%

.controller
  box-sizing: border-box
  &-panel
    position: fixed
    z-index: 200
    bottom: 1rem
    right: 4rem
  &-input
    outline: none
    border: 1px solid $gray
    padding: 0.5rem 1rem
    margin: 2rem 0
    border-radius: 4rem
    width: 100%
    font-size: 1.6rem
    &:focus
      border-color: $blue
      box-shadow: 0 0 0 0.2rem rgba($blue, 50%)
  &-button
    transition: 0.2s
    border: none
    outline: none
    border-radius: 2rem
    padding: 0.5rem
    fill: $white
    font-size: 1.6rem
    svg
      transition: 0.2s
    &:not(:last-child)
      margin-right: 2rem
    &.is-rotated >svg
      transform: rotate(45deg)
    &:hover
      @extends $floatHover
    &.is-blue
      background-color: $blue
      &:hover
        background-color: darken($blue, 20%)
    &.is-red
      background-color: $red
      &:hover
        background-color: darken($red, 20%)
    &.is-green
      background-color: $green
      &:hover
        background-color: darken($green, 20%)
    &.is-dark
      background-color: $dark
      &:hover
        background-color: darken($dark, 20%)
    &.is-gray
      background-color: $gray
      &:hover
        background-color: darken($gray, 20%)
    &.is-transparent
      background-color: transparent
      &:hover
        background-color: transparent
  &-intro
    width: 100%
    max-width: 50rem
    margin: auto
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    padding: 7rem 5rem
    text-align: center
    font-size: 3rem
    color: $dark

  &-themes
    display: flex
    flex-direction: column
    width: 100%

  &-theme
    background-color: $white
    color: $dark
    border: 0.1rem solid $gray
    margin: 0.5rem
    padding: 2rem
    border-radius: 0.4rem
    width: 100%
    cursor: pointer
    font-size: 1.6rem
    &:hover
      border-color: $blue

.b-landing-constructor__button
  width: 100%
  height: 100%
  display: inline-block
  font-weight: 400
  text-align: center
  white-space: nowrap
  vertical-align: middle
  border: 1px solid #545b62
  border-radius: .25rem
  transition: color .15s
  background-color: #545b62
  cursor: pointer
  color: #ffffff

.b-landing-constructor__video_type
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.controller-panel, .styler
  z-index: 9999

.vuse-icon
  width: 2rem
  height: 2rem
  display: inline-block
  vertical-align: middle
  .is-editable &,
  .is-editable + &,
  .is-editable ~ &,
  .controller-button &
    cursor: pointer

.floatHover
  cursor: pointer
  box-shadow: 0 14px 28px opacify($black, 0.125), 0 10px 10px opacify($black, 0.1)

.page-sections
  list-style: none
  padding: 0
  margin: 0 0 40px 0
  li
    margin: 0 0 4px
    padding: 1rem 0.5rem
    background: lighten($green, 40%)

// --- video background styles
.video-background
  position: relative !important
  background: none !important
  overflow: hidden !important
  video
    position: absolute
    top: 0
    left: 0
    min-width: 100%
    min-height: 100%
    + .b-footer
      background: none !important
</style>
