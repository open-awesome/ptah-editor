<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {

  data () {
    return {
      bgImg: '',
      bgPosition: '',
      bgRepeat: '',
      bgSize: '',
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
      'settingObjectSection',
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType'
    ]),

    isHeader () {
      return this.settingObjectSection.isHeader
    },

    styles () {
      return this.settingObjectOptions.styles
    }
  },

  watch: {
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
    let image = (!!this.styles['background-image'] && typeof this.styles['background-image'] === 'string') ?
      this.styles['background-image'] : ''
    let bgimage = image.match(/url\((.*?)\)/)

    if (bgimage) {
      bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
      this.bgImage = bgimage || ''
    }

    this.bgPosition = this.styles['background-position'] || 'center center'
    this.bgRepeat = this.styles['background-repeat'] || 'no-repeat'
    this.bgSize = this.styles['background-size'] || 'contain'
    this.bgAttachment = this.styles['background-attachment'] || 'scroll'

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

  methods: {
    ...mapActions('Sidebar', ['updateSettingOptions']),

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
    },
    setPosition (x, y) {
      this.bgPosition = `${x} ${y}`
      this.update('background-position', `${x} ${y}`)
    },

    update (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    }
  }
}
</script>

<template>
  <div class="b-bg-controls">
    <div class="b-section-settings__control">
      <div class="b-background-position">
        <div class="b-background-position__content"
          :style="{ 'background-image' : `url(${bgImage})`, 'background-size': styles['background-size'], 'background-position': styles['background-position']  }"
          >
          <span class="b-background-position__btn b-background-position__btn_center"
                :class="{ 'selected' : bgPosition === 'center center' }"
                @click="setPosition('center', 'center')"/>
          <span class="b-background-position__btn b-background-position__btn_lt"
                :class="{ 'selected' : bgPosition === 'left top' }"
                @click="setPosition('left', 'top')" />
          <span class="b-background-position__btn b-background-position__btn_lb"
                :class="{ 'selected' : bgPosition === 'left bottom' }"
                @click="setPosition('left', 'bottom')"/>
          <span class="b-background-position__btn b-background-position__btn_rt"
                :class="{ 'selected' : bgPosition === 'right top' }"
                @click="setPosition('right', 'top')"/>
          <span class="b-background-position__btn b-background-position__btn_rb"
                :class="{ 'selected' : bgPosition === 'right bottom' }"
                @click="setPosition('right', 'bottom')"/>

          <span class="b-background-position__btn b-background-position__btn_tc"
                :class="{ 'selected' : bgPosition === 'top center' }"
                @click="setPosition('top', 'center')"></span>
          <span class="b-background-position__btn b-background-position__btn_rc"
                :class="{ 'selected' : bgPosition === 'right center' }"
                @click="setPosition('right', 'center')"></span>
          <span class="b-background-position__btn b-background-position__btn_bc"
                :class="{ 'selected' : bgPosition === 'bottom center' }"
                @click="setPosition('bottom', 'center')"></span>
          <span class="b-background-position__btn b-background-position__btn_lc"
                :class="{ 'selected' : bgPosition === 'left center' }"
                @click="setPosition('left', 'center')"></span>
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
</style>
