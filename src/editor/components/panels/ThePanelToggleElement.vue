<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Toggle settings
    </h6>

    <!-- Typography -->
    <div class="b-panel__control">
      <control-typography :show-text-styles="false"></control-typography>
    </div>

    <!-- Align -->
    <div class="b-panel__control">
      <control-align/>
    </div>

    <!-- Control settings-->
    <div class="b-panel__control">
      <control-toggle-element-settings/>
    </div>

    <!-- Control padding/margin-->
    <div class="b-panel__control">
      <control-box/>
    </div>

  </div>
</template>

<script>
import ControlToggleElementSettings from '../controls/TheControlToggleElementSettings'
import ControlTypography from '../controls/TheControlTypography'
import ControlAlign from '../controls/TheControlAlign'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelToggleElement',

  components: {
    ControlToggleElementSettings,
    ControlBox,
    ControlTypography,
    ControlAlign
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
      margin-bottom: 2.2rem
</style>
