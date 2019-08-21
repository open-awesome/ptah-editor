<script>
import { mapState } from 'vuex'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlSocialNetworksStyle',

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
  <div class="b-social-networks-controls">
      <div class="b-size-controls__control">
        <base-range-slider v-model="sizeIcons.width" :label="$t('c.iconsWidth')" step="2" min="16" max="64">
          {{ sizeIcons.width }} px
        </base-range-slider>
      </div>
      <div class="b-social-networks-controls__control">
        <base-color-picker :label="$t('c.iconsColor')" v-model="color" @change="changeColor"></base-color-picker>
      </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-social-networks-controls
  margin-top: 2.2rem
  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
  &__control
    padding: $size-step/2 0
</style>
