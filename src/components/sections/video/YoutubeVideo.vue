<script>
import * as types from '@editor/types'

export default {
  name: 'YoutubeVideo',
  group: 'video',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    content: {
      name: 'YoutubeVideo',
      element: types.YoutubeVideo
    }
  },
  props: {
    id: {
      type: Number, required: true
    }
  },

  data () {
    return {
      player: null
    }
  },
  watch: {
    '$sectionData.content.element.videoUrl' () {
      this.setVideo()
    }
  },
  created () {
    this.initYoutubeIframeApi()
  },
  mounted () {
    this.initVideo()
  },
  methods: {
    initVideo () {
      if (window.YT) {
        this.setVideo()
      } else {
        window.onYouTubePlayerAPIReady = () => {
          this.setVideo()
        }
      }
    },

    initYoutubeIframeApi () {
      const tag = document.createElement('script')

      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    },

    setVideo () {
      if (this.player) {
        this.player.stopVideo()
        this.player.destroy()
        this.player = null
      }

      const videoId = getYoutubeVideoIdFromUrl(this.$sectionData.content.element.videoUrl)
      if (!videoId) {
        return
      }

      this.player = new window.YT.Player(this.$refs.player, {
        videoId,
        height: '1080',
        width: '1920',
        playerVars: {
          disablekb: 0,
          controls: 0,
          autoplay: 0,
          mute: 0,
          loop: 0,
          showinfo: 0,
          modestbranding: 1
        }
      })
    }
  }
}

function getYoutubeVideoIdFromUrl (url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}
</script>

<template>
  <section
    class="b-youtube-video"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
    >

    <div class="b-header">{{$sectionData.content.element.title}}</div>
    <div class="b-playbutton" v-if="player" @click.stop="player.playVideo()"></div>
    <div class="b-content" v-styler:content="$sectionData.content.element"></div>
    <div id="videoPlayer" ref="player"></div>
  </section>

</template>

<style lang="sass" scoped>
.b-youtube-video
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: absolute;

  /deep/ iframe
    border: 0;
    position: absolute;
    z-index: 1
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

.b-content
  position: absolute;
  z-index: 20
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: none

  .is-editable &
    display: block

.b-header
  position: absolute;
  z-index: 10
  top: 50%
  left: 0
  right: 0
  margin-top: -12rem
  font-family: Helvetica Neue, Helvetica, Arial
  font-style: normal;
  font-weight: 800;
  line-height: 5.3rem;
  font-size: 4.2rem;
  text-align: center;
  letter-spacing: 0.5rem;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 1px 1px 5px black

  .is-laptop &
    font-size: 3.5rem;
    line-height: 4.6rem;
    margin-top: -11rem;
    letter-spacing: 0.4rem;

  .is-mobile &
    font-size: 1.2rem;
    line-height: 2rem;
    margin-top: -5rem;
    letter-spacing: 0.1rem;

.b-playbutton
  cursor: pointer
  position: absolute
  z-index: 30
  top: 0
  left: 0
  right: 0
  bottom: 0
  margin: auto
  width: 80px
  height: 60px
  display: none

  .is-editable &
    display: block
</style>
