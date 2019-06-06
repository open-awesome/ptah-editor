<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Text
    </h6>

    <!-- Typography -->
    <div class="b-panel__control">
      <control-typography :show-text-styles="false"></control-typography>
    </div>

    <!-- Align -->
    <div class="b-panel__control">
      <control-align/>
    </div>

    <!-- Text Link -->
    <div class="b-panel__control">
      <control-text-link></control-text-link>
    </div>

    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import ControlTypography from '../controls/TheControlTypography'
import ControlAlign from '../controls/TheControlAlign'
import ControlTextLink from '../controls/TheControlTextLink'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelText',

  components: {
    ControlBox,
    ControlTypography,
    ControlAlign,
    ControlTextLink
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
