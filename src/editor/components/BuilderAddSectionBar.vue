<script>
import { omit } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'BuilderAddSectionBar',
  props: {
    builder: {
      type: Object,
      required: true
    },
    title: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      selectedGroup: [],
      selectedSection: null,
      isVisibleBar: false,
      fullScreenView: false,
      search: '', // filter sections,
      processing: false,
      groupSrc: {
        Header: {
          descr: 'Small section for external navigation',
          ico: 'sectionHeader',
          width: 25
        },
        FirstScreen: {
          descr: 'Your project face and make-up',
          ico: 'sectionFirstScreen',
          width: 18
        },
        Columns: {
          descr: 'Additional features short description',
          ico: 'sectionColumns',
          width: 26
        },
        Elements: {
          descr: 'Additional page customization details',
          ico: 'sectionElements',
          width: 20
        },
        Footer: {
          descr: 'Page finalization small section',
          ico: 'sectionFooter',
          width: 23
        },
        Forms: {
          descr: 'Subscribe your visitors for updates',
          ico: 'sectionForms',
          width: 21
        },
        Galleries: {
          descr: 'Picture gallery for a spectacular presentation',
          ico: 'sectionGallery',
          width: 26
        },
        Products: {
          descr: 'List your game editions, bundles and packs.',
          ico: 'sectionProducts',
          width: 26
        },
        Slider: {
          descr: 'Main features fullscreen slider',
          ico: 'sectionSlider',
          width: 32
        }
      }
    }
  },

  computed: {
    ...mapState('Sidebar', ['builderSections', 'builderGroups']),

    hasHeader () {
      return this.builder.sections.some(section => section.isHeader)
    },

    groups () {
      if (this.hasHeader) {
        return omit(this.builderGroups, 'Header')
      }
      return this.builderGroups
    },

    sections () {
      return this.builderSections
    },

    barWidth () {
      return this.fullScreenView ? '100%' : '28.8rem'
    },

    filteredSection () {
      return this.fullScreenView ?
        this.selectedGroup.filter((section) => ~section.name.toLowerCase().indexOf(this.search.toLowerCase())) :
        this.selectedGroup
    }
  },

  methods: {
    selectGroup (group) {
      this.selectedGroup = group
      this.selectedSection = group[0]
      this.addSection(this.selectedSection)
    },
    selectSection (section) {
      if (this.processing) {
        return
      }

      this.processing = true
      this.selectedSection = section
      this.selectedGroup = []
      this.addSection(this.selectedSection)
    },
    addSection (section) {
      this.builder.add(this.selectedSection, this.builder.sections.length + 1)
      this.closeAddSectionBar()
      this.$emit('add', this.builder.sections[this.builder.sections.length - 1])
    },
    showSelectSection (group) {
      if (this.selectedGroup === group) {
        this.isVisibleBar = !this.isVisibleBar
        this.selectedGroup = []
        return
      }

      this.selectedGroup = group
      this.isVisibleBar = true
    },
    closeAddSectionBar () {
      this.$emit('requestClose')
      this.isVisibleBar = false
      this.selectedSection = null
      this.selectedGroup = null
      this.processing = false
    },
    toggleView () {
      this.fullScreenView = !this.fullScreenView
      if (!this.fullScreenView) {
        this.search = ''
      }
    }
  }
}
</script>

