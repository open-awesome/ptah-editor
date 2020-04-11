<template>
  <div class="b-checklist-item" :class="{ 'active' : active }">
    <div class="b-checklist-item__mark">
      <icon-base name="checkMark" width="15"></icon-base>
    </div>
    <div class="b-checklist-item__text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckListItem',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
.b-checklist-item
  display: flex
  align-items: center
  margin-bottom: 1.5rem
  $this: &

  &.active
    #{$this}__mark
      background: $main-green
    #{$this}__text
      color: $main-green

  &__mark
    width: 2.6rem
    height: 2.6rem
    display: flex
    justify-content: center
    align-items: center
    border-radius: 50%

    background: #CACBCB

    svg
      fill: #fff

  &__text
    font-size: 1.2rem
    font-weight: bold
    letter-spacing: 0.065em
    line-height: 1.6rem
    text-transform: uppercase
    margin-left: 1.5rem

    color: #CACBCB
</style>
