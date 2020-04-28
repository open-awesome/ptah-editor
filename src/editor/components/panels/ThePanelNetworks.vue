<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>

    <IndicatorPlatform />

    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Visible elements -->
        <div class="b-panel__control" v-if="!isMobile">
          <base-caption>
            Links
          </base-caption>
          <control-social-networks />
        </div>

        <!-- Social settings style -->
        <div class="b-panel__control">
          <base-caption>
            Style
          </base-caption>
          <control-social-networks-style />
          <control-background-color />
        </div>

        <!-- Padding/Margin -->
        <div class="b-panel__control">
          <control-box />
        </div>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlSocialNetworks from './../controls/TheControlSocialNetworks'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlSocialNetworksStyle from './../controls/TheControlSocialNetworksStyle'
import ControlBox from '../controls/TheControlBox'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelNetworks',

  components: {
    IndicatorPlatform,
    ControlSocialNetworks,
    ControlBackgroundColor,
    ControlSocialNetworksStyle,
    ControlBox
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel',
      'isMobile'
    ])
  }
}
</script>