<template>
  <div class="b-add-section">
    <base-button
      v-if="isVisibleBar"
      color="white"
      :transparent="true"
      size="middle"
      class="b-add-section__toggle-bar"
      @click="toggleView()">
      <template v-if="fullScreenView">{{ $t('s.minimize') }}</template>
      <template v-if="!fullScreenView">{{ $t('s.fullScreenView') }}</template>
    </base-button>

    <span
      class="b-add-section__close-bt"
      @click="closeAddSectionBar"
    >
      <IconBase
        name="close"
        width="14"
        height="14"
      />
    </span>
    <div class="b-add-section__padd">
      <BaseScrollContainer
        :styling="{ width: barWidth, height: '100%' }"
        backgroundBar="#00ADB6"
      >
        <ul class="b-add-section__menu is-visiable" ref="menu">
          <li class="b-add-section__menu-group"
            :class="[{ 'b-add-section__menu-group_selected': group === selectedGroup}, `g_${name}`]"
            v-for="(group, name) in groups"
            :key="name"
            v-if="group.length"
            @click="showSelectSection(group)"
          >
            <div class="b-add-section__menu-group-item">
              <div class="b-add-section__menu-ico">
                <IconBase
                  :name="groupSrc[name].ico"
                  :width="groupSrc[name].width"
                />
              </div>
              <div class="b-add-section__menu-header">
                <span class="b-add-section__menu-title">
                  {{ name }}
                </span>
                <!--span class="b-add-section__menu-descr">
                  {{ groupSrc[name].descr }}
                </span-->
              </div>
              <div class="b-add-section__menu-arrow">
                <IconBase width="12" name="arrowDown"/>
              </div>
            </div>
            <div class="b-add-section-bar" v-show="isVisibleBar && selectedGroup === group">
              <template
                v-for="(section, index) in filteredSection"
              >
                <div class="b-add-section-bar__menu-element"
                  :class="{ 'b-add-section-bar__menu-element_selected': section === selectedSection }"
                  v-bind:key="index"
                  @click="selectSection(section)"
                >
                  <div class="b-add-section-bar__menu-image-holder">
                    <img
                      class="b-add-section-bar__menu-image"
                      v-if="section.cover"
                      :src="section.cover"
                    />
                    <div>
                      <div class="b-add-section-bar__menu-title">
                        {{ section.title }}
                      </div>
                      <div class="b-add-section-bar__menu-descr">
                        {{ section.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </li>
        </ul>
      </BaseScrollContainer>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-add-section
  width: 290px

  background: $white
  position: relative
  z-index: 1

  background: $white
  border-radius: 0 10px 10px 0
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25)
  &__toggle-bar
    position: absolute
    top: 1.5rem
    left: 90rem
    z-index: 20
    width: 17rem

  &__close-bt
    color: $grey
    position: absolute
    top: 32px
    right: 17px
    cursor: pointer
    &:hover
      color: $main-green
  &__padd
    padding: 8rem 0 0
    height: 100%

    display: flex
    flex-direction: column

  &__closer
    position: absolute
    right: 1rem
    top: 1rem
    padding: 0.6rem 1rem
    border: 0
    background: transparent
    cursor: pointer

  &__menu
    padding: 0
    margin: 0
    &-group
      &-item
        display: flex
        justify-content: space-between
        align-items: center

      margin: 0 11px
      padding: 0 22px
      list-style: none
      height: 5rem
      color: #A2A5A5
      cursor: pointer

      svg
        fill: #A2A5A5

      &:hover
        cursor: pointer
        background: rgba(0, 173, 182, 0.2)
      &_selected
        height: auto
        color: $main-green
        svg
          fill: $main-green
        &:hover
          background: transparent
        & .b-add-section__menu-arrow
          transform: rotate(180deg)
    &-header
      flex-grow: 1
    &-title
      display: block

      font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif
      font-size: 1.2rem
      line-height: 5rem
      font-weight: 600
      text-align:  left
      text-transform: uppercase
      transition: all 0.3s cubic-bezier(0.2, 0.85, 0.4, 1.275)
    &-ico
      width: 5rem
      display: flex
      justify-content: center
      flex-shrink: 0
      transition: all 0.3s cubic-bezier(0.2, 0.85, 0.4, 1.275)
    &-arrow
      width: 2.4rem
      display: flex
      justify-content: center
      align-items: center

      flex-shrink: 0
      transition: all 0.3s cubic-bezier(0.2, 0.85, 0.4, 1.275)

  &-bar
    width: 100%
    background-color: $white
    transition: height 0.3s cubic-bezier(0.2, 0.85, 0.4, 1.275)

    & > div
      background: $white
      transition: all 0.3s cubic-bezier(0.2, 0.85, 0.4, 1.275)
    &__menu
      padding: 3.2rem 0 8rem
      &-element
        overflow: hidden
        box-sizing: border-box
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center
        border: 0.2rem solid transparent
        transition: all 0.1s ease-in-out
        position: relative
        margin: 0 -1.6rem
        &:hover::after
          content: ''
          display: block
          top: 0
          left: 0
          right: 0
          bottom: 0
          position: absolute
          background: rgba(0, 173, 182, 0.1)

        &_selected
          background-color: #436FEE
          border: 0.2rem solid transparent
          color: $white
          &:hover
            border: 0.2rem solid transparent
          & img
            display: none

      &-image-holder
        background: url("https://s3.protocol.one/src/o_jGfAw.png") no-repeat
        width: 24rem
        min-height: 18.6rem
        padding: 1.2rem .2rem 0
        margin: 1.1rem
        position: relative

        display: flex
        flex-direction: column
        justify-content: space-between
      &-image
        max-width: 100%
      &-title
        font-size: 1.6rem
        font-weight: 600
        color: #333333
        margin-bottom: .6rem
      &-descr
        font-size: 1.2rem
        line-height: 1.4rem
        color: #B1B1B1

      &-button
        display: none
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        background: rgba(47,110,205,.2)
        justify-content: center
        align-items: center
        span
          background: $main-green
          height: 4rem
          line-height: 4rem
          border-radius: 20px
          padding: 0 4rem
          color: white
    &__header
      height: 7.3rem
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid rgba(0, 0, 0, 0.15)
      &--title
        font-size: 2.4rem
        letter-spacing: -0.02rem
        margin-left: 3.7rem
        color: $black
        text-transform: capitalize
      &--search
        width: 19rem
        margin-right: 3.2rem
        /deep/
          & input
              padding-left: 3.6rem
              background: url("https://s3.protocol.one/src/o_ItVIs.png") no-repeat left center

  &-footer
    position: absolute
    bottom: 0
    right: 0
    left: 0
    height: 8rem
    z-index: 100
    display: flex
    align-items: center
    &_add
      width: $size-step*9
    &__bt
      width: 21.6rem
      margin: 0 auto
</style>
