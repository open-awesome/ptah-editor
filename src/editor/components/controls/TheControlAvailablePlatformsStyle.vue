<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlAvailablePlatforms',

  components: {
    VuseIcon
  },

  data () {
    return {
      color: '',
      elWidth: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    colorFill () {
      return this.settingObjectOptions.colorFill
    },

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    }
  },

  methods: {
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.colorFill['color'] = color
    }
  },

  mounted () {
    this.color = this.colorFill.color
    this.elWidth = this.sizeIcons.width
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-size-controls__control">
      <base-range-slider v-model="sizeIcons.width" label="Icons width" step="8" min="16" max="128">
        {{ sizeIcons.width }} px
      </base-range-slider>
    </div>
    <div class="b-text-controls__control">
      <base-color-picker label="Icons color" v-model="color" @change="changeColor"></base-color-picker>
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
