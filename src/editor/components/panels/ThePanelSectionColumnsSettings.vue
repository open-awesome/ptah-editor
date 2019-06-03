<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Columns settings
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Columns settings -->
        <control-section-columns/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionColumns from './../controls/TheControlSectionColumns.vue'

export default {
  name: 'ThePanelSectionColumnsSettings',

  components: {
    ControlSectionColumns
  }
}
</script>
