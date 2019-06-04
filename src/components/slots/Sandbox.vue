<template>
  <div class="b-slot">
    <div class="b-slot__settings">
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

export default {
  name: 'Sandbox',

  inject: ['$section'],

  props: {
    containerPath: String,
    componentsPath: String,
    direction: {
      type: String,
      default: 'row'
    },
    align: {
      type: String,
      default: 'center'
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectSection'
    ]),

    styles () {
      return this.$section.get(this.containerPath).styles
    }
  },

  created () {
    this.styles['flex-direction'] = this.styles['flex-direction'] || this.direction
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

      // set slot element
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
  padding: 0 $size-step/1.5
  min-height: $size-step

  transition: border 0.25s
  &__settings
    position: absolute
    top: 0
    left: 0
    z-index: 1

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
  /deep/
    .b-draggable-slot
      display: flex
      flex-wrap: wrap
      flex-direction: column
      justify-content: center
      align-items: center
      color: inherit

      width: 100%
      margin: 0 auto

      border: 1px dashed transparent
      padding: .8rem
      &
        > div
          max-width: 100%
          // padding: .8rem
      &_horizont
        > div
          width: auto
      .is-mobile &,
      .is-tablet &
        width: 96%
        > div
          width: 96%
      @media only screen and (max-width: 768px)
        &
          width: 96%
          > div
            width: 96%

</style>
