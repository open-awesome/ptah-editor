<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Slider
    </h6>

    <div class="b-panel__layout">
      <div class="layout _top-2">
        <base-scroll-container>
          <div class="layout-padding _pr-1">
            <!-- Columns settings -->
            <div class="b-panel__control">
              <base-caption>
                Slider settings
              </base-caption>

              <control-section-banner />
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlSectionBanner from '../controls/TheControlSectionBanner'

export default {
  components: {
    ControlSectionBanner
  },
  name: 'ThePanelSlider',

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

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-section-settings
  /deep/
    .vb.vb-visible
      padding-right: 0 !important
      width: calc(100% + 17px) !important
  &__control
    margin: 0 0 2.1rem 2.2rem
</style>
