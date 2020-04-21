<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Text
    </h6>

    <div class="b-panel__layout">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Typography -->
            <div class="b-panel__control">
              <control-typography :show-text-styles="false"></control-typography>
            </div>

            <!-- Align -->
            <div class="b-panel__control">
              <control-align/>
            </div>

            <!-- Text Link -->
            <div class="b-panel__control" v-if="!isMobile">
              <control-text-link></control-text-link>
            </div>

            <div class="b-panel__control">
              <control-box></control-box>
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

export default {
  name: 'ThePanelText',

  components: {
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
      'isMobile'
    ])
  }
}
</script>
