<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Available settings
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Visible platforms -->
            <div class="b-panel__control" v-if="!isMobile">
              <base-caption>
                Platforms
              </base-caption>
              <control-available-platforms />
            </div>

            <!-- Styles elements -->
            <div class="b-panel__control">
              <base-caption>
                Icon settings
              </base-caption>
              <control-available-platforms-style />
            </div>

            <!-- Padding/Margin -->
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
import ControlAvailablePlatformsStyle from '../controls/TheControlAvailablePlatformsStyle'
import ControlAvailablePlatforms from '../controls/TheControlAvailablePlatforms'
import ControlBox from '../controls/TheControlBox'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelAvailable',

  components: {
    IndicatorPlatform,
    ControlAvailablePlatformsStyle,
    ControlAvailablePlatforms,
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
      'isMobile'
    ])
  }
}
</script>
