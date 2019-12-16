<script>
import _ from 'lodash-es'

export default {
  name: 'BaseFieldsetItem',

  props: {
    size: {
      type: [String, Number],
      default: 1,
      validator (value) {
        return _.inRange(value, 1, 4)
      }
    }
  }
}
</script>

<template>
  <div class="b-base-fieldset-item" :class="`b-base-fieldset-item_size-${size}`">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.b-base-fieldset-item
  & + &
    margin-left: 1.8rem

  &_size-1
    flex-grow: 1
  &_size-2
    flex-grow: 2
  &_size-3
    flex-grow: 3
  &_size-4
    flex-grow: 4
</style>
