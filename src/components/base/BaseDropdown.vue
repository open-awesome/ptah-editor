<template>
  <div class="b-base-dropdown">
    <slide-up-down :active="isOpenedInner" :duration="200">
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
    }
  },

  watch: {
    isOpened (value) {
      this.isOpenedInner = value
    }
  },

  data () {
    return {
      isOpenedInner: false
    }
  },

  mounted () {
    // We need this to fix dropdown height when it's opened right from the start
    // it happens because SlideUpDown gets height before all the interface is painted
    this.$nextTick(() => {
      this.isOpenedInner = this.isOpened
    })
  }
}
</script>

<style lang="sass" scoped>
.b-base-dropdown
  overflow-y: auto
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
