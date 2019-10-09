<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
const VALID_TYPES = ['section', 'slot']

export default {

  props: {
    container: {
      type: String,
      default: VALID_TYPES[0],
      validator: value => VALID_TYPES.includes(value)
    }
  },

  data () {
    return {
      bgImg: '',
      bgPosition: '',
      bgRepeat: '',
      bgSize: '',
      left: 0,
      top: 0,
      bgAttachment: '',
      isParallax: false,
      backgroundFillTypes: [
        {
          text: 'Normal',
          value: 'normal'
        },
        {
          text: 'Tile vertically',
          value: 'vertically'
        },
        {
          text: 'Tile horizontally',
          value: 'horizontally'
        },
        {
          text: 'Tile both',
          value: 'both'
        },
        {
          text: 'Cover',
          value: 'cover'
        },
        {
          text: 'Stretch',
          value: 'stretch'
        }
      ],
      backgroundFill: '',
      pos: 'center'
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sandbox',
      'settingObjectSection',
      'settingObjectOptions',
      'device'
    ]),

    isMobile () {
      return this.device === 'is-mobile'
    },

    options () {
      return this.settingObjectSection.get(this.sandbox.container)
    },

    isHeader () {
      return this.settingObjectSection.isHeader
    },

    styles () {
      if (this.container === VALID_TYPES[0]) {
        return this.settingObjectOptions.styles
      } else {
        return (this.settingObjectSection.get(this.sandbox.container) || {}).styles
      }
    },

    mediaStyles: {
      get () {
        let device = 'is-mobile'
        let media = { 'is-mobile': {} }
        let stylesMedia = {}

        if (this.container === VALID_TYPES[0] && this.settingObjectOptions.media) {
          stylesMedia = this.settingObjectOptions.media
        } else if ((this.settingObjectSection.get(this.sandbox.container) || {}).media) {
          stylesMedia = (this.settingObjectSection.get(this.sandbox.container) || {}).media
        } else {
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
    }
  },

  watch: {
    device () {
      this.getStyles()
    },

    styles (value) {
      let image = (!!value['background-image'] && typeof value['background-image'] === 'string') ?
        value['background-image'] : ''
      let bgimage = image.match(/url\((.*?)\)/)

      if (bgimage) {
        bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
        this.bgImage = bgimage || ''
      }
    }
  },

  created () {
    this.getStyles()
  },

  methods: {
    ...mapActions('Sidebar', ['updateSettingOptions']),

    getStyles () {
      let styles = this.isMobile ? this.mediaStyles['is-mobile'] : this.styles
      let bgPosition = ''

      let image = (!!styles['background-image'] && typeof styles['background-image'] === 'string') ?
        styles['background-image'] : ''
      let bgimage = image.match(/url\((.*?)\)/)

      if (bgimage) {
        bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
        this.bgImage = bgimage || ''
      }

      bgPosition = styles['background-position'] || '50% 0%'
      if (bgPosition.indexOf(' ') !== -1) {
        bgPosition = bgPosition.split(' ')

        if (bgPosition[0].indexOf('%') !== -1) this.left = parseInt(bgPosition[0].split('%')[0])
        if (bgPosition[1].indexOf('%') !== -1) this.top = parseInt(bgPosition[1].split('%')[0])

        this.bgPosition = `${this.left}% ${this.top}%`
      } else {
        this.bgPosition = styles['background-position'] || '50% 0%'
      }

      this.bgRepeat = styles['background-repeat'] || 'no-repeat'
      this.bgSize = styles['background-size'] || 'contain'
      this.bgAttachment = styles['background-attachment'] || 'scroll'

      if (this.bgSize === 'auto auto' && this.bgRepeat === 'no-repeat') {
        this.backgroundFill = 'normal'
      }
      if (this.bgSize === 'auto auto' && this.bgRepeat === 'repeat') {
        this.backgroundFill = 'both'
      }
      if (this.bgSize === 'auto auto' && this.bgRepeat === 'repeat-y') {
        this.backgroundFill = 'vertically'
      }
      if (this.bgSize === 'auto auto' && this.bgRepeat === 'repeat-x') {
        this.backgroundFill = 'horizontally'
      }
      if (this.bgSize === 'cover') {
        this.backgroundFill = 'cover'
      }
      if (this.bgSize === 'contain') {
        this.backgroundFill = 'stretch'
      }
      if (this.bgAttachment === 'fixed') {
        this.isParallax = true
      }
    },

    setParallax () {
      if (this.isParallax) {
        this.update('background-attachment', 'fixed')
      } else {
        this.update('background-attachment', 'scroll')
      }
    },

    changeSize () {
      if (this.backgroundFill === 'normal') {
        this.update('background-size', 'auto auto')
        this.update('background-repeat', 'no-repeat')
      }
      if (this.backgroundFill === 'vertically') {
        this.update('background-size', 'auto auto')
        this.update('background-repeat', 'repeat-y')
      }
      if (this.backgroundFill === 'horizontally') {
        this.update('background-size', 'auto auto')
        this.update('background-repeat', 'repeat-x')
      }
      if (this.backgroundFill === 'cover') {
        this.update('background-size', 'cover')
        this.update('background-repeat', 'no-repeat')
      }
      if (this.backgroundFill === 'stretch') {
        this.update('background-size', 'contain')
        this.update('background-repeat', 'no-repeat')
      }
      if (this.backgroundFill === 'both') {
        this.update('background-size', 'auto auto')
        this.update('background-repeat', 'repeat')
      }
      if (this.backgroundFill === 'set') {
        this.update('background-size', `${this.left}% ${this.top}%`)
        this.update('background-repeat', 'no-repeat')
      }
    },

    setPosition (x, y) {
      this.bgPosition = `${x} ${y}`
      this.update('background-position', `${x} ${y}`)
    },

    setLeftTopPosition () {
      let x = this.left
      let y = this.top
      this.bgPosition = `${x}% ${y}%`
      this.update('background-position', `${x}% ${y}%`)
    },

    update (prop, value) {
      let props = {}
      let styles = {}
      let media = {}

      styles[prop] = value

      media[`${this.device}`] = {}
      media[`${this.device}`][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

      if (this.container === VALID_TYPES[0]) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
      } else {
        this.settingObjectSection.set(this.sandbox.container, _.merge({}, this.options, { styles: this.styles }, props))
      }
    }
  },

  updated () {
    this.getStyles()
  }
}
</script>

<template>
  <div class="b-bg-controls">
    <div class="b-section-settings__control">
      <div class="b-background-position" :style="{
        '--mobile-background-color': mediaStyles['is-mobile']['background-color'],
        '--mobile-background-image': mediaStyles['is-mobile']['background-image'],
        '--mobile-background-position': mediaStyles['is-mobile']['background-position'],
        '--mobile-background-repeat': mediaStyles['is-mobile']['background-repeat'],
        '--mobile-background-size': mediaStyles['is-mobile']['background-size'],
        '--mobile-background-attachment': mediaStyles['is-mobile']['background-attachment']
      }">
        <div class="b-background-position__content"
          :style="[
            isMobile ? { 'background-image': mediaStyles['is-mobile']['background-image'] } : { 'background-image': `url(${bgImage})` },
            isMobile ? { 'background-size': mediaStyles['is-mobile']['background-size'] } : { 'background-size': styles['background-size'] },
            isMobile ? { 'background-position': mediaStyles['is-mobile']['background-position'] } : { 'background-position': styles['background-position'] }
          ]"
          >
          <span class="b-background-position__btn b-background-position__btn_center"
                :class="{ 'selected' : bgPosition === '50% 50%' }"
                @click="setPosition('50%', '50%')"/>
          <span class="b-background-position__btn b-background-position__btn_lt"
                :class="{ 'selected' : bgPosition === '0% 0%' }"
                @click="setPosition('0%', '0%')" />
          <span class="b-background-position__btn b-background-position__btn_lb"
                :class="{ 'selected' : bgPosition === '0% 100%' }"
                @click="setPosition('0%', '100%')"/>
          <span class="b-background-position__btn b-background-position__btn_rt"
                :class="{ 'selected' : bgPosition === '100% 0%' }"
                @click="setPosition('100%', '0%')"/>
          <span class="b-background-position__btn b-background-position__btn_rb"
                :class="{ 'selected' : bgPosition === '100% 100%' }"
                @click="setPosition('100%', '100%')"/>

          <span class="b-background-position__btn b-background-position__btn_tc"
                :class="{ 'selected' : bgPosition === '50% 0%' }"
                @click="setPosition('50%', '0%')"></span>
          <span class="b-background-position__btn b-background-position__btn_rc"
                :class="{ 'selected' : bgPosition === 'right center' }"
                @click="setPosition('100%', '50%')"></span>
          <span class="b-background-position__btn b-background-position__btn_bc"
                :class="{ 'selected' : bgPosition === '50% 100%' }"
                @click="setPosition('50%', '100%%')"></span>
          <span class="b-background-position__btn b-background-position__btn_lc"
                :class="{ 'selected' : bgPosition === '0% 50%' }"
                @click="setPosition('0%', '50%')"></span>
        </div>
      </div>
      <div class="b-size-controls">
        <div class="b-size-controls__control">
          <base-range-slider v-model="left" :label="`Left`" step="1" min="-100" max="100" @change="setLeftTopPosition">
            {{ left }} <span class="b-size-controls__px">%</span>
          </base-range-slider>
        </div>
        <div class="b-size-controls__control">
          <base-range-slider v-model="top" :label="`Top`" step="1" min="-100" max="100" @change="setLeftTopPosition">
            {{ top }} <span class="b-size-controls__px">%</span>
          </base-range-slider>
        </div>
      </div>
    </div>
    <div class="b-section-settings__control b-bg-controls__control_parallax">
      <BaseRadioCheck :list="backgroundFillTypes" v-model="backgroundFill" @change="changeSize"/>
    </div>
    <div class="b-bg-controls__control" v-if="!isHeader">
      <BaseSwitcher v-model="isParallax" label="Parallax on background" @change="setParallax" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-bg-controls
  padding: 0 0 $size-step/2
  &__control
    margin-bottom: $size-step/2
    &_parallax
      padding: 0 0 $size-step
    &:lastt-child
      margin-bottom: 0

