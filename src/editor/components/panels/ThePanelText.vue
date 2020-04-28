<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Typography -->
            <div class="b-panel__control">
              <base-caption>
                {{ settingObjectLabel }} style
              </base-caption>
              <control-typography :show-text-styles="false" />
            </div>

            <!-- Align -->
            <div class="b-panel__control">
              <control-align/>
            </div>

            <!-- Text Link -->
            <div class="b-panel__control" v-if="!isMobile">
              <control-text-link />
            </div>

            <div class="b-panel__control">
              <control-box />
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
import ControlAlign from '../controls/TheControlAlign'
import ControlTextLink from '../controls/TheControlTextLink'
import ControlBox from '../controls/TheControlBox'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelText',

  components: {
    IndicatorPlatform,
    ControlBox,
    ControlTypography,
    ControlAlign,
    ControlTextLink
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
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
