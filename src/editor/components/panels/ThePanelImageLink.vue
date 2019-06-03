<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Open content
    </h6>
    <!-- image -->
    <div class="b-panel__control">
      <control-image-link/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlImageLink from './../controls/TheControlImageLink'

export default {
  name: 'ThePanelImage',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlImageLink
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel'
    ])
  }
}
</script>
