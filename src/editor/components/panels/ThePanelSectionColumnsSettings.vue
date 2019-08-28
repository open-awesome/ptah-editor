<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Columns settings
    </h6>

    <div class="b-panel__inner">
      <!-- Columns settings -->
      <div class="b-panel__control">
        <control-section-columns/>
      </div>

      <!-- Vertical align -->
      <div class="b-panel__control">
        <control-vertical-align/>
      </div>
    </div>
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
