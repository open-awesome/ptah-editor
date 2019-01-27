<script>
import * as types from '@editor/types'
import _ from 'lodash'
import section from '../../mixins/section.js'

const GROUP_NAME = 'Carousel'
const NAME = 'DefaultCarousel'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#333'
    }
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  $schema: {
    mainStyle: types.GallerySlider
  },

  inject: ['device'],

  props: {
    id: {
      type: Number, required: true
    }
  },

  data () {
    return {
      galleryImages: []
    }
  },

  watch: {
    '$sectionData.mainStyle.galleryImages' (value) {
      this.updateGalleryImages()
    }
  },

  methods: {
    updateGalleryImages () {
      const items = this.$sectionData.mainStyle.galleryImages.slice()
      if (items.length <= 1) {
        this.galleryImages = this.$sectionData.mainStyle.galleryImages
      } else {
        const lastItemArray = items.splice(_.size(items) - 1, 1)
        this.galleryImages = [
          ...lastItemArray,
          ...items
        ]
      }
    }
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionDataStore = this.$store.state.Landing.sectionData[NAME]
    let sectionData = this.canRestore(GROUP_NAME, NAME) ? sectionDataStore : SCHEMA_CUSTOM
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, NAME, SCHEMA_CUSTOM)

    this.updateGalleryImages()
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
      <h3 class="b-header">{{ $sectionData.mainStyle.header }}</h3>
      <div class="b-gallery-carousel-body">
        <template v-if="galleryImages.length > 1">
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
              v-for="(item, index) in galleryImages"
              :key="index"
              :class="{
                'b-gallery-carousel-body-item_grow': galleryImages.length === 1 || galleryImages.length > 2,
                'b-gallery-carousel-body-item_active': index === 1,
                'b-gallery-carousel-body-item_transparent': galleryImages.length > 1
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
