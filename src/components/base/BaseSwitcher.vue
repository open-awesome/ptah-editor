<script>
export default {
  name: 'BaseSwitcher',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      default: false,
      required: true
    },
    disabled: {
      default: false
    }
  },
  methods: {
    emitChange (event) {
      this.$emit('change', event.target.checked)
    }
  },
  computed: {
    classObject () {
      const { value, disabled } = this
      return {
        'b-base-switcher_checked': value,
        'b-base-switcher_disabled': disabled
      }
    }
  }
}
</script>

<template>
  <div class="b-base-switcher" :class="classObject">
    <div class="b-base-switcher__label" v-if="$slots.label || label">
      <slot name="label"></slot>
      {{label}}
    </div>
    <div class="b-base-switcher-core" :class="classObject">
      <input class="b-base-switcher-core__checkbox"
        type="checkbox"
        :disabled="disabled"
        :checked="value"
        @change="emitChange">

      <span class="b-base-switcher-core__body"></span>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-base-switcher
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center

  &__label
    color: $dark-grey
    font-size: 1.6rem
    &:first-letter
      text-transform: uppercase

  &_checked
    .b-base-switcher-core
      background: $emerald-green
    .b-base-switcher-core__body:after
      transform: translateX(2rem)

  &:hover
    .b-base-switcher-core
      box-shadow: 0px 0px 4px rgba($emerald-green, 0.8)

  &_disabled
    background: #fff
    cursor: default

    .b-base-switcher__label
      color: #CDCDCD

    .b-base-switcher-core__body:after
      background: transparent
      border: 1px solid #e2e2e2
      box-shadow: none

    .b-base-switcher-core-texts__on,
    .b-base-switcher-core-texts__off
      color: rgba(#CDCDCD, 0.5)

.b-base-switcher-core
  position: relative
  display: inline-block
  margin: 0
  height: 2.4rem
  min-height: 2.4rem
  width: 4.4rem
  min-width: 4.4rem
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.12)
  border-radius: 100px
  background: linear-gradient(180deg, $grey 0%, rgba($grey-middle, 0) 100%), #ECECEC

  &__checkbox
    opacity: 0
    width: 100%
    height: 100%
    position: absolute
    margin: 0
    z-index: 1
    cursor: pointer

  &__body
    padding-right: 0.4rem
    display: flex
    align-items: center
    justify-content: flex-start
    position: relative
    cursor: pointer
    height: 100%
    width: 100%

    &:after
      content: ''
      height: 1.6rem
      width: 1.6rem
      border-radius: 100px
      display: block
      cursor: pointer
      background: linear-gradient(180deg, $white 0%, rgba(255, 255, 255, 0) 100%), #ECECEC
      box-shadow: 0px 2px 4px rgba($black, 0.15)
      transition: transform 0.2s ease, background-color 0.2s ease-in
      margin: 0 0 0 $size-step/8
</style>
