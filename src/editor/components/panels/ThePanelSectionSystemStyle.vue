<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      System style
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- System requirements -->
        <control-system-requirements-style/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSystemRequirementsStyle from './../controls/TheControlSystemRequirementsStyle.vue'

export default {
  name: 'ThePanelSectionSystemStyle',

  components: {
    ControlSystemRequirementsStyle
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
