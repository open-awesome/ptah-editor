<template>
  <div class="menu-item">
    <div
      class="b-menu-item-inner"
      :class="{
        'b-menu-item-inner_selected': isSelected,
        'b-menu-item-inner_expandable': isExpandable
      }"
      @click="$emit('click', $event)">

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
.b-menu-item-inner
  height: 5.6rem
  display: flex
  align-items: center
  justify-content: space-between
  cursor: pointer
  color: #474747
  padding: 0 1.3rem 0 3.2rem
  background: linear-gradient(0deg, #F0F0F0, #F0F0F0), linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), #587FEE
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.08), inset 0px 1px 0px rgba(0, 0, 0, 0.08)

  &:hover
    background: rgba(#202020, 0.08)

  &_selected:not(.b-menu-item-inner_expandable)
    background: #4D7DD8
    color: #ffffff

  &_selected.b-menu-item-inner_expandable
    background: #D5DFF3

  &__title
    margin-top: 0.2rem
    font-size: 1.6rem
    line-height: 1.8rem
    font-weight: bold

  &__icon
    width: 3.2rem
    display: flex

</style>
