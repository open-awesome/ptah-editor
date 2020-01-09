<template>
  <section
    class="b-top b-section-slider"
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
                @start="$_drag(`components${key.split('components')[1]}`)" @change="$_dragStop"
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
          'font-family': 'Montserrat',
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
        text: '<p>Here can be the text describing <br> the first amazing feature of your terrific game.</p>',
        styles: {
          'font-family': 'Montserrat',
          'font-size': '2.4rem',
          'line-height': '1.2',
          'color': '#FFFFFF',
          'text-align': 'left'
        }
      }
    },
    {},
    {
      element: {
        text: '<strong>Call to Action</strong>',
        styles: {
          'background-color': '#1A83FF',
          'color': '#000000',
          'font-family': 'Montserrat',
          'font-size:': '2rem',
          'text-align': 'center',
          'width': '240px',
          'height': '64px',
          'border-radius': '10px'
        },
        pseudo: {
          hover: {
            'background-color': '#FFFFFF !important',
            'color': '#000000 !important'
          }
        }
      }
    }
  ]
})

const C_CUSTOM_CONTAINER = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/2b2e728b-4c10-4c9b-bece-0ad7a14c0d3f.jpg)',
    'background-size': 'cover',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'padding-left': '230px',
    'padding-top': '120px'
  },
  media: {
    'is-mobile': {
      'padding-left': '16px',
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const C_CUSTOM_CONTAINER2 = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/d8ad22b8-02a9-4bb3-9cce-56cd26fff717.jpg)',
    'background-size': 'cover',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'padding-left': '230px',
    'padding-top': '120px'
  },
  media: {
    'is-mobile': {
      'padding-left': '16px',
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const C_CUSTOM_CONTAINER3 = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/51ba3abc-208a-42fc-8d69-9ec38a2713c4.jpg)',
    'background-size': 'cover',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'padding-left': '230px',
    'padding-top': '120px'
  },
  media: {
    'is-mobile': {
      'padding-left': '16px',
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
      paginationColor: '#1A83FF',
      navColor: '#1A83FF',
      navSize: '20px'
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
const NAME = 'SliderWestern'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Fullscreen feature slider',

  mixins: [defaults, sectionMedia],

  inject: ['device'],

  cover: '/img/covers/slider-western.jpg',

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

<style lang="sass" scoped="scoped">
</style>
