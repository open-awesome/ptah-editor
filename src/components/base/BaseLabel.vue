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
.b-base-label
  font-size: 1.4rem
  line-height: 1.7rem
  color: #888888
  margin-bottom: 0.6rem
  transition: color 0.1s ease

  &_focus
    color: rgba(#888888, 0.5)

  &_error
    color: #FF3737

</style>
