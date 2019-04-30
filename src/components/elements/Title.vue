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

<style lang="sass">
.b-title
  color: #000

  font-family: 'Lato'
  font-size: 2.4rem
  line-height: 1.4
  text-align: center
  text-transform: uppercase

  position: relative
  display: block

  &::selection, & ::selection
    color: #ff0
    background: #000
  &::selection, & ::selection
    color: #ff0
    background: #000
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    padding: 0 1rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      padding: 0 1rem
</style>
