<template>
  <div class="b-menu-subitem"
    :class="{'b-menu-subitem_selected': isSelected}"
    @click="$emit('click', $event)">
    <div class="b-menu-subitem__inner">
      <span class="b-menu-subitem__drag-icon">
        <IconBase
          slot="icon"
          name="drag" />
      </span>

      <span class="b-menu-subitem__title">
        <slot></slot>
      </span>

      <span class="b-menu-subitem__selected-icon">
        <IconBase
          name="arrowRight"
          width="8"
          height="14"
          color="transparent"
          strokeColor="rgba(255,255,255,0.24)"
          />
      </span>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSubitem',

  props: {
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
$selected-bg-color: rgba(#202020, 0.35)

.b-menu-subitem
  cursor: pointer
  color: #474747
  font-size: 1.4rem
  padding: 0.4rem

  &:hover:not(.b-menu-subitem_selected)
    background: rgba(#202020, 0.08)

  &__inner
    display: flex
    align-items: center
    height: 4.8rem
    border-radius: 0.2rem

    .b-menu-subitem_selected &
      background: #4D7DD8
      color: #ffffff

  &__drag-icon
    visibility: hidden
    width: 3.2rem
    padding-left: 0.1rem

    .b-menu-subitem:hover &
      visibility: visible

  &__title
    flex-grow: 1

  &__selected-icon
    visibility: hidden
    margin-right: 1.8rem

    .b-menu-subitem_selected &
      visibility: visible

</style>
