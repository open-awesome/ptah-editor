<template>
  <div class="b-base-text-field"
    :class="{
    'b-base-text-field_error': hasError,
    'b-base-text-field_focus': hasFocus,
    'b-base-text-field_filled': innerValue.length > 0
    }">
    <label class="b-base-text-field__label" v-if="label || $slots.label" :hasError="hasError" :hasFocus="hasFocus">
      {{label}}
      <slot name="label"></slot>
    </label>

    <input class="b-base-text-field__input" type="text"
       ref="inputText"
       v-bind="$attrs"
       v-model="innerValue"
       :placeholder="placeholder"
       @input="$emit('input', innerValue)"
       @focus="$emit('focus', $event), hasFocus = true"
       @blur="$emit('blur', $event), hasFocus = false" />

    <base-error-text v-if="hasError">
      {{errorText}}
      <slot name="error"></slot>
    </base-error-text>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  watch: {
    value (value) {
      this.innerValue = value
    }
  },

  data () {
    return {
      innerValue: this.value,
      hasFocus: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_variables.sass'
.b-base-text-field
  $this: &

  font-size: 1.3rem
  line-height: 1.7rem
  width: 100%
  color: $dark-grey
  position: relative

  &_error
    color: $red-violet
    #{$this}__input
      border-color: $red-violet

  &_focus
    color: $main-green
    #{$this}__input
      border: 2px solid $main-green

  &__label
    color: $dark-grey
    font-size: 1.2rem
    line-height: 1.6rem
    margin-bottom: .82rem
    display: block
    position: relative

  &__input
    width: 100%
    height: 3.5rem
    padding: 0 1.2rem
    color: $dark-grey
    border: 1px solid rgba(162, 165, 165, 0.7)
    font-size: 1.6rem
    border-radius: 4px
    transition: all .4s cubic-bezier(.25,.8,.25,1)

    &::placeholder
      font-size: 1.2rem
      color: rgba(162, 165, 165, 0.7)

    &:focus
      outline: none

    &:disabled
      border-color: transparent
      color: #888888
      cursor: pointer

</style>
