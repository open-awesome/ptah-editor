<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon settings
    </h6>

    <!-- Control icon -->
    <div class="b-panel__control">
      <control-icon-with-text-settings/>
    </div>

    <div class="b-panel__control">
      <control-box/>
    </div>
  </div>
</template>

<script>
import ControlIconWithTextSettings from '../controls/TheControlIconWithTextSettings'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelIconSettins',

  components: {
    ControlBox,
    ControlIconWithTextSettings
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
      margin-bottom: 4rem
</style>
