<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Text
    </h6>
    <!-- Text -->
    <div class="b-panel__control">
      <control-text/>
    </div>
  </div>
</template>

<script>
import ControlText from './../controls/TheControlText'

export default {
  name: 'ThePanelInlineEdit',

  components: {
    ControlText
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
