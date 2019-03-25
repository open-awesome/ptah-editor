<script>
import * as types from '@editor/types'
import section from '../../mixins/section.js'

const GROUP_NAME = 'Carousel'
const NAME = 'DefaultCarousel'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#333'
    },
    galleryImages: []
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/default-carousel.png',

  $schema: {
    mainStyle: types.GallerySlider
  },

  inject: ['device'],

  props: {
    id: {
      type: Number, required: true
    }
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionDataStore = this.$store.state.Landing.sectionData[NAME]
    let sectionData = this.canRestore(GROUP_NAME, NAME) ? sectionDataStore : SCHEMA_CUSTOM
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, NAME, SCHEMA_CUSTOM)
  }
}
</script>

<template>
  <section
    class="b-gallery-carousel"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
    >
      <slot name="video"/>
      <slot name="overlay"/>
      <h3 class="b-header">{{ $sectionData.mainStyle.header }}</h3>
      <div class="b-gallery-carousel-body">
        <template v-if="$sectionData.mainStyle.galleryImages.length > 1">
          <span class="b-gallery-carousel-body__arrow-prev">
            <IconBase name="slidePrev" width="24" height="47" color="white" />
          </span>
          <span class="b-gallery-carousel-body__arrow-next">
            <IconBase name="slidePrev" width="24" height="47" color="white" />
          </span>
        </template>
        <div class="b-gallery-carousel-body__inner" :style="{transform: 'translateX(0%)'}">
          <div class="b-gallery-carousel-body__items">
            <div
              class="b-gallery-carousel-body-item"
              v-for="(item, index) in $sectionData.mainStyle.galleryImages"
              :key="index"
              :class="{
                'b-gallery-carousel-body-item_grow': $sectionData.mainStyle.galleryImages.length === 1 || $sectionData.mainStyle.galleryImages.length > 2,
                'b-gallery-carousel-body-item_active': index === 1,
                'b-gallery-carousel-body-item_transparent': $sectionData.mainStyle.galleryImages.length > 1
              }"
            >
              <div class="b-gallery-carousel-body-item__img" :style="{backgroundImage: `url(${item.path})`}">
              </div>
            </div>
          </div>
        </div>
      </div>

  </section>

</template>
