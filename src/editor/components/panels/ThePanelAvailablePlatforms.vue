<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Available platforms
    </h6>
    <div class="b-panel__control">
      <control-available-platforms></control-available-platforms>
    </div>
  </div>
</template>

<script>
import ControlAvailablePlatforms from '../controls/TheControlAvailablePlatforms'
export default {
  name: 'ThePanelAvailablePlatforms',
  components: { ControlAvailablePlatforms },
  props: {
    builder: {
      type: Object,
      required: true
    }
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
