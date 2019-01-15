<template>
  <div class="b-title is-editable">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style lang="sass" scoped>
.b-title
  color: #000
  font-family: 'Lato'
  position: relative
  text-align: center
  display: flex
  align-items: center
  font-size: 2.5rem
  line-height: 1.4
  margin: 1.6rem
  display: block
  &.is-editable
    border: 1px dashed #18d88b
  &::selection, & ::selection
    color: #ff0
    background: #000
</style>
