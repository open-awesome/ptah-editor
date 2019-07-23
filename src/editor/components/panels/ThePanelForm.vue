<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }} styles
    </h6>

    <!-- Control Form -->
    <div class="b-panel__control">
      <control-form/>
    </div>

    <!-- Background Color -->
    <div class="b-panel__control">
      <control-typography/>
    </div>

    <!-- Background Color -->
    <div class="b-panel__control">
      <control-form-styles/>
    </div>

    <!-- Padding/Margin -->
    <div class="b-panel__control">
      <control-box></control-box>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlForm from '../controls/TheControlForm'
import ControlFormStyles from './../controls/TheControlFormStyles'
import ControlTypography from './../controls/TheControlTypography'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelForm',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlForm,
    ControlFormStyles,
    ControlTypography,
    ControlBox
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel'
    ])
  }
}
</script>
