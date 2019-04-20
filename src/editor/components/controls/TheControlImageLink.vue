<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'

export default {

  data () {
    return {
      imageUrl: '',
      videoUrl: '',
      label: '',
      isTypeContent: 'default',
      typeC: false
    }
  },

  created () {
    this.isTypeContent = this.link['type']
    this.imageUrl = this.link.imageUrl
    this.videoUrl = this.link.videoUrl

    if (this.isTypeContent !== 'default') {
      this.typeC = true
    }

    this.label = 'Image'
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType'
    ]),

    link () {
      return this.settingObjectOptions.link
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeImageUrl (url) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { 'link': { 'imageUrl': url } })
      )
    },

    changeVideoUrl (url) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { 'link': { 'videoUrl': url } })
      )
    },

    setType (typeC) {
      let t = ''

      typeC ? t = 'video' : t = 'default'

      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { 'link': { 'type': t } })
      )
    }
  }
}
</script>

<template>
  <div class="b-bg-controls">
    <div class="b-bg-controls__control">
      <BaseSwitcher v-model="typeC" label="Image or Video" @change="setType(typeC)" />
    </div>
    <div class="b-bg-controls__control" v-if="!typeC">
      <base-uploader
        v-model="imageUrl"
        @change="changeImageUrl(imageUrl)"
        :label="label"
      />
    </div>
    <!-- VideoUrl -->
    <div class="b-video-control__control" v-if="typeC">
      <BaseUploadInput
        v-model="videoUrl"
        label="Video URL"
        @upload="changeVideoUrl(videoUrl)"
      />
      <div class="b-video-control__description">
        YouTube video url or any mp4 file url is allowed.
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-bg-controls
  margin-top: 2.2rem
  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
  &__control
    margin-bottom: $size-step/2
    &:lastt-child
      margin-bottom: 0

.b-video-control
  &__description
    padding: $size-step/8 0
    font-size: 1.2rem
    color: $dark-grey
  &__control
    margin-top: 2.2rem
</style>
