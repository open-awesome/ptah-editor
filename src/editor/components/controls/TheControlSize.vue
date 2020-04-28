<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {

  data () {
    return {
      widthValue: 0,
      heightValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'device',
      'isMobile'
    ]),

    width: {
      get () {
        return this.getStyleNumberValue('width')
      },

      set (value) {
        this.update('width', value)
      }
    },

    height: {
      get () {
        return this.getStyleNumberValue('height')
      },

      set (value) {
        this.update('height', value)
      }
    },

    maxProps () {
      let parents = {}
      let max = {}

      parents['width'] = this.settingObjectElement.closest('.b-draggable-slot')
      parents['height'] = this.settingObjectElement.closest('section') || this.settingObjectElement.closest('header') || this.settingObjectElement.closest('footer')

      max['width'] = parents['width'].offsetWidth
      max['height'] = parseInt(parents['height'].offsetHeight)

      return max
    }

  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    getStyleNumberValue (prop) {
      let props = {}
      let s = {}
      let styles = this.settingObjectOptions.styles
      let stylesMedia = {}

      if (this.settingObjectOptions.media && this.settingObjectOptions.media['is-mobile']) {
        stylesMedia = this.settingObjectOptions.media['is-mobile']
      } else {
        stylesMedia[prop] = styles[prop]
      }

      if (this.isMobile) {
        props = stylesMedia
      } else {
        props = styles
      }

      s = props[prop]

      if (s === undefined) {
        // get values from node
        let style = window.getComputedStyle(this.settingObjectElement)
        s = style[prop]
      }

      return parseInt(s)
    },

    update (prop, value) {
      let props = {}
      let styles = {}
      let media = {}

      if (value === '') value = 32

      styles[prop] = value + 'px'

      media[`${this.device}`] = {}
      media[`${this.device}`][prop] = value + 'px'

      this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
    },

    setWidth (value) {
      this.widthValue = value
    },

    setWidthValue (value) {
      this.width = value
    },

    setHeight (value) {
      this.heightValue = value
    },

    setHeightValue (value) {
      this.height = value
    }
  },

  mounted () {
    this.widthValue = this.width
    this.heightValue = this.height
  }
}
</script>

<template>
  <div>
    <div class="b-panel__control">
      <div class="b-panel__col" >
        <base-range-slider
          position-label="left"
          v-model="width"
          :label="$t('c.width')"
          step="1"
          min="32"
          :max="maxProps['width']"
          @change="setWidth"
        >
          <base-number-input
            :value="widthValue"
            :minimum="32"
            :maximum="maxProps['width']"
            unit="px"
            @input="setWidthValue"
          />
        </base-range-slider>
      </div>
    </div>
    <div class="b-panel__control">
      <div class="b-panel__col" >
        <base-range-slider
          position-label="left"
          v-model="height"
          :label="$t('c.height')"
          step="1"
          min="32"
          :max="maxProps['height']"
          @change="setHeight"
        >
          <base-number-input
            :value="heightValue"
            :minimum="32"
            :maximum="maxProps['height']"
            unit="px"
            @input="setHeightValue"
          />
        </base-range-slider>
      </div>
    </div>
  </div>
</template>
