<template>
  <div class="b-builder-layout">
    <div class="b-builder-layout__top-bar">
      <BuilderTopBar
        @setDevice="setDevice"
        @backToLandings="backToLandings"
        @preview="$emit('preview', $event)"
        @export="$emit('export', $event)"
        ></BuilderTopBar>
    </div>
    <div class="b-builder-layout-content">
      <main class="b-builder-layout-content__main">
        <div class="b-builder-layout-content__main-layout" :class="device">
          <slot></slot>
        </div>
      </main>
      <aside
        class="b-builder-layout-content__sidebar"
        :class="{'b-builder-layout-content__sidebar_expanded': isExpanded}">

        <BuilderSidebar
          :builder="builder"
          :isExpanded="isExpanded"
          @toggleSidebar="toggleSidebar"
          ></BuilderSidebar>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderSidebar from './BuilderSidebar.vue'
import BuilderTopBar from './BuilderTopBar.vue'

export default {
  name: 'BuilderLayout',

  data: () => ({
    device: 'desktop'
  }),

  props: {
    builder: {
      required: true
    }
  },

  components: {
    BuilderSidebar,
    BuilderTopBar
  },

  computed: {
    ...mapState('Sidebar', ['isExpanded'])
  },

  methods: {
    ...mapActions('Sidebar', ['toggleSidebar']),
    backToLandings () {
      this.$router.push({ path: `/dashboard` })
    },
    setDevice (device) {
      this.device = device
    }
  }
}
</script>

<style lang="sass" scoped>
.b-builder-layout
  &__top-bar
    height: 7.2rem
    width: 100%
    height: 7.2rem
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

  &__sidebar
    order: 1
    width: 2rem
    flex-shrink: 0
    width: 2rem
    min-height: 5rem
    position: relative
    z-index: 20
    transition: width 0.3s ease-in-out

    &_expanded
      width: 24rem

  &__main
    order: 2
    flex-grow: 1
    min-height: 5rem
    margin: 7.2rem 0
    position: relative
    z-index: 10

    &-layout
      transition: width 0.2s
      margin: 0 auto
      &.is-desktop
        width: 100%
      &.is-laptop
        width: 120rem
      &.is-mobile
        width: 37rem
</style>
