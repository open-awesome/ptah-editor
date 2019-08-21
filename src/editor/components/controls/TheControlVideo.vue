<template>
<div class="b-video-control">

      <!-- VideoUrl -->
      <div class="b-video-control__control">
        <BaseUploadInput
          v-model="vUrl"
          :label="$t('c.videoUrl')"
          @upload="updateSettings('url', vUrl)"
        />
      </div>

      <div class="b-video-control__description">
        {{ $t('c.videoHint') }}
      </div>

      <!-- Loop video -->
      <div class="b-video-control__control">
        <BaseSwitcher
          v-model="vLoop"
          :label="$t('c.loop')"
          @change="updateSettings('loop', vLoop)"
        />
      </div>

      <!-- Autoplay video -->
      <div class="b-video-control__control">
        <BaseSwitcher
          v-model="vAutoplay"
          :label="$t('c.autoplay')"
          @change="updateSettings('autoplay', vAutoplay)"
        />
      </div>

      <!-- Show/hide controls video -->
      <div class="b-video-control__control">
        <BaseSwitcher
          v-model="vControls"
          :label="$t('c.controlsShow')"
          @change="updateSettings('controls', vControls)"
        />
      </div>

      <!-- Show/hide related videos  -->
      <div class="b-video-control__control" v-if="videoType === 'youtube'">
        <BaseSwitcher
          v-model="vRel"
          :label="$t('c.relatedVideos')"
          @change="updateSettings('rel', vRel)"
        />
      </div>
</div>
</template>

<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import { getYoutubeVideoIdFromUrl } from '@editor/util'

export default {
  name: 'TheControlVideo',

  data () {
    return {
      videoType: '',
      vUrl: '',
      vLoop: '',
      vAutoplay: '',
      vControls: '',
      vRel: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    settings () {
      return this.settingObjectOptions.settings
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    updateSettings (prop, value) {
      let settings = {}
      let youtubeVideoId = getYoutubeVideoIdFromUrl(this.vUrl)
      settings[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { settings }))
      youtubeVideoId ? this.videoType = 'youtube' : this.videoType = 'custom'
    }
  },

  mounted () {
    this.vUrl = this.settings.url
    this.vLoop = this.settings.loop
    this.vAutoplay = this.settings.autoplay
    this.vControls = this.settings.controls
    this.vRel = this.settings.rel
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-video-control
  &__header
    margin-bottom: .8rem

    display: flex
    align-items: center

    font-size: 2.2rem
    color: $dark-grey
    cursor: pointer
  &__title
    margin: 0
    font-weight: normal
    color: $dark-grey
  &__icon
    margin-left: .5rem
    margin-bottom: -.5rem

    transform: rotate(180deg)
    &.closed
      transform: rotate(0deg)

  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: $dark-grey
    display: flex
    align-items: center
    cursor: pointer
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
      & svg
        display: inline-block
        vertical-align: baseline
        margin-bottom: 0.2rem
  &__description
    padding: $size-step/8 0
    font-size: 1.2rem
    color: $dark-grey
  &__control
    margin-top: 2.2rem
</style>
