<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Video
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Settings video element -->
            <div class="b-panel__control" v-if="!isMobile">
              <control-video :show-text-styles="false" />
            </div>

            <!-- Width / Height -->
            <div class="b-panel__control" v-if="settingObjectOptions.resizable">
              <base-caption v-if="isMobile">
                Video size
              </base-caption>
              <control-size />
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
import ControlVideo from '../controls/TheControlVideo'
import ControlBox from '../controls/TheControlBox'
import ControlSize from '../controls/TheControlSize'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelVideo',

  components: {
    IndicatorPlatform,
    ControlVideo,
    ControlBox,
    ControlSize
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
      'isMobile'
    ])
  }
}
</script>
