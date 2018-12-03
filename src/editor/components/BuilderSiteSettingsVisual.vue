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
          text: 'Fill'
        },
        {
          value: 'tile',
          text: 'Tile'
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
      bgVideoPosition: ''
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
          this.bgSize = 'contain'
          this.bgRepeat = 'repeat'
        }
      },
      get () {
        if (this.bgSize === 'cover') {
          return 'fill'
        }
        return 'tile'
      }
    }
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    }
  },

  mounted () {
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
    },
    applySettings () {
      const data = {
        video: this.bgVideo || '',
        videoPosition: this.bgVideoPosition,
        styles: {
          backgroundImage: this.pageBackgroundUrl || '',
          backgroundColor: _.get(this.pageBackgroundColor, 'hex', ''),
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
      <base-heading level="2">Background</base-heading>

      <base-fieldset>
        <base-fieldset-row width="short">
          <BaseColorPicker label="Background color" v-model="pageBackgroundColor" />
        </base-fieldset-row>
      </base-fieldset>

      <base-fieldset>
        <base-heading level="3">Background Image</base-heading>

        <base-fieldset-row>
          <BaseUploadInput
            v-model="pageBackgroundUrl"
            label="Background image"
            placeholder="paste Image URL" />
        </base-fieldset-row>

        <base-fieldset-row>
          <base-fieldset-item>
            <BaseTextField label="X position" v-model="pageBackgroundPositionX" />
          </base-fieldset-item>
          <base-fieldset-item>
            <BaseTextField label="Y position" v-model="pageBackgroundPositionY" />
          </base-fieldset-item>
        </base-fieldset-row>

        <base-fieldset-row>
          <BaseButtonTabs :list="backgroundFillTypes" v-model="backgroundFillValue" />
        </base-fieldset-row>
        <base-fieldset-row>
          <BaseSwitcher v-model="bgAttachmentCheckbox" label="Fixed while scrolling" />
        </base-fieldset-row>
      </base-fieldset>

      <base-fieldset>
        <base-heading level="3">Background Video</base-heading>

        <base-fieldset-row>
          <BaseUploadInput
            v-model="bgVideo"
            label="Background video"
            placeholder="paste Video URL" />
        </base-fieldset-row>

        <base-fieldset-row>
          <BaseSwitcher v-model="bgVideoPositionCheckbox" label="Fixed while scrolling" />
        </base-fieldset-row>
      </base-fieldset>
    </div>

    <div slot="controls">
      <BaseButton color="gray" @click="$emit('requestClose')">Cancel</BaseButton>
      <BaseButton @click="applySettings">Save</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>
