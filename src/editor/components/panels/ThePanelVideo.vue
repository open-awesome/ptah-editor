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

    <!-- Width / Height -->
    <div class="b-panel__control" v-if="settingObjectOptions.resizable">
       <control-size></control-size>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlVideo from '../controls/TheControlVideo'
import ControlBox from '../controls/TheControlBox'
import ControlSize from '../controls/TheControlSize'

export default {
  name: 'ThePanelVideo',

  components: {
    ControlVideo,
    ControlBox,
    ControlSize
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ])
  }
}
</script>
