<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Text
    </h6>
    <!-- Text -->
    <div class="b-panel__control">
      <control-text/>
    </div>
  </div>
</template>

<script>
import ControlText from './../controls/TheControlText'

export default {
  name: 'ThePanelInlineEdit',

  components: {
    ControlText
  },

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
