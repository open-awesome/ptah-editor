<template>
  <div class="menu-item">
    <div
      class="b-menu-item-inner">

      <span class="b-menu-item-inner__title">
        <slot></slot>
      </span>

      <span class="b-menu-item-inner__icon">
        <slot name="icon"></slot>
      </span>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',

  props: {
    /**
     * Configurates selected item color
     * Items with expandable menus and plain openers looks different
     */
    isExpandable: {
      type: Boolean,
      default: false
    },

    /**
     * Configurates selected item view
     */
    isSelected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-menu-item-inner
  height: 5.6rem
  display: flex
  align-items: center
  justify-content: space-between
  cursor: pointer
  color: $white
  padding: 0 $size-step/2

  &__title
    margin-top: 0.2rem
    font-size: 2rem
    line-height: 2rem
    letter-spacing: -0.02em

  &__icon
    width: 3.2rem
    display: flex

</style>
