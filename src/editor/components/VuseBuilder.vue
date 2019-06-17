<template>

<builder-layout
    :builder="builder"
    @export="submit"
    @preview="preview"
    @save="save">

  <draggable>
    <div
      @dragover.prevent="onDragover"
      :class="{
        'is-sorting': $builder.isSorting,
        'is-editable': $builder.isEditing,
        'fp-scroll': currentLanding.settings.fullPageScroll === 'yes',
        'is-expanded': isExpanded
      }"
      id="artboard"
      class="artboard"
      ref="artboard">

      <component
        v-if="headerSection"
        :is="headerSection.name"
        :id="headerSection.id"
        :class="{ 'video-background': headerSection.data.mainStyle.backgroundType === 'video' }"
        @click.native="selectSidebarSection(headerSection)">

        <menu-settings slot="menu" :section="headerSection"/>

        <video
          v-if="headerSection.data.mainStyle.backgroundType === 'video' && headerSection.data.mainStyle.backgroundVideo"
          :id="`bg-video-${ headerSection.id }`"
          slot="video"
          autoplay="true"
          muted="true"
          loop>
          <source :src="headerSection.data.mainStyle.backgroundVideo">
        </video>

        <div
          class="b-overlay"
          v-if="headerSection.data.mainStyle.overlay"
          :id="`bg-overlay-${ headerSection.id }`"
          slot="overlay"
          :style="{ 'background-color' : headerSection.data.mainStyle.overlay.color, 'opacity' : headerSection.data.mainStyle.overlay.opacity }"
        >
        </div>

      </component>

      <component
        v-for="section in builderSections"
        :key="section.id"
        :is="section.name"
        :id="section.id"
        :class="{ 'video-background': section.data.mainStyle.backgroundType === 'video' }"
        @click.native="selectSidebarSection(section)">

        <menu-settings slot="menu" :section="section"/>

        <video
          v-if="section.data.mainStyle.backgroundType === 'video' && section.data.mainStyle.backgroundVideo"
          :id="`bg-video-${ section.id }`"
          slot="video"
          autoplay="true"
          muted="true"
          loop>
          <source :src="section.data.mainStyle.backgroundVideo">
        </video>

        <div
          class="b-overlay"
          v-if="section.data.mainStyle.overlay"
          :id="`bg-overlay-${ section.id }`"
          slot="overlay"
          :style="{ 'background-color' : section.data.mainStyle.overlay.color, 'opacity' : section.data.mainStyle.overlay.opacity }"
        >
        </div>

      </component>

      <div class="builder-last"></div>

      <div v-show="emptySections" class="controller-intro">
        <h3>&larr; Choose layout from the menu</h3>
      </div>

      <div v-show="showIntro && !builder.sections.length" class="controller-intro">
        <label for="projectName">Hello, start your project</label>
        <input class="controller-input" id="projectName" placeholder="project name" v-model="title"/>
        <template v-if="themes">
          <div class="controller-themes">
            <button class="controller-theme" v-for="(theme, index) in themes" :key="index" @click="addTheme(theme)">{{ theme.name }}</button>
          </div>
        </template>
      </div>

    </div>
  </draggable>
</builder-layout>
</template>

<script>
import VuseIcon from './VuseIcon'
import BuilderLayout from './BuilderLayout.vue'
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import MenuSettings from '@components/slots/MenuSettings'
import Draggable from 'vuedraggable'

import { sectionsGroups } from '@cscripts/sectionsGroups'

