<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Setting restrictions
    </h6>

    <div class="b-panel__layout">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Styles -->
            <div class="b-panel__control">
              <control-age-restrictions-style/>
            </div>

            <!-- Visible elements -->
            <div class="b-panel__control" v-if="!isMobile">
              <control-age-restrictions/>
            </div>

            <!-- Padding/Margin -->
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
import ControlAgeRestrictionsStyle from '../controls/TheControlAgeRestrictionsStyle'
import ControlAgeRestrictions from '../controls/TheControlAgeRestrictions'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelRestrictions',

  components: {
    ControlAgeRestrictionsStyle,
    ControlAgeRestrictions,
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
