<script>
import _ from 'lodash'

export default {
  name: 'BaseFieldsetRow',

  props: {
    width: {
      type: String,
      default: 'default',
      validator (value) {
        const allowed = ['default', 'short', 'wide']
        return _.includes(allowed, value)
      }
    }
  }
}
</script>

<template>
  <div class="b-base-fieldset-row"  :class="`b-base-fieldset-row_${width}`">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.b-base-fieldset-row
  display: flex
  justify-content: space-between

  & + &
    margin-top: 3.5rem

  &_default
    width: 32rem

  &_short
    width: 17.5rem

  &_wide
    width: 54.5rem
</style>
