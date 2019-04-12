<template>
  <transition name="slide-fade">
    <div class="b-builder-modal"
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
    ...mapState('Sidebar', ['isAddSectionExpanded', 'siteSettingsMenu']),

    contentID () {
      return this.$route.path.split('/')[4] || ''
    }
  },

  mounted () {
    if (_.last(this.$route.path.split('/')) === 'settings') {
      this.toggleSiteSettings('visualSettings')
    }
    this.toggleSidebar(false)
    this.setScrollbarVisible(false)
  },

  methods: {
    ...mapActions('PageTweaks', ['setScrollbarVisible']),
    ...mapActions('Sidebar', ['toggleAddSectionMenu', 'clearSettingObjectLight', 'toggleSidebar']),

    closeContent () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
      if (this.isAddSectionExpanded) {
        this.toggleAddSectionMenu(false)
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
    margin-top: -45vh
    width: $size-step*29
    height: 90vh
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
