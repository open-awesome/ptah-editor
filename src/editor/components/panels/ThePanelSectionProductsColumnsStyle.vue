<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Products style
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Products Section Controls -->
        <control-section-products-style/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionProductsStyle from './../controls/TheControlSectionProductsStyle.vue'

export default {
  name: 'ThePanelSectionProductsColumnsStyle',

  components: {
    ControlSectionProductsStyle
  }
}
</script>
