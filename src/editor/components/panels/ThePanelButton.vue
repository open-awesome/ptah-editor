<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>

    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">

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

        <!-- Hover animation -->
        <div class="b-panel__control">
          <control-hover-animation/>
        </div>

        <!-- Padding/Margin -->
        <div class="b-panel__control">
          <control-box></control-box>
        </div>

        <!-- Width / Height -->
        <div class="b-panel__control" v-if="settingObjectOptions.resizable">
          <control-size></control-size>
        </div>

      </div><!--/.b-panel__inner-->
    </base-scroll-container>
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
import ControlHoverAnimation from './../controls/TheControlHoverAnimation'
import ControlBox from '../controls/TheControlBox'
import ControlSize from '../controls/TheControlSize'

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
    ControlBorderStyle,
    ControlHoverAnimation,
    ControlBox,
    ControlSize
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectLabel'
    ])
  }
}
</script>
