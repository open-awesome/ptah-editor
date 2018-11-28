<template>
  <div
    class="b-builder-modal-content"
    v-if="isContentVisible"
    :style="{'margin-right': `${fakeScrollbarWidth}px`}">
    <div class="b-builder-modal-content__inner">
      <component :is="contentComponent"></component>
    </div>
    <div class="b-builder-modal-content-controls">
      <BaseButton color="gray">Cancel</BaseButton>
      <BaseButton>Save</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
    ...mapGetters('BuilderModalContent', ['contentComponent']),
    ...mapGetters('PageTweaks', ['fakeScrollbarWidth'])
  },

  watch: {
    isContentVisible (value) {
      this.setScrollbarVisible(!value)
    }
  },

  mounted () {
    this.setScrollbarVisible(!this.isContentVisible)
  },

  methods: {
    ...mapActions('PageTweaks', ['setScrollbarVisible'])
  }
}
</script>

<style lang="sass" scoped>
.b-builder-modal-content
  position: fixed
  right: 1rem
  bottom: 0.8rem
  left: 24.8rem
  top: 8rem
  z-index: 10
  background: #fff
  display: flex
  flex-direction: column

  &__inner
    padding: 4rem
    overflow-y: auto
    flex-grow: 1

.b-builder-modal-content-controls
  display: flex
  flex-shrink: 0
  border-top: 1px solid #E2E2E2
  padding: 1.6rem
  justify-content: flex-end

</style>
