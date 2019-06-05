<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>

    <!-- Typography -->
    <div class="b-panel__control">
      <control-typography :colorTextHover="true" />
    </div>

    <!-- Align -->
    <div class="b-panel__control" v-if="settingObjectOptions.aligned">
      <control-align/>
    </div>

    <!-- background -->
    <div class="b-panel__control">
      <control-background-color/>
    </div>
    <div class="b-panel__control">
      <control-background-image/>
    </div>

    <!-- Border style -->
    <div class="b-panel__control">
      <control-border-style/>
    </div>

    <!-- Border radius -->
    <div class="b-panel__control">
      <control-border-radius/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlTypography from './../controls/TheControlTypography'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlBackgroundImage from './../controls/TheControlBackgroundImage'
import ControlBorderRadius from './../controls/TheControlBorderRadius'
import ControlBorderStyle from './../controls/TheControlBorderStyle'
import ControlAlign from './../controls/TheControlAlign'

export default {
  name: 'ThePanelButton',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlTypography,
    ControlAlign,
    ControlBackgroundColor,
    ControlBackgroundImage,
    ControlBorderRadius,
    ControlBorderStyle
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectLabel'
    ])
  }
}
</script>
