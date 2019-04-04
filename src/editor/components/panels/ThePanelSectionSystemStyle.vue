<template>
  <div class="b-section-system-style">
    <h6 class="b-section-system-style__title">
      System style
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-section-system-style__inner">
        <!-- System requirements -->
        <control-system-requirements-style/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSystemRequirementsStyle from './../controls/TheControlSystemRequirementsStyle.vue'

export default {
  name: 'ThePanelSectionSystemStyle',

  components: {
    ControlSystemRequirementsStyle
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      /* vars for control system requirements */
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-section-system-style
  height: 100%
  width: 100%

  display: flex
  flex-direction: column
  justify-content: flex-start
  &__title
    min-width: 24rem
    margin: 0 0 2.8rem 0
    padding: 0
    color: #272727
    font-size: 1.8rem
    font-weight: bold
    &:first-letter
      text-transform: uppercase
    &.subtitle
      color: rgba(39, 39, 39, 0.5)
      font-size: 1.4rem
      font-weight: normal
      margin: 0 0 1rem
  &__inner
    max-width: 24rem
    padding: 0 0 2.4rem 0
</style>
