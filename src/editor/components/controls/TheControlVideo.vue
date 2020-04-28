<template>
<div>
  <div class="b-panel__control">
    <base-caption>
      Video url
    </base-caption>
      <!-- VideoUrl -->
    <div class="b-panel__col">
      <BaseUploadInput
        v-model="vUrl"
        :label="$t('c.videoUrl')"
        @upload="updateSettings('url', vUrl)"
      />
      <div class="b-panel__description">
        {{ $t('c.videoHint') }}
      </div>
    </div>
  </div>

  <!-- Loop video -->
  <div class="b-panel__control">
    <base-caption>
      Video settings
    </base-caption>
    <div class="b-panel__col">
      <div class="b-panel__control">
        <BaseSwitcher
          v-model="vLoop"
          :label="$t('c.loop')"
          @change="updateSettings('loop', vLoop)"
        />
      </div>

      <!-- Autoplay video -->
      <div class="b-panel__control">
        <BaseSwitcher
          v-model="vAutoplay"
          :label="$t('c.autoplay')"
          @change="updateSettings('autoplay', vAutoplay)"
        />
      </div>

      <!-- Show/hide controls video -->
      <div class="b-panel__control">
        <BaseSwitcher
          v-model="vControls"
          :label="$t('c.controlsShow')"
          @change="updateSettings('controls', vControls)"
        />
      </div>

      <!-- Show/hide related videos  -->
      <div class="b-panel__control" v-if="videoType === 'youtube'">
        <BaseSwitcher
          v-model="vRel"
          :label="$t('c.relatedVideos')"
          @change="updateSettings('rel', vRel)"
        />
      </div>
    </div>
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
