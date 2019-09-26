<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Slot background
    </h6>

    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
          <div class="b-panel__control">
            <div class="b-panel__picker" v-for="(picker, index) in backgroundPickers" :key="`picker-item-${ _uid }-${ index }`">
              <base-color-picker v-model="backgroundPickers[index]" :label="`Color ${ index > 0 ? index : '' }`" @change="updateBgColor"/>
              <div class="b-panel__picker-buttons">
                <span class="del"
                  tooltip="Remove color"
                  tooltip-position="left"
                  v-show="backgroundPickers.length > 1 && index > 0"
                  @click="removeBackgroundPicker(index)"
                  >
                   <icon-base name="close" color="#B1B1B1" width="10" height="10"></icon-base>
                </span>
                <span class="plus"
                  tooltip="Add gradient"
                  tooltip-position="left"
                  v-show="index === 0 && backgroundPickers.length < 4"
                  @click="addBackgroundPicker"
                  >
                    <icon-base name="plus" color="#B1B1B1" width="14" height="14"></icon-base>
                </span>
              </div>
            </div>
          </div>

          <div v-show="backgroundType !== 'video'">
            <div class="b-panel__control">
              <base-uploader
                v-model="sectionBgUrl"
                @change="updateBgUrl"
                label="Image"
                type="image"
              />
            </div>
            <template v-if="sectionBgUrl !== '' && sectionBgUrl !== null">
              <div class="b-panel__control">
                <control-background-position container="slot"/>
              </div>
            </template>
          </div>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as _ from 'lodash-es'
import BaseUploader from '../../../components/base/BaseUploader'
import ControlBackgroundPosition from './../controls/TheControlBackgroundPosition'

const DEFAULT_COLOR = 'rgba(0,0,0,1)'

function getPickerColor (color) {
  if (typeof color === 'object' && color.hasOwnProperty('rgba')) {
    return `rgba(${Object.values(color.rgba).toString()})`
  }
  return color
}

