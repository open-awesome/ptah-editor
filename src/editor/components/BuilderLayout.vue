<template>
  <div class="b-builder-layout">
    <div class="b-builder-layout__top-bar">
    </div>
    <div class="b-builder-layout-content">
      <main class="b-builder-layout-content__main">
        <slot></slot>
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

export default {
  name: 'BuilderLayout',

  props: {
    builder: {
      required: true
    }
  },

  components: {
    BuilderSidebar
  },

  computed: {
    ...mapState('Sidebar', ['isExpanded'])
  },

  methods: {
    ...mapActions('Sidebar', ['toggleSidebar'])
  }
}
</script>

<style lang="sass" scoped>
.b-builder-layout
  &__top-bar
    height: 7.2rem

.b-builder-layout-content
  display: flex
  align-items: stretch

  &__sidebar
    order: 1
    width: 2rem
    flex-shrink: 0
    position: relative
    z-index: 20
    transition: width 0.3s ease-in-out

    &_expanded
      width: 24rem

  &__main
    order: 2
    flex-grow: 1
    position: relative
    z-index: 10
</style>
