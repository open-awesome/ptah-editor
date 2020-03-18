<template>
  <transition name="slide-fade">
    <div class="b-builder-modal"
      @mousedown.self="closeContent"
      >
      <div
        class="b-builder-modal-content"
        >
        <div class="b-builder-modal-content__close"
          @click="closeContent">
          <icon-minimize />
        </div>
        <div class="b-builder-modal-content__padd">
          <div class="b-builder-modal-content__chapter">
            {{ title }}
          </div>

          <div class="b-builder-modal-content__layout">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import MenuSubitem from './MenuSubitem'
import TabItem from './TabItem'

export default {
  name: 'BuilderModalContent',

  components: {
    MenuSubitem,
    TabItem
  },

  props: {
    builder: {
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'isAddSectionExpanded',
      'siteSettingsMenu'
    ]),

    contentID () {
      return this.$route.path.split('/')[4] || ''
    },

    title () {
      let title = this.siteSettingsMenu.find(item => item.id === this.contentID).name
      return this.$t(title)
    }
  },

  mounted () {
    if (_.last(this.$route.path.split('/')) === 'settings') {
      this.toggleSiteSettings('visualSettings')
    }
    this.toggleSidebar(true)
    this.toggleSectionsTreeMenu(false)
    this.setScrollbarVisible(false)
  },

  methods: {
    ...mapActions('PageTweaks', [
      'setScrollbarVisible'
    ]),
    ...mapActions('Sidebar', [
      'toggleAddSectionMenu',
      'clearSettingObjectLight',
      'toggleSidebar',
      'toggleSectionsTreeMenu'
    ]),

    closeContent () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
      if (this.isAddSectionExpanded) {
        this.toggleAddSectionMenu(false)
      }
      this.toggleSidebar(false)
    },

    closeSettingsBar () {
      this.clearSettingObjectLight()
      this.toggleSidebar(false)
    },

    toggleSiteSettings (contentID) {
      this.closeSettingsBar()
      if (this.isAddSectionExpanded) {
        this.toggleAddSectionMenu()
      }
      if (this.contentID !== contentID) {
        this.$router.push(`/editor/${this.$route.params.slug}/settings/${contentID}`)
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
  top: 6rem
  right: 0
  bottom: 0
  left: 9rem
  z-index: 999
  overflow: auto

  display: flex
  justify-content: flex-start
  align-items: center

  @media only screen and (max-height: 600px)
    &
      display: block
  &-content
    width: 33rem
    min-height: 100%
    z-index: 10
    position: relative

    background: $white

    display: flex
    flex-direction: column
    justify-content: stretch
    @media only screen and (max-height: 600px)
      &
        width: 29.5rem
        min-height: 100%
    &__padd
      display: flex
      flex-direction: column
      justify-content: stretch

      height: 100%
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      @media only screen and (max-height: 600px)
        &
          position: relative
    &__chapter
      font-size: 1.8rem
      font-weight: bold
      line-height: 1
      text-transform: uppercase
      text-align: center
      letter-spacing: 0.065em

      display: flex
      align-items: center
      justify-content: center

      height: 7rem
      padding: 0.5rem 2rem 0
    &__layout
      position: relative
      height: 100%
    &__close
      position: absolute
      top: 2.4rem
      right: 2.1rem
      cursor: pointer
      z-index: 10
      &:hover svg
        fill: $main-green

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
