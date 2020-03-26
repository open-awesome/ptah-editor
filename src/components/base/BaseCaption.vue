<template>
  <div class="b-caption">
    <slot></slot>
    <span
      class="b-caption__help"
      :tooltip="help"
      tooltip-position="bottom"
    >
    <IconBase
      v-show="help !== ''"
      width="12"
      height="12"
      name="info"
      color="#FFCF0D"
    />
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseCaption',
  props: {
    help: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-caption
  font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif
  font-style: normal
  font-weight: bold
  font-size: 1.3rem
  line-height: 1.8rem
  letter-spacing: 0.065em
  text-transform: uppercase
  color: $main-green

  margin: 0 0 1.8rem 0

  width: 100%
  max-width: 24rem

  display: flex
  justify-content: flex-start
  align-items: center

  &__help
    width: 1.2rem
    margin: 0 0 0 1.2rem
    cursor: pointer
    position: relative
</style>
