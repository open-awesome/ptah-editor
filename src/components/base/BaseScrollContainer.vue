<script>
import Vuebar from 'vuebar'

export default {
  components: {
    Vuebar
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
  <div
    class="vuebar-element"
    v-bar="{ preventParentScroll: true, scrollThrottle: 30 }"
    :style="[styling, cssProps]">
    <div>
      <slot></slot>
    </div>
  </div>
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

.vuebar-element
  height: 100%
  width: 100%

.vb > .vb-dragger
  z-index: 5
  width: 1rem
  right: 0

.vb > .vb-dragger > .vb-dragger-styler
  -webkit-backface-visibility: hidden
  backface-visibility: hidden
  -webkit-transform: rotate3d(0,0,0,0)
  transform: rotate3d(0,0,0,0)
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  background-color: var(--bg-color)
  opacity: 0.5
  margin: 5px 5px 5px 0
  border-radius: 20px
  height: calc(100% - 10px)
  display: block

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler
  background-color: var(--bg-color)
  opacity: 0.3

.vb > .vb-dragger:hover > .vb-dragger-styler
  background-color: var(--bg-color)
  margin: 0px
  height: 100%
  opacity: 0.5

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler
  background-color: var(--bg-color)
  margin: 0px
  height: 100%
  opacity: 0.5

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler
  background-color: var(--bg-color)
  opacity: 0.5

.vb-content::-webkit-scrollbar
  display: none
  scrollbar-width: none

</style>
