<script>
import { mapState } from 'vuex'

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

    if (this.bgSize === 'auto auto') {
      this.backgroundFill = 'normal'
    }
    if (this.bgSize === 'auto 100%') {
      this.backgroundFill = 'vertically'
    }
    if (this.bgSize === 'auto 100%') {
      this.backgroundFill = 'horizontally'
    }
    if (this.bgSize === 'cover') {
      this.backgroundFill = 'both'
    }
    if (this.bgSize === 'contain') {
      this.backgroundFill = 'stretch'
    }

    if (this.bgAttachment === 'fixed') {
      this.isParallax = true
    }
  },

  methods: {
    setParallax () {
      if (this.isParallax) {
        this.styles['background-attachment'] = 'fixed'
      } else {
        this.styles['background-attachment'] = 'scroll'
      }
    },
    changeSize () {
      if (this.backgroundFill === 'normal') {
        this.styles['background-size'] = 'auto auto'
      }
      if (this.backgroundFill === 'vertically') {
        this.styles['background-size'] = 'auto 100%'
      }
      if (this.backgroundFill === 'horizontally') {
        this.styles['background-size'] = '100% auto'
      }
      if (this.backgroundFill === 'both') {
        this.styles['background-size'] = 'cover'
      }
      if (this.backgroundFill === 'stretch') {
        this.styles['background-size'] = 'contain'
      }
    },
    setPosition (x, y) {
      this.bgPosition = `${x} ${y}`
      this.styles['background-position'] = `${x} ${y}`
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
      position: absolute
      left: 50%
      top: 50%

      width: 1rem
      height: 1rem

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
      position: absolute
      left: 0.2rem
      top: 0.2rem

      border-right: none
      border-bottom: none
    &_lb
      position: absolute
      left: 0.2rem
      bottom: 0.2rem

      border-right: none
      border-top: none
    &_rt
      position: absolute
      right: 0.2rem
      top: 0.2rem

      border-left: none
      border-bottom: none
    &_rb
      position: absolute
      right: 0.2rem
      bottom: 0.2rem

      border-left: none
      border-top: none

</style>
