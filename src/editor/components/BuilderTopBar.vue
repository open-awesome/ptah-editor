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
    device: null
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
    },

    async itemClick (item, event) {
      await this.$nextTick()

      this.$emit(item, event)
    }
  }
}
</script>

<template>
<div class="b-top-bar" id="topbar">

  <div class="b-top-bar__padd">
    <div class="b-top-bar-menu">
      <div class="b-top-bar-menu__left">
        <div class="b-top-bar-menu__ham"
          :tooltip="$t('menu.sections')"
          tooltip-position="bottom"
          @click="toggleSidebarSection" v-if="!isExpanded"
          >
          <icon-base name="hamburgerDot"/>
        </div>
        <div class="b-top-bar-menu__crumbs">
          <span class="b-top-bar-menu__crumbs-home b-top-bar-menu__crumbs-link"
            :tooltip="$t('nav.backToDashbord')"
            tooltip-position="bottom"
            @click="backToLandings"
            >
            <icon-base name="home" width="20" height="17"/>
          </span>
          <span class="b-top-bar-menu__crumbs-arrow">
            →
          </span>
          <span :title="landingName">
            {{ landingName | truncate(35, '...') }}
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
        <span :tooltip="$t('menu.siteSettings')" tooltip-position="bottom"
              @click="toggleMenuItem('siteSettings')">
          <icon-base name="cog"></icon-base>
        </span>

        <span :tooltip="$t('nav.preview')" tooltip-position="bottom"
              @click="$emit('preview', $event)">
          <icon-base name="preview">
          </icon-base>
        </span>

        <span :tooltip="$t('nav.export')" tooltip-position="bottom"
              @click="$emit('export', $event)">
          <icon-base name="export">
          </icon-base>
        </span>
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
        // margin: 0 0 0 $size-step*9
    &__right
      order: 3
      width: 45%
      text-align: right
      span
        margin-left: 1.6rem
      svg
        color: $grey
        cursor: pointer
        &:hover
          color: $dark-blue-krayola

    &__ham
      cursor: pointer
      color: $grey
      &:hover
        color: $dark-blue-krayola
    &__crumbs
      display: flex

      color: $dark-grey
      padding: 0 $size-step
      white-space: nowrap
      &-home
        padding: 0 $size-step/4
        &:hover
          color: $dark-blue-krayola
      &-arrow
        padding: 0 1rem
      &-link
        opacity: 0.5
        &:hover
          opacity: 1 !important
          cursor: pointer
</style>
