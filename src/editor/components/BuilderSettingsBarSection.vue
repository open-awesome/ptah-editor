<template>
<div class="b-section-settings">
  <base-scroll-container backgroundBar="#999">
    <div class="b-section-settings__inner">
      <div class="b-section-settings__control">
        <control-section-layouts :builder="builder"></control-section-layouts>
      </div>

      <div class="b-section-settings__control">
        <div class="b-section-settings__header">
          <span>Heights</span>
        </div>
        <base-label>Full screen height</base-label>
        <BaseSwitcher v-model="fullScreen" @change="setHeight" />
      </div>

      <!-- System requirements -->
      <control-system-requirements
        :expand="expandedSystemRequirements"
        @open="onExpand"
        v-if="settingObjectOptions.hasSystemRequirements"
      >
      </control-system-requirements>

      <!-- Products Section Controls -->
      <control-section-products
        :expand="expandedProducts"
        @open="onExpand"
        v-if="settingObjectOptions.hasProducts"
      >
      </control-section-products>

      <!-- font -->
      <div class="b-elem-settings__control" v-if="settingObjectOptions.typography">
        <control-text
          :fontSize="fontSize"
          :fontFamily="fontFamily"
          :fontColor="fontColor"
          :fontStyles="styles"
          :expand="expandedFont"
          @open="onExpand"
          @change="styleChange"></control-text>
      </div>

      <template v-if="settingObjectOptions.background">

        <div class="b-section-settings__header">
          <span>Background</span>
        </div>

        <div class="b-section-settings__control">
          <base-label>Use video as background</base-label>
          <base-switcher
            :value="backgroundType === 'video'"
            @change="toggleBackgroundType"/>
        </div>

        <div v-if="backgroundType === 'video'" class="b-section-settings__control b-section-settings__control--video">
          <BaseUploadInput
            :value="settingObjectOptions.backgroundVideo"
            @upload="uploadVideo"
            label="Background video"
            placeholder="paste Video URL" />
        </div>

        <template v-else>
          <div class="b-section-settings__control">
            <base-color-picker v-model="sectionBgColor" @change="updateBgColor" label="Background color"></base-color-picker>
          </div>
          <div class="b-section-settings__control">
            <base-uploader v-model="sectionBgUrl" @change="updateBgUrl" label="Background image"/>
          </div>
          <template v-if="sectionBgUrl.length">
            <div class="b-section-settings__control">
              <BaseButtonTabs :list="list" v-model="bgRepeat" @change="changeRepeat"/>
            </div>
            <div class="b-section-settings__control">
              <BaseButtonTabs :list="sizeList" v-model="bgSize" @change="changeSize"/>
            </div>
            <div class="b-section-settings__control">
              <base-label>Fixed while scrolling</base-label>
              <BaseSwitcher v-model="bgAttachment" @change="changeAttachment" />
            </div>
          </template>
        </template>

      </template>

      <!-- Video Section Controls-->
      <!-- Title -->
      <template v-if="settingObjectOptions.hasVideo">
        <div class="b-section-settings__control">
          <BaseTextField
            v-model="videoTitle"
            label="Video title"
            @input="updateSimpleValue('videoTitle', videoTitle)"
          />
        </div>

        <!-- VideoUrl -->
        <div class="b-section-settings__control">
          <BaseUploadInput
            v-model="videoUrl"
            label="Video URL"
            @upload="updateSimpleValue('videoUrl', videoUrl)"
          />
        </div>

        <div class="b-section-settings__description">
          YouTube video url or any mp4 file url is allowed.<br>
          To play the video please use Preview button.
        </div>

        <div class="b-section-settings__control">
          <BaseSwitcher
            v-model="loop"
            label="Loop"
            @change="updateSimpleValue('loop', loop)"
          />
        </div>
      </template>

      <!-- Header -->
      <div class="b-section-settings__control" v-if="settingObjectOptions.hasHeader">
        <BaseTextField
          v-model="header"
          label="Header"
          @input="updateSimpleValue('header', header)"
        />
      </div>

      <!-- Images Multiple Upload -->
      <div class="b-section-settings__control" v-if="settingObjectOptions.hasMultipleImages">
        <base-uploader
          :value="galleryImages"
          @change="updateGalleryImages"
          label="Images upload"
          multiple/>
      </div>

    </div>

  </base-scroll-container>

  <div class="b-section-settings__buttons">
    <base-button :color="'light-gray'" @click="deleteSection">Delete</base-button>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import ControlSectionProducts from './controls/TheControlSectionProducts.vue'
