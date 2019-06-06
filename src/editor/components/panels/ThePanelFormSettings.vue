<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }} settings
    </h6>

    <!-- Control Form -->
    <div class="b-panel__control">
      <control-form/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlForm from '../controls/TheControlForm'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlTypography from './../controls/TheControlTypography'

export default {
  name: 'ThePanelFormSettings',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlForm,
    ControlBackgroundColor,
    ControlTypography
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel'
    ])
  }
}
</script>
