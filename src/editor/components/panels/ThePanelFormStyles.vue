<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }} styles
    </h6>

    <!-- Background Color -->
    <div class="b-panel__control">
      <control-typography/>
    </div>

    <!-- Background Color -->
    <div class="b-panel__control">
      <control-form-styles/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlForm from '../controls/TheControlForm'
import ControlFormStyles from './../controls/TheControlFormStyles'
import ControlTypography from './../controls/TheControlTypography'

export default {
  name: 'ThePanelFormStyles',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlForm,
    ControlFormStyles,
    ControlTypography
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel'
    ])
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

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