export default {
  name: 'ThePanelSlotBackground',

  components: {
    BaseUploader,
    ControlBackgroundPosition
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sectionBgUrl: '',
      bgRepeat: '',
      bgSize: '',
      bgAttachment: '',
      backgroundPickers: []
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectSection',
      'device'
    ]),

    isMobile () {
      return this.device === 'is-mobile'
    },

    slot () {
      return this.settingObjectSection.get(this.sandbox.container) || {}
    },

    styles () {
      return (this.settingObjectSection.get(this.sandbox.container) || {}).styles
    },

    mediaStyles: {
      get () {
        let device = 'is-mobile'
        let media = { 'is-mobile': {} }
        let stylesMedia = (this.settingObjectSection.get(this.sandbox.container) || {}).media

        if (stylesMedia === undefined) {
          stylesMedia = media
        }

        if (stylesMedia[device]) {
          for (let key in this.styles) {
            media[device][key] = stylesMedia[device][key] !== undefined ? stylesMedia[device][key] : this.styles[key]
          }
        } else {
          media[device] = this.styles
        }

        return media
      },
      set (value) {
        this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.slot, {
          media: value
        }))
      }
    },

    backgroundType: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.container, {
          backgroundType: value
        })
      },
      get () {
        return this.slot.backgroundType
      }
    }
  },

  watch: {
    sandbox (value) {
      let opts = this.settingObjectSection.get(this.sandbox.container) || {}
      this.settingObjectSection.set(this.sandbox.container, opts)

      this.updateProps()
    }
  },

  created () {
    this.updateProps()
  },

  methods: {
    updateProps () {
      let styles = this.isMobile ? this.mediaStyles['is-mobile'] : this.styles

      let image = (!!styles['background-image'] && typeof styles['background-image'] === 'string') ?
        styles['background-image'] : ''
      let bgimage = image.match(/url\((.*?)\)/)

      if (bgimage) {
        bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
        this.sectionBgUrl = bgimage || ''
      }

      let bggradient = image.match(/linear-gradient(\(.*\))/g)
      if (bggradient) {
        this.backgroundPickers = bggradient[0]
          .replace(/^linear-gradient[(]/, '')
          .replace(/[)]$/, '')
          .split(', ')
      } else {
        this.backgroundPickers = [styles['background-color']]
      }
      this.updateBgColor(DEFAULT_COLOR)

      this.bgRepeat = styles['background-repeat'] || 'no-repeat'
      this.bgSize = styles['background-size'] || 'cover'
      this.bgAttachment = styles['background-attachment'] === 'fixed'
    },

    updateBgColor (value) {
      let pickers = this.backgroundPickers
      let bgimage = this.sectionBgUrl
      let styles = { 'background-color': '' }
      let props = {}

      switch (pickers.length) {
        case 1:
          styles['background-color'] = getPickerColor(this.backgroundPickers[0])
          styles['background-image'] = (bgimage) ? `url(${bgimage})` : ''
          break
        default:
          let colors = pickers.filter(Boolean).map(getPickerColor)
          if (colors.length) {
            let mappedColor = [...colors.splice(0, 1), ...(colors || []).map(c => ` ${c}`)]
            let gradient = `linear-gradient(${mappedColor})`
            styles['background-image'] = (bgimage) ? (`url(${bgimage})` + `, ${gradient}`) : gradient
          }
          break
      }

      this.isMobile ? props = { 'media': { 'is-mobile': styles } } : props = { 'styles': styles }

      this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.slot, props))
    },

    updateBgUrl () {
      this.updateBgColor()
    },

    changeRepeat () {
      this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.options, {
        styles: {
          'background-repeat': this.bgRepeat
        }
      }))
    },

    changeSize () {
      this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.options, {
        styles: {
          'background-size': this.bgSize
        }
      }))
    },

    changeAttachment () {
      this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.options, {
        styles: {
          'background-attachment': this.bgAttachment ? 'fixed' : 'scroll'
        }
      }))
    },

    addBackgroundPicker () {
      this.backgroundPickers.push(DEFAULT_COLOR)
      this.updateBgColor()
    },

    removeBackgroundPicker (index) {
      this.backgroundPickers.splice(index, 1)
      this.updateBgColor()
    },

    update (prop, value) {
      let props = {}
      let styles = {}
      let media = {}

      styles[prop] = value

      media[`${this.device}`] = {}
      media[`${this.device}`][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

      this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.slot, props))
    },

    getPropValue (prop) {
      let s = ''

      if (this.isMobile && this.mediaStyles[`${this.device}`] && this.mediaStyles[`${this.device}`][prop]) {
        s = this.mediaStyles[`${this.device}`][prop]
      } else {
        s = this.styles[prop]
      }

      return s
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: flex-start

  padding-bottom: 4.5rem
  height: 100%
  width: 100%
  &__control
    margin-top: $size-step/2
    &_select-type
      margin: $size-step 0 $size-step/2
  &__buttons
    position: absolute
    bottom: 1rem
    left: 1rem
    right: 1rem
    button
      margin: 0 auto
      max-width: 100%
      display: block

  &__description
    font-size: 1.4rem
    line-height: 1.7rem
    color: #747474
    margin-bottom: 2rem
    margin-top: -1rem
  .vue-scrollbar__wrapper
    margin: 0
  &__picker
    display: flex
    align-items: center
    margin: $size-step/2 0
    &-buttons
      width: $size-step
    & span
      display: flex
      align-items: center
      justify-content: center

      width: $size-step
      height: $size-step

      border-radius: 100%
      border: 0.2rem solid $ligth-grey
      transition: all .3s cubic-bezier(.2,.85,.4,1.275)
      &:hover
        cursor: pointer
        background-color: $white
      &.del svg
        fill: $ligth-grey
      &.del:hover
        border: 0.2rem solid $orange
        & svg
          fill: $orange
      &.plus svg
        fill: $dark-blue-krayola
      &.plus:hover
        border: 0.2rem solid $dark-blue-krayola
        & svg
          fill: $dark-blue-krayola
    &__description
      font-size: 1.4rem
      line-height: 1.7rem
      color: #747474
      margin-bottom: 2rem
      margin-top: -1rem
      justify-content: space-between

    &__button
      width: 3rem
      padding: .4rem
      line-height: 1

    &__item
      display: flex
      align-items: baseline
      justify-content: space-between
</style>
