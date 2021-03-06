<template>
<div class="b-video"
  :path="path"
  :style="[objVarsMedia, objVarsResize]"
  >
  <div class="b-video__padd">
    <iframe
      v-if="videoType === 'youtube'"
      frameborder="0"
      class="ptah-yt-video"
      allowfullscreen="allowfullscreen"
      :allow="allow"
      :src="youtubeVideoUrl">
    </iframe>

    <video
      class="ptah-video"
      v-if="videoType === 'custom' && vAutoplay"
      ref="custom"
      :src="vUrl"
      v-bind="options"
      muted="true"
      type="video/mp4"
      >
    </video>

    <video
      class="ptah-video"
      v-if="videoType === 'custom' && !vAutoplay"
      ref="custom"
      :src="vUrl"
      v-bind="options"
      type="video/mp4"
      >
    </video>

    <div class="b-video__help" contenteditable="false">You can Drag and Resize</div>
  </div>

  <vue-draggable-resizable
      class="b-video__resize"
      class-name-active="b-video__resize_active"
      class-name-handle="b-handle"
      :w="width"
      :h="height"
      :min-width="32"
      :min-height="32"
      :max-height="640"
      @resizing="$_onResize"
      @resizestop="$_onResizeStop"
      :draggable="false"
      :z="999"
     />
     <!-- Keep aspect ratio using :lock-aspect-ratio="true" prop. -->
</div>
</template>

<script>
import { getYoutubeVideoIdFromUrl } from '@editor/util'
import elementMedia from '../mixins/elementMedia'
import elementResize from '../mixins/elementResize'

const ALLOW_IFRAME = 'accelerometer; encrypted-media; gyroscope; picture-in-picture;'

export default {
  name: 'VideoElement',

  mixins: [
    elementMedia,
    elementResize
  ],

  props: {
    path: {
      type: String
    }
  },

  data () {
    return {
      vUrl: '',
      youtubeVideoUrl: '',
      videoType: '',
      vLoop: false,
      vAutoplay: false,
      vControls: false,
      vRel: false
    }
  },

  computed: {
    settings () {
      return this.$section.get(`$sectionData.${this.path}.settings`)
    },

    options () {
      let objAttrs = {}
      let video = null

      if (this.videoType === 'custom') {
        video = this.$refs.custom
      }

      this.vLoop ? objAttrs['loop'] = '' : delete objAttrs['loop']

      this.vControls ? objAttrs['controls'] = '' : delete objAttrs['controls']

      if (this.vAutoplay) {
        objAttrs['autoplay'] = ''
      } else {
        delete objAttrs['autoplay']
        if (video) video.pause()
      }
      return objAttrs
    },

    allow () {
      return this.vAutoplay ? ALLOW_IFRAME + ' autoplay;' : ALLOW_IFRAME
    }
  },

  watch: {
    settings (value) {
      this.vUrl = value.url
      this.vLoop = value.loop
      this.vAutoplay = value.autoplay
      this.vControls = value.controls
      this.vRel = value.rel
      this.updateVideoData()
    }
  },

  methods: {
    updateVideoData (videoUrl) {
      this.videoType = ''

      const youtubeVideoId = getYoutubeVideoIdFromUrl(this.vUrl)
      if (youtubeVideoId) {
        // Looping one video on itself requires playlist param with its ID passed
        const loopValue = this.vLoop ? `&loop=1&playlist=${youtubeVideoId}` : '&loop=0'
        const autoplayValue = this.vAutoplay ? '&autoplay=1' : '&autoplay=0'
        const controlsValue = this.vControls ? '&controls=1' : '&controls=0'
        const relValue = this.vRel ? '&rel=1' : '&rel=0'
        const muteValue = this.vAutoplay ? '&mute=1' : '&mute=0'
        this.videoType = 'youtube'
        this.youtubeVideoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?version=3&disablekb=0${controlsValue}${loopValue}${autoplayValue}${muteValue}&showinfo=0&modestbranding=1&enablejsapi=1&showinfo=0&autohide=1${relValue}`
      } else {
        this.videoType = 'custom'
        this.youtubeVideoUrl = ''
      }
    }
  },

  created () {
    this.vUrl = this.settings.url
    this.vLoop = this.settings.loop
    this.vAutoplay = this.settings.autoplay
    this.vControls = this.settings.controls
    this.vRel = this.settings.rel
    this.updateVideoData(this.vUrl)
  }
}
</script>

<style lang="sass" scoped>
</style>
