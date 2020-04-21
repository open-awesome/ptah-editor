<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Toggle settings
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

            <!-- Control settings-->
            <div class="b-panel__control">
              <control-toggle-element-settings/>
            </div>

            <!-- Control padding/margin-->
            <div class="b-panel__control">
              <control-box/>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import ControlToggleElementSettings from '../controls/TheControlToggleElementSettings'
import ControlTypography from '../controls/TheControlTypography'
import ControlAlign from '../controls/TheControlAlign'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelToggleElement',

  components: {
    ControlToggleElementSettings,
    ControlBox,
    ControlTypography,
    ControlAlign
  }
}
</script>
