<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'ControlAvailablePlatforms',

  components: {
    VuseIcon
  },

  data () {
    return {
      color: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    colorFill () {
      return this.settingObjectOptions.colorFill
    },

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    },

    mediaSizeIconsWidth: {
      get () {
        let w = _.get(this.settingObjectOptions, `media['is-mobile']['sizeIcons']['width']`)

        if (w === undefined) w = _.get(this.settingObjectOptions, `sizeIcons['width']`)

        return w
      },

      set (value) {
        let props = {}
        let sizeIcons = {
          width: value
        }
        let media = {
          'is-mobile': {
            'sizeIcons': sizeIcons
          }
        }

        this.isMobile ? props = { 'media': media } : props = { 'sizeIcons': sizeIcons }

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
      }
    },

    elWidth: {
      get () {
        let w = 0

        if (this.isMobile) {
          w = this.mediaSizeIconsWidth
        } else {
          w = this.sizeIcons.width
        }

        return w
      },

      set (value) {
        if (this.isMobile) {
          this.mediaSizeIconsWidth = value
        } else {
          this.sizeIcons.width = value
        }
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.colorFill['color'] = color
    }
  },

  mounted () {
    this.color = this.colorFill.color
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-size-controls__control">
      <base-range-slider v-model="elWidth" :label="$t('c.iconsWidth')" step="8" min="16" max="128">
        {{ elWidth }} px
      </base-range-slider>
    </div>
    <div class="b-text-controls__control" v-if="!isMobile">
      <base-color-picker :label="$t('c.iconsColor')" v-model="color" @change="changeColor"></base-color-picker>
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
