<template>
  <div class="b-section-menu">
    <div class="b-section-menu__settings">
      <span
        @click="showSettingsBar"
        class="b-section-menu__settings-item b-section-menu__settings-item-settings"
        >
        <icon-base name="cog" fill="white" />
      </span>
      <span
        @click="showBackgroundPanel"
        class="b-section-menu__settings-item b-section-menu__settings-item-slot-bg"
        >
        <icon-base name="background" fill="white" />
      </span>
    </div>
    <slot/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Menu',

  props: {
    section: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'builderGroups',
      'settingObjectSection'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'setSettingSection',
      'setControlPanel'
    ]),

    showSettingsBar () {
      this.setSettingSection(this.section)
      this.selectSidebarSection(this.section)
      this.setControlPanel('Section')
    },

    showBackgroundPanel () {
      console.log(this.section)
      this.setSettingSection(this.section)
      this.selectSidebarSection(this.section)
      this.setControlPanel('SectionBackground')
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
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-section-menu
  $this: &
  transition: border 0.25s

  position: absolute
  top: 0
  right: $size-step/1.5
  z-index: 1
  &__settings
    width: $size-step/1.5
    padding: 0
    margin: 0
    border: none
    border-radius: 0

    display: flex
    align-items: center
    justify-content: flex-end

    opacity: 1
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
      & svg
        fill:  $white
        width: 12px
        height: 12px

      &:hover, .active
        background: $white
        svg
          fill: $dark-blue-krayola

  .is-editable &:hover
    #{$this}__settings
      opacity: 1
</style>
