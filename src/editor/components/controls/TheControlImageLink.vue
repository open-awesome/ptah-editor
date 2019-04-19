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
    let url = this.link['href']

    this.isTypeContent = this.link['type']

    if (this.isTypeContent === 'image') {
      this.imageUrl = url
    } else {
      this.videoUrl = url
      this.type = true
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

    changeUrl (url) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { 'link': { 'href': url } })
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
        @change="changeUrl(imageUrl)"
        :label="label"
      />
    </div>
    <!-- VideoUrl -->
      <div class="b-video-control__control" v-if="typeC">
        <BaseUploadInput
          v-model="videoUrl"
          label="Video URL"
          @upload="changeUrl(videoUrl)"
        />
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
</style>
