<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ settingObjectLabel }}
    </h6>
    <!-- social settings style -->
    <div class="b-panel__control">
      <control-social-networks-style/>
    </div>
    <!-- background color -->
    <div class="b-panel__control">
      <control-background-color/>
    </div>
    <div class="b-panel__control">
      <control-box></control-box>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlBackgroundColor from './../controls/TheControlBackgroundColor'
import ControlSocialNetworksStyle from './../controls/TheControlSocialNetworksStyle'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelSocialStyle',

  components: {
    ControlBackgroundColor,
    ControlSocialNetworksStyle,
    ControlBox
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
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
