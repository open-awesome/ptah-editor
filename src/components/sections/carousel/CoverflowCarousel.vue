<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    class="b-gallery-carousel">

  <slot name="menu"/>
  <slot name="video"/>
  <slot name="overlay"/>

  <div class="b-header">
    <sandbox
      container-path="$sectionData.container"
      components-path="$sectionData.components"
      class="b-sandbox">

      <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
        <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
          <component
            v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
            :is="component.name"
            :href="$sectionData.components[index].element.link.href"
            :target="$sectionData.components[index].element.link.target"
            :style="$sectionData.components[index].element.styles"
            :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
            :path="`components[${index}].element`"
          >
            <div v-html="$sectionData.components[index].element.text"></div>
          </component>
        </div>
      </draggable>
    </sandbox>
  </div>

  <div
      :data-options="getOptions()"
      class="swiper-container b-gallery-carousel-body swiper-container-coverflow swiper-container-3d swiper-container-horizontal b-gallery-carousel-body">

    <div class="swiper-wrapper b-gallery-carousel-body__items">
      <div
          v-for="(item, index) in $sectionData.mainStyle.galleryImages"
          :key="`slide-${index}-${_uid}`"
          :class="{ 'swiper-slide-active': index === 0 }"
          class="swiper-slide b-gallery-carousel-body-item">
        <div :style="`background-image:url(${item.path})`" class="swiper-slide-item"></div>
      </div>
    </div>

    <div v-show="$sectionData.mainStyle.galleryImages.length > 1" class="swiper-button-next"></div>
    <div v-show="$sectionData.mainStyle.galleryImages.length > 1" class="swiper-button-prev"></div>

    <div v-show="$sectionData.mainStyle.galleryImages.length > 1" class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
      <span
          v-for="(_, index) in $sectionData.mainStyle.galleryImages"
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
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

import 'swiper/dist/css/swiper.min.css'
import swiperOptions from '@editor/swiper'

const { next, prev, pagination, coreflow } = swiperOptions

const GROUP_NAME = 'Carousel'
const NAME = 'CoverflowCarousel'

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title',
    key: 0
  }
]

const C_CUSTOM = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Heebo',
        'font-size': '5.6rem',
        'color': '#ffffff'
      }
    },
    key: 0
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#8CD2B5'
    },
    galleryImages: []
  },
  components: merge([], C_CUSTOM),
  container: {},
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/coverflow-carousel.png',

  $schema: {
    mainStyle: types.GallerySlider,
    container: types.StyleObject,
    components: COMPONENTS
  },

  inject: ['device'],

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      container: null,
      options: null
    }
  },

  methods: {
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
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'

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
