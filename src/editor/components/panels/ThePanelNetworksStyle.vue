<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>
    <!-- social settings style -->
    <div class="b-panel__control">
      <control-social-networks-style/>
    </div>
    <!-- background color -->
    <div class="b-panel__control">
      <control-background-color/>
    </div>
    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlSocialNetworksStyle from './../controls/TheControlSocialNetworksStyle'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelNetworksStyle',

  components: {
    ControlBackgroundColor,
    ControlSocialNetworksStyle,
    ControlBox
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel'
    ])
  }
}
</script>
