<template>
<div class="b-video"
  :path="path"
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
      @resizing="onResize"
      @resizestop="onResizeStop"
      :draggable="false"
      :z="999"
     />
     <!-- Keep aspect ratio using :lock-aspect-ratio="true" prop. -->
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getYoutubeVideoIdFromUrl } from '@editor/util'
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

const ALLOW_IFRAME = 'accelerometer; encrypted-media; gyroscope; picture-in-picture;'

export default {
  name: 'VideoElement',

  inject: ['$section'],

  components: {
    VueDraggableResizable
  },

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
      vRel: false,
      width: 0,
      height: 0
    }
  },

  computed: {
    ...mapState('Sidebar', ['settingObjectElement']),

    settings () {
      return this.$section.get(`$sectionData.${this.path}.settings`)
    },
    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
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
    ...mapActions('Sidebar', [
      'toggleResizeStop'
    ]),

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
    },
    onResize (x, y, width, height) {
      let parents = {}
      let max = {}

      parents['width'] = this.settingObjectElement.closest('.b-draggable-slot')
      parents['height'] = this.settingObjectElement.closest('section') || this.settingObjectElement.closest('header') || this.settingObjectElement.closest('footer')

      max['width'] = parents['width'].offsetWidth
      max['height'] = parseInt(parents['height'].offsetHeight)

      if (width > max['width']) width = max['width']
      if (height > max['height']) height = max['height']

      this.$section.set(`$sectionData.${this.path}.styles.width`, width + 'px')
      this.$section.set(`$sectionData.${this.path}.styles.height`, height + 'px')
    },

    onResizeStop (x, y, width, height) {
      this.toggleResizeStop(this.path)
    }
  },

  created () {
    this.vUrl = this.settings.url
    this.vLoop = this.settings.loop
    this.vAutoplay = this.settings.autoplay
    this.vControls = this.settings.controls
    this.vRel = this.settings.rel
    this.updateVideoData(this.vUrl)

    this.width = parseInt(this.styles.width.split('px')[0]) || 320
    this.height = parseInt(this.styles.height.split('px')[0]) || 180
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-video
  $self: &
  width: $size-step*10
  height: $size-step*5.625
  max-width: 100% !important
  max-height: 100% !important

  position: relative
  display: flex
  justify-content: center
  align-items: center
  .is-mobile &
    margin: $size-step/4 auto
    width: 100% !important
    height: $size-step*5 !important
  @media only screen and (max-width: 540px)
    &
      margin: $size-step/4 auto
      width: 100% !important
      height: $size-step*5 !important
  @media only screen and (max-width: 900px) and (max-height: 450px)
    &
      height: $size-step*5 !important
  &__padd
    margin: $size-step/8
    width: 100%
    height: 100%

    position: relative
    overflow: hidden
    & > iframe
      width: 100%
      height: 100%

      position: relative
    & > video
      width: 100%
      height: 100%
      outline: none

      position: relative
  &.is-editable:hover
    #{$self}__padd > iframe,
      display: none
    #{$self}__padd > video
      visibility: hidden
  &__help
    display: none
  &.is-editable
    &:before
      content: ""
      display: block
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 1
    &:hover
     & #{$self}__help
       display: block
       position: absolute
       top: 0
       right: 0
       bottom: 0
       left: 0

       display: flex
       justify-content: center
       align-items: center

       z-index: 1
       background-color: rgba(255, 255, 255, 0.8)
  &__resize
    border: none !important

    top: -0.4rem !important
    right: -0.4rem !important
    bottom: -0.4rem !important
    left: -0.4rem !important

    border-radius: 0.5rem
    width: auto !important
    height: auto !important

    display: none
    &_active
      border: 0.2rem dotted $dark-blue-krayola !important
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
  &.is-editable
    #{$self}__resize
      display: block
      .is-mobile &,
      .is-tablet &
        display: none
  & span
    display: block
  .is-mobile &,
  .is-tablet &
    margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px)
    &
      margin: $size-step/2 auto !important
  @media only screen and (max-width: 768px) and (min-height: 700px)
    &
      margin: $size-step/2 auto !important
/deep/
  .b-handle
    position: absolute !important

    background: $dark-blue-krayola !important
    border: 0.2rem solid $white !important
    box-sizing: border-box !important
    box-shadow: 0px 2px 2px rgba($black, 0.15) !important
    border-radius: 1px !important

    height: $size-step/4 !important
    width: $size-step/4 !important

    transition: all 300ms linear !important
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
    &-tl
      top: -$size-step/8
      left: -$size-step/8
      cursor: nw-resize
    &-tm
      top: -$size-step/8
      left: 50%
      margin-left: -$size-step/16
      cursor: n-resize
    &-tr
      top: -$size-step/8
      right: -$size-step/8
      cursor: ne-resize
    &-ml
      top: 50%
      margin-top: -$size-step/16
      left: -$size-step/8
      cursor: w-resize
    &-mr
      top: 50%
      margin-top: -$size-step/16
      right: -$size-step/8
      cursor: e-resize
    &-bl
      bottom: -$size-step/8
      left: -$size-step/8
      cursor: sw-resize
    &-bm
      bottom: -$size-step/8
      left: 50%
      margin-left: -$size-step/16
      cursor: s-resize
    &-br
      bottom: -$size-step/8
      right: -$size-step/8
      cursor: se-resize
    &-tl:hover,
    &-tr:hover,
    &-bl:hover,
    &-br:hover
      transform: scale(1.4)
</style>
