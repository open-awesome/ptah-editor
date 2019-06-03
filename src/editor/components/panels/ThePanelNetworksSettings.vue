<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>
    <!-- social settings -->
    <div class="b-panel__control">
      <control-social-networks/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlSocialNetworks from './../controls/TheControlSocialNetworks'

export default {
  name: 'ThePanelNetworksSettings',

  components: {
    ControlBackgroundColor,
    ControlSocialNetworks
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
