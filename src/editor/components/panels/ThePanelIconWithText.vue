<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon style
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Control icon -->
            <div class="b-panel__control">
              <base-caption>
                Icon properties
              </base-caption>
              <control-icon-with-text-settings/>
            </div>

            <!-- Typography -->
            <div class="b-panel__control" v-if="settingObjectOptions.typography">
              <base-caption>
                Text settings
              </base-caption>
              <control-typography :show-text-styles="false"/>
            </div>

            <!-- Padding/Margin -->
            <div class="b-panel__control">
              <control-box/>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlTypography from '../controls/TheControlTypography'
import ControlIconWithTextSettings from '../controls/TheControlIconWithTextSettings'
import ControlBox from '../controls/TheControlBox'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelIconWithTextStyles',

  components: {
    IndicatorPlatform,
    ControlTypography,
    ControlBox,
    ControlIconWithTextSettings
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ])
  }
}
</script>
