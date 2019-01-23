<script>
export default {
  props: {
    /* variant button */
    color: {
      default: 'black',
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
.b-pth-base-button
  border-radius: 0.4rem
  border: 0.2rem transparent solid
  outline: none
  transition: color .3s cubic-bezier(.2,.85,.4,1.275)
  font-size: 1.6rem
  line-height: 2.2
  margin: 0.4rem
  =active
    background-color: #436FEE
    border-color: #436FEE
    color: #fff
  &[disabled]
    cursor: not-allowed
    background-color: #b6b6b6
    border-color: #b6b6b6
    color: #b6b6b6
    > svg
      fill: #8f8686
  &:hover:not([disabled])
    cursor: pointer
    +active
  &_default
    width: 20.8rem
  &_middle
    width: 11rem
  &_small
    font-size: 1.2rem
    line-height: 2
    width: 8rem
    height: auto
  &_pressed
    +active
  &_black
    color: #eee
    background-color: #202020
  &_blue
   +active
  &_gray
    color: #888
    background-color: #383838
    border: 0.2rem rgba(0, 0, 0, 0.07) solid
  &_light-gray
    color: #474747
    background-color: #fafafa
    border: 0.2rem #fff solid
  &_orange
    color: $white
    background-color: $orange-dark
    border-radius: .4rem
    &:hover
      background-color: $orange-dark !important
      border-color: $orange-dark !important
      opacity: .8
  &_transparent
    background-color: transparent
</style>
