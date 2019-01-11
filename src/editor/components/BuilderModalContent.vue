<template>
  <transition name="slide-fade">
    <div
      class="b-builder-modal-content"
      v-if="isContentVisible"
      :style="{'margin-right': `${fakeScrollbarWidth}px`}">
      <component
        :is="contentComponent"
        @requestClose="closeContent"></component>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import BuilderSiteSettingsSeo from './BuilderSiteSettingsSeo'
import BuilderSiteSettingsVisual from './BuilderSiteSettingsVisual'
import BuilderSiteSettingsCookies from './BuilderSiteSettingsCookies'
import BuilderSiteSettingsVersionHistory from './BuilderSiteSettingsVersionHistory'

export default {
  name: 'BuilderModalContent',

  components: {
    BuilderSiteSettingsSeo,
    BuilderSiteSettingsCookies,
    BuilderSiteSettingsVisual,
    BuilderSiteSettingsVersionHistory
  },

  computed: {
    ...mapState('BuilderModalContent', ['isContentVisible']),
    ...mapState('Sidebar', ['isAddSectionExpanded']),
    ...mapGetters('BuilderModalContent', ['contentComponent']),
    ...mapGetters('PageTweaks', ['fakeScrollbarWidth'])
  },

  watch: {
    isContentVisible (value) {
      this.setScrollbarVisible(!value)
      if (this.isAddSectionExpanded && value) {
        this.toggleAddSectionMenu(false)
      }
    }
  },

  created () {
    this.closeContent()
  },

  mounted () {
    this.setScrollbarVisible(!this.isContentVisible)
  },

  methods: {
    ...mapActions('BuilderModalContent', ['setContent']),
    ...mapActions('PageTweaks', ['setScrollbarVisible']),
    ...mapActions('Sidebar', ['toggleAddSectionMenu']),

    closeContent () {
      this.setContent('')
      if (this.isAddSectionExpanded) {
        this.toggleAddSectionMenu(false)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-builder-modal-content
  display: flex
  position: fixed
  bottom: 0.8rem
  left: 24.8rem
  top: 8rem
  z-index: 10
  background: #fff

// Animations down here
.slide-fade
  &-enter-active
    transition: all .2s ease

  &-leave-active
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  &-enter,
  &-leave-to
    opacity: 0
    transform: translateX(-0.8rem)
</style>
