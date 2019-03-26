<template>
  <div class="b-slot">
    <div class="b-slot__settings">
      <!-- TODO: need added controls aligned in slot -->
      <!--span @click="showSandboxSidebar($event)" class="b-slot__settings-item b-slot__settings-item-settings">
        <icon-base name="cog" fill="white" />
      </span-->
      <span @click="showSandboxSidebar($event, true)" class="b-slot__settings-item b-slot__settings-item-add-el">
        <icon-base name="plus" fill="white" />
      </span>
    </div>
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
        let target = e.target.closest('.b-slot__settings-item').nextElementSibling
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
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-slot
  $this: &
  display: flex
  flex-wrap: wrap
  position: relative
  width: 100%
  border: 1px dashed transparent

  transition: border 0.25s
  .is-editable &:hover
    border: 1px dashed $dark-blue-krayola
  &__settings
    position: absolute
    top: -1px
    bottom: -1px
    left: -$size-step*1.1
    z-index: 1

    width: $size-step
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

      width: $size-step
      height: $size-step

      border-radius: 50%;
      background: $white;
      box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39);

      cursor: pointer
      & svg
        fill: $dark-blue-krayola
  .is-editable &:hover
    #{$this}__settings
      opacity: 1
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

</style>
