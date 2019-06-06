<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Style restrictions
    </h6>

    <div class="b-panel__control">
      <control-age-restrictions-style/>
    </div>

    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import ControlAgeRestrictionsStyle from '../controls/TheControlAgeRestrictionsStyle'
import ControlBox from '../controls/TheControlBox'
export default {
  name: 'ThePanelRestrictionsStyle',

  components: {
    ControlBox,
    ControlAgeRestrictionsStyle
  }
}
</script>
