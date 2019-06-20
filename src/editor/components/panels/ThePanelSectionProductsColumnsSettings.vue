<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Products settings
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Products Section Controls -->
        <control-section-products/>

        <!-- Vertical align -->
        <control-vertical-align :propAlign="`align-items`"/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionProducts from './../controls/TheControlSectionProducts.vue'
import ControlVerticalAlign from './../controls/TheControlVerticalAlign.vue'

export default {
  name: 'ThePanelSectionProductsColumnsSettings',

  components: {
    ControlSectionProducts,
    ControlVerticalAlign
  }
}
</script>
