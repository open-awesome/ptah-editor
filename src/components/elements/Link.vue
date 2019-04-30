<template>
    <a class="b-link is-editable">
      <slot></slot>
    </a>
</template>

<script>
export default {
  name: 'Link'
}
</script>

<style lang="sass" scoped>
.b-link
  position: relative
  font-size: 1.6rem
  font-family: 'Lato'
  line-height: 1.4
  color: #fff
  user-select: none
  cursor: pointer
  transition: background-color 200ms
  text-decoration: none
  display: inline-block
  &:hover
    filter: brightness(120%)
  &:active
    filter: brightness(50%)

</style>
