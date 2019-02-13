<template>
  <transition name="slide-fade">
    <div
      v-if="isContentVisible"
      class="b-builder-modal-content"
      >
      <div class="b-builder-modal-content__padd">
        <div class="b-builder-modal-content__menu">
          <!-- Site settings CONTENTS -->
          <MenuSubitem
            v-for="siteSetting in siteSettingsMenu"
            :key="siteSetting.id"
            :isSelected="contentID === siteSetting.id"
            @click="toggleSiteSettings(siteSetting.id)">
            {{ $t(siteSetting.name) }}
          </MenuSubitem>
        </div>

        <div class="b-builder-modal-content__layout">
          <component
            :is="contentComponent"
            @requestClose="closeContent">
          </component>
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
import BuilderSiteSettingsIntegrations from './BuilderSiteSettingsIntegrations'
import BuilderSiteSettingsAddJsScripts from './BuilderSiteSettingsAddJsScripts'
import MenuSubitem from './MenuSubitem'

export default {
  name: 'BuilderModalContent',

  components: {
    BuilderSiteSettingsSeo,
    BuilderSiteSettingsCookies,
    BuilderSiteSettingsVisual,
    BuilderSiteSettingsVersionHistory,
    BuilderSiteSettingsAddJsScripts,
    BuilderSiteSettingsIntegrations,
    MenuSubitem
  },

  computed: {
    ...mapState('BuilderModalContent', ['isContentVisible', 'contentID']),
    ...mapState('Sidebar', ['isAddSectionExpanded', 'sandbox', 'isSettingsExpanded', 'siteSettingsMenu']),

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

    closeSiteSettings () {
      this.setModalContent('')
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

.b-builder-modal-content
  position: fixed
  bottom: 0.8rem
  left: 50%
  margin-left: -20rem
  width: 60rem
  top: 50%
  height: 60rem
  margin-top: -30rem
  z-index: 10
  background: $white
  &__padd
    display: flex
    flex-direction: column
    justify-content: stretch
  &__menu
    width: 100%
    height: 4.8rem
    display: flex
    justify-content: stretch

    box-shadow: 0 0.6rem 1.5rem rgba(0, 0, 0, 0.1)
  &__layout
    position: absolute
    top: 4.8rem
    bottom: 0
    right: 0
    left: 0

  & .b-menu-subitem,
    color: $dark-grey
    &:hover
      color: $white

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
