<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Available settings
    </h6>
    <div class="b-panel__control">
      <control-available-platforms/>
    </div>
  </div>
</template>

<script>
import ControlAvailablePlatforms from '../controls/TheControlAvailablePlatforms'
export default {
  name: 'ThePanelAvailableSettings',

  components: {
    ControlAvailablePlatforms
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  }
}
</script>
