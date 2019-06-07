<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const GROUP_NAME = 'Carousel'
const NAME = 'DefaultCarousel'

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Title,
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

  mixins: [defaults],

  cover: '/img/covers/default-carousel.png',

  $schema: {
    mainStyle: types.GallerySlider,
    container: types.StyleObject,
    components: COMPONENTS
  },

  inject: ['device'],

  props: {
    id: {
      type: Number, required: true
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }
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
      <slot name="menu"/>
      <slot name="video"/>
      <slot name="overlay"/>

      <div class="b-header">
        <sandbox
          container-path="$sectionData.container"
          components-path="$sectionData.components"
          direction="column"
          class="b-sandbox">

          <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @change="dragStop">
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
