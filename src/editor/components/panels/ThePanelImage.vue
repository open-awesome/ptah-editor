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
            <!-- image -->
            <div class="b-panel__control" v-if="!isMobile">
              <base-caption>
                Image
              </base-caption>
              <control-image/>
            </div>

            <div class="b-panel__control" v-if="settingObjectOptions.hasLink && !isMobile">
              <control-image-link/>
            </div>

            <!-- Width / Height -->
            <div class="b-panel__control" v-if="settingObjectOptions.resizable">
              <base-caption v-if="isMobile">
                Image size
              </base-caption>
              <control-size />
            </div>

            <div class="b-panel__control">
              <control-box :hidePadding="true" />
            </div>
            <!-- Alt prop for image -->
            <!-- TODO: We're still not using <img>
            <div class="b-panel__control">
              <control-alt/>
            </div>
            -->
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlAlt from './../controls/TheControlAlt'
import ControlImage from './../controls/TheControlImage'
import ControlBox from '../controls/TheControlBox'
import ControlSize from '../controls/TheControlSize'
import ControlImageLink from './../controls/TheControlImageLink'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelImageSettings',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    IndicatorPlatform,
    ControlAlt,
    ControlImage,
    ControlBox,
    ControlSize,
    ControlImageLink
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
