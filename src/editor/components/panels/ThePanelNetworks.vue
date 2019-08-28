<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>

    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">

        <!-- Social settings style -->
        <div class="b-panel__control">
          <control-social-networks-style/>
        </div>

        <!-- Background color -->
        <div class="b-panel__control">
          <control-background-color/>
        </div>

        <!-- Visible elements -->
        <div class="b-panel__control">
          <control-social-networks/>
        </div>

        <!-- Padding/Margin -->
        <div class="b-panel__control">
          <control-box></control-box>
        </div>

      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlSocialNetworks from './../controls/TheControlSocialNetworks'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlSocialNetworksStyle from './../controls/TheControlSocialNetworksStyle'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelNetworks',

  components: {
    ControlSocialNetworks,
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
