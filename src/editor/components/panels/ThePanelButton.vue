<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>

    <IndicatorPlatform />

    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">

        <!-- Typography -->
        <div class="b-panel__control">
          <base-caption>
            Text {{ settingObjectLabel }}
          </base-caption>
          <control-typography :colorTextHover="true" />
        </div>

        <!-- Typography -->
        <div class="b-panel__control">
          <base-caption>
            {{ settingObjectLabel }} style
          </base-caption>
          <!-- background color -->
          <div class="b-panel__control" v-if="!isMobile">
            <control-background-color/>
          </div>
          <!-- width/height -->
          <div class="b-panel__control" v-if="settingObjectOptions.resizable">
            <control-size />
          </div>
          <!-- background image-->
          <div class="b-panel__control" v-if="!isMobile">
            <control-background-image/>
          </div>
        </div>

        <!-- Border style -->
        <div class="b-panel__control" v-if="!isMobile">
          <control-border-style/>
        </div>

        <!-- Border radius -->
        <div class="b-panel__control" v-if="!isMobile">
          <control-border-radius/>
        </div>

        <!-- Hover animation -->
        <div class="b-panel__control" v-if="!isMobile">
          <control-hover-animation/>
        </div>

        <!-- Padding/Margin -->
        <div class="b-panel__control">
          <control-box></control-box>
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
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelButton',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    IndicatorPlatform,
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
      'settingObjectLabel',
      'isMobile'
    ])
  }
}
</script>
