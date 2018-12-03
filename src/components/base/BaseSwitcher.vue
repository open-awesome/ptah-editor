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
        'b-base-switcher-core_checked': value,
        'b-base-switcher-core_disabled': disabled
      }
    }
  }
}
</script>

<template>
  <label class="b-base-switcher">
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
      <span class="b-base-switcher-core-texts">
        <span class="b-base-switcher-core-texts__on">ON</span>
        <span class="b-base-switcher-core-texts__off">OFF</span>
      </span>
    </div>
  </label>
</template>

<style lang="sass" scoped>
.b-base-switcher
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  cursor: pointer

  &__label
    color: #272727
    font-size: 1.6rem

.b-base-switcher-core
  position: relative
  display: inline-block
  margin: 0
  height: 3.2rem
  width: 8.8rem
  background-color: #F5F8FF
  border: 1px solid #e2e2e2
  border-radius: 1.6rem
  user-select: none

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
    justify-content: flex-end
    position: relative
    cursor: pointer
    height: 100%
    width: 100%

    &:after
      content: ''
      height: 2.4rem
      width: 4rem
      border-radius: 100px
      display: block
      cursor: pointer
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)
      background-color: #fff
      transition: transform 0.2s ease, background-color 0.2s ease-in

  &-texts
    position: absolute
    display: flex
    justify-content: space-around
    align-items: center
    z-index: 1
    left: 0.4rem
    right: 0.4rem
    top: 0.2rem
    bottom: 0
    color: #CDCDCD
    font-size: 1.2rem
    font-weight: bold

    &__on

    &__off
      color: #747474

  &_checked
    .b-base-switcher-core__body:after
      background-color: #99D848
      transform: translateX(-3.9rem);

    .b-base-switcher-core-texts__on
      color: #fff

  &_disabled
    background: #fff
    cursor: default

    .b-base-switcher-core__body:after
      background: transparent
      border: 1px solid #e2e2e2
      box-shadow: none

    .b-base-switcher-core-texts__on,
    .b-base-switcher-core-texts__off
      color: rgba(#CDCDCD, 0.5)
</style>
