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
  font-family: Helvetica, Arial, sans-serif
  position: relative
  text-align: center
  display: flex
  align-items: center
  font-size: 2.5rem
  margin: 1.6rem
  display: block
  &::selection, & ::selection
    color: #ff0
    background: #000
</style>
