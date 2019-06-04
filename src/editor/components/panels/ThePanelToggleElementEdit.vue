<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Toggle texts edit
    </h6>

    <!-- Control texts edit-->
    <div class="b-panel__control">
      <control-toggle-element-texts-edit/>
    </div>
  </div>
</template>

<script>
import ControlToggleElementTextsEdit from '../controls/TheControlToggleElementTextsEdit'

export default {
  name: 'ThePanelToggleElementEdit',

  components: {
    ControlToggleElementTextsEdit
  }
}
</script>
