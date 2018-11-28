<script>
import VueScrollbar from 'vue2-scrollbar'
require('vue2-scrollbar/dist/style/vue2-scrollbar.css')

export default {
  components: {
    VueScrollbar
  },
  props: {
    styling: {
      type: Object
    },
    backgroundBar: {
      type: String
    }
  },
  computed: {
    cssProps () {
      return {
        '--bg-color': this.backgroundBar
      }
    }
  }
}
</script>

<template>
  <vue-scrollbar class="b-scroll-bar" :style="[styling, cssProps]">
    <slot></slot>
  </vue-scrollbar>
</template>

<style lang="sass">
.vue-scrollbar
  &__wrapper
    background: transparent
  &__scrollbar-vertical
    width: 0.4rem
    height: 92%
    top: 0.4rem
    bottom: 0.4rem
    right: 0.4rem
    & .scrollbar
      width: 0.4rem
      border-radius: 0.4rem

.b-scroll-bar
  & .scrollbar
    background-color: var(--bg-color)
</style>
