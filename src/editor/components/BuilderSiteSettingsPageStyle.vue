<template>
  <builder-modal-content-layout>
    <div class="b-page-style">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-tabs"
      />
      <div class="layout layout__bg" v-if="activeTab === 'bg'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-page-style__row">
              <BaseCaption help="Image for page background">
                {{ $t('s.backgroundImage') }}
              </BaseCaption>
              <div class="b-page-style__col">
                <base-uploader
                  key="0"
                  v-model="pageBackgroundUrl"
                  label="Image"
                />
              </div>
              <template v-if="pageBackgroundUrl !== ''">
                <div class="b-page-style__col">
                  <BaseRangeSlider
                    :label="$t('s.posX')"
                    position="left"
                    :value="pageBackgroundPositionX"
                    step="1" :min="0" :max="980"
                    @change="setLeft"
                  >
                    <base-number-input
                      class="b-page-style__number-input"
                      :value="numLeftValue"
                      unit="px"
                      :maximum="980"
                      @input="setLeftValue"
                    />
                  </BaseRangeSlider>
                </div>
                <div class="b-page-style__col">
                  <BaseRangeSlider
                    position="left"
                    :label="$t('s.poxY')"
                    v-model="pageBackgroundPositionY"
                    step="1" :min="0" :max="980"
                    @change="setTop"
                  >
                    <base-number-input
                      class="b-page-style__number-input"
                      :value="numTopValue"
                      unit="px"
                      :maximum="980"
                      @input="setTopValue"
                    />
                  </BaseRangeSlider>
                </div>
              </template>
              <div class="b-page-style__col">
                <BaseColorPicker
                  :label="$t('s.backgroundColor')"
                  v-model="pageBackgroundColor"
                />
              </div>
              <div class="b-page-style__col">
                <BaseSwitcher
                  v-model="backgroundFillValue"
                  label="Background fill"
                />
              </div>
              <div class="b-page-style__col">
                <BaseSwitcher
                  v-model="bgAttachmentCheckbox"
                  :label="$t('s.fixedScrolling')"
                />
              </div>
            </div>
            <div class="b-page-style__row">
              <BaseCaption help="Video for page background">
                {{ $t('s.backgroundVideo') }}
              </BaseCaption>
              <div class="b-page-style__col">
                <base-uploader
                  v-model="bgVideo"
                  label="Video"
                  type="video"
                />
              </div>
              <div class="b-page-style__col">
                <BaseSwitcher v-model="bgVideoPositionCheckbox" :label="$t('s.fixedScrolling')" />
              </div>
            </div>
            <div class="b-page-style__row">
              <BaseCaption help="Create a smooth fullpage scrolling effect" >
                Full page scroll
              </BaseCaption>
              <div class="b-page-style__col">
                <BaseSwitcher v-model="fullPageScrollCheckbox" :label="$t('s.fpScroll')" />
              </div>
            </div>
          </div>
        </base-scroll-container>
      </div>
      <div class="layout" v-if="activeTab === 'colors'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-page-style__row">
              <BaseCaption help="Color palette for color pickers" >
                Color palette
              </BaseCaption>
              <div class="b-page-style__col">
                <base-uploader
                  key="1"
                  v-model="imagePalette"
                  @change="changeImagePalette"
                  label="Image"
                  :tooltipText="'Load image for generate palette of page'"
                  @getInputSrcFiles="getInputSrcFiles"
                >
                </base-uploader>
              </div>
              <div class="b-page-style__col" v-if="palette">
                <div class="b-palette">
                  <ul class="b-palette__list">
                    <li class="b-palette__list-item b-palette__list-item_palette">
                      <IconBase
                        width="24"
                        height="24"
                        name="palette"
                        color="#A2A5A5"
                      />
                    </li>
                    <li
                      v-for="(color, index) in palette"
                      :key="color + index"
                      :style="{'background-color' : color}"
                      class="b-palette__list-item"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import ColorThief from 'colorthief/dist/color-thief.umd.js'

