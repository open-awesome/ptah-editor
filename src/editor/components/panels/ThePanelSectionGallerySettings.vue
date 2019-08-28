<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Gallery settings
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- System requirements -->
        <control-section-gallery/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionGallery from './../controls/TheControlSectionGallery.vue'

export default {
  name: 'ThePanelSectionGalleryettings',

  components: {
    ControlSectionGallery
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      /* vars for control system requirements */
    }
  }
}
</script>
