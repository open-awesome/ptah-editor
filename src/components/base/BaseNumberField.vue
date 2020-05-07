<template>
  <div class="b-base-number-field"
       :class="{'b-base-number-field_error': hasError}">
    <label class="b-base-number-field__label">

      <base-label v-if="label || $slots.label" :hasError="hasError" :hasFocus="hasFocus">
        {{label}}
        <slot name="label"></slot>
      </base-label>

      <input class="b-base-number-field__input" type="number"
        v-bind="$attrs"
        v-model="innerValue"
        :placeholder="placeholder"
        @input="$emit('input', innerValue)"
        @focus="$emit('focus', $event), hasFocus = true"
        @blur="$emit('blur', $event), hasFocus = false"
        :disabled="disabled"
      />

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
      type: Number,
      default: 0
    },
    maximum: {
      type: Number,
      default: Infinity,
      validator: function (value) {
        return value > 0
      }
    },
    minimum: {
      type: [String, Number],
      default: 0
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
    },
    /* is disabled */
    disabled: {
      default: false,
      type: Boolean
    }
  },

  watch: {
    value (value) {
      this.innerValue = value !== ''
        ? Math.min(Math.max(value, this.minimum), this.maximum)
        : 0
    },

    innerValue  (value) {
      let val = value !== ''
        ? Math.min(Math.max(value, this.minimum), this.maximum)
        : 0
      this.innerValue = val

      this.$emit('input', val)
    }
  },

  data () {
    return {
      innerValue: 0,
      hasFocus: false
    }
  },

  mounted () {
    this.innerValue = this.value !== ''
      ? Math.min(Math.max(this.value, this.minimum), this.maximum)
      : 0
  }
}
</script>

<style lang="sass" scoped>
.b-base-number-field
  font-size: 1.4rem
  line-height: 1.7rem
  width: 100%

  &_error
    color: #FF3737

  &__label
    display: block

  &__input
    background: transparent
    width: 100%
    height: 2.6rem
    color: #272727
    font-size: 1.6rem
    border: 0
    border-bottom: 1px solid #e2e2e2
    transition: border-color 0.1s ease
    -moz-appearance: textfield

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0

    &::placeholder
      color: #CDCDCD

    .b-base-number-field_error &
      border-color: #FF3737

    &:hover
      border-color: rgba(#0B99FF, 0.8)

    &:focus
      outline: none
      border-color: #0B99FF

    &:disabled
      border-color: transparent
      color: #888888
      cursor: not-allowed

</style>
