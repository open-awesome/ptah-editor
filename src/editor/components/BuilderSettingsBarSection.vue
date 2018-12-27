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
          <base-label v-text="settingObjectOptions.backgroundVideo.name || 'Upload video'"/>
          <a v-if="settingObjectOptions.backgroundVideo.data" @click.prevent="removeVideo">
            <icon-base name="close" width="12" color="#436FEE" title="Remove video"/>
          </a>
          <label v-else for="video-input">
            <icon-base name="download" width="12" color="#436FEE" title="Upload video"/>
          </label>
          <input
              @change="uploadVideo($event.target.files[0])"
              id="video-input"
              type="file"
              hidden>
        </div>

        <template v-else>
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
import ControlSystemRequirements from './controls/TheControlSystemRequirements.vue'
import ControlText from './controls/TheControlText'
import ControlSectionLayouts from './controls/TheControlSectionLayouts.vue'

export default {
  components: {
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

      styles: []
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
    let image = styles['background-image']

    this.sectionBgColor = styles['background-color']
    this.sectionBgUrl = image.length > 0 && image !== 'none' ? image.match(/url\(.+(?=\))/g).map(url => url.replace(/url\(/, ''))[0] : ''
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
      const accordeon = ['Font', 'SystemRequirements']
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

    async uploadVideo (file) {
      let [data, name] = [null, null]

      if (file) {
        let reader = new FileReader()
        await reader.readAsDataURL(file)
        await new Promise((resolve, reject) => {
          try {
            name = file.name
            reader.onloadend = resolve
          } catch (error) {
            reject(error)
          }
        }).then(({ target: { result } }) => { data = result })
      }

      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, {
          backgroundVideo: { name, data }
        })
      )

      await this.$nextTick()

      let videos = document.querySelectorAll('video[id^="bg-video"]')
      for (let i = 0, len = videos.length; i < len; i += 1) {
        let video = videos[i]
        await video.pause()
        await video.load()
        await video.play()
      }
    },

    removeVideo () {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, {
          backgroundVideo: { name: null, data: null }
        })
      )
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
      padding: 0 2.5rem 2rem 0
    &__header
      font-size: 1.6rem
      height: 3.2rem
      color: #272727
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
</style>
