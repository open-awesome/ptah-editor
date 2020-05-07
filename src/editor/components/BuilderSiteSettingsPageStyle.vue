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
            <div class="b-panel__control">
              <BaseCaption>
                {{ $t('s.backgroundColor') }}
              </BaseCaption>
              <div class="b-panel__col">
                <BaseColorPicker
                  :label="$t('s.chooseColor')"
                  v-model="pageBackgroundColor"
                />
              </div>
            </div>

            <div class="b-panel__control">
              <BaseCaption help="Image for page background">
                {{ $t('s.backgroundImage') }}
              </BaseCaption>
              <div class="b-panel__col">
                <base-uploader
                  key="0"
                  v-model="pageBackgroundUrl"
                  label="Image"
                />
              </div>

              <div class="b-panel__add" :class="{ 'show': pageBackgroundUrl }">
                <div class="b-panel__control">
                  <div class="b-panel__col">
                    <BaseRangeSlider
                      :label="$t('s.posX')"
                      position="left"
                      position-label="left"
                      :value="pageBackgroundPositionX"
                      step="1" :min="0" :max="980"
                      @change="setLeft"
                    >
                      <base-number-input
                        class="b-panel__number-input"
                        :value="numLeftValue"
                        unit="px"
                        :maximum="980"
                        @input="setLeftValue"
                      />
                    </BaseRangeSlider>
                  </div>
                </div>
                <div class="b-panel__control">
                  <div class="b-panel__col">
                    <BaseRangeSlider
                      position="left"
                      position-label="left"
                      :label="$t('s.poxY')"
                      v-model="pageBackgroundPositionY"
                      step="1" :min="0" :max="980"
                      @change="setTop"
                    >
                      <base-number-input
                        class="b-panel__number-input"
                        :value="numTopValue"
                        unit="px"
                        :maximum="980"
                        @input="setTopValue"
                      />
                    </BaseRangeSlider>
                  </div>
                </div>

                <div class="b-panel__control">
                  <div class="b-panel__col">
                    <BaseSwitcher
                      v-model="backgroundFillValue"
                      label="Background fill"
                    />
                  </div>
                </div>

                <div class="b-panel__control">
                  <div class="b-panel__col">
                    <BaseSwitcher
                      v-model="bgAttachmentCheckbox"
                      :label="$t('s.fixedScrolling')"
                    />
                  </div>
                </div>
              </div><!-- /__b-panel__add -->
            </div><!-- /__b-panel__row -->

            <div class="b-panel__control">
              <BaseCaption help="Video for page background">
                {{ $t('s.backgroundVideo') }}
              </BaseCaption>
              <div class="b-panel__col">
                <base-uploader
                  v-model="bgVideo"
                  label="Video"
                  type="video"
                />
              </div>
              <div class="b-panel__col">
                <BaseSwitcher v-model="bgVideoPositionCheckbox" :label="$t('s.fixedScrolling')" />
              </div>
            </div>
            <div class="b-panel__control">
              <BaseCaption help="Create a smooth fullpage scrolling effect" >
                Full page scroll
              </BaseCaption>
              <div class="b-panel__col">
                <BaseSwitcher v-model="fullPageScrollCheckbox" :label="$t('s.fpScroll')" />
              </div>
            </div>
          </div>
        </base-scroll-container>
      </div>
      <div class="layout _pr-05" v-if="activeTab === 'colors'">
        <base-scroll-container>
          <div class="layout-padding">
            <the-color-palette />
          </div>
        </base-scroll-container>
      </div>
      <div class="layout" v-if="activeTab === 'logo'">
        <div class="layout-padding _pr-0">
          <div class="b-panel__control">
            <BaseCaption>
              Logo
            </BaseCaption>
            <div class="b-panel__col">
              <base-uploader
                v-model="logo"
                label="Game logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import BaseUploadButton from '../../components/base/BaseUploadButton'
import TheColorPalette from './TheColorPalette'

export default {
  name: 'BuilderSiteSettingsPageStyle',

  components: {
    TheColorPalette,
    BaseUploadButton,
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
      tabs: [
        { value: 'logo', text: 'Logo' },
        { value: 'colors', text: 'Colors' },
        { value: 'bg', text: 'Background' }
      ],
      activeTab: 'logo',
      progress: false
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
        return this.bgSize !== 'cover'
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

    logo: {
      set (value) {
        this.storeSettings({ logo: value })
      },

      get () {
        return this.currentLanding.settings.logo
      }
    }
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    },

    pageBackgroundUrl  () {
      this.activateCheckListItem('bg')
      this.applySettings()
    },

    pageBackgroundColor () {
      this.activateCheckListItem('bg')
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
      this.activateCheckListItem('bg')
      this.applySettings()
    },

    bgVideoPosition () {
      this.applySettings()
    },

    fullPageScroll () {
      this.applySettings()
    }
  },

  created () {
    this.updateSettings()
  },

  methods: {
    ...mapActions([
      'storeSettings',
      'storeSaveSettingsPalette',
      'activateCheckListItem'
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
