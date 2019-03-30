<script>
export default {
  props: {
    /* position dropdown menu */
    positionDropdown: {
      default: 'default',
      type: String,
      validator (value) {
        const values = [
          'default',
          'left',
          'right'
        ]
        return values.indexOf(value) !== -1
      }
    },
    arrow: {
      type: Boolean,
      default: false
    },
    onHover: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    showOptions: false,
    showOptionsHover: false
  }),
  computed: {
    menuListClasses () {
      const name = 'b-pth-base-dropdown-menu__dropdown'
      const classes = [`${name}_${this.positionDropdown}`]
      return classes
    }
  },
  methods: {
    selectOption (option) {
      this.$emit('input', option)
    },
    clickMenu () {
      this.showOptions = !this.showOptions
      this.showOptionsHover = false
    },
    menuMouseOut () {
      this.showOptionsHover = false
    },
    menuMouseOver () {
      if (this.onHover && !this.showOptions) {
        this.showOptionsHover = true
      }
    },
    closeMenu () {
      this.showOptions = false
      this.showOptionsHover = false
    }
  }
}
</script>

<template>
  <div class="l-pth-base-dropdown-menu"  @click="clickMenu" @mouseover="menuMouseOver" @mouseleave="menuMouseOut" v-click-outside="closeMenu">
    <div class="b-pth-base-dropdown-menu">
      <div class="b-pth-base-dropdown-menu__container">
        <slot></slot>
      </div>
      <div class="b-pth-base-dropdown-menu__dropdown b-pth-base-dropdown-menu__dropdown_click" :class="menuListClasses" v-if="showOptions && onClick">
        <div class="b-pth-base-dropdown-menu__list">
          <div class="b-pth-base-dropdown-menu__list-padd">
            <slot name="list"></slot>
          </div>
        </div>
      </div>
      <div class="b-pth-base-dropdown-menu__dropdown" :class="menuListClasses" v-if="showOptionsHover">
        <div class="b-pth-base-dropdown-menu__list">
          <div class="b-pth-base-dropdown-menu__list-padd">
            <slot name="listHover"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.l-pth-base-dropdown-menu
  display: inline-block
  vertical-align: middle

.b-pth-base-dropdown-menu
  $self: &
  display: flex

  position: relative
  width: 100%
  height: 2.5rem

  background-color: transparent
  font-family: Lato, Helvetica, Arial, sans-serif
  cursor: pointer
  & *
    user-select: none
  &__container
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
  &__arrow
    width: 0.8rem
    height: 0.4rem
  &__icon
    margin: 0
    display: block !important
    &_up
      transform: rotate(-180deg)
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  &__dropdown
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    max-height: 18rem
    border-top: none
    position: absolute
    top: 100%
    z-index: 10
    margin: 0
    padding: 0
    background-color: $white
    box-shadow: 0 0.6rem 2.4rem 0 rgba(0, 0, 0, 0.15)
    &_default
    &_left
      left: 0
      #{$self}__list
        &:before,
        &:after
          left: 14%
    &_right
      right: 0
      #{$self}__list
        &:before,
        &:after
          left: 87%
  &__list
    text-align: left
    position: relative
    &:before
      content: ""
      position: absolute
      width: 1.5rem
      height: 1.5rem
      top: -0.75rem
      left: 50%
      margin-left: -0.75rem
      background: $white
      transform: rotate(-45deg)
      z-index: 2
    &:after
      content: ""
      position: absolute
      width: 1.5rem
      height: 1.5rem
      top: -0.75rem
      left: 50%
      margin-left: -0.75rem
      background: $white
      transform: rotate(-45deg)
      box-shadow: 0 0 2rem 0 rgba($black, 0.35)
      z-index: -1

    &-padd
      background-color: $white
      padding: 1rem
      margin: 0
      position: relative
      z-index: 3
    & ul
      padding: 0
      margin: 0 -1rem
    & li
      display: flex
      align-items: center
      position: relative

      width: 100%
      height: $size-step*1.5
      padding: 0 $size-step

      color: $dark-grey

      white-space: nowrap
      list-style: none
      &._label > label
        display: flex
        align-items: center

        padding: 0 $size-step
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0

        cursor: pointer
        & > input
          cursor: pointer
      &:hover
        background-color: $blue-krayola
        color: $dark-blue-krayola
        & svg
          fill: $dark-blue-krayola
      & svg
        margin: 0 $size-step 0 0
      &._right-icon
       & svg
        margin: 0 0 0 $size-step
  &__options
    margin: 0
    padding: 0
    min-height: 6rem
    background: #fff
    &-item
      padding: 0 1.2rem
      height: 3.2rem
      line-height: 2.8rem
      font-size: 1.6rem
      list-style: none
      color: #272727
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      &:last-child
        border-bottom: none
      &:hover
        background-color: rgba(11, 153, 255, 0.25)

</style>
