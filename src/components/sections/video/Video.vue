<script>
import * as types from '@editor/types'
import { getYoutubeVideoIdFromUrl } from '@editor/util'
import section from '../../mixins/section.js'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#303030'
    }
  },
  edited: true
}

const GROUP_NAME = 'Video'
const NAME = 'Video'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  $schema: {
    mainStyle: types.Video
  },

  data () {
    return {
      player: null,
      videoUrl: '',
      youtubeVideoUrl: '',
      videoType: ''
    }
  },

  watch: {
    '$sectionData.mainStyle' (value) {
      this.$nextTick(() => {
        this.updateVideoData(value)
      })
    },

    // To refresh DOM
    '$sectionData.mainStyle.videoUrl' () {
      this.videoType = ''
    },
    '$sectionData.mainStyle.loop' () {
      this.videoType = ''
    }
  },

  mounted () {
    this.updateVideoData(this.$sectionData.mainStyle)
  },

  methods: {
    /**
     * Computed properties somehow doesn't work here (because of Vuse?)
     * Have to do everything manually
     */
    updateVideoData ({ videoUrl, loop }) {
      this.videoUrl = videoUrl

      const youtubeVideoId = getYoutubeVideoIdFromUrl(this.videoUrl)
      if (youtubeVideoId) {
        // Looping one video on itself requires playlist param with its ID passed
        const loopValue = loop ? `&loop=1&playlist=${youtubeVideoId}` : '&loop=0'
        this.videoType = 'youtube'
        this.youtubeVideoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?disablekb=0&controls=1${loopValue}&autoplay=0&showinfo=0&modestbranding=1&enablejsapi=1`
      } else {
        this.videoType = 'custom'
        this.youtubeVideoUrl = ''
      }
    }
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionDataStore = this.$store.state.Landing.sectionData[NAME]
    let sectionData = this.canRestore(GROUP_NAME, NAME) ? sectionDataStore : SCHEMA_CUSTOM
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, NAME, SCHEMA_CUSTOM)
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
    <div class="b-video-section__inner">
      <div class="b-header">{{$sectionData.mainStyle.videoTitle}}</div>
      <div class="b-content"></div>

      <iframe
        v-if="videoType === 'youtube'"
        frameborder="0"
        allowfullscreen="1"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        width="1184"
        height="666"
        :src="youtubeVideoUrl"></iframe>

      <video
        v-if="videoType === 'custom'"
        ref="custom"
        :src="videoUrl"
        :loop="$sectionData.mainStyle.loop"
        type="video/mp4"
        controls
        ></video>
    </div>
  </section>

</template>

<style lang="sass" scoped>
.b-video-section
  max-width: 118.4rem
  margin: 0 auto

  &__inner
    height: 0
    padding-bottom: 56.25%
    position: relative

  iframe,
  video
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
