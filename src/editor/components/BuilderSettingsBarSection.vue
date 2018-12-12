<template>
  <div class="b-section-settings">
  <base-scroll-container backgroundBar="#999">
    <div class="b-section-settings__inner">
      <div class="b-section-settings__control">
        <base-label>Full screen height</base-label>
        <BaseSwitcher v-model="fullScreen" @change="setHeight" />
      </div>

      <template v-if="settingObjectOptions.background">
        <div class="b-section-settings__control">
          <base-color-picker v-model="sectionBgColor" @change="updateBgColor" label="Background color"></base-color-picker>
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

      galleryImages: []
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
    settingObjectOptions (newValue, oldValue) {
      this.sectionBgColor = newValue.styles['background-color']
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject'
    ]),

    updateBgColor () {
      const color = this.sectionBgColor.rgba ? `rgba(${Object.values(this.sectionBgColor.rgba).toString()})` : this.sectionBgColor
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-color': color
        }
      }))
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

    // TODO: не работает!
    updateSimpleValue (propName, value) {
      let styles = { [propName]: value }
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    },

    updateGalleryImages (galleryImages) {
      this.updateSettingOptions({
        ..._.cloneDeep(this.settingObjectOptions),
        galleryImages
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
</style>
