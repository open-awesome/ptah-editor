<template>
  <section
    class="b-top"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
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
              :style="`$sectionData.container${key.split('components')[1]}.styles`">
              <draggable
                v-model="$sectionData[key]"
                class="b-draggable-slot"
                :style="$sectionData[`container${key.split('components')[1]}`].styles"
                @start="drag(`components${key.split('components')[1]}`)" @change="dragStop"
                >
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
import sectionMedia from '../../mixins/sectionMedia'

import { mapActions } from 'vuex'

import Swiper from 'swiper'
import swiperOptions from '@editor/swiper'
import 'swiper/dist/css/swiper.min.css'
import { randomPoneId } from '../../../editor/util'

let [
  C_CUSTOM_COLUMN,
  C_CUSTOM_COLUMN1,
  C_CUSTOM_COLUMN2,
  C_CUSTOM_COLUMN3,
  C_CUSTOM_COLUMN4,
  C_CUSTOM_COLUMN5
] = Array.from(new Array(6), (x, i) => {
  return [
    {
      element: {
        text: `<strong>${i + 1} feature title<strong>`,
        styles: {
          'font-family': 'Cinzel',
          'font-size': '3.6rem',
          'color': '#FFFFFF'
        },
        media: {
          'is-mobile': {
            'font-size': '3.6rem'
          }
        }
      }
    },
    {
      element: {
        text: '<p>Here can be the text describing the first amazing feature of your terrific game.</p>',
        styles: {
          'font-family': 'Montserrat',
          'font-size': '2.4rem',
          'line-height': '29px',
          'color': '#FFFFFF'
        }
      }
    },
    {},
    {
      element: {
        text: '<b>Call to Action</b>',
        styles: {
          'background-color': '#AF2E12',
          'color': '#ffffff',
          'font-family': 'Cinzel',
          'font-size': '2rem',
          'text-align': 'center',
          'width': '240px',
          'height': '64px',
          'border': '1px solid #000000'
        },
        pseudo: {
          'hover': {
            'background-color': '#333333 !important',
            'border': '1px solid #AF2E12 !important'
          }
        }
      }
    }
  ]
})

const C_CUSTOM_CONTAINER = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://s3.protocol.one/images/slider_ash_1.jpg)',
    'background-size': 'cover'
  },
  media: {
    'is-mobile': {
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const C_CUSTOM_CONTAINER2 = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://s3.protocol.one/images/slider_ash_2.jpg)',
    'background-size': 'cover'
  },
  media: {
    'is-mobile': {
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const C_CUSTOM_CONTAINER3 = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://s3.protocol.one/images/slider_ash_3.jpg)',
    'background-size': 'cover'
  },
  media: {
    'is-mobile': {
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': 'transparent',
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
      paginationColor: '#AF2E12',
      navColor: '#AF2E12'
    },
    count: 3
  },
  container1: _.merge({}, C_CUSTOM_CONTAINER),
  container2: _.merge({}, C_CUSTOM_CONTAINER2),
  container3: _.merge({}, C_CUSTOM_CONTAINER3),
  container4: _.merge({}, C_CUSTOM_CONTAINER),
  container5: _.merge({}, C_CUSTOM_CONTAINER2),
  container6: _.merge({}, C_CUSTOM_CONTAINER3),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  components2: _.merge({}, C_CUSTOM_COLUMN1),
  components3: _.merge({}, C_CUSTOM_COLUMN2),
  components4: _.merge({}, C_CUSTOM_COLUMN3),
  components5: _.merge({}, C_CUSTOM_COLUMN4),
  components6: _.merge({}, C_CUSTOM_COLUMN5),
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
const NAME = 'SliderFantasy'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Fullscreen feature slider',

  mixins: [defaults, sectionMedia],

  inject: ['device'],

  cover: 'https://s3.protocol.one/images/ZCAexs7b_cover_s.jpg',

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
@import '../../../assets/sass/section-media.sass'

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
      color: rgba($white, .5)

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

  svg
    width: 100%
    height: 100%

.swiper-button-next
  right: 20px
  .is-mobile &,
  .is-tablet &
    right: 0
    transform: scale(.7)
  @media only screen and (max-width: 768px)
    &
      right: 0
      transform: scale(.7)
.swiper-button-prev
  left: 20px
  .is-mobile &,
  .is-tablet &
    left: 0
    transform: scale(.7)
  @media only screen and (max-width: 768px)
    &
      left: 0
      transform: scale(.7)
</style>
