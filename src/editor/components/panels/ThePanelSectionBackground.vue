<template>
  <div class="b-panel">
    <span class="b-panel__title">
      <span>
        <span>{{ settingObjectSection.name }}</span>
      </span>
    </span>
    <div class="b-panel__content" v-if="settingObjectOptions.background">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-tabs"
      />
      <div class="layout layout__bg" v-if="activeTab === 'image'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control">
              <base-caption help="Section's background image">
                  Background image
              </base-caption>
              <div class="b-panel__col">
                <base-uploader
                  v-model="sectionBgUrl"
                  @change="updateBgUrl"
                  label="Image"
                  type="image"
                />
                <template v-if="sectionBgUrl !== '' && sectionBgUrl !== null">
                  <control-background-position/>
                </template>

                <div class="b-panel__picker"
                  v-for="(picker, index) in backgroundPickers"
                  :key="`picker-item-${ _uid }-${ index }`"
                >
                  <base-color-picker
                    v-model="backgroundPickers[index]"
                    :label="`Background color ${ index > 0 ? index + 1: '' }`"
                    @change="updateBgColor"
                  >
                    <div class="b-panel__picker-buttons" slot="buttons">
                      <span class="del"
                        tooltip="Remove color"
                        tooltip-position="top"
                        v-show="backgroundPickers.length > 1 && index > 0"
                        @click="removeBackgroundPicker(index)"
                      >
                        <icon-base
                          name="close"
                          color="#B1B1B1"
                          width="10" height="10"
                        />
                      </span>
                      <span class="plus"
                        tooltip="Create gradient"
                        tooltip-position="top"
                        v-show="index === 0 && backgroundPickers.length < 4"
                        @click="addBackgroundPicker"
                      >
                        <icon-base
                          name="plus"
                          color="#B1B1B1"
                          width="10" height="10"
                        />
                      </span>
                    </div>
                  </base-color-picker>
                </div>
              </div>
            </div>
            <div class="b-panel__control">
              <div class="b-panel__row">
                <base-caption help="Layer overlaps background ">
                  Overlay layer
                </base-caption>
                <div class="b-panel__col b-panel__col_overlay-color">
                  <base-color-picker
                    v-model="sectionOverlayColor"
                    @change="updateOverlayColor"
                    label=""
                  />
                </div>
              </div>
              <div class="b-panel__col">
                <base-range-slider
                  v-model="sectionOverlayOpacity"
                  step="1"
                  min="0"
                  max="100"
                  @change="changeOverlayOpacity"
                >
                  <base-number-input
                    :value="numOverlayValue"
                    unit="%"
                    :maximum="100"
                    @input="setOverlayValue"
                  />
                </base-range-slider>
              </div>
            </div>

            <template v-if="sectionBgUrl !== '' && sectionBgUrl !== null">
              <div class="b-panel__control" v-if="!isHeader">
                <div class="b-panel__row">
                  <base-caption help="Parallax on background">
                    Parallax
                  </base-caption>
                  <div class="b-panel__col">
                    <BaseSwitcher
                      v-model="isParallax"
                      @change="setParallax"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </base-scroll-container>
      </div>
      <div class="layout layout__bg" v-if="activeTab === 'video'">
        <base-scroll-container>
          <div class="layout-padding">
            <div v-show="!isMobile" class="b-panel__control b-panel__control--video">
              <base-caption help="Section's background video">
                Background video
              </base-caption>
              <base-uploader
                v-model="settingObjectOptions.backgroundVideo"
                @upload="uploadVideo"
                label="Video"
                type="video"
              />
            </div>
            <div class="b-panel__control">
              <div class="b-panel__row">
                <base-caption help="Layer overlaps background ">
                  Overlay layer
                </base-caption>
                <div class="b-panel__col b-panel__col_overlay-color">
                  <base-color-picker
                    v-model="sectionOverlayColor"
                    @change="updateOverlayColor"
                    label=""
                  />
                </div>
              </div>
              <div class="b-panel__col">
                <base-range-slider
                  v-model="sectionOverlayOpacity"
                  step="1"
                  min="0"
                  max="100"
                  @change="changeOverlayOpacity"
                >
                  <base-number-input
                    :value="numOverlayValue"
                    unit="%"
                    :maximum="100"
                    @input="setOverlayValue"
                  />
                </base-range-slider>
              </div>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
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
      backgroundPickers: [],
      isParallax: false,
      tabs: [
        { value: 'image', text: 'Image' },
        { value: 'video', text: 'Video' }
      ],
      activeTab: 'image',
      numOverlayValue: 0
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
    },

    parallax () {
      return this.settingObjectOptions.parallax
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

      this.isParallax = this.parallax
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

    toggleBackgroundAttachment (value) {
      let backgroundAttachment = (value) ? 'fixed' : 'scroll'
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { styles: { 'background-attachment': backgroundAttachment } })
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
      this.numOverlayValue = this.sectionOverlayOpacity
    },

    setOverlayValue (value) {
      this.sectionOverlayOpacity = value
      this.overlay['opacity'] = value / 100
    },

    setParallax () {
      this.toggleBackgroundAttachment(this.isParallax)
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        parallax: this.isParallax
      }))
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  .vue-scrollbar__wrapper
    margin: 0
  &__picker
    display: flex
    align-items: center
    margin: 0 0 $size-step/2
    &-buttons
      width: 1.9rem
    & span
      display: flex
      align-items: center
      justify-content: center

      width: 2rem
      height: 2rem

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
        fill: $main-green
      &.plus:hover
        border: 0.2rem solid $main-green
        & svg
          fill: $main-green

  &__col_overlay-color
    margin: 0 0 1.8rem 0
</style>
