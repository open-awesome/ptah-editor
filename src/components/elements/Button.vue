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
  text-decoration: none
  color: $black

  width: $size-step*5
  min-width: $size-step*2
  min-height: $size-step/2
  margin: $size-step/2

  background-color: #a7a1a1

  display: flex
  text-align: center
  justify-content: center
  flex-direction: column

  user-select: none
  cursor: pointer
  transition: background-color 200ms
  &:hover
    filter: brightness(120%)
  &:active
    filter: brightness(50%)
  .is-mobile &,
  .is-tablet &
    width: 90% !important
    margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px)
    &
      width: 90% !important
      margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px) and (min-height: 700px)
    &
      width: 60% !important
      margin: $size-step/2 auto !important
</style>
