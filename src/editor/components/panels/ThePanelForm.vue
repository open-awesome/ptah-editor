<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Form
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Columns settings -->
            <div class="b-panel__control">
              <base-caption>
                Form settings
              </base-caption>

              <!-- Control typography -->
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
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlFormStyles from './../controls/TheControlFormStyles'
import ControlTypography from './../controls/TheControlTypography'
import ControlBox from '../controls/TheControlBox'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelForm',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    IndicatorPlatform,
    ControlFormStyles,
    ControlTypography,
    ControlBox
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel',
      'isMobile'
    ])
  }
}
</script>
