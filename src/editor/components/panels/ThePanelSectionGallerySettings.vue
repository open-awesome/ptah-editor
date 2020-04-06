<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Gallery
    </h6>
    <div class="b-gallery-settings">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-panel__tabs"
      />
      <div class="layout layout__bg" v-if="activeTab === 'settings'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control">
              <base-caption>
                Gallery settings
              </base-caption>

              <control-section-gallery />
            </div>
          </div>
        </base-scroll-container>
      </div>
      <div class="layout layout__bg" v-if="activeTab === 'style'">
        <base-scroll-container>
          <div class="layout-padding">
            <div class="b-panel__control">
              <control-section-gallery-style />
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

export default {
  name: 'ThePanelSectionGalleryettings',

  components: {
    ControlSectionGallery,
    ControlSectionGalleryStyle
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      tabs: [
        { value: 'settings', text: 'settings' },
        { value: 'style', text: 'style' }
      ],
      activeTab: 'settings'
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
