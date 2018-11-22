<template>
  <transition name="slide-fade" v-if="isOpened">
    <div class="b-base-dropdown">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseDropdown',

  props: {
    isOpened: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.b-base-dropdown
  overflow-y: auto;
  width: 100%

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
