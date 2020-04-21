<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Iframe
    </h6>
    <div class="b-panel__layout">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Settings video element -->
            <div class="b-panel__control" v-if="!isMobile">
              <control-iframe :show-text-styles="false"></control-iframe>
            </div>

            <!-- Padding/Margin -->
            <div class="b-panel__control">
              <control-box></control-box>
            </div>

            <!-- Width / Height -->
            <div class="b-panel__control" v-if="settingObjectOptions.resizable">
               <control-size></control-size>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlIframe from '../controls/TheControlIframe'
import ControlBox from '../controls/TheControlBox'
import ControlSize from '../controls/TheControlSize'

export default {
  name: 'ThePanelIframe',

  components: {
    ControlIframe,
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
