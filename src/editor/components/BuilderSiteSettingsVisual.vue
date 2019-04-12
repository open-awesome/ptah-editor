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
        if (value === false) {
          this.bgSize = 'cover'
          this.bgRepeat = 'no-repeat'
        }

        if (value === true) {
          this.bgSize = ''
          this.bgRepeat = 'repeat'
        }
      },
      get () {
        if (this.bgSize === 'cover') {
          return false
        }
        return true
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
      this.close()
    },

    close () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    }
  }
}
</script>

<template>
  <builder-modal-content-layout>
    <div class="b-builder-site-settings-visual">
      <div class="b-builder-site-settings-visual__row">
        <div class="b-builder-site-settings-visual__col">
          <BaseColorPicker :label="$t('s.backgroundColor')" v-model="pageBackgroundColor" />
        </div>
        <div class="b-builder-site-settings-visual__col">
          <base-uploader v-model="pageBackgroundUrl" :label="$t('s.backgroundImage')"/>
        </div>
        <div class="b-builder-site-settings-visual__col">
          <BaseTextField
            :label="$t('s.posX')"
            v-model="pageBackgroundPositionX"
            placeholder="0px"
            />
        </div>
        <div class="b-builder-site-settings-visual__col">
          <BaseTextField
            :label="$t('s.poxY')"
            v-model="pageBackgroundPositionY"
            placeholder="0px"
            />
        </div>
      </div>
      <div class="b-builder-site-settings-visual__row">
        <div class="b-builder-site-settings-visual__col">
          <BaseSwitcher v-model="fullPageScrollCheckbox" :label="$t('s.fpScroll')" />
        </div>
        <div class="b-builder-site-settings-visual__col">
          <BaseSwitcher v-model="backgroundFillValue" label="Background fill" />
        </div>
        <div class="b-builder-site-settings-visual__col">
          <BaseSwitcher v-model="bgAttachmentCheckbox" :label="$t('s.fixedScrolling')" />
        </div>
      </div>
      <div class="b-builder-site-settings-visual__row">
        <div class="b-builder-site-settings-visual__col">
            <base-uploader
                v-model="bgVideo"
                :label="$t('s.backgroundVideo')"
                type="video"/>
        </div>
        <div class="b-builder-site-settings-visual__col">
            <BaseSwitcher v-model="bgVideoPositionCheckbox" :label="$t('s.fixedScrolling')" />
        </div>
      </div>
    </div>

    <div slot="controls">
      <BaseButton size="middle" color="gray" :transparent="true" @click="close()">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton size="middle" color="blue" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-builder-site-settings-visual
  &__row
    display: flex
    align-items: center

    margin: $size-step/4 0
    padding: $size-step/4
    &:nth-child(2)
      background-color: rgba($ligth-grey, 0.3)
  &__col
    margin: $size-step/2 $size-step*2 $size-step/2 0
  /deep/
    .b-base-switcher__label
      margin-right: $size-step/2
</style>
