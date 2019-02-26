<template>
<div class="b-video">
  <iframe
    v-if="videoType === 'youtube'"
    frameborder="0"
    allowfullscreen="1"
    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
    :src="youtubeVideoUrl">
  </iframe>

  <video
    v-if="videoType === 'custom'"
    ref="custom"
    :src="videoUrl"
    :loop="$sectionData.mainStyle.loop"
    type="video/mp4"
    controls
    >
  </video>

  <div class="b-video__help">You can drag</div>
</div>
</template>

<script>
import { getYoutubeVideoIdFromUrl } from '@editor/util'

export default {
  name: 'Video',
  inject: ['$section'],

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
      vLoop: false
    }
  },

  computed: {
    videoUrl () {
      return this.$section.get(`$sectionData.${this.path}.videoUrl`)
    },
    loop () {
      return this.$section.get(`$sectionData.${this.path}.loop`)
    }
  },

  watch: {
    vUrl (value) {
      console.log(value)
      this.updateVideoData(value)
    }
  },

  methods: {
    updateVideoData (videoUrl) {
      this.vUrl = videoUrl
      this.videoType = ''

      const youtubeVideoId = getYoutubeVideoIdFromUrl(this.vUrl)
      if (youtubeVideoId) {
        // Looping one video on itself requires playlist param with its ID passed
        const loopValue = this.vLoop ? `&loop=1&playlist=${youtubeVideoId}` : '&loop=0'
        this.videoType = 'youtube'
        this.youtubeVideoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?disablekb=0&controls=1${loopValue}&autoplay=0&showinfo=0&modestbranding=1&enablejsapi=1`
      } else {
        this.videoType = 'custom'
        this.youtubeVideoUrl = ''
      }
    }
  },

  created () {
    this.vUrl = this.videoUrl
    this.vLoop = this.loop
    this.updateVideoData(this.vUrl)
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-video
  $self: &
  width: $size-step*10
  height: $size-step*5.785
  max-width: calc(100% - #{$size-step}/2)
  max-height: 100%
  margin: $size-step/2 $size-step/4

  position: relative
  display: flex
  justify-content: center
  align-items: center
  .is-mobile &
    margin: $size-step/4 auto
    width: 100%
    height: auto
  @media only screen and (max-width: 540px)
    &
      margin: $size-step/4 auto
      width: 100%
      height: auto
  & > iframe,
  & > video,
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 0

    width: 100%
    height: 100%
  &.is-editable:hover
    opacity: 0.6
    & > iframe,
    & > video
      display: none
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
      #{$self}__help
        display: block

</style>
