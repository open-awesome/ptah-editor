<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Columns settings
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Columns settings -->
        <control-section-columns/>

        <!-- Vertical align -->
        <control-vertical-align/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionColumns from './../controls/TheControlSectionColumns.vue'
import ControlVerticalAlign from './../controls/TheControlVerticalAlign.vue'

export default {
  name: 'ThePanelSectionColumnsSettings',

  components: {
    ControlSectionColumns,
    ControlVerticalAlign
  }
}
</script>
