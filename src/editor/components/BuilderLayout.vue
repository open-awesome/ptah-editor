<template>
  <div class="b-builder-layout">
    <div class="b-builder-layout__top-bar" :style="{'margin-right': `${fakeScrollbarWidth}px`}">
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
        <div class="b-builder-layout-content__main-layout" :class="device">
          <slot></slot>
        </div>
        <BuilderModalContent />
      </main>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    ...mapGetters('PageTweaks', ['fakeScrollbarWidth']),
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
.b-builder-layout
  &__top-bar
    height: 7.2rem
    max-width: 100vw
    background-color: #CDCDCD
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
    width: 2rem
    flex-shrink: 0
    min-height: 5rem
    position: relative
    z-index: 20
    transition: width 0.3s ease-in-out
    + .b-builder-layout-content__main
      width: calc(100% - 2rem)

    &_expanded
      width: 24rem
      + .b-builder-layout-content__main
        width: calc(100% - 24rem)

  &__main
    order: 2
    flex-grow: 1
    min-height: 5rem
    margin: 7.2rem 0
    position: relative
    z-index: 10
    transition: width 0.3s ease-in-out

    &-layout
      transition: width 0.2s
      margin: 0 auto
      position: relative
      z-index: 5

      &.is-desktop
        width: 100%
      &.is-laptop
        width: 120rem
        max-width: 100%
      &.is-mobile
        width: 37rem
        max-width: 100%
</style>
