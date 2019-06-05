<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Products settings
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Products Section Controls -->
        <control-section-products/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionProducts from './../controls/TheControlSectionProducts.vue'

export default {
  name: 'ThePanelSectionProductsColumnsSettings',

  components: {
    ControlSectionProducts
  }
}
</script>
