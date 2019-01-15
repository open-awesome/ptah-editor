<template>
    <a class="b-button is-editable">
      <slot></slot>
    </a>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style lang="sass" scoped>
.b-button
  position: relative
  font-size: 3rem
  font-family: 'Lato'
  line-height: 1.4
  width: 20rem
  min-width: 6.4rem
  min-height: 2rem
  margin: 1.6rem
  color: #000
  background-color: #a7a1a1
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  user-select: none
  cursor: pointer
  transition: background-color 200ms
  text-decoration: none
  &.is-editable
    border: 1px dashed #18d88b
  &:hover
    filter: brightness(120%)
  &:active
    filter: brightness(50%)

</style>
