<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon style
    </h6>

    <!-- Control icon -->
    <div class="b-panel__control">
      <control-text-with-icon-style></control-text-with-icon-style>
    </div>
  </div>
</template>

<script>
import ControlTextWithIconStyle from '../controls/TheControlIconWithTextStyle'

export default {
  name: 'ThePanelIconStyle',

  components: {
    ControlTextWithIconStyle
  }
}
</script>

<style lang="sass" scoped>
  @import '../../../assets/sass/_colors.sass'
  @import '../../../assets/sass/_variables.sass'

  .b-panel
    padding-bottom: 4.5rem
    display: flex
    flex-direction: column
    height: auto
    width: 100%
    align-items: stretch

    &__title
      color: $black
      font-size: 2rem
      font-weight: bold

      min-width: 28rem
      margin: 0 0 2.8rem 0
      padding: 0
      &:first-letter
        text-transform: uppercase

    &__control
      margin-bottom: 1.6rem
</style>
