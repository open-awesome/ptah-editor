<template>
  <div class="b-builder-layout">
    <div class="b-builder-layout__top-bar" :class="{
      'b-builder-layout__top-bar_down' : isContentVisible,
      'b-builder-layout__top-bar_sidebar-expanded' : isExpanded
      }">
      <BuilderTopBar
        @backToLandings="backToLandings"
        @preview="$emit('preview', $event)"
        @export="$emit('export', $event)"
        @save="$emit('save', $event)"
        :landingName="$store.state.name"
        ></BuilderTopBar>
    </div>
    <div class="b-builder-layout-content">

      <aside
        id="sidebar"
        class="b-builder-layout-content__sidebar"
        :class="{'b-builder-layout-content__sidebar_expanded': isExpanded}">

        <BuilderSidebar
          :builder="builder"
          :isExpanded="isExpanded"
          ></BuilderSidebar>
      </aside>

      <main class="b-builder-layout-content__main">
        <base-scroll-container
          backgroundBar="#fff">
          <div class="b-builder-layout-content__main-layout" :class="device">
            <slot></slot>
          </div>
        </base-scroll-container>
        <!--<BuilderModalContent :builder="builder" />-->
        <router-view :builder="builder"></router-view>
      </main>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BuilderSidebar from './BuilderSidebar.vue'
import BuilderTopBar from './BuilderTopBar.vue'
import BuilderModalContent from './BuilderModalContent.vue'
import { sectionsGroups } from '@cscripts/sectionsGroups'

export default {
  name: 'BuilderLayout',

  provide () {
    let device = {}
    Object.defineProperty(device, 'type', { enumerable: true, get: () => this.device })

    return { device }
  },

  props: {
    builder: {
      required: true
    }
  },

  components: {
    BuilderSidebar,
    BuilderTopBar,
    BuilderModalContent
  },

  computed: {
    ...mapState('Sidebar', [
      'isExpanded',
      'device'
    ]),

    isContentVisible () {
      return this.$route.path.split('/').indexOf('settings') > 0
    }
  },

  watch: {
    device: function (value) {
      setTimeout(function () {
        sectionsGroups()
      }, 300)
    }
  },

  methods: {
    backToLandings () {
      if (localStorage.getItem('guest') === null) {
        this.$router.push({ path: `/dashboard` })
      } else {
        this.$router.push({ path: `/` })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

$topBarHeight: 6rem

.b-builder-layout
  position: relative

  &__top-bar
    height: $topBarHeight
    max-width: 100vw
    background-color: $white
    position: fixed
    top: 0
    right: 0
    left: 0
    z-index: 999
    transition: all .2s ease-out
    &_down
      z-index: 0
    &_sidebar-expanded
      padding-left: $size-step*9

.b-builder-layout-content
  display: flex
  flex-wrap: wrap
  align-items: stretch
  width: 100%

  &__sidebar
    order: 1
    width: $size-step*9
    flex-shrink: 0
    position: relative
    z-index: 1000
    display: none
    transition: width 0.3s ease-in-out

    &_expanded
      display: flex
      + .b-builder-layout-content__main
        width: calc(100vw - #{$size-step*10})

  &__main
    order: 2
    flex-grow: 1
    min-height: 5rem
    margin: $topBarHeight 0 0
    position: relative
    z-index: 10
    transition: width 0.3s ease-in-out
    background-color: $ligth-grey

    &-layout
      transition: width 0.2s
      margin: 0 auto
      position: relative
      z-index: 5
      height: calc(100vh - 6rem)

      &.is-desktop
        width: 100%
      &.is-laptop
        width: 120rem
        max-width: 100%
      &.is-mobile
        width: 37rem
        max-width: 100%
</style>
