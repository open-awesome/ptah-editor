<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="$sectionData.mainStyle.styles"
    class="b-gallery-carousel">

  <slot name="video"/>

  <h3 class="b-header">{{ $sectionData.mainStyle.header }}</h3>

  <div
      :data-options="getOptions()"
      class="swiper-container b-gallery-carousel-body swiper-container-coverflow swiper-container-3d swiper-container-horizontal b-gallery-carousel-body">

    <div class="swiper-wrapper b-gallery-carousel-body__items">
      <div
          v-for="(item, index) in images"
          :key="`slide-${index}-${_uid}`"
          :class="{ 'swiper-slide-active': index === 0 }"
          class="swiper-slide b-gallery-carousel-body-item">
        <div :style="`background-image:url(${item.path})`" class="swiper-slide-item"></div>
      </div>
    </div>

    <div v-show="images.length > 1" class="swiper-button-next"></div>
    <div v-show="images.length > 1" class="swiper-button-prev"></div>

    <div v-show="images.length > 1" class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
      <span
          v-for="(_, index) in images"
          :key="`bullet-${index}-${_uid}`">
          <span
              :class="{ 'swiper-pagination-bullet-active': index === 0 }"
              :aria-label="`Go to slide ${index + 1}`"
              class="swiper-pagination-bullet"
              tabindex="0"
              role="button">
          </span>
      </span>
    </div>

  </div>

</section>
</template>

<script>
import { GallerySlider as mainStyle } from '@editor/types'
import { cloneDeep, merge } from 'lodash-es'
import section from '../../mixins/section.js'

import 'swiper/dist/css/swiper.min.css'
import swiperOptions from '@editor/swiper'

const { next, prev, pagination, coreflow } = swiperOptions

const GROUP_NAME = 'Carousel'
const NAME = 'CoverflowCarousel'

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

  cover: '/img/covers/coverflow-carousel.png',

  $schema: { mainStyle },

  inject: ['device'],

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      images: [],
      container: null,
      options: null
    }
  },

  watch: {
    '$sectionData.mainStyle.galleryImages': {
      immediate: true,
      async handler (value) {
        this.updateImages(value)
      }
    }
  },

  methods: {
    updateImages (value) {
      let items = cloneDeep(value || [])
      let length = items.length
      this.images = (length)
        ? [...items]
        : [...items.splice(length - 1, 1), ...items]
    },

    getOptions () {
      return JSON.stringify(
        merge(coreflow, {
          navigation: {
            nextEl: next,
            prevEl: prev
          },
          pagination: { el: pagination }
        })
      )
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

<style lang="sass" scoped>
.swiper-slide-item
  width: 100%
  height: 100%

  background-size: contain
  background-position: center
  background-repeat: no-repeat

.swiper-pagination
  width: 100%
  bottom: 1rem
  left: 0
  &-bullet
    margin: 0 .4rem
</style>
