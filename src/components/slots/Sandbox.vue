<template>
  <div class="b-slot" :style="{
      '--mobile-flex-direction': mediaStyles['is-mobile']['flex-direction'],
      '--mobile-align-items': mediaStyles['is-mobile']['align-items'],
      '--mobile-justify-content': mediaStyles['is-mobile']['justify-content'],
      '--mobile-background-color': mediaStyles['is-mobile']['background-color'],
      '--mobile-background-image': mediaStyles['is-mobile']['background-image'],
      '--mobile-background-position': mediaStyles['is-mobile']['background-position'],
      '--mobile-background-repeat': mediaStyles['is-mobile']['background-repeat'],
      '--mobile-background-size': mediaStyles['is-mobile']['background-size'],
      '--mobile-background-attachment': mediaStyles['is-mobile']['background-attachment']
    }">
    <div class="b-slot__settings" :style="{
        'margin-top': styles['margin-top'],
        'margin-left': styles['margin-left']
      }">
      <span
        @click.stop="showSandboxSidebar($event, 'SlotSettings')"
        tooltip="Slot settings"
        tooltip-position="right"
        class="b-slot__settings-item b-slot__settings-item-settings"
        >
          <icon-base name="cog" fill="white" />
      </span>
      <span
        @click.stop="showSandboxSidebar($event, 'SlotBackground')"
        tooltip="Slot background"
        tooltip-position="right"
        class="b-slot__settings-item b-slot__settings-item-slot-bg"
        >
          <icon-base name="background" fill="white" />
      </span>
      <span
        @click.stop="showSandboxSidebar($event, 'Slot')"
        tooltip="Add element"
        tooltip-position="right"
        class="b-slot__settings-item b-slot__settings-item-add-el"
        >
          <icon-base name="plus" fill="white" />
      </span>
    </div>
    <slot/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'Sandbox',

  inject: ['$section'],

  props: {
    containerPath: String,
    componentsPath: String
  },

  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectOptions',
      'settingObjectSection',
      'device'
    ]),

    slot () {
      return this.settingObjectSection.get(this.sandbox.container) || {}
    },

    isMobile () {
      return this.device === 'is-mobile'
    },

    styles () {
      return this.$section.get(this.containerPath).styles
    },

    mediaStyles: {
      get () {
        let device = 'is-mobile'
        let media = { 'is-mobile': {} }
        let stylesMedia = this.$section.get(this.containerPath).media

        console.log(1)

        if (stylesMedia[device]) {
          for (let key in this.styles) {
            media[device][key] = stylesMedia[device][key] !== undefined ? stylesMedia[device][key] : this.styles[key]
          }
        } else {
          media[device] = this.styles
        }

        return media
      },
      set (value) {
        this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.slot, {
          media: value
        }))
        console.log(1)
      }
    },

    direction () {
      return this.getPropValue('flex-direction')
    },

    align () {
      return this.getPropValue('align-items')
    }
  },

  created () {
    this.styles['flex-direction'] = this.styles['flex-direction'] || this.direction
    this.styles['align-items'] = this.styles['align-items'] || this.align
    this.styles['align-items'] = this.styles['align-items'] || this.align
  },

  methods: {
    ...mapMutations('Sidebar', [
      'setSandboxPaths',
      'setSection',
      'isAddSectionExpanded'
    ]),
    ...mapActions('Sidebar', [
      'toggleSidebar',
      'setControlPanel',
      'setElement',
      'setSettingObject'
    ]),

    showSandboxSidebar (e, openElBar) {
      this.isAddSectionExpanded(false)

      this.setElement(this.$slots.default[0].elm)

      // --- clear active classes
      document.querySelectorAll('.b-draggable-slot.active')
        .forEach(el => el.classList.remove('active'))

      let options = this.$section.get(this.containerPath)
      options.name = this.containerPath

      this.setSettingObject({
        options,
        type: 'slot',
        label: 'slot'
      })

      this.setSection(this.$section)
      this.setSandboxPaths({
        components: this.componentsPath,
        container: this.containerPath
      })

      setImmediate(() => {
        let target = e.target.closest('.b-slot__settings-item').nextElementSibling
        if (target) {
          target.classList.add('active')
        }
      })

      this.toggleSidebar(true)

      this.setControlPanel(openElBar)
    },

    getPropValue (prop) {
      let s = ''

      if (this.isMobile && this.mediaStyles[`${this.device}`] && this.mediaStyles[`${this.device}`][prop]) {
        s = this.mediaStyles[`${this.device}`][prop]
      } else {
        s = this.styles[prop]
      }

      return s
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-slot
  $this: &
  display: flex
  flex-wrap: wrap

  position: relative
  width: 100%
  padding: 0
  min-height: $size-step

  transition: border 0.25s
  .is-editable &
    height: 100%

  &__settings
    position: absolute
    top: 0
    left: 0
    z-index: 1000

    width: $size-step/1.5
    padding: 0
    margin: 0
    border: none
    border-radius: 0

    display: flex
    align-items: center
    justify-content: flex-start
    flex-direction: column

    opacity: 0
    transition: opacity 0.25s
    &-item
      display: flex
      align-items: center
      justify-content: center

      width: $size-step/1.5
      height: $size-step/1.5

      background: $dark-blue-krayola
      box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)

      cursor: pointer
      transition: all .3s cubic-bezier(.2,.85,.4,1.275)
      & svg
        fill: $white
        width: 14px
        height: 14px

      &:hover,
      .active
        background: $white
        svg
          fill: $dark-blue-krayola

  .is-editable &:hover
    #{$this}__settings
      opacity: 1
    .b-draggable-slot
      border: 1px dashed $dark-blue-krayola

  .is-mobile & .b-draggable-slot
    flex-direction: var(--mobile-flex-direction) !important
    align-items: var(--mobile-align-items) !important
    justify-content: var(--mobile-justify-content) !important
    background-color: var(--mobile-background-color) !important
    background-image: var(--mobile-background-image) !important
    background-position: var(--mobile-background-position) !important
    background-repeat: var(--mobile-background-repeat) !important
    background-attachment: var(--mobile-background-attachment) !important

  @media only screen and (max-width: 768px)
    & .b-draggable-slot
      flex-direction: var(--mobile-flex-direction) !important
      align-items: var(--mobile-align-items) !important
      justify-content: var(--mobile-justify-content) !important
      background-color: var(--mobile-background-color) !important
      background-image: var(--mobile-background-image) !important

  /deep/
    .b-draggable-slot
      display: flex
      flex-wrap: wrap
      // flex-direction: column
      // justify-content: center
      // align-items: center
      color: inherit

      width: 100%
      margin: 0 auto

      border: 1px dashed transparent
      padding: .8rem
      &
        > div
          max-width: 100%
      &_horizont
        > div
          width: auto

</style>
