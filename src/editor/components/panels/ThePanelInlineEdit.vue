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
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import ControlTypography from '../controls/TheControlTypography'

export default {
  name: 'ThePanelInline',

  components: {
    ControlTypography
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