export default {
  name: 'BuilderSiteSettingsPageStyle',

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
      pageBackgroundPositionX: 0,
      pageBackgroundPositionY: 0,
      numLeftValue: 0,
      numTopValue: 0,
      bgAttachment: '',
      bgSize: '',
      bgRepeat: '',
      bgVideo: '',
      bgVideoPosition: '',
      fullPageScroll: '',
      imageForColorThief: null,
      tabs: [
        { value: 'colors', text: 'Colors' },
        { value: 'bg', text: 'Background' }
      ],
      activeTab: 'bg'
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
    },

    palette () {
      return this.currentLanding.settings.palette
    },

    imageForPalette () {
      return this.currentLanding.settings.imageForPalette
    }
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    },

    imageForColorThief (images) {
      const image = images[0] || images
      const reader = new FileReader()
      const preview = document.createElement('img')
      const colorThief = new ColorThief()

      preview.crossOrigin = 'Anonymous'
      preview.setAttribute('width', '100')
      preview.setAttribute('height', '200')

      reader.readAsDataURL(image)
      reader.onloadend = function () {
        preview.src = reader.result
      }

      setTimeout(() => {
        const palette = colorThief.getPalette(preview, 6).map(c => {
          return this.getHexColor(c)
        })
        this.storeSaveSettingsPalette({ palette: _.uniqBy(palette), image: this.imagePalette })
      }, 1000)
    },

    pageBackgroundUrl  () {
      this.applySettings()
    },

    pageBackgroundColor () {
      this.applySettings()
    },

    pageBackgroundPositionX () {
      this.applySettings()
    },

    pageBackgroundPositionY () {
      this.applySettings()
    },

    bgAttachment () {
      this.applySettings()
    },

    bgRepeat () {
      this.applySettings()
    },

    bgSize () {
      this.applySettings()
    },

    bgVideo () {
      this.applySettings()
    },

    bgVideoPosition () {
      this.applySettings()
    },

    fullPageScroll () {
      this.applySettings()
    },

    imagePalette () {
      this.applySettings()
    }
  },

  created () {
    this.updateSettings()
  },

  methods: {
    ...mapActions([
      'storeSettings',
      'storeSaveSettingsPalette'
    ]),
    ...mapActions('Sidebar', [
      'toggleSidebar'
    ]),
    updateSettings () {
      const settings = this.currentLanding.settings

      this.pageBackgroundUrl = settings.styles.backgroundImage
      this.pageBackgroundColor = settings.styles.backgroundColor
      this.pageBackgroundPositionX = settings.styles.backgroundPositionX
      this.numLeftValue = this.pageBackgroundPositionX
      this.pageBackgroundPositionY = settings.styles.backgroundPositionY
      this.numTopValue = this.pageBackgroundPositionY
      this.bgAttachment = settings.styles.backgroundAttachment
      this.bgRepeat = settings.styles.backgroundRepeat
      this.bgSize = settings.styles.backgroundSize
      this.bgVideo = settings.video
      this.bgVideoPosition = settings.videoPosition
      this.fullPageScroll = settings.fullPageScroll
      this.imagePalette = this.imageForPalette
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
    },

    close () {
      this.toggleSidebar(false)
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    getInputSrcFiles (value) {
      this.imageForColorThief = value
    },

    getHexColor (color) {
      const rgbToHex = color.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')

      return `#${rgbToHex}`
    },

    changeImagePalette (value) {
      if (value === null) {
        this.storeSaveSettingsPalette({ palette: null, image: null })
      }
    },

    setLeft (value) {
      this.numLeftValue = value
    },

    setLeftValue (value) {
      this.pageBackgroundPositionX = value
    },

    setTop (value) {
      this.numTopValue = value
    },

    setTopValue (value) {
      this.pageBackgroundPositionY = value
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-page-style
  height: 100%
  position: relative

  &__row
    display: flex
    flex-direction: column
    align-items: flex-start

    margin: 0 0 3rem
    padding: 0
  &__col
    width: 100%
    max-width: 24rem
    margin: 1rem 0 1rem 1.8rem
  &__number-input
    margin-left: 0.8rem
  /deep/
    .b-base-switcher__label
      margin-right: $size-step/2

.b-palette
  &__list
    display: flex
    justify-content: center

    margin: 0 0 $size-step / 4 0
    padding: 0
    &-item
      list-style: none
      width: 2rem
      height: 2rem
      border-radius: 100%
      margin: 4px
      &_palette
        margin: 2px 14px 4px 4px

</style>
