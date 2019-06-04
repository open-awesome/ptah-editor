<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }} styles
    </h6>

    <!-- Background Color -->
    <div class="b-panel__control">
      <control-typography/>
    </div>

    <!-- Background Color -->
    <div class="b-panel__control">
      <control-form-styles/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlForm from '../controls/TheControlForm'
import ControlFormStyles from './../controls/TheControlFormStyles'
import ControlTypography from './../controls/TheControlTypography'

export default {
  name: 'ThePanelFormStyles',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlForm,
    ControlFormStyles,
    ControlTypography
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel'
    ])
  }
}
</script>
