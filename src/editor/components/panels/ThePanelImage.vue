<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>
    <!-- image -->
    <div class="b-panel__control">
      <control-image/>
    </div>
    <!-- Alt prop for image -->
    <!-- TODO: We're still not using <img>
    <div class="b-panel__control">
      <control-alt/>
    </div>
    -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlAlt from './../controls/TheControlAlt'
import ControlImage from './../controls/TheControlImage'

export default {
  name: 'ThePanelImage',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlAlt,
    ControlImage
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel'
    ])
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

  &__title
    color: $black
    font-size: 2rem
    font-weight: bold

    min-width: 28rem
    margin: 0 0 2.8rem 0
    padding: 0
    &:first-letter
      text-transform: uppercase

  &__control
    margin-bottom: 1.6rem
</style>
