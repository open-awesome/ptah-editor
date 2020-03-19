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
  <div class="b-control-height">
   <base-label>
     Section height
   </base-label>

    <BaseRadioCheck
      :list="heightValueTypesList"
      v-model="heigthValueType"
      @change="onTypeChange"
    />

    <div
      class="control-height__input"
      v-if="heigthValueType === 'vh'"
    >
      <!-- slider -->
      <base-range-slider
        v-model="vhValue"
         step="1" min="1" max="100">
        {{vhValue}} vh
      </base-range-slider>
      <p>
        {{ $t('с.shVhLabel') }}
      </p>
    </div>

    <div
      class="control-height__input"
      v-if="heigthValueType === 'px'"
    >
      <!-- text field -->
      <base-text-field
        v-model="pxValue"
        label="Height in pixels"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-control-height
  &__input
    margin: 2rem 0 0
    p
      color: $grey-middle
</style>
