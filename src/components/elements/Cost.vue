<template>
    <div class="b-cost is-editable">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'ProductCost'
}
</script>

<style lang="sass" scoped>
.b-cost
  color: #e4a11e
  font-family: 'Lato'
  position: relative
  text-align: center
  font-size: 4rem
  line-height: 1.4
  display: block
  margin: 1.6rem
  &::selection,
  & ::selection
    color: #ff0
    background: #000
</style>
