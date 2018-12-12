<template>
  <div class="b-title"></div>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style lang="sass" scoped>
.b-title-one
  color: #000
  font-family: Helvetica, Arial, sans-serif
  width: 100%
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