export default {
  name: 'VuseBuilder',

  components: {
    VuseIcon,
    BuilderLayout,
    MenuSettings,
    Draggable
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
    ...mapState(['currentLanding']),
    ...mapState('Sidebar', [
      'isExpanded'
    ]),

    builder () {
      return this.$builder
    },

    emptySections () {
      return !this.showIntro && !this.builder.sections.length
    },

    headerSection () {
      return this.builder.sections.find(section => section.isHeader)
    },

    builderSections () {
      return this.builder.sections.filter(section => !section.isHeader)
    }
  },

  watch: {
    title (value) {
      this.$builder.title = value
      document.title = value
    },

    currentLanding (value) {
      this.initSettings()
    },

    /*
     * AutoSave landing after editing settings
     */
    'currentLanding.settings': {
      handler () {
        this.saveState(this.$builder.export('JSON'))
      },
      deep: true
    }
  },

  created () {
    // sets the initial data.
    this.$builder.set(this.data)
    this.$builder.settings = {
      mailchimpUrl: false
    }
    this.title = this.$builder.title
    this.themes = this.$builder.themes

    if (this.$route.params.slug !== 'new') {

    }

    this.groups = this.generateGroups()
    this.updateBuilderSections(this.sections)
    this.updateBuilderGroups(this.groups)

    this.getUser()
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
      'setSettingSection',
      'toggleSidebar',
      'setControlPanel'
    ]),
    ...mapActions('Landing', [
      'saveState'
    ]),
    ...mapActions('User', [
      'getUser'
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
      node.setAttribute('autoplay', '')
      node.setAttribute('loop', '')
      node.setAttribute('muted', '')
      if (settings.videoPosition) {
        node.classList.add(settings.videoPosition)
      }
      node.innerHTML = `<source src="${settings.video}" type="video/mp4"></source>`
      this.$refs.artboard.appendChild(node)
      node.muted = true
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

      this.setControlPanel(false)
    },

    showSettingsBar (event, section) {
      if (event.target.closest('.styler-active')) {
        return
      }
      this.toggleSidebar(true)
      this.setSettingSection(section)
    },

    observeGroups () {
      let groups = []
      let sectionsNodes = Array.from(this.$refs.artboard.children)

      sectionsNodes = sectionsNodes.filter((node) => {
        return Array.from(node.classList).indexOf('b-section-header') < 0
      })

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
    },

    onDragover: _.throttle((e) => {
      document.querySelector('#artboard').classList.add('drag-start')

      setTimeout(() => {
        document.querySelector('#artboard').classList.remove('drag-start')
      }, 600)
    }, 300)
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.artboard
  transform-origin: top center
  margin: 0 auto
  transition: 0.2s
  position: relative
  &.is-editable div.is-editable
    outline: none
    transition: border 0.25s
    border: .2rem dotted transparent
    &:hover
      cursor: pointer
      border-color: $dark-blue-krayola
    &.styler-active
      border-color: $white
      &:hover
        border-color: $white
      &.b-text
        cursor: text
  &.fp-scroll section
    height: 100vh !important
  &:before,
  &:after
    content: ''
    background-color: $ligth-grey
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
  &-input
    outline: none
    border: 1px solid #c1c1c1
    padding: 0.5rem 1rem
    margin: 2rem 0
    border-radius: 4rem
    width: 100%
    font-size: 1.6rem
    &:focus
      border-color: #0072FF
      box-shadow: 0 0 0 0.2rem rgba(#0072FF, 50%)

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
    color: #323c47

  &-themes
    display: flex
    flex-direction: column
    width: 100%

  &-theme
    background-color: #fff
    color: #323c47
    border: 0.1rem solid #c1c1c1
    margin: 0.5rem
    padding: 2rem
    border-radius: 0.4rem
    width: 100%
    cursor: pointer
    font-size: 1.6rem
    &:hover
      border-color: #0072FF

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
  box-shadow: 0 14px 28px opacify(#000000, 0.125), 0 10px 10px opacify(#000000, 0.1)

.page-sections
  list-style: none
  padding: 0
  margin: 0 0 40px 0
  li
    margin: 0 0 4px
    padding: 1rem 0.5rem
    background: lighten(#18d88b, 40%)

/* video background styles */
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

/* overlay background */

.b-overlay
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

// --- dirty hack. normalize artboard size
.builder-last
  height: 1px
</style>
