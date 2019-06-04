<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Setting restrictions
    </h6>
    <div class="b-panel__control">
      <control-age-restrictions/>
    </div>
  </div>
</template>

<script>
import ControlAgeRestrictions from '../controls/TheControlAgeRestrictions'
export default {
  name: 'ThePanelRestrictions',
  components: { ControlAgeRestrictions },
  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
