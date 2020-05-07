<template>
  <div class="b-base-number-input"
       :class="{'b-base-number-input_error': hasError}">
    <label class="b-base-number-input__label">

      <base-label v-if="label || $slots.label" :hasError="hasError" :hasFocus="hasFocus">
        {{label}}
        <slot name="label"></slot>
      </base-label>

      <input
        class="b-base-number-input__input"
        :class="{'_no-unit': unit === ''}"
        type="number"
        v-bind="$attrs"
        v-model="innerValue"
        :placeholder="placeholder"
        @input="$emit('input', innerValue)"
        @focus="$emit('focus', $event), hasFocus = true"
        @blur="$emit('blur', $event), hasFocus = false"
        :disabled="disabled"
      />

      <span class="b-base-number-input__unit" v-if="unit !== ''">
        {{ unit }}
      </span>

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
      type: Number,
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
    unit: {
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
.b-base-number-input
  font-size: 1.4rem
  line-height: 3.4rem
  width: 100%

  &_error
    color: #FF3737

  &__label
    display: block
    position: relative

  &__unit
    position: absolute
    top: 0
    bottom: 0
    right: 0

    font-size: 1.3rem
    line-height: 3.4rem
    padding: 0 0.6rem

  &__input
    width: 100%
    height: 3.4rem
    padding: 0 2rem 0 .5rem
    position: relative

    color: #575A5F
    font-size: 1.3rem
    line-height: 6.4rem
    letter-spacing: 0.065em
    text-align: center

    border: 2px solid #BDBDBD
    border-radius: 5px
    transition: border-color 0.1s ease
    background: transparent

    -moz-appearance: textfield

    &._no-unit
      padding: 0 1rem 0 1rem

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0

    .b-base-number-input_error &
      border-color: #FF3737

    &:hover
      border-color: rgba(#0B99FF, 0.8)

    &:focus
      outline: none
      border-color: $main-green

    &:disabled
      border-color: transparent
      color: #888888
      cursor: not-allowed

</style>
