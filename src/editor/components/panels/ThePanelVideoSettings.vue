<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Video
    </h6>

    <div class="b-panel__control">
      <control-video :show-text-styles="false"></control-video>
    </div>
  </div>
</template>

<script>
import ControlVideo from '../controls/TheControlVideo'

export default {
  name: 'ThePanelVideoSettings',

  components: {
    ControlVideo
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
