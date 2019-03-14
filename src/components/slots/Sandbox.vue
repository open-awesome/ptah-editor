<template>
  <div class="b-slot">
    <base-button @click="showSandboxSidebar($event)" class="sandbox-equalizer settings ptah-control" color="light-gray">
      <icon-base name="cog" fill="white" />
    </base-button>
    <div class="divider ptah-control">
      <icon-base name="divider" width="2" height="37" fill="#1F5FAA"></icon-base>
    </div>
    <base-button @click="showSandboxSidebar($event, true)" class="sandbox-equalizer add-el ptah-control" color="light-gray">
      <icon-base name="plus" fill="white" />
    </base-button>
    <slot/>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

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
    styles () {
      return this.$section.get(this.containerPath).styles
    },

    components () {
      return this.$section.get(this.componentsPath)
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

    ...mapActions('BuilderModalContent', ['setContent']),
    ...mapActions('Sidebar', ['toggleSidebar', 'setControlPanel']),

    showSandboxSidebar (e, openElBar) {
      this.setContent(null)
      this.isAddSectionExpanded(false)

      // --- clear active classes
      document.querySelectorAll('.b-draggable-slot.active')
        .forEach(el => el.classList.remove('active'))

      this.setSection(this.$section)
      this.setSandboxPaths({
        components: this.componentsPath,
        container: this.containerPath
      })

      setImmediate(() => {
        let target = e.target.closest('.sandbox-equalizer').nextElementSibling
        if (target) {
          target.classList.add('active')
        }
      })

      this.toggleSidebar(true)

      if (openElBar) {
        this.setControlPanel('Slot')
      } else {
        this.setControlPanel(false)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
$h: 4.8rem

.b-slot
  $this: &
  display: flex
  flex-wrap: wrap
  position: relative
  width: 100%
  min-height: 20rem
  .is-editable &
    border: 1px dashed $dark-blue-krayola
  /deep/
    .b-draggable-slot
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-items: center
      color: inherit

      width: 96%
      margin: 0 auto
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
  &:hover
    .sandbox-equalizer,
    .divider
      display: flex

.sandbox-equalizer
  position: absolute
  top: 0
  z-index: 1

  width: 5.3rem
  height: $h
  padding: 0
  margin: 0
  border: none
  border-radius: 0

  background: $dark-blue-krayola

  display: none
  align-items: center
  justify-content: center

  line-height: 1.5em
  opacity: 1

  &.settings
    left: 0

  &.add-el
    left: 5.3rem

  > svg
    margin: 0

  &:hover
    opacity: 1

.divider
  position: absolute
  top: 0
  left: 5.3rem
  z-index: 2

  width: .2rem
  height: $h

  background: $dark-blue-krayola

  display: none
  align-items: center
  justify-content: center
</style>
