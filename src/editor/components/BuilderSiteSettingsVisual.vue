<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'

export default {
  name: 'BuilderSiteSettingsVisual',

  components: {
    BuilderModalContentLayout
  },

  data () {
    return {
      backgroundFillTypes: [
        {
          value: 'fill',
          text: this.$t('s.fill')
        },
        {
          value: 'tile',
          text: this.$t('s.tile')
        }
      ],

      pageBackgroundUrl: '',
      pageBackgroundColor: '',
      pageBackgroundPositionX: '',
      pageBackgroundPositionY: '',
      bgAttachment: '',
      bgSize: '',
      bgRepeat: '',
      bgVideo: '',
      bgVideoPosition: '',
      fullPageScroll: ''
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    bgAttachmentCheckbox: {
      set (value) {
        this.bgAttachment = value ? 'fixed' : 'scroll'
      },
      get () {
        return this.bgAttachment === 'fixed'
      }
    },

    bgVideoPositionCheckbox: {
      set (value) {
        this.bgVideoPosition = value ? 'fixed' : ''
      },
      get () {
        return this.bgVideoPosition === 'fixed'
      }
    },

    backgroundFillValue: {
      set (value) {
        if (value === 'fill') {
          this.bgSize = 'cover'
          this.bgRepeat = 'no-repeat'
        }

        if (value === 'tile') {
          this.bgSize = ''
          this.bgRepeat = 'repeat'
        }
      },
      get () {
        if (this.bgSize === 'cover') {
          return 'fill'
        }
        return 'tile'
      }
    },

    fullPageScrollCheckbox: {
      set (value) {
        this.fullPageScroll = value ? 'yes' : 'no'
      },
      get () {
        return this.fullPageScroll === 'yes'
      }
    }
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    }
  },

  created () {
    this.updateSettings()
  },

  methods: {
    ...mapActions([
      'storeSettings'
    ]),
    updateSettings () {
      const settings = this.currentLanding.settings

      this.pageBackgroundUrl = settings.styles.backgroundImage
      this.pageBackgroundColor = settings.styles.backgroundColor
      this.pageBackgroundPositionX = settings.styles.backgroundPositionX
      this.pageBackgroundPositionY = settings.styles.backgroundPositionY
      this.bgAttachment = settings.styles.backgroundAttachment
      this.bgRepeat = settings.styles.backgroundRepeat
      this.bgSize = settings.styles.backgroundSize
      this.bgVideo = settings.video
      this.bgVideoPosition = settings.videoPosition
      this.fullPageScroll = settings.fullPageScroll
    },
    applySettings () {
      let backgroundColor
      if (typeof this.pageBackgroundColor === 'string') {
        backgroundColor = this.pageBackgroundColor
      } else {
        backgroundColor = _.get(this.pageBackgroundColor, 'hex', '')
      }
      const data = {
        video: this.bgVideo || '',
        videoPosition: this.bgVideoPosition,
        fullPageScroll: this.fullPageScroll,
        styles: {
          backgroundColor,
          backgroundImage: this.pageBackgroundUrl || '',
          backgroundPositionX: this.pageBackgroundPositionX,
          backgroundPositionY: this.pageBackgroundPositionY,
          backgroundAttachment: this.bgAttachment,
          backgroundRepeat: this.bgRepeat,
          backgroundSize: this.bgSize
        }
      }

      this.storeSettings(data)
      this.$emit('requestClose')
    }
  }
}
</script>

<template>
  <builder-modal-content-layout>
    <div class="b-builder-site-settings-visual">
      <base-heading level="2">{{ $t('s.backgroundColor') }}</base-heading>

      <base-fieldset>
        <base-fieldset-row width="short">
          <BaseColorPicker :label="$t('')" v-model="pageBackgroundColor" />
        </base-fieldset-row>

        <base-fieldset-row>
          <BaseSwitcher v-model="fullPageScrollCheckbox" :label="$t('s.fpScroll')" />
        </base-fieldset-row>
      </base-fieldset>

      <base-fieldset>
        <base-heading level="3">{{ $t('s.backgroundImage') }}</base-heading>

        <base-fieldset-row>
          <base-uploader v-model="pageBackgroundUrl" :label="$t('s.backgroundImage')"/>
        </base-fieldset-row>

        <base-fieldset-row>
          <base-fieldset-item>
            <BaseTextField
              :label="$t('s.posX')"
              v-model="pageBackgroundPositionX"
              placeholder="0px"
            />
          </base-fieldset-item>
          <base-fieldset-item>
            <BaseTextField
              :label="$t('s.poxY')"
              v-model="pageBackgroundPositionY"
              placeholder="0px"
            />
          </base-fieldset-item>
        </base-fieldset-row>

        <base-fieldset-row>
          <BaseButtonTabs :list="backgroundFillTypes" v-model="backgroundFillValue" />
        </base-fieldset-row>
        <base-fieldset-row>
          <BaseSwitcher v-model="bgAttachmentCheckbox" :label="$t('s.fixedScrolling')" />
        </base-fieldset-row>
      </base-fieldset>

      <base-fieldset>
        <base-heading level="3">{{ $t('s.backgroundVideo') }}</base-heading>

        <base-fieldset-row>
          <base-uploader
              v-model="bgVideo"
              :label="$t('s.backgroundVideo')"
              type="video"/>
        </base-fieldset-row>

        <base-fieldset-row>
          <BaseSwitcher v-model="bgVideoPositionCheckbox" :label="$t('s.fixedScrolling')" />
        </base-fieldset-row>
      </base-fieldset>
    </div>

    <div slot="controls">
      <BaseButton color="gray" :transparent="true" @click="$emit('requestClose')">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton color="blue" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>
