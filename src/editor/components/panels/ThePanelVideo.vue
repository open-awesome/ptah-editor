<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Video
    </h6>

    <!-- Settings video element -->
    <div class="b-panel__control">
      <control-video :show-text-styles="false"></control-video>
    </div>

    <!-- Padding/Margin -->
    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import ControlVideo from '../controls/TheControlVideo'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelVideo',

  components: {
    ControlVideo,
    ControlBox
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
