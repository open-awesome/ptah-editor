<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>

    <!-- Text -->
    <div class="b-panel__control">
      <control-text/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlText from './../controls/TheControlText'

export default {
  name: 'ThePanelButton',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlText
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectLabel'
    ])
  }
}
</script>
