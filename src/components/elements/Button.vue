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
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-button
  position: relative
  font-size: 3rem
  font-family: 'Lato'
  line-height: 1.4
  width: 20rem
  min-width: 6.4rem
  min-height: 2rem
  margin: 1.6rem
  color: $black
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
  .is-mobile &,
  .is-tablet &
    width: 90% !important
    margin: $size-step/2 auto
  @media only screen and (max-width: 768px)
    &
      width: 90% !important
      margin: $size-step/2 auto
  @media only screen and (max-width: 768px) and (min-height: 700px)
      &
        width: 60% !important
        margin: $size-step/2 auto
</style>
