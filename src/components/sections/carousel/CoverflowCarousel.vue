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
      class="swiper-container b-gallery-carousel-body">

    <div class="swiper-wrapper b-gallery-carousel-body__items">
      <div
          v-for="(item, index) in images"
          :key="`slide-${index}-${_uid}`"
          class="swiper-slide b-gallery-carousel-body-item">
        <div :style="`background-image:url(${item.path})`" class="swiper-slide-item"></div>
      </div>
    </div>

    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>

  </div>

</section>
</template>

<script>
import { GallerySlider as mainStyle } from '@editor/types'
import { cloneDeep, merge } from 'lodash-es'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import swiperOptions from '@editor/swiper'

const { container, next, prev, pagination, coreflow } = swiperOptions

export default {
  name: 'CoverflowCarousel',

  group: 'Carousel',

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
      swiper: null,
      container: null,
      options: null
    }
  },

  watch: {
    '$sectionData.mainStyle.galleryImages': {
      immediate: true,
      async handler (value) {
        this.updateImages(value)
        await this.$nextTick()
        if (this.swiper) {
          this.initSwiper()
        }
      }
    },

    async 'device.type' () {
      await this.$nextTick()
      setImmediate(this.swiper.update)
    }
  },

  mounted () {
    this.initSwiper()
  },

  methods: {
    updateImages (value) {
      let items = cloneDeep(value)
      let length = items.length
      this.images = (length)
        ? [...items]
        : [...items.splice(length - 1, 1), ...items]
    },

    initSwiper () {
      this.container = this.$el.querySelector(container)
      this.options = merge(coreflow, {
        navigation: {
          nextEl: this.$el.querySelector(next),
          prevEl: this.$el.querySelector(prev)
        },
        pagination: { el: this.$el.querySelector(pagination) }
      })
      this.swiper = new Swiper(this.container, this.options)
    },

    getOptions () {
      return JSON.stringify(
        merge(this.options, {
          navigation: {
            nextEl: next,
            prevEl: prev
          }
        })
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.swiper-slide-item
  width: 100%
  height: 100%

  background-size: cover
  background-position: center
  background-repeat: no-repeat
</style>
