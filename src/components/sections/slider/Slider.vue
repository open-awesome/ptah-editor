<template>
  <section
    class="b-top"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div
      ref="swiper"
      :data-options="options"
      class="swiper-container b-gallery-carousel-body is-editable">

      <div class="swiper-wrapper b-gallery-carousel-body__items">
        <div
          v-for="(column, key) in $sectionData"
          v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) <= $sectionData.mainStyle.count"
          :key="`slide-${key}-${_uid}`"
          :class="{ 'swiper-slide-active': key === 'components1' }"
          class="swiper-slide b-gallery-carousel-body-item">

          <div class="slide-number">{{ key.slice(-1) }}</div>

          <div class="swiper-slide-item b-top__slide">
            <sandbox
              class="b-sandbox"
              :container-path="`$sectionData.container${key.split('components')[1]}`"
              :components-path="`$sectionData.components${key.split('components')[1]}`"
              direction="column"
              :style="`$sectionData.container${key.split('components')[1]}.styles`">
              <draggable
                v-model="$sectionData[key]"
                class="b-draggable-slot"
                :style="$sectionData[`container${key.split('components')[1]}`].styles">
                <div :class="`b-draggable-slot__${component.type}`"
                     v-for="(component, index) in $sectionData[key]"
                     v-if="$sectionData[key].length !== 0"
                     :key="index">
                  <component
                    class=""
                    v-styler:for="{
                      el: $sectionData[`${key}`][index].element,
                      path: `$sectionData.${key}[${index}].element`,
                      type: $sectionData[key][index].type,
                      label: $sectionData[`${key}`][index].label }"
                    :is="component.name"
                    :href="$sectionData[key][index].element.link.href"
                    :target="$sectionData[key][index].element.link.target"
                    :path="`${key}[${index}].element`"
                    :style="$sectionData[key][index].element.styles"
                    :class="[$sectionData[key][index].element.classes, $sectionData[key][index].class]">
                    <div v-html="$sectionData[key][index].element.text"></div>
                  </component>
                </div>
              </draggable>
            </sandbox>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div
        ref="next"
        :style="{'color': $sectionData.mainStyle.swiper.navColor }"
        v-show="$sectionData.mainStyle.count > 1 && $sectionData.mainStyle.swiper.showNavigation"
        class="swiper-button-next">
        <icon-base name="galleryArrowRight" height="50"></icon-base>
      </div>
      <div
        ref="prev"
        :style="{'color': $sectionData.mainStyle.swiper.navColor }"
        v-show="$sectionData.mainStyle.count > 1 && $sectionData.mainStyle.swiper.showNavigation"
        class="swiper-button-prev">
        <icon-base name="galleryArrowLeft" height="50"></icon-base>
      </div>

      <!-- Pagination -->
      <v-style>
        .{{paginationClass}} span {
          background-color: {{$sectionData.mainStyle.swiper.paginationColor}};
          width: {{$sectionData.mainStyle.swiper.navSize}};
          height: {{$sectionData.mainStyle.swiper.navSize}};
        }
      </v-style>

      <div
        ref="pagination"
        :class="paginationClass"
        v-show="$sectionData.mainStyle.count > 1 && $sectionData.mainStyle.swiper.showPagination"
        class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
          <span
            v-for="(_, index) in $sectionData.mainStyle.count"
            :key="`bullet-${index}-${_uid}`">
              <span
                :class="{ 'swiper-pagination-bullet-inactive': index !== 0 }"
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
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

import { mapActions } from 'vuex'

import Swiper from 'swiper'
import swiperOptions from '@editor/swiper'
import 'swiper/dist/css/swiper.min.css'
import { randomPoneId } from '../../../editor/util'

const C_CUSTOM_COLUMN = [
  {
    element: {
      text: 'This is a header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '6.4rem',
        'color': '#000000'
      }
    }
  },
  {
    element: {
      text: '<p>An sincerity so extremity he additions.</p>' +
      '<p>Her yet there truth merit.</p>' +
      '<p>Mrs all projecting favourable now unpleasing.</p>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '3.2rem',
        'color': '#6D6D6D'
      }
    }
  },
  {},
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': '#FFFFFF',
        'color': '#003EDC',
        'font-family': 'Montserrat',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '50px'
      }
    }
  }
]

