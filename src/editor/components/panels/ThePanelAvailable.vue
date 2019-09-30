<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Available settings
    </h6>

    <!-- Styles elements -->
    <div class="b-panel__control">
      <control-available-platforms-style/>
    </div>

    <!-- Visible platforms -->
    <div class="b-panel__control" v-if="!isMobile">
      <control-available-platforms/>
    </div>

    <!-- Padding/Margin -->
    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlAvailablePlatformsStyle from '../controls/TheControlAvailablePlatformsStyle'
import ControlAvailablePlatforms from '../controls/TheControlAvailablePlatforms'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelAvailable',

  components: {
    ControlAvailablePlatformsStyle,
    ControlAvailablePlatforms,
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
      'isMobile'
    ])
  }
}
</script>
