<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Setting restrictions
    </h6>

    <!-- Styles -->
    <div class="b-panel__control">
      <control-age-restrictions-style/>
    </div>

    <!-- Visible elements -->
    <div class="b-panel__control">
      <control-age-restrictions/>
    </div>

    <!-- Padding/Margin -->
    <div class="b-panel__control">
      <control-box></control-box>
    </div>

  </div>
</template>

<script>
import ControlAgeRestrictionsStyle from '../controls/TheControlAgeRestrictionsStyle'
import ControlAgeRestrictions from '../controls/TheControlAgeRestrictions'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelRestrictions',

  components: {
    ControlAgeRestrictionsStyle,
    ControlAgeRestrictions,
    ControlBox
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