const C_CUSTOM_CONTAINER = {
  styles: {
    'background-color': '#55D287'
  }
}

const C_CUSTOM_CONTAINER2 = {
  styles: {
    'background-color': '#72AEF3'
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#8CD2B5',
      'height': '80vh'
    },
    swiper: {
      autoHeight: true,
      pagination: { el: swiperOptions.pagination },
      navigation: {
        nextEl: swiperOptions.next,
        prevEl: swiperOptions.prev
      },
      frameWidth: 12,
      paginationColor: '#2275D7',
      navColor: '#2275D7'
    },
    count: 3
  },
  container1: _.merge({}, C_CUSTOM_CONTAINER),
  container2: _.merge({}, C_CUSTOM_CONTAINER2),
  container3: _.merge({}, C_CUSTOM_CONTAINER),
  container4: _.merge({}, C_CUSTOM_CONTAINER2),
  container5: _.merge({}, C_CUSTOM_CONTAINER),
  container6: _.merge({}, C_CUSTOM_CONTAINER2),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  components2: _.merge({}, C_CUSTOM_COLUMN),
  components3: _.merge({}, C_CUSTOM_COLUMN),
  components4: _.merge({}, C_CUSTOM_COLUMN),
  components5: _.merge({}, C_CUSTOM_COLUMN),
  components6: _.merge({}, C_CUSTOM_COLUMN),
  edited: true
}

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
  },
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test',
    label: 'button'
  }
]

const GROUP_NAME = 'Slider'
const NAME = 'Slider'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults],

  inject: ['device'],

  cover: 'https://gn823.cdn.stg.gamenet.ru/0/8Y52t/o_1XHdCo.png',

  data () {
    return {
      options: '',
      swiper: {},
      paginationClass: ''
    }
  },

  $schema: {
    mainStyle: types.BannerSection,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    container5: types.StyleObject,
    container6: types.StyleObject,
    components1: _.merge([], COMPONENTS),
    components2: _.merge([], COMPONENTS),
    components3: _.merge([], COMPONENTS),
    components4: _.merge([], COMPONENTS),
    components5: _.merge([], COMPONENTS),
    components6: _.merge([], COMPONENTS)
  },

  watch: {
    '$sectionData.mainStyle.swiper': {
      handler () {
        this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)
      },
      deep: true
    },

    'device.type': {
      handler () {
        setTimeout(() => {
          this.swiper.update()
        }, 500)
      }
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }

    this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)

    this.paginationClass = `custom-bullets-${randomPoneId()}`
  },

  mounted () {
    this.$nextTick(function () {
      let self = this
      this.swiper = new Swiper(this.$refs.swiper, {
        loop: false,
        touchStartPreventDefault: false,
        navigation: {
          nextEl: this.$refs.next,
          prevEl: this.$refs.prev
        },
        pagination: {
          el: this.$refs.pagination,
          clickable: true
        },
        on: {
          slideChange: function () {
            self.setControlPanel(false)
          }
        }
      })
    })
  },

  methods: {
    ...mapActions('Sidebar', [
      'setControlPanel'
    ])
  }
}
</script>

<style lang="sass" scoped>
.b-top
  width: 100%
  max-width: 100vw
  margin: 0
  padding: 0
  overflow: hidden

  &__slide
    width: 100%
    height: 100%
    position: relative

  .slide-number
    display: none

.swiper-container
  border: none !important
  .b-draggable-slot
    border: none !important
    width: 100% !important
  &.is-editable
    .slide-number
      display: block
      position: absolute
      top: 2rem
      right: 4rem
      z-index: 3

      font-size: 5rem
      font-weight: bold
      color: rgba($black, .2)

.swiper-container, .b-sandbox, .swiper-slide
  height: 100% !important

.swiper-slide-image
  max-width: 100%
.swiper-slide-item
  width: 100%
  height: 100%

  background-size: contain
  background-position: center
  background-repeat: no-repeat

.swiper-pagination
  width: 100%
  bottom: 2.5rem
  &-bullet
    margin: 0 .4rem

.swiper-pagination-bullet
  opacity: 1
  &-inactive
    opacity: .35 !important
    background: black !important

.swiper-button-next,
.swiper-button-prev
  background-image: none
</style>
