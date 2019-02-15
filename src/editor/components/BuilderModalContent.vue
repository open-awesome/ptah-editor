<template>
  <transition name="slide-fade">
    <div class="b-builder-modal"
      v-if="isContentVisible"
      @click.self="closeContent"
      >
      <div
        class="b-builder-modal-content"
        >
        <div class="b-builder-modal-content__close"
          @click="closeContent">
          <icon-base
            name="close"
            color="#c4c4c4"
            width="14"
            height="14"
            />
        </div>
        <div class="b-builder-modal-content__padd">
          <div class="b-builder-modal-content__chapter">
            {{ $t('menu.siteSettings') }}
          </div>
          <div class="b-builder-modal-content__menu">
            <!-- Site settings CONTENTS -->
            <TabItem
              v-for="siteSetting in siteSettingsMenu"
              :key="siteSetting.id"
              :isSelected="contentID === siteSetting.id"
              @click="toggleSiteSettings(siteSetting.id)">
              {{ $t(siteSetting.name) }}
            </TabItem>
          </div>

          <div class="b-builder-modal-content__layout">
            <component
              :is="contentComponent"
              @requestClose="closeContent">
            </component>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import BuilderSiteSettingsSeo from './BuilderSiteSettingsSeo'
import BuilderSiteSettingsVisual from './BuilderSiteSettingsVisual'
import BuilderSiteSettingsCookies from './BuilderSiteSettingsCookies'
import BuilderSiteSettingsVersionHistory from './BuilderSiteSettingsVersionHistory'
import BuilderSiteSettingsAddJsScripts from './BuilderSiteSettingsAddJsScripts'
import MenuSubitem from './MenuSubitem'
import TabItem from './TabItem'

export default {
  name: 'BuilderModalContent',

  components: {
    BuilderSiteSettingsSeo,
    BuilderSiteSettingsCookies,
    BuilderSiteSettingsVisual,
    BuilderSiteSettingsVersionHistory,
    BuilderSiteSettingsAddJsScripts,
    MenuSubitem,
    TabItem
  },

  computed: {
    ...mapState('BuilderModalContent', ['isContentVisible', 'contentID']),
    ...mapState('Sidebar', ['isAddSectionExpanded', 'sandbox', 'isSettingsExpanded', 'siteSettingsMenu', 'expandedMenuItem']),

    ...mapGetters('BuilderModalContent', ['contentComponent'])
  },

  watch: {
    isContentVisible (value) {
      this.setScrollbarVisible(!value)
      if (this.isAddSectionExpanded && value) {
        this.toggleAddSectionMenu(false)
      }
      if (this.sandbox.expanded) {
        this.toggleSandboxSidebar(false)
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
    ...mapMutations('Sidebar', ['toggleSandboxSidebar']),
    ...mapActions('BuilderModalContent', {
      setModalContent: 'setContent'
    }),
    ...mapActions('PageTweaks', ['setScrollbarVisible']),
    ...mapActions('Sidebar', ['toggleAddSectionMenu', 'clearSettingObjectLight', 'toggleAddSectionMenu']),

    closeContent () {
      this.setModalContent('')
      if (this.isAddSectionExpanded) {
        this.toggleAddSectionMenu(false)
      }
      if (this.sandbox.expanded) {
        this.toggleSandboxSidebar(false)
      }
    },

    closeSettingsBar () {
      this.clearSettingObjectLight()
    },

    toggleSiteSettings (contentID) {
      this.closeSettingsBar()
      if (this.isAddSectionExpanded) {
        this.toggleAddSectionMenu()
      }
      if (this.contentID === contentID) {
        this.closeSiteSettings()
      } else {
        this.setModalContent(contentID)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-builder-modal
  background-color: rgba($dark-blue, 0.2)

  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 999
  &-content
    position: absolute
    left: 50%
    top: 50%
    margin-left: -$size-step*29/2
    margin-top: -$size-step*16/2
    width: $size-step*29
    height: $size-step*16
    z-index: 10

    background: $white

    display: flex
    flex-direction: column
    justify-content: stretch
    &__padd
      display: flex
      flex-direction: column
      justify-content: stretch

      height: 100%
    &__chapter
      font-size: 2rem
      line-height: $size-step*2

      height: $size-step*2
      padding: 0 $size-step
    &__menu
      width: 100%
      height: $size-step
      padding: 0 $size-step

      display: flex
      justify-content: stretch

      border-bottom: 1px solid $ligth-grey

    &__layout
      position: absolute
      top: 11rem
      bottom: 0
      right: 0
      left: 0
    &__close
      position: absolute
      top: $size-step
      right: $size-step
      cursor: pointer
      &:hover
        & svg
          fill: $dark-grey

// Animations
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
