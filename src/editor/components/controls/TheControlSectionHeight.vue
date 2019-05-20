<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  data () {
    return {
      heightValueTypesList: [
        {
          text: 'auto',
          value: 'auto'
        },
        {
          text: 'Viewport Height',
          value: 'vh'
        },
        {
          text: 'Pixels',
          value: 'px'
        }
      ],
      heigthValueType: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ]),

    screenHeight () {
      return document.querySelector('.b-builder-layout-content__main').offsetHeight
    },

    optHeight () {
      return this.settingObjectOptions.styles.height
    },

    vhValue: {
      get () {
        let h = 0
        if (this.optHeight && this.optHeight.indexOf('vh') > 0) {
          h = parseInt(this.optHeight)
        } else {
          h = Math.ceil((this.sectionHeight() * 100) / this.screenHeight)
        }
        return h < 100 ? h : 100
      },

      set (value) {
        let styles = { height: value + 'vh' }
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
      }
    },

    pxValue: {
      get () {
        let h
        if (this.optHeight && !_.isNaN(parseInt(this.optHeight))) {
          if (this.optHeight.indexOf('px') > 0) {
            h = parseInt(this.optHeight)
          } else if (this.optHeight.indexOf('rem') > 0) {
            h = h * 10
          } else {
            h = this.sectionHeight()
          }
        } else {
          h = this.sectionHeight()
        }
        return h
      },

      set (value) {
        let styles = { height: value + 'px' }
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
      }
    }
  },

  created () {
    if (this.optHeight && this.optHeight.indexOf('px') > 0) {
      this.heigthValueType = 'px'
    } else if (this.optHeight && this.optHeight.indexOf('vh') > 0) {
      this.heigthValueType = 'vh'
    } else {
      this.heigthValueType = 'auto'
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    onTypeChange () {
      let styles

      if (this.heigthValueType === 'auto') {
        styles = { height: 'auto' }
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
      } else if (this.heigthValueType === 'px') {
        let styles = { height: this.pxValue + 'px' }
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
      } else {
        let styles = { height: this.vhValue + 'vh' }
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
      }
    },

    sectionHeight () {
      let node = document.getElementById(`section_${this.settingObjectSection.id}`)
      return node.offsetHeight
    }
  }
}
</script>

<template>
  <div class="control-height">
    <h6>Section height</h6>
    <BaseRadioCheck :list="heightValueTypesList" v-model="heigthValueType" @change="onTypeChange"/>

    <div class="control-height__input" v-if="heigthValueType === 'vh'">
      <!-- slider -->
      <p>1 vh is equivalent To 1% of the height of the browser window</p>
      <base-range-slider
        v-model="vhValue"
         step="1" min="1" max="100">
        {{vhValue}} vh
      </base-range-slider>
    </div>

    <div class="control-height__input" v-if="heigthValueType === 'px'">
      <!-- text field -->
      <base-text-field v-model="pxValue" label="Height in pixels"></base-text-field>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.control-height
  padding: 0 0 1rem

  &__input
    margin: 2rem 0 0

    p
      color: $grey-middle

  h6
    min-width: 28rem
    margin: 0 0 2.8rem 0
    padding: 0
    color: #272727
    font-size: 1.6rem
    font-weight: bold
    &:first-letter
      text-transform: uppercase
</style>
