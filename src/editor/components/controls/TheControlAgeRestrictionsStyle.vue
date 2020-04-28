<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'ControlAgeRestrictionsStyle',

  data () {
    return {
      elWidthValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

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

    setWidth (value) {
      this.elWidthValue = value
    },

    setWidthValue (value) {
      this.elWidth = value
    }
  }
}
</script>

<template>
  <div class="b-panel__col">
    <div class="b-panel__control">
      <base-range-slider
        position-label="left"
        v-model="elWidth"
        :label="$t('c.width')"
        step="8"
        min="16"
        max="128"
        @change="setWidth"
      >
        <base-number-input
          :value="elWidthValue"
          :minimum="32"
          :maximum="128"
          unit="px"
          @input="setWidthValue"
        />
      </base-range-slider>
    </div>
  </div>
</template>
