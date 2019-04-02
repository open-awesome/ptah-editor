<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlAgeRestrictionsStyle',

  data () {
    return {
      elWidth: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    }
  },

  mounted () {
    this.elWidth = this.sizeIcons.width
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-size-controls__control">
      <base-range-slider v-model="sizeIcons.width" label="Width icons" step="8" min="16" max="128">
        {{ sizeIcons.width }} px
      </base-range-slider>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  &__control
    margin-top: $size-step/2

</style>
