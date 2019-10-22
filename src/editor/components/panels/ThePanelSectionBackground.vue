<template>
  <div class="b-panel">
    <span class="b-panel__title">
      Section Background
    </span>

    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <template v-if="settingObjectOptions.background">

          <div class="b-panel__control">
            <div class="b-panel__picker" v-for="(picker, index) in backgroundPickers" :key="`picker-item-${ _uid }-${ index }`">
              <base-color-picker v-model="backgroundPickers[index]" :label="`Color ${ index > 0 ? index : '' }`" @change="updateBgColor"/>
              <div class="b-panel__picker-buttons">
                <span class="del"
                      tooltip="Remove color"
                      tooltip-position="left"
                      v-show="backgroundPickers.length > 1 && index > 0"
                      @click="removeBackgroundPicker(index)">
                  <icon-base name="close" color="#B1B1B1" width="10" height="10"></icon-base>
                </span>
                <span class="plus"
                      tooltip="Add gradient"
                      tooltip-position="left"
                      v-show="index === 0 && backgroundPickers.length < 4"
                      @click="addBackgroundPicker">
                  <icon-base name="plus" color="#B1B1B1" width="14" height="14"></icon-base>
                </span>
              </div>
            </div>
          </div>

          <div class="b-panel__control" v-if="!isMobile">
            <div class="b-panel__overlay">
              <div class="b-panel__overlay-col">
                <base-color-picker v-model="sectionOverlayColor" @change="updateOverlayColor" label="Overlay"></base-color-picker>
              </div>
              <div class="b-panel__overlay-col">
                <base-range-slider v-model="sectionOverlayOpacity" label="" step="1" min="0" max="100" @change="changeOverlayOpacity">
                  {{ sectionOverlayOpacity }} <span class="b-border-radius-control__px">%</span>
                </base-range-slider>
              </div>
            </div>
          </div>

          <div class="b-panel__control b-panel__control_select-type" v-if="!isMobile">
            <base-switcher
              :value="backgroundType === 'video'"
              label="Use video as background"
              @change="toggleBackgroundType"/>
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
                <control-background-position/>
              </div>
            </template>
          </div>

          <div v-show="backgroundType === 'video' && !isMobile" class="b-panel__control b-panel__control--video">
            <base-uploader
              v-model="settingObjectOptions.backgroundVideo"
              @upload="uploadVideo"
              label="Video"
              type="video"
            />
          </div>

        </template>
      </div>
    </base-scroll-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import BaseUploader from '../../../components/base/BaseUploader'
import ControlBackgroundPosition from './../controls/TheControlBackgroundPosition'

const DEFAULT_COLOR = 'rgba(255,255,255,1)'

function getPickerColor (color) {
  if (typeof color === 'object' && color.hasOwnProperty('rgba')) {
    return `rgba(${Object.values(color.rgba).toString()})`
  }
  return color
}

export default {
  name: 'ThePanelSectionBackground',

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
      fullScreen: false,

      sectionOverlayColor: '',
      sectionOverlayOpacity: '',
      sectionBgUrl: '',
      bgRepeat: '',
      bgSize: '',
      bgAttachment: '',
      list: [
        { text: 'No-repeat', value: 'no-repeat' },
        { text: 'Repeat', value: 'repeat' }
      ],
      sizeList: [
        { text: 'Tile', value: 'cover' },
        { text: 'Fill', value: 'contain' }
      ],

      backgroundPickers: []
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'sectionsGroups',
      'isGrouping',
      'settingObjectElement',
      'device',
      'isMobile'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    mediaStyles: {
      get () {
        let device = 'is-mobile'
        let media = { 'is-mobile': {} }
        let stylesMedia = this.settingObjectOptions.media

        if (stylesMedia === undefined) {
          stylesMedia = media
        }

        if (stylesMedia[device]) {
          for (let key in this.styles) {
            media[device][key] = stylesMedia[device][key] !== undefined && stylesMedia[device][key] !== '' ? stylesMedia[device][key] : this.styles[key]
          }
        } else {
          media[device] = this.styles
        }

        return media
      },
      set (value) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
          media: value
        }))
      }
    },

    backgroundType () {
      return this.settingObjectOptions.backgroundType
    },

    sectionId () {
      return this.settingObjectSection.id
    },

    isHeader () {
      return this.settingObjectSection.isHeader
    },

    overlay () {
      return this.settingObjectOptions.overlay
    }
  },

  watch: {
    device () {
      this.updateProps()
    }
  },

  created () {
    this.updateProps()
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject',
      'toggleGrouping',
      'setSettingSection',
      'clearSettingObject'
    ]),
    ...mapActions('Landing', [
      'saveState'
    ]),

    updateProps () {
      let styles = this.isMobile ? this.mediaStyles['is-mobile'] : this.styles
      let image = ''
      let bgimage = ''

      image = (!!styles['background-image'] && typeof styles['background-image'] === 'string') ?
        styles['background-image'] : ''

      bgimage = image.match(/url\((.*?)\)/)

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

      this.sectionOverlayColor = this.overlay.color
      this.sectionOverlayOpacity = parseInt(this.overlay.opacity * 100)

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

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
    },

    updateBgUrl () {
      this.updateBgColor()
    },

    addBackgroundPicker () {
      this.backgroundPickers.push(DEFAULT_COLOR)
      this.updateBgColor()
    },

    removeBackgroundPicker (index) {
      this.backgroundPickers.splice(index, 1)
      this.updateBgColor()
    },

    toggleBackgroundType (value) {
      let backgroundType = (value) ? 'video' : 'default'
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { backgroundType })
      )
    },

    uploadVideo (url) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { backgroundVideo: url || null })
      )
      // --- update video player
      document.querySelectorAll('video[id^="bg-video"]').forEach(video => {
        video.pause()
        video.load()
        video.play()
      })
    },

    updateOverlayColor () {
      const color = this.sectionOverlayColor.rgba ? `rgba(${Object.values(this.sectionOverlayColor.rgba).toString()})` : this.sectionOverlayColor

      this.overlay['color'] = color
    },

    changeOverlayOpacity () {
      this.overlay['opacity'] = this.sectionOverlayOpacity / 100
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  &__control
    margin-top: $size-step/2
    &_select-type
      margin: $size-step 0 $size-step/2
  &__overlay
   display: flex
   &-col
     /deep/
       .b-range-slider__row
         flex-direction: row-reverse
       .b-range-slider__text
         padding-left: 0.5rem
       .b-range-slider
         padding-left: 1rem
         .range-slider
           width: $size-step * 2
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
