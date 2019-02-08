<template>
  <div class="b-builder-layout">
    <div class="b-builder-layout__top-bar">
      <BuilderTopBar
        @setDevice="setDevice"
        @backToLandings="backToLandings"
        @preview="$emit('preview', $event)"
        @export="$emit('export', $event)"
        @save="$emit('save', $event)"
        :landingName="builder.landing"
        ></BuilderTopBar>
    </div>
    <div class="b-builder-layout-content">

      <aside
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
        <BuilderModalContent />
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

  data () {
    return {
      device: 'is-desktop'
    }
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
    ...mapState('Sidebar', ['isExpanded'])
  },

  methods: {
    backToLandings () {
      this.$router.push({ path: `/dashboard` })
    },
    setDevice (device) {
      this.device = device
      setTimeout(function () {
        sectionsGroups()
      }, 300)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-builder-layout
  &__top-bar
    height: 8rem
    max-width: 100vw
    background-color: $white
    position: fixed
    top: 0
    right: 0
    left: 0
    z-index: 999

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
        width: calc(100% - ($size-step*10))

  &__main
    order: 2
    flex-grow: 1
    min-height: 5rem
    margin: 8rem 0 0
    position: relative
    z-index: 10
    transition: width 0.3s ease-in-out
    background-color: $ligth-grey

    &-layout
      transition: width 0.2s
      margin: 0 auto
      position: relative
      z-index: 5
      height: calc(100vh - 7.2rem)

      &.is-desktop
        width: 100%
      &.is-laptop
        width: 120rem
        max-width: 100%
      &.is-mobile
        width: 37rem
        max-width: 100%
</style>
