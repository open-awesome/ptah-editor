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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import BuilderSiteSettingsSeo from './BuilderSiteSettingsSeo'
import BuilderSiteSettingsVersionHistory from './BuilderSiteSettingsVersionHistory'
import BuilderSiteSettingsVisual from './BuilderSiteSettingsVisual'

export default {
  name: 'BuilderModalContent',

  components: {
    BuilderSiteSettingsSeo,
    BuilderSiteSettingsVersionHistory,
    BuilderSiteSettingsVisual
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
    ...mapMutations('Sidebar', ['isAddSectionExpanded']),
    ...mapActions('BuilderModalContent', ['setContent']),
    ...mapActions('PageTweaks', ['setScrollbarVisible']),
    ...mapActions('Sidebar', ['toggleAddSectionMenu']),

    closeContent () {
      this.setContent('')
      this.isAddSectionExpanded(false)
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
