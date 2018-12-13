<template>
    <div class="b-text">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Description'
}
</script>

<style lang="sass" scoped>
.b-text-one
  color: #000
  font-family: Helvetica, Arial, sans-serif
  width: 100%
  position: relative
  text-align: center
  min-height: 17rem
  font-size: 1.4rem
  line-height: 1.4
  display: block
  max-width: 100rem
  margin: 1.6rem
  &::selection, & ::selection
    color: #ff0
    background: #000
</style>
