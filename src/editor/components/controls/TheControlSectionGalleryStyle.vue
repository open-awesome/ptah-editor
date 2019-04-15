<script>
import ControlTextStylesChapter from './../controls/TheControlTextStylesChapter.vue'
import ControlTextStylesText from './../controls/TheControlTextStylesText.vue'

export default {
  name: 'ControlSectionGalleryStyle',

  components: {
    ControlTextStylesChapter,
    ControlTextStylesText
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div>
      <div class="b-text-controls__control">
        <control-text-styles-chapter/>
      </div>
    </div>
    <div>
      <div class="b-text-controls__control">
        <control-text-styles-text/>
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
