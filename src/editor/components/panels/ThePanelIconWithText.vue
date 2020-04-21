<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon style
    </h6>
    <div class="b-panel__layout">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Typography -->
            <div class="b-panel__control" v-if="settingObjectOptions.typography">
              <control-typography :show-text-styles="false"/>
            </div>

            <!-- Control icon -->
            <div class="b-panel__control">
              <control-icon-with-text-settings/>
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

export default {
  name: 'ThePanelIconWithTextStyles',

  components: {
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
