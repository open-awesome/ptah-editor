<template>
  <div class="b-base-dropdown" :class="{ 'visible': hasOverflow }">
    <slide-up-down :active="isOpened" :duration="200">
      <slot></slot>
    </slide-up-down>
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
export default {
  name: 'BaseDropdown',

  components: {
    SlideUpDown
  },

  props: {
    isOpened: {
      type: Boolean,
      required: true
    },
    hasOverflow: {
      type: Boolean
    }
  }
}
</script>

<style lang="sass" scoped>
.b-base-dropdown
  overflow-y: auto
  width: 100%
  &.visible
    overflow: visible !important
    /deep/
      > div
        overflow: visible !important

// Animations down here
.slide-fade
  &-enter-active
    transition: all .2s ease

  &-leave-active
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  &-enter,
  &-leave-to
    transform: translateX(-0.8rem)
    opacity: 0
</style>
