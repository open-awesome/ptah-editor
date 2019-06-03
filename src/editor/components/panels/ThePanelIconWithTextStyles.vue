<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Icon style
    </h6>

    <!-- Typography -->
    <div class="b-panel__control" v-if="settingObjectOptions.typography">
      <control-typography :show-text-styles="false"/>
    </div>

    <!-- Control icon -->
    <div class="b-panel__control">
      <control-icon-with-text-styles/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlIconWithTextStyles from '../controls/TheControlIconWithTextStyles'
import ControlTypography from '../controls/TheControlTypography'

export default {
  name: 'ThePanelIconWithTextStyles',

  components: {
    ControlIconWithTextStyles,
    ControlTypography
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
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
