<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>
    <!-- image -->
    <div class="b-panel__control">
      <control-image/>
    </div>

    <div class="b-panel__control" v-if="settingObjectOptions.belongsGallery">
      <control-image-link/>
    </div>

    <div class="b-panel__control">
      <control-box :hidePadding="true"></control-box>
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
    ControlImageLink
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel',
      'settingObjectOptions'
    ])
  }
}
</script>
