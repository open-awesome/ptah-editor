<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Gallery style
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Gallery style -->
        <control-section-gallery-style/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionGalleryStyle from './../controls/TheControlSectionGalleryStyle.vue'

export default {
  name: 'ThePanelSectionGalleryStyle',

  components: {
    ControlSectionGalleryStyle
  }
}
</script>
