<template>
  <div class="b-base-text-field"
    :class="{'b-base-text-field_error': hasError}">
    <label>

      <base-label v-if="label" :hasError="hasError" :hasFocus="hasFocus">
        {{label}}
      </base-label>

      <input class="b-base-text-field__input" type="text"
        v-bind="$attrs"
        v-model="innerValue"
        @input="$emit('input', innerValue)"
        @focus="$emit('focus', $event), hasFocus = true"
        @blur="$emit('blur', $event), hasFocus = false" />

      <base-error-text v-if="hasError">
        {{errorText}}
        <slot name="error"></slot>
      </base-error-text>

    </label>
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
      type: String,
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
.b-base-text-field
  font-size: 1.4rem
  line-height: 1.7rem

  &_error
    color: #FF3737

  &__input
    background: transparent
    width: 100%
    height: 2.6rem
    color: #272727
    font-size: 1.6rem
    border: 0
    border-bottom: 1px solid #e2e2e2
    transition: border-color 0.1s ease

    .b-base-text-field_error &
      border-color: #FF3737

    &:focus
      outline: none
      border-color: #0B99FF

    &:disabled
      border-color: transparent
      color: #888888

</style>
