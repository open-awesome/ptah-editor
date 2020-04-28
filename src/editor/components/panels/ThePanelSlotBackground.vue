<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Block
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__content">
      <div class="layout _top-0 layout__bg">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control">
              <base-caption help="Block's background image">
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
                  <control-background-position container="slot"/>
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
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as _ from 'lodash-es'
import BaseUploader from '../../../components/base/BaseUploader'
import ControlBackgroundPosition from './../controls/TheControlBackgroundPosition'
import IndicatorPlatform from '../IndicatorPlatform'

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
    IndicatorPlatform,
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
      'device',
      'isMobile'
    ]),

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

    addBackgroundPicker () {
      this.backgroundPickers.push(DEFAULT_COLOR)
      this.updateBgColor()
    },

    removeBackgroundPicker (index) {
      this.backgroundPickers.splice(index, 1)
      this.updateBgColor()
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
