<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType',
      'isMobile'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    formStyles () {
      return this.settingObjectOptions.formStyles
    },

    mediaFormStylesHeight: {
      get () {
        let w = _.get(this.settingObjectOptions, `media['is-mobile']['formStyles']['height']`)

        if (w === undefined) w = _.get(this.settingObjectOptions, `formStyles['height']`)

        return w
      },

      set (value) {
        let props = {}
        let formStyles = {
          height: value
        }
        let media = {
          'is-mobile': {
            'formStyles': formStyles
          }
        }

        this.isMobile ? props = { 'media': media } : props = { 'formStyles': formStyles }

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
      }
    },

    elHeight: {
      get () {
        let h = 0

        if (this.isMobile) {
          h = this.mediaFormStylesHeight
        } else {
          h = this.formStyles.height
        }

        return h
      },

      set (value) {
        if (this.isMobile) {
          this.mediaFormStylesHeight = value
        } else {
          this.formStyles.height = value
        }
      }
    },

    buttonColor: {
      get () {
        return this.formStyles['button-color']
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          formStyles: {
            'button-color': color
          }
        }))
      }
    },

    buttonHoverColor: {
      get () {
        return this.formStyles.buttonHoverColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          formStyles: {
            buttonHoverColor: color
          }
        }))
      }
    },

    buttonTextColor: {
      get () {
        return this.formStyles.buttonTextColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          formStyles: {
            buttonTextColor: color
          }
        }))
      }
    },

    buttonHoverTextColor: {
      get () {
        return this.formStyles.buttonHoverTextColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          formStyles: {
            buttonHoverTextColor: color
          }
        }))
      }
    },

    inputBgColor: {
      get () {
        return this.formStyles.inputBgColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          formStyles: {
            inputBgColor: color
          }
        }))
      }
    },

    buttonBorderRadius: {
      get () {
        return parseInt(this.formStyles['border-radius'])
      },

      set (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          formStyles: {
            'border-radius': value
          }
        }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ])
  }
}
</script>

<template>
  <div>
    <div class="b-bg-controls" v-if="!isMobile">
      <div class="b-bg-controls__control">
        <base-color-picker label="Background text" v-model="inputBgColor"/>
      </div>
      <div class="b-bg-controls__control">
        <base-color-picker label="Button text color" v-model="buttonTextColor"/>
      </div>
      <div class="b-bg-controls__control">
        <base-color-picker label="Button hover text color" v-model="buttonHoverTextColor"/>
      </div>
      <div class="b-bg-controls__control">
        <base-color-picker label="Button color" v-model="buttonColor"/>
      </div>
      <div class="b-bg-controls__control">
        <base-color-picker label="Button hover color" v-model="buttonHoverColor"/>
      </div>
      <div class="b-bg-controls__control">
        <base-range-slider v-model="buttonBorderRadius" min="0" max="50" label="Button border radius">
          {{ buttonBorderRadius }}px
        </base-range-slider>
      </div>
    </div>
    <div class="b-bg-controls">
      <div class="b-bg-controls__control">
        <base-range-slider v-model="elHeight" min="30" max="100" label="Form height">
          {{ elHeight }}px
        </base-range-slider>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-bg-controls
  margin-top: 2.2rem
  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
  &__control
    margin-bottom: $size-step/2
</style>
