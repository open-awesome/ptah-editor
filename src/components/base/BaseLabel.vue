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
  font-size: 1.2rem
  line-height: 1.2rem
  color: rgba(#575A5F, 0.87)

  padding: 0 0 .9rem 0
  display: inline-block

  transition: color 0.1s ease
  &_focus
    color: rgba(#747474, 0.5)
  &_error
    color: #FF3737
</style>
