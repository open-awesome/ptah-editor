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

    <div class="swiper-pagination"></div>

  </div>

</section>
</template>

<script>
import { GallerySlider as mainStyle } from '@editor/types'
import { cloneDeep, merge } from 'lodash-es'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import swiperOptions from '@editor/swiper'

const { container, pagination, autoplay } = swiperOptions

export default {
  name: 'AutoplayCarousel',

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
      options: null,
      mounted: false
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
    },

    '$store.state.Sidebar.settingObjectSection.data': {
      deep: true,
      immediate: true,
      handler (value) {
        if (value && value.hasOwnProperty('mainStyle')) {
          this.initSwiper(value.mainStyle.swiper.delay)
        }
      }
    }
  },

  mounted () {
    this.mounted = true
    this.initSwiper()
  },

  methods: {
    updateImages (value) {
      let items = cloneDeep(value || [])
      let length = items.length
      this.images = (length)
        ? [...items]
        : [...items.splice(length - 1, 1), ...items]
    },

    initSwiper (delay) {
      if (!this.mounted) {
        return
      }

      this.container = this.$el.querySelector(container)
      this.options = merge(autoplay, { pagination: { el: this.$el.querySelector(pagination) } })

      if (this.swiper) {
        this.swiper.destroy(true, true)
      }

      if (delay) {
        this.options.autoplay.delay = delay
      } else {
        this.options.autoplay.delay = this.$sectionData.mainStyle.swiper.delay
      }

      this.swiper = new Swiper(this.container, this.options)
    },

    getOptions () {
      return JSON.stringify(
        merge(this.options, { pagination: { el: pagination } })
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

.swiper-pagination
  bottom: 2.5rem
  padding-left: 2.5rem
</style>
