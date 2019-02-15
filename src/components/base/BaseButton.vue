<script>
export default {
  props: {
    /* variant button */
    color: {
      default: 'default',
      type: String,
      validator (value) {
        const values = [
          'black',
          'blue',
          'gray',
          'light-gray',
          'orange',
          'transparent'
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
          'small'
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
  font-family: 'Roboto', Helvetica, Arial, sans-serif
  font-size: 1.6rem
  line-height: 2.4

  margin: 0.4rem
  border-radius: 1000px
  border: 0.2rem transparent solid

  transition: all .3s cubic-bezier(.2,.85,.4,1.275)
  outline: none
  =active
    background-color: $dark-blue-krayola
    border-color: $dark-blue-krayola
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
    border-color: $dark-blue-krayola
  &_default
    width: 20.8rem
  &_middle
    width: 11rem
    font-size: 1.4rem
  &_small
    font-size: 1.2rem
    line-height: 2
    width: 8rem
    height: auto
  &_pressed
    +active
  &_black
    color: #eee
    background-color: $dark-grey
  &_blue
   +active
  &_gray
    color: $dark-blue-krayola
    border: 0.2rem rgba($black, 0.1) solid
  &_light-gray
    color: $white
    background-color: rgba($white, 0.1)
    border: 0.2rem rgba($white, 0.1) solid
  &_orange
    color: #fff
    background-color: $orange
    border-radius: .4rem
    &:hover
      background-color: $orange !important
      border-color: $orange !important
      opacity: .8
  &_transparent
    background-color: transparent
</style>
