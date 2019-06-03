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
