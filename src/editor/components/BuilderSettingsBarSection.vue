<template>
  <div class="b-section-settings">
  <base-scroll-container backgroundBar="#999">
    <div class="b-section-settings__inner">
      <div class="b-section-settings__control">
        <base-label>Full screen height</base-label>
        <BaseSwitcher v-model="fullScreen" @change="setHeight" />
      </div>

      <template v-if="settingObjectOptions.background">
        <div class="b-section-settings__control picker">
          <base-label class="picker__label">
            Background color
            <base-button @click="addBackgroundPicker" color="light-gray" class="picker__button">
              <icon-plus width="10" height="10" class="picker__icon"/>
            </base-button>
          </base-label>
          <div v-for="(picker, index) in backgroundPickers" :key="`picker-item-${ _uid }-${ index }`" class="picker__item">
            <base-color-picker v-model="backgroundPickers[index]" @change="updateBgColor"/>
            <base-button v-show="backgroundPickers.length > 1" @click="removeBackgroundPicker(index)" color="light-gray" class="picker__button">
              <i class="picker__icon picker__icon--minus">-</i>
            </base-button>
          </div>
        </div>

        <div class="b-section-settings__control">
          <base-upload-input v-model="sectionBgUrl" @upload="updateBgUrl" label="Background image" placeholder="Image Url"></base-upload-input>
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
        <BaseImageUploadMultiple
          label="Images upload"
          :data-images="galleryImages"
          @change="updateGalleryImages"
        />
      </div>

      <!-- Products Section Controls -->
      <control-section-products
        v-if="settingObjectOptions.hasProdusct"
        >
      </control-section-products>

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

function getPickerColor (color) {
  if (typeof color === 'object' && color.hasOwnProperty('rgba')) {
    return `rgba(${Object.values(color.rgba).toString()})`
  }
  return color
}

export default {
  components: {
    ControlSectionProducts
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
      backgroundPickers: []
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
    }
  },

  created () {
    let styles = this.settingObjectOptions.styles

    this.sectionBgColor = styles['background-color']
    let image = styles['background-image']
    this.sectionBgUrl = image.length > 0 && image !== 'none' ? image.match(/url\(.+(?=\))/g).map(url => url.replace(/url\(/, ''))[0] : ''
    this.bgRepeat = styles['background-repeat'] === 'no-repeat' ? this.sizeList[0] : this.sizeList[1]
    this.bgSize = styles['background-size'] === 'cover' ? this.sizeList[0] : this.sizeList[1]
    this.bgAttachment = styles['background-attachment'] === 'fixed'

    /* Video */
    this.videoTitle = this.settingObjectOptions.videoTitle
    this.videoUrl = this.settingObjectOptions.videoUrl
    this.loop = this.settingObjectOptions.loop

    this.header = this.settingObjectOptions.header || ''

    /** Gallery */
    this.galleryImages = this.settingObjectOptions.galleryImages || []

    if (this.settingObjectOptions.classes.indexOf('full-height') !== -1) {
      this.fullScreen = true
    }
  },

  watch: {
    'settingObjectOptions.styles': {
      immediate: true,
      handler (value) {
        let bggradient = value['background-image'].match(/linear-gradient(\(.*\))/g)
        if (bggradient) {
          this.backgroundPickers = bggradient[0]
            .replace(/^linear-gradient[(]/, '')
            .replace(/[)]$/, '')
            .split(', ')
        } else {
          this.backgroundPickers = [value['background-color']]
        }
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject'
    ]),

    updateBgColor () {
      let settings = this.settingObjectOptions
      let pickers = this.backgroundPickers
      let bgimage = settings.styles['background-image'].match(/url\((.*?)\)/)
      let styles = { 'background-color': '' }

      switch (pickers.length) {
        case 0:
          break
        case 1:
          styles['background-color'] = getPickerColor(pickers[0])
          styles['background-image'] = (bgimage) ? bgimage[0] : ''
          break
        default:
          let colors = pickers.filter(Boolean).map(getPickerColor)
          if (colors.length) {
            let mappedColor = [...colors.splice(0, 1), ...(colors || []).map(c => ` ${c}`)]
            let gradient = `linear-gradient(${mappedColor})`
            styles['background-image'] = (bgimage) ? (bgimage[0] + `, ${gradient}`) : gradient
          }
          break
      }

      this.updateSettingOptions(_.merge({}, settings, { styles }))
    },

    updateBgUrl () {
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
      this.backgroundPickers.push('rgba(0,0,0,1)')
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
