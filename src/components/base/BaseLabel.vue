<template>
  <div class="b-base-label"
    :class="{'b-base-label_error': hasError, 'b-base-label_focus': hasFocus}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hasError: {
      type: Boolean,
      default: false
    },

    hasFocus: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-base-label
  font-size: 1.3rem
  line-height: 1.9rem
  color: $main-green
  letter-spacing: 0.065em
  font-weight: bold
  text-transform: uppercase

  padding: 0 0 2.2rem 0
  display: inline-block

  transition: color 0.1s ease
  &_focus
    color: rgba(#747474, 0.5)
  &_error
    color: #FF3737
</style>
