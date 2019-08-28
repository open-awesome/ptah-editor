<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Text
    </h6>

    <!-- Typography -->
    <div class="b-panel__control">
      <control-typography :show-text-styles="false"></control-typography>
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
