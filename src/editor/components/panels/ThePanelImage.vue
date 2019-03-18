<template>
  <div class="b-panel">
    <!-- Alt prop for image -->
    <div class="b-panel__control">
      <control-alt/>
    </div>
  </div>
</template>

<script>
import ControlAlt from './../controls/TheControlAlt'

export default {
  name: 'ThePanelImage',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlAlt
  }
}
</script>

<style lang="sass" scoped>
.b-panel
  padding-bottom: 4.5rem
  display: flex
  flex-direction: column
  height: auto
  width: 100%
  align-items: stretch

  &__control
    margin-bottom: 1.6rem
</style>
