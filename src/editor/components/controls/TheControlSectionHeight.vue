<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  data () {
    return {
      heightValueTypesList: [
        {
          text: this.$t('c.shAuto'),
          value: 'auto'
        },
        {
          text: this.$t('c.shVH'),
          value: 'vh'
        },
        {
          text: this.$t('c.shPx'),
          value: 'px'
        }
      ],
      heigthValueType: '',
      min: 1,
      max: 100,
      numVhValue: 100
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
    this.numVhValue = this.vhValue
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
    },

    setVh (value) {
      this.numVhValue = value
    },

    setVhValue (value) {
      this.vhValue = value
    }
  }
}
</script>

<template>
  <div class="b-control-height">
   <base-caption>
     Section height
   </base-caption>

    <BaseRadioCheck
      :list="heightValueTypesList"
      v-model="heigthValueType"
      @change="onTypeChange"
    />

    <div
      class="b-control-height__row"
      v-if="heigthValueType === 'vh'"
    >
      <base-range-slider
        :value="vhValue"
        step="1" :min="min" :max="max"
        @change="setVh"
      >
        <base-number-input
          class="b-control-height__number-input"
          :value="numVhValue"
          unit="vh"
          :maximum="max"
          @input="setVhValue"
        />
      </base-range-slider>
    </div>
    <div
      class="b-control-height__row"
      v-if="heigthValueType === 'vh'"
    >
      <span class="b-control-height__vhLabel">
        {{ $t('с.shVhLabel') }}
      </span>
    </div>

    <div
      class="b-control-height__row"
      v-if="heigthValueType === 'px'"
    >
      <div class="b-control-height__pxFileld">
        <base-text-field
          v-model="pxValue"
          label="Height in pixels"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-control-height
  &__row
    margin: 2rem 0 2rem 1rem
  &__number-input
    margin-left: 2rem
  &__vhLabel
    font-family: 'Roboto', Helvetica Neue, Helvetica, Arial, sans-serif
    font-style: italic
    font-weight: 500
    font-size: 10px
    line-height: 12px
    color: #A2A5A5
    letter-spacing: 0.065em

    padding-right: 3rem

    display: flex
    align-items: center
  &__pxFileld
    width: 15rem
    margin-left: 1rem
</style>
