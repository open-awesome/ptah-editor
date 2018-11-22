<template>
  <div class="menu-item">
    <div
      class="b-menu-item-inner"
      :class="{
        'b-menu-item-inner_selected': isSelected,
        'b-menu-item-inner_expandable': isExpandable
      }"
      @click="$emit('click', $event)">

      <span class="b-menu-item-inner__icon">
        <slot name="icon"></slot>
      </span>

      <span class="b-menu-item-inner__title">
        <slot></slot>
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
  display: flex
  height: 5.6rem
  align-items: center
  cursor: pointer
  color: #474747
  padding-left: 3.2rem

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
