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
    mainStyle: types.StyleObject
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
    }
  },

  mounted () {
    this.updateVideoData(this.$sectionData.mainStyle)
  },

  methods: {
    updateVideoData ({ videoUrl, loop }) {
      this.videoType = ''
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
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-video-section
  position: relative
  width: 100%
  min-height: 60rem
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &-component
    margin: 1.2rem

.b-sandbox,
.b-draggable-slot
  max-width: 100%
  height: 100%

.b-sandbox
  min-height: 20rem
  justify-content: center
  align-items: center

.b-draggable-slot
  padding: 1.6rem .8rem

</style>
