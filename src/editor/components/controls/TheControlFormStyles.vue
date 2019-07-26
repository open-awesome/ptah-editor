<script>
import { mapState, mapActions } from 'vuex'
import { merge } from 'lodash-es'

export default {
  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    formStyles () {
      return this.settingObjectOptions.formStyles
    },

    formHeight: {
      get () {
        return parseInt(this.formStyles['height']) || 64
      },

      set (value) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            height: value
          }
        }))
      }
    },

    buttonColor: {
      get () {
        return this.formStyles['button-color']
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
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

        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            buttonHoverColor: color
          }
        }))
      }
    },

    buttonBorderRadius: {
      get () {
        return parseInt(this.formStyles['border-radius'])
      },

      set (value) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
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
    <div class="b-bg-controls">
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
        <base-range-slider v-model="formHeight" min="30" max="100" label="Form height">
          {{ formHeight }}px
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
