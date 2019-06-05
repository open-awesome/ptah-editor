<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      System settings
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- System requirements -->
        <control-system-requirements/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSystemRequirements from './../controls/TheControlSystemRequirements.vue'

export default {
  name: 'ThePanelSectionSystemSettings',

  components: {
    ControlSystemRequirements
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
