<script>
import * as types from '@editor/types'
import { getYoutubeVideoIdFromUrl } from '@editor/util'

export default {
  name: 'Video',
  group: 'video',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    content: {
      name: 'Video',
      element: types.Video
    }
  },
  props: {
    id: {
      type: Number, required: true
    }
  },

  data () {
    return {
      player: null,
      videoUrl: '',
      youtubeVideoId: '',
      videoType: ''
    }
  },

  watch: {
    '$sectionData.content.element.videoUrl' (value) {
      this.updateVideoData(value)
    }
  },

  mounted () {
    this.updateVideoData(this.$sectionData.content.element.videoUrl)
  },

  methods: {
    /**
     * Computed properties somehow doesn't work here (because of Vuse?)
     * Have to do everything manually
     */
    updateVideoData (videoUrl) {
      this.videoUrl = videoUrl
      this.youtubeVideoId = getYoutubeVideoIdFromUrl(this.videoUrl)
      this.videoType = this.youtubeVideoId ? 'youtube' : 'custom'
    }
  }
}
</script>

<template>
  <section
    class="b-video-section"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
    >

    <div class="b-header">{{$sectionData.content.element.title}}</div>
    <div class="b-content" v-styler:content="$sectionData.content.element"></div>

    <iframe
      v-if="videoType === 'youtube'"
      frameborder="0"
      allowfullscreen="1"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      width="1920"
      height="1080"
      :src="`https://www.youtube.com/embed/${youtubeVideoId}?disablekb=0&controls=1&loop=0&showinfo=0&modestbranding=1&enablejsapi=1`" id="widget2"></iframe>

    <video
      v-if="videoType === 'custom'"
      ref="custom"
      :src="videoUrl"
      type="video/mp4"
      controls
      ></video>
  </section>

</template>

<style lang="sass" scoped>
.b-video-section
  width: 100%
  height: 0
  padding-bottom: 56.25%
  position: relative

  /deep/ iframe,
  /deep/ video
    border: 0
    position: absolute
    z-index: 1
    top: 0
    left: 0
    width: 100%
    height: 100%

.b-content
  position: absolute
  z-index: 20
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: none

  .is-editable &
    display: block

.b-header
  position: absolute
  z-index: 10
  top: 50%
  left: 0
  right: 0
  margin-top: -15rem
  font-family: Helvetica Neue, Helvetica, Arial
  font-style: normal
  font-weight: 800
  line-height: 5.3rem
  font-size: 4.2rem
  text-align: center
  letter-spacing: 0.5rem
  color: #fff
  text-transform: uppercase
  text-shadow: 1px 1px 5px black

  .b-video-section_playing &
    display: none

  .is-laptop &
    font-size: 3.5rem
    line-height: 4.6rem
    margin-top: -14rem
    letter-spacing: 0.4rem

  .is-mobile &
    font-size: 1.2rem
    line-height: 2rem
    margin-top: -4.8rem
    letter-spacing: 0.1rem
</style>
