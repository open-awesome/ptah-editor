<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon text edit
    </h6>

    <!-- Control icon -->
    <div class="b-panel__control">
      <control-text-with-icon-edit/>
    </div>
  </div>
</template>

<script>
import ControlTextWithIconEdit from '../controls/TheControlIconWithTextEdit'

export default {
  name: 'ThePanelIconEdit',

  components: {
    ControlTextWithIconEdit
  }
}
</script>
