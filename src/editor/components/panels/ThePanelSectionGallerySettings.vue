<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      {{ !isCarousel ? 'Gallery' : 'Carousel' }}
    </h6>

    <IndicatorPlatform />

    <div class="b-gallery-settings">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-panel__tabs"
      />
      <div class="layout layout__bg" v-if="activeTab === 'settings'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control" v-if="!isCarousel && !isMobile">
              <base-caption>
                Gallery settings
              </base-caption>

              <control-section-gallery />
            </div>

            <!-- Carousel Images Multiple Upload -->
            <div class="b-panel__control" v-if="isCarousel && !isMobile">
              <base-caption>
                Carousel  settings
              </base-caption>
              <control-carousel />
            </div>
          </div>
        </base-scroll-container>
      </div>
      <div class="layout layout__bg" v-if="activeTab === 'style'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control" v-if="!isCarousel && !isMobile">
              <control-section-gallery-style />
            </div>
          </div>
        </base-scroll-container>
      </div>
      <div class="layout layout__bg" v-if="activeTab === 'images'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control" v-if="isCarousel && !isMobile">
              <base-uploader
                :value="galleryImages"
                @change="updateGalleryImages"
                label="Image"
                multiple
              />
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import ControlSectionGallery from './../controls/TheControlSectionGallery.vue'
import ControlSectionGalleryStyle from './../controls/TheControlSectionGalleryStyle.vue'
import ControlCarousel from './../controls/TheControlCarousel.vue'
import { cloneDeep } from 'lodash-es'
import { mapActions, mapState } from 'vuex'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelSectionGallerySettings',

  components: {
    IndicatorPlatform,
    ControlSectionGallery,
    ControlSectionGalleryStyle,
    ControlCarousel
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      tabs: [],
      activeTab: 'settings',
      galleryImages: []
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    isCarousel () {
      return this.settingObjectOptions.hasMultipleImages
    }
  },

  created () {
    /* Carousel */
    this.galleryImages = this.settingObjectOptions.galleryImages || []

    if (!this.isCarousel) {
      this.tabs = [
        { value: 'settings', text: 'settings' },
        { value: 'style', text: 'style' }
      ]
    } else {
      this.tabs = [
        { value: 'settings', text: 'settings' },
        { value: 'images', text: 'images' }
      ]
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    updateGalleryImages (galleryImages) {
      this.updateSettingOptions({
        ...cloneDeep(this.settingObjectOptions),
        galleryImages
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-gallery-settings
  height: 100%
  position: relative
</style>