import ControlSystemRequirements from './controls/TheControlSystemRequirements.vue'
import ControlText from './controls/TheControlText'
import ControlSectionLayouts from './controls/TheControlSectionLayouts.vue'
import BaseUploader from '../../components/base/BaseUploader'

const DEFAULT_COLOR = 'rgba(0,0,0,1)'

function getPickerColor (color) {
  if (typeof color === 'object' && color.hasOwnProperty('rgba')) {
    return `rgba(${Object.values(color.rgba).toString()})`
  }
  return color
}

export default {
  components: {
    BaseUploader,
    ControlSectionProducts,
    ControlSystemRequirements,
    ControlText,
    ControlSectionLayouts
  },
  name: 'BuilderSettingsBarSection',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      fullScreen: false,

      sectionBgColor: '',
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

      videoTitle: '',
      videoUrl: '',

      loop: false,

      galleryImages: [],
      backgroundPickers: [],

      /* vars for control system requirements */
      systemRequirements: {},
      rowsRequirements: {},
      selectPlatform: {},
      expandedSystemRequirements: true,

      /* text styles */
      fontSize: null,
      fontFamily: '',
      fontColor: '',
      expandedFont: false,

      styles: [],
      productsCount: 0,
      expandedProducts: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ]),
    bgAttachmentCheckbox: {
      set (value) {
        this.bgAttachment = value ? 'fixed' : 'scroll'
      },
      get () {
        return this.bgAttachment === 'fixed'
      }
    },
    backgroundType () {
      return this.settingObjectOptions.backgroundType
    }
  },

  created () {
    let styles = this.settingObjectOptions.styles
    let image = (typeof styles['background-image'] === 'string') ? styles['background-image'] : ''
    let bgimage = image.match(/url\((.*?)\)/)

    if (bgimage) {
      bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
    }

    this.sectionBgColor = styles['background-color']
    this.sectionBgUrl = bgimage || ''
    this.bgRepeat = styles['background-repeat'] === 'no-repeat' ? this.sizeList[0] : this.sizeList[1]
    this.bgSize = styles['background-size'] === 'cover' ? this.sizeList[0] : this.sizeList[1]
    this.bgAttachment = styles['background-attachment'] === 'fixed'

    /* Video */
    this.videoTitle = this.settingObjectOptions.videoTitle
    this.videoUrl = this.settingObjectOptions.videoUrl
    this.loop = this.settingObjectOptions.loop

    this.header = this.settingObjectOptions.header || ''

    /* Gallery */
    this.galleryImages = this.settingObjectOptions.galleryImages || []

    if (this.settingObjectOptions.classes.indexOf('full-height') !== -1) {
      this.fullScreen = true
    }

    /* System Requirements */
    this.systemRequirements = this.settingObjectOptions.systemRequirements || {}
    this.rowsRequirements = this.settingObjectOptions.rowsRequirements || {}
    this.selectPlatform = this.settingObjectOptions.selectPlatform || {}

    /* Get font settings */
    this.fontFamily = styles['font-family'] || ''
    this.fontSize = styles['font-size'] || 1.6
    this.fontColor = styles['color'] || '#000000'

    if (styles['font-style']) {
      this.styles.push({ prop: 'font-style', value: styles['font-style'] })
    }

    /* Products */
    this.products = this.settingObjectOptions.products || {}
  },

  watch: {
    'settingObjectOptions.styles': {
      immediate: true,
      handler (value) {
        let image = (typeof value['background-image'] === 'string') ? value['background-image'] : ''
        let bggradient = image.match(/linear-gradient(\(.*\))/g)
        if (bggradient) {
          this.backgroundPickers = bggradient[0]
            .replace(/^linear-gradient[(]/, '')
            .replace(/[)]$/, '')
            .split(', ')
        } else {
          this.backgroundPickers = [value['background-color']]
        }
        // TODO: this crashed storage with linear-gradient
        // let bgimage = image.match(/url\((.*?)\)/)
        // if (bgimage) {
        //   bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
        // }
        // this.sectionBgUrl = bgimage || ''
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject'
    ]),

    updateBgColor (value) {
      let settings = this.settingObjectOptions
      let pickers = this.backgroundPickers
      let image = (typeof settings.styles['background-image'] === 'string') ? settings.styles['background-image'] : ''
      let bgimage = image.match(/url\((.*?)\)/)
      let styles = { 'background-color': '' }

      switch (pickers.length) {
        case 0:
          break
        case 1:
          styles['background-color'] = getPickerColor(value)
          styles['background-image'] = (bgimage) ? bgimage[0] : ''
          break
        default:
          let colors = pickers.filter(Boolean).map(getPickerColor)
          if (colors.length) {
            let mappedColor = [...colors.splice(0, 1), ...(colors || []).map(c => ` ${c}`)]
            let gradient = `linear-gradient(${mappedColor})`
            if (bgimage) {
              bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
            }
            styles['background-image'] = (bgimage) ? (bgimage + `, ${gradient}`) : gradient
          }
          break
      }

      this.updateSettingOptions(_.merge({}, settings, { styles }))
    },

    updateBgUrl (value) {
      this.sectionBgUrl = value || ''
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-image': `url(${this.sectionBgUrl})`
        }
      }))
    },

    changeRepeat () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-repeat': this.bgRepeat
        }
      }))
    },

    changeSize () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-size': this.bgSize
        }
      }))
    },

    changeAttachment () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-attachment': this.bgAttachment ? 'fixed' : 'scroll'
        }
      }))
    },

    deleteSection () {
      this.builder.remove(this.settingObjectSection)
      this.clearSettingObject()
    },

    setHeight () {
      if (this.fullScreen) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { classes: ['full-height'] }))
      } else {
        let classesObj = this.settingObjectOptions.classes
        classesObj.splice(classesObj.indexOf('full-height'), 1)
      }
    },

    updateSimpleValue (propName, value) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { [propName]: value })
      )
    },

    updateGalleryImages (galleryImages) {
      this.updateSettingOptions({
        ..._.cloneDeep(this.settingObjectOptions),
        galleryImages
      })
    },

    addBackgroundPicker () {
      this.backgroundPickers.push(DEFAULT_COLOR)
      this.updateBgColor()
    },

    removeBackgroundPicker (index) {
      this.backgroundPickers.splice(index, 1)
      this.updateBgColor()
    },

    styleChange (value) {
      this.updateStyle(_.kebabCase(value[0]), value[1])
      this[value[0]] = value[1]
    },

    updateStyle (prop, value) {
      this.updateText()
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    },

    onExpand (value) {
      const accordeon = ['Font', 'SystemRequirements', 'Products']
      const prop = `expanded${value[0]}`
      this[prop] = value[1]

      if (value[1]) {
        accordeon.forEach((item) => {
          if (item !== value[0]) {
            this[`expanded${item}`] = false
          }
        })
      }
    },

    updateText () {
      // TODO: Lost 'settingObjectOptions' from the store at the time of execution 'beforeDestroy'.
      // Text also saved at VuseStyler -> hideStyler
      if (this.settingObjectOptions.element) {
        const el = this.settingObjectOptions.element
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { text: el.innerHTML }))
      }
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
    }
  }
}
</script>

<style lang="sass" scoped>
.b-section-settings
  display: flex
  flex-direction: column
  align-items: stretch
  padding-bottom: 4.5rem

  &__inner
    padding-right: 2.5rem

  &__buttons
    position: absolute
    bottom: 1rem
    left: 1rem
    button
      max-width: 100%

  &__control
    margin-bottom: 2rem

  &__description
    font-size: 1.4rem
    line-height: 1.7rem
    color: #747474
    margin-bottom: 2rem
    margin-top: -1rem

  .picker

    &__label
      display: flex
      align-items: center
      cursor: pointer
      margin: 1.6rem 0
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__buttons
      position: absolute
      bottom: 1rem
      left: 1rem
      button
        max-width: 100%
    &__control
      margin-bottom: 2rem
      &--video
        display: flex
        align-items: center
        justify-content: space-between
        line-height: 1.5
        .b-base-label
          display: inline-block
          max-width: 18rem
          padding: .6rem .2rem .4rem 0
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
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
      .b-picker + .picker__button
        margin-left: 1rem
      ~ .picker__item
        margin-top: .4rem
</style>
