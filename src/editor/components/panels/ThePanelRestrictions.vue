<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Restrictions
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Visible elements -->
            <div class="b-panel__control" v-if="!isMobile">
              <base-caption>
                Content rationg systems
              </base-caption>
              <control-age-restrictions />
            </div>

            <!-- Styles -->
            <div class="b-panel__control">
              <base-caption>
                Icon settings
              </base-caption>
              <control-age-restrictions-style />
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
import ControlAgeRestrictionsStyle from '../controls/TheControlAgeRestrictionsStyle'
import ControlAgeRestrictions from '../controls/TheControlAgeRestrictions'
import ControlBox from '../controls/TheControlBox'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelRestrictions',

  components: {
    IndicatorPlatform,
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
