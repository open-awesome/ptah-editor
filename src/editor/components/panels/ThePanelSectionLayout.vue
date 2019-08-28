<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Layout
      <div>{{ settingObjectSection.name }}</div>
    </h6>

    <div class="b-panel__control">
      <control-section-layouts :builder="builder"></control-section-layouts>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ControlSectionLayouts from './../controls/TheControlSectionLayouts.vue'

export default {
  name: 'ThePanelSectionLayout',

  components: { ControlSectionLayouts },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', ['settingObjectSection'])
  }
}
</script>
