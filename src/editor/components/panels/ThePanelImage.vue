<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>
    <!-- image -->
    <div class="b-panel__control">
      <control-image/>
    </div>

    <div class="b-panel__control" v-if="settingObjectOptions.hasLink">
      <control-image-link/>
    </div>

    <div class="b-panel__control">
      <control-box :hidePadding="true"></control-box>
    </div>

    <!-- Width / Height -->
    <div class="b-panel__control" v-if="settingObjectOptions.resizable">
       <control-size></control-size>
    </div>
    <!-- Alt prop for image -->
    <!-- TODO: We're still not using <img>
    <div class="b-panel__control">
      <control-alt/>
    </div>
    -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlAlt from './../controls/TheControlAlt'
import ControlImage from './../controls/TheControlImage'
import ControlBox from '../controls/TheControlBox'
import ControlSize from '../controls/TheControlSize'
import ControlImageLink from './../controls/TheControlImageLink'

export default {
  name: 'ThePanelImageSettings',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlAlt,
    ControlImage,
    ControlBox,
    ControlSize,
    ControlImageLink
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectLabel'
    ])
  }
}
</script>
