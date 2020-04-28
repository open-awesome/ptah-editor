<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      System requirements
    </h6>

    <IndicatorPlatform />

    <div class="b-system-requirements">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-panel__tabs"
      />
      <div class="layout layout__bg" v-if="activeTab === 'settings'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control">
              <!-- System requirements -->
              <control-system-requirements/>
            </div>
          </div>
        </base-scroll-container>
      </div>
      <div class="layout layout__bg" v-if="activeTab === 'style'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control">
              <!-- System requirements -->
              <control-system-requirements-style/>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import ControlSystemRequirements from './../controls/TheControlSystemRequirements.vue'
import ControlSystemRequirementsStyle from './../controls/TheControlSystemRequirementsStyle.vue'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelSectionSystemSettings',

  components: {
    IndicatorPlatform,
    ControlSystemRequirements,
    ControlSystemRequirementsStyle
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      tabs: [
        { value: 'settings', text: 'Table settings' },
        { value: 'style', text: 'Table style' }
      ],
      activeTab: 'settings'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-system-requirements
  height: 100%
  position: relative
</style>
