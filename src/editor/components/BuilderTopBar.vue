<script>
import MenuPlatforms from './menu/MenuPlatforms.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    MenuPlatforms
  },

  props: {
    landingName: {
      required: true
    }
  },

  data: () => ({
    device: null,
    colorHamburger: '#333',
    colorHome: '#333'
  }),

  computed: {
    ...mapState(['currentLanding']),
    ...mapState('Sidebar', [
      'isExpanded'
    ]),

    modalContentID () {
      return this.$route.path.split('/')[4] || ''
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'clearSettingObject',
      'clearSettingObjectLight',
      'toggleSidebar'
    ]),

    setDevice (type) {
      this.$emit('setDevice', type)
    },

    backToLandings ($event) {
      this.clearSettingObject()
      this.$emit('backToLandings', $event)
    },

    toggleMenuItem () {
      this.toggleSiteSettings('visualSettings')
    },

    closeSettingsBar () {
      this.clearSettingObjectLight()
    },

    closeSiteSettings () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    toggleSiteSettings (contentID) {
      this.toggleSidebar(false)
      if (this.isAddSectionExpanded) {
        this.toggleAddSectionMenu()
      }
      if (this.modalContentID === contentID) {
        this.closeSiteSettings()
      } else {
        this.$router.push(`/editor/${this.$route.params.slug}/settings`)
      }
    },

    toggleSidebarSection () {
      this.toggleSidebar()
    }
  }
}
</script>

<template>
<div class="b-top-bar">

  <div class="b-top-bar__padd">
    <div class="b-top-bar-menu">
      <div class="b-top-bar-menu__left">
        <div class="b-top-bar-menu__ham" @click="toggleSidebarSection">
          <icon-base name="hamburger" :color="colorHamburger"></icon-base>
        </div>
        <div class="b-top-bar-menu__crumbs">
          <span class="b-top-bar-menu__crumbs-home b-top-bar-menu__crumbs-link"
                @click="backToLandings"
            >
            <icon-base name="home" :color="colorHome"></icon-base>
          </span>
          <span class="b-top-bar-menu__crumbs-link" @click="backToLandings">
            All sites
          </span>
          <span class="b-top-bar-menu__crumbs-arrow">
            →
          </span>
          <span>
            {{ landingName }}
          </span>
        </div>
      </div>
      <div class="b-top-bar-menu__middle"
        :class="{'b-top-bar-menu__middle-margin' : isExpanded }"
        >
        <MenuPlatforms
          @setDevice="setDevice"
          ></MenuPlatforms>
      </div>
      <div class="b-top-bar-menu__right">
        <BaseButton
          :color="'gray'"
          :transparent="true"
          :size="'middle'"
          @click="toggleMenuItem('siteSettings')"
          tooltip="show site settings"
          tooltip-position="bottom"
          >
          {{ $t('menu.siteSettings') }}
        </BaseButton>
        <BaseDropdownMenu
          positionDropdown="right"
          >
          <BaseButton
            :color="'gray-full'"
            :transparent="true"
            :size="'circle'"
            >
            <icon-base name="dotted"></icon-base>
          </BaseButton>
          <div slot="list">
            <ul>
              <li @click="$emit('preview', $event)">
                <icon-base
                  color="#B1B1B1"
                  name="preview">
                </icon-base>
                {{ $t('nav.preview') }}
              </li>
              <li @click="$emit('export', $event)">
                <icon-base
                  color="#B1B1B1"
                  name="upload">
                </icon-base>
                {{ $t('nav.export') }}
              </li>
            </ul>
          </div>
        </BaseDropdownMenu>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-top-bar
  width: 100%
  height: 100%
  padding: 2.4rem 3.2rem

  display: flex
  align-items: center
  justify-content: center
  &__padd
    width: 100%
  &-menu
    display: flex
    align-items: center
    justify-content: space-between
    &__left
      order: 1
      width: 45%
      display: flex
      align-items: center
      justify-content: flex-start
    &__middle
      order: 2
      width: 14rem
      &-margin
        margin: 0 0 0 $size-step*9
    &__right
      order: 3
      width: 45%
      text-align: right

    &__ham
      cursor: pointer
    &__crumbs
      color: $dark-grey
      opacity: 0.5
      padding: 0 $size-step
      white-space: nowrap
      &-home
       padding: 0 $size-step/4
      &-arrow
        padding: 0 1rem
      &-link
        opacity: 0.5
        &:hover
          opacity: 1 !important
          cursor: pointer
</style>
