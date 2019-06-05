<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Available style
    </h6>
    <div class="b-panel__control">
      <control-available-platforms-style/>
    </div>
    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import ControlAvailablePlatformsStyle from '../controls/TheControlAvailablePlatformsStyle'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelAvailableStyle',

  components: {
    ControlBox,
    ControlAvailablePlatformsStyle
  }
}
</script>
