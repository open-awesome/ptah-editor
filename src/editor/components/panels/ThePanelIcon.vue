<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon settings
    </h6>

    <!-- Control icon -->
    <div class="b-panel__control">
      <control-text-with-icon></control-text-with-icon>
    </div>

    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import ControlTextWithIcon from '../controls/TheControlIconWithText'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelIcon',

  components: {
    ControlBox,
    ControlTextWithIcon
  }
}
</script>
