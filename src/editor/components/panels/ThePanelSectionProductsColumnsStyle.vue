<template>
  <div class="b-section-settings">
    <h6 class="b-section-settings__title">
      Products style
    </h6>
    <base-scroll-container backgroundBar="#999">
      <div class="b-section-settings__inner">
        <!-- Products Section Controls -->
        <control-section-products-style/>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import ControlSectionProductsStyle from './../controls/TheControlSectionProductsStyle.vue'

export default {
  name: 'ThePanelSectionProductsColumnsStyle',

  components: {
    ControlSectionProductsStyle
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-section-settings
  height: 100%
  width: 100%

  display: flex
  flex-direction: column
  justify-content: flex-start
  &__title
    min-width: 28rem
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
    padding-right: 2.5rem
    padding-bottom: 10rem
</style>