.b-background-position
  width: 24rem
  height: 16rem

  background-color: #EFEFEF
  padding: $size-step/4
  margin: 0 0 $size-step/2 0
  &__content
    width: 100%
    height: 100%

    background-color: #DADADA
    background-repeat: no-repeat

    position: relative
  .is-mobile &__content
    background-color: var(--mobile-background-color) !important
    background-position: var(--mobile-background-position) !important
    background-repeat: var(--mobile-background-repeat) !important
    background-size: var(--mobile-background-size) !important
    background-attachment: var(--mobile-background-attachment) !important

  @media only screen and (max-width: 768px)
    &__content
      background-color: var(--mobile-background-color) !important
      background-image: var(--mobile-background-image) !important
      background-position: var(--mobile-background-position) !important
      background-repeat: var(--mobile-background-repeat) !important
      background-size: var(--mobile-background-size) !important
      background-attachment: var(--mobile-background-attachment) !important
  &__btn
    position: absolute
    width: 1rem
    height: 1rem
    border: 0.2rem solid #fff

    transition: all 0.1s ease
    cursor: pointer
    &:after,
    &:before
      transition: background-color 0.1s ease, border 0.1s ease
    &:hover,
    &.selected
      transform: scale(1.4)
      border-color: $dark-blue-krayola
      &:before
        background-color: $dark-blue-krayola
    &_center
      left: 50%
      top: 50%

      width: 1rem
      height: 1rem
      margin: -0.5rem 0 0 -0.5rem

      border: 0.2rem solid #fff
      border-radius: 100%

      display: flex
      justify-content: center
      align-items: center
      &:before
        content: ""
        width: 0.4rem
        height: 0.4rem

        background-color: #fff
        border-radius: 100%
    &_lt
      left: 0.2rem
      top: 0.2rem

      border-right: none
      border-bottom: none
    &_lb
      left: 0.2rem
      bottom: 0.2rem

      border-right: none
      border-top: none
    &_rt
      right: 0.2rem
      top: 0.2rem

      border-left: none
      border-bottom: none
    &_rb
      right: 0.2rem
      bottom: 0.2rem

      border-left: none
      border-top: none
    &_tc
      top: .2rem
      left: calc(50% - .5rem)

      border-left: none
      border-right: none
      border-bottom: none
    &_rc
      top: calc(50% - .5rem)
      right: .2rem

      border-left: none
      border-top: none
      border-bottom: none
    &_bc
      bottom: .2rem
      left: calc(50% - .5rem)

      border-left: none
      border-right: none
      border-top: none
    &_lc
      left: .2rem
      top: calc(50% - .5rem)

      border-top: none
      border-right: none
      border-bottom: none

.b-size
  margin-top: $size-step/2
  &-controls
    display: flex
    justify-content: stretch
    align-items: flex-start
    &__control
      width: 50%
      margin-right: $size-step/4
    &__px
     color: $grey-middle
</style>
