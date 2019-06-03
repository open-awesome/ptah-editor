<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>
    <!-- Hover animation -->
    <div class="b-panel__control">
      <control-hover-animation/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlHoverAnimation from './../controls/TheControlHoverAnimation'

export default {
  name: 'ThePanelButton',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlHoverAnimation
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectLabel'
    ])
  }
}
</script>
