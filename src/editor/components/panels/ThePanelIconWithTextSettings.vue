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
  name: 'ThePanelIconWithTextSettins',

  components: {
    ControlBox,
    ControlIconWithTextSettings
  }
}
</script>
