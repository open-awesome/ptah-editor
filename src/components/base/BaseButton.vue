<script>
export default {
  props: {
    /* variant button */
    color: {
      default: 'default',
      type: String,
      validator (value) {
        const values = [
          'default',
          'black',
          'blue',
          'gray',
          'gray-full',
          'light-gray',
          'orange',
          'transparent',
          'white'
        ]
        return values.indexOf(value) !== -1
      }
    },
    /* size button */
    size: {
      default: 'default',
      type: String,
      validator (value) {
        const values = [
          'default',
          'middle',
          'small',
          'circle'
        ]
        return values.indexOf(value) !== -1
      }
    },
    /* transparent button */
    transparent: {
      default: false,
      type: Boolean
    },
    /* type button */
    type: {
      default: 'button',
      type: String,
      validator (value) {
        const values = ['button', 'submit', 'reset']
        return values.indexOf(value) !== -1
      }
    },
    /* is presset button */
    pressed: {
      default: false,
      type: Boolean
    },
    /* is disabled */
    disabled: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    btnClasses () {
      const name = 'b-pth-base-button'
      const classes = [`${name}_${this.color}`, `${name}_${this.size}`]
      if (this.pressed) {
        classes.push(name + '_pressed')
      }
      if (this.transparent) {
        classes.push(name + '_transparent')
      }
      return classes
    }
  }
}
</script>

<template>
  <button class="b-pth-base-button"
    :class="btnClasses"
    :type="type"
    :disabled="disabled"
    :transparent="transparent"
    @click="$emit('click', $event)"
    >
    <slot></slot>
  </button>
</template>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-pth-base-button
  font-family: 'Lato', Helvetica, Arial, sans-serif
  font-size: 1.6rem
  line-height: 0
  padding: 1.8rem 0

  margin: 0.4rem
  border-radius: 1000px
  border: 0.2rem transparent solid

  transition: all .3s cubic-bezier(.2,.85,.4,1.275)
  outline: none
  =active
    background-color: $main-green
    border-color: $main-green
    color: $white
  &[disabled]
    cursor: not-allowed
    background-color: rgba($white, 0.1)
    border-color: rgba($white, 0.1)
    color: rgba($white, 0.1)
    > svg
      fill: rgba($white, 0.1)
  &:hover:not([disabled])
    cursor: pointer
    border-color: $blue
  &_default
    width: 20.8rem
  &_middle
    width: 11rem
    font-size: 1.4rem
    padding: 1.4rem 0
  &_small
    font-size: 1.2rem
    padding: 1rem 0
    width: 8rem
    height: auto
  &_circle
    width: 4rem
    height: 4rem
    border-radius: 100%
  &_pressed
    +active
  &_black
    color: #eee
    background-color: $dark-grey
  &_blue
   +active
  &_gray
    background: $white
    color: $main-green
    border: 0.2rem rgba($black, 0.1) solid
    border: 0.2rem rgba($black, 0.1) solid
  &_gray-full
    color: rgba($black, 0.1)
    border: 0.2rem rgba($black, 0.1) solid
    & svg
      fill: rgba($black, 0.1) !important
    &:hover,
    &:active
      color: $main-green
      border: 0.2rem $main-green solid
      & svg
        fill: $main-green !important
  &_light-gray
    color: $white
    background-color: rgba($white, 0.1)
    border: 0.2rem rgba($white, 0.1) solid
  &_orange
    color: #fff
    background-color: $orange-down500
    border-radius: .4rem
    &:hover
      background-color: $orange-down200 !important
      border-color: $orange-down200 !important
      opacity: .8
  &_transparent
    background-color: transparent
  &_white
    border: 0.2rem white solid
    color: $main-green
    background: $white
    box-shadow: 0px 4px 16px rgba($black, 0.25)
    &:hover
      border: 0.2rem $main-green solid
</style>
