<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon text edit
    </h6>

    <!-- Control icon -->
    <div class="b-panel__control">
      <control-icon-with-text-edit/>
    </div>
  </div>
</template>

<script>
import ControlIconWithTextEdit from '../controls/TheControlIconWithTextEdit'

export default {
  name: 'ThePanelIconEdit',

  components: {
    ControlIconWithTextEdit
  }
}
</script>
