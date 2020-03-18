<template>
  <div class="b-builder-layout">
    <BuilderTopBar
      class="b-builder-layout__top-bar"
      :class="{
          'b-builder-layout__top-bar_down' : isContentVisible
      }"
      @backToLandings="backToLandings"
      @preview="$emit('preview', $event)"
      @export="$emit('export', $event)"
      @save="$emit('save', $event)"
      :landingName="$store.state.name"
      :builder="builder"
    />
    <div class="b-builder-layout-content">
      <div class="b-builder-layout-content__main-left-menu"
        :class="{'_expanded': isExpanded}"
      >
        <BuilderMainLeftMenu
          :builder="builder"
        />
      </div>
      <aside
        id="sidebar"
        class="b-builder-layout-content__sidebar"
        :class="{'b-builder-layout-content__sidebar_expanded': isExpanded}"
      >
        <BuilderSidebar
          :builder="builder"
          :isExpanded="isExpanded"
        />
      </aside>

      <main class="b-builder-layout-content__main"
        :class="{'b-builder-layout-content__main_expanded': isExpanded}"
      >
        <base-scroll-container
          backgroundBar="#fff">
          <div class="b-builder-layout-content__main-layout" :class="device">
            <slot></slot>
          </div>
        </base-scroll-container>

        <router-view :builder="builder"/>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BuilderMainLeftMenu from './BuilderMainLeftMenu'
import BuilderSidebar from './BuilderSidebar.vue'
import BuilderTopBar from './BuilderTopBar.vue'
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
    BuilderMainLeftMenu
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
  min-width: 800px
  height: 100vh
  min-height: 600px

  &__top-bar
    height: $topBarHeight
    background-color: $white

    position: absolute
    top: 0
    right: 0
    left: 0
    z-index: 1000

    transition: all .2s ease-out
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15)

.b-builder-layout-content
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0

  display: flex
  align-items: stretch
  justify-content: stretch

  width: 100%
  z-index: 0

  &__main-left-menu
    order: 1
    width: 5rem
    transition: width 0.3s ease-in-out
    &:hover,
    &._expanded
      width: 9rem

  &__sidebar
    width: 0
    position: relative
    padding: 6rem 0 0
    opacity: 0

    order: 2
    flex-shrink: 0
    transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out
    &_expanded
      opacity: 1
      width: 30.5rem
      display: flex
  &__main
    position: absolute
    top: $topBarHeight
    right: 0
    bottom: 0
    left: 5rem
    z-index: 10

    min-height: 5rem
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out
    background-color: $ligth-grey
    &:after
      content: ""
      position: absolute
      top: 0
      left: 0
      bottom: 0
      width: 0.8rem
      box-shadow: inset 2px 0 5px 0  rgba(0, 0, 0, 0.05)
      z-index: 20
    &_expanded
      left: 40.5rem

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

.b-builder-layout-content__main-left-menu:not(._expanded):hover ~ .b-builder-layout-content__main
  left: 9rem
</style>
