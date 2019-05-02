<script>
import ControlProductStylesText from './../controls/TheControlProductStylesText.vue'
import ControlProductStylesCost from './../controls/TheControlProductStylesCost.vue'

export default {
  name: 'ControlSectionProductStyles',

  components: {
    ControlProductStylesText,
    ControlProductStylesCost
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div>
      <div class="b-text-controls__control">
        <control-product-styles-text/>
      </div>
      <div class="b-text-controls__control">
        <control-product-styles-cost/>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  &__control
    margin-top: 2.2rem

</style>
