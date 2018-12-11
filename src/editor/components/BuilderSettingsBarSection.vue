<template>
  <div class="b-section-settings">
    <template v-if="settingObjectOptions.background">
      <div class="b-section-settings__control">
        <base-color-picker v-model="sectionBgColor" @change="updateBgColor" label="Background color"></base-color-picker>
      </div>

      <div class="b-section-settings__control">
        <base-upload-input v-model="sectionBgUrl" @upload="updateBgUrl" label="Background image" placeholder="Image Url"></base-upload-input>
      </div>
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
    <control-section-products v-if="settingObjectOptions.hasProdusct"></control-section-products>

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
  components: { ControlSectionProducts },
  name: 'BuilderSettingsBarSection',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sectionBgColor: '',
      sectionBgUrl: '',

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
    ])
  },

  created () {
    this.sectionBgColor = this.settingObjectOptions.styles['background-color']
    let image = this.settingObjectOptions.styles['background-image']
    this.sectionBgUrl = image.length > 0 ? image.match(/url\(.+(?=\))/g).map(url => url.replace(/url\(/, ''))[0] : ''

    /* Video */
    this.videoTitle = this.settingObjectOptions.videoTitle
    this.videoUrl = this.settingObjectOptions.videoUrl
    this.loop = this.settingObjectOptions.loop

    this.header = this.settingObjectOptions.header || ''

    /** Gallery */
    this.galleryImages = this.settingObjectOptions.galleryImages || []
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

    deleteSection () {
      this.builder.remove(this.settingObjectSection)
      this.clearSettingObject()
    },

    updateSimpleValue (propName, value) {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        [propName]: value
      }))
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
