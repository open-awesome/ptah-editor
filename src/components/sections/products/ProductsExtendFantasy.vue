<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'
import { mapActions } from 'vuex'

let prev = [
  'https://s3.protocol.one/images/Bonecrusher.png',
  'https://s3.protocol.one/images/Ens_Javelin.png',
  'https://s3.protocol.one/images/Gellas_Warrior.png',
  'https://s3.protocol.one/images/Friz_arbalester.png'
]

let label = [
  'Start', 'Full', 'Delux', 'Ultimate'
]

let price = [
  '10', '19', '29', '39'
]

const [
  C_CUSTOM_1,
  C_CUSTOM_2,
  C_CUSTOM_3,
  C_CUSTOM_4
] = Array.from(new Array(4), (x, i) => {
  return [
    {
      element: {
        styles: {
          'background-image': `url(${prev[i]})`,
          'background-color': 'rgba(0, 0, 0, 0)',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          'width': '275px',
          'height': '275px'
        },
        media: {
          'is-mobile': {
            'width': '275px',
            'height': '275px'
          }
        }
      }
    },
    {
      element: {
        text: `<p><strong>${label[i]} edition</strong></p>`,
        styles: {
          'font-family': 'Cinzel',
          'font-size': '2.8rem',
          'color': '#ffffff'
        },
        media: {
          'is-mobile': {
            'font-size': '3rem'
          }
        }
      }
    },
    {
      element: {
        text: `<b>${price[i]}$</b>`,
        styles: {
          'color': '#fff',
          'font-family': 'Cinzel',
          'font-size': '3rem'
        },
        media: {
          'is-mobile': {
            'font-size': '3rem'
          }
        }
      }
    },
    {
      element: {
        text: '<p><strong>BUY NOW</strong></p>',
        styles: {
          'background-color': '#333333',
          'color': '#FFFFFF',
          'font-family': 'Cinzel',
          'font-size:': '1.6rem',
          'text-align': 'center',
          'width': '161px',
          'height': '64px',
          'border-width': '2px',
          'border-style': 'solid',
          'border-color': '#AF2E11'
        },
        pseudo: {
          hover: {
            'background-color': '#A9893C !important'
          }
        }
      }
    }
  ]
})

const [
  C_CUSTOM_1_M,
  C_CUSTOM_2_M,
  C_CUSTOM_3_M,
  C_CUSTOM_4_M
] = Array.from(new Array(4), (x, i) => {
  return [
    {
      element: {
        styles: {
          'background-image': `url(${prev[i]})`,
          'background-color': 'rgba(0, 0, 0, 0)',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          'width': '220px',
          'height': '195px'
        }
      }
    },
    {
      element: {
        text: `<b>${label[i]} Edition</b>`,
        styles: {
          'color': '#fff',
          'font-family': 'Cinzel',
          'font-size': '24px',
          'line-height': '29px'
        }
      }
    }
  ]
})

const C_CUSTOM_1D = [
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital game copy'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Horse'
      },
      styles: {
        color: '#818181'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Great sword'
      },
      styles: {
        color: '#818181'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital soundtrack'
      },
      styles: {
        color: '#818181'
      }
    }
  }
]

const C_CUSTOM_2D = [
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital game copy'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Horse'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Great sword'
      },
      styles: {
        color: '#818181'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital soundtrack'
      },
      styles: {
        color: '#818181'
      }
    }
  }
]

const C_CUSTOM_3D = [
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital game copy'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Horse'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Great sword'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital soundtrack'
      },
      styles: {
        color: '#818181'
      }
    }
  }
]

const C_CUSTOM_4D = [
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital game copy'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Horse'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Great sword'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#00FF0A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Digital soundtrack'
      },
      styles: {
        color: '#ffffff'
      }
    }
  }
]

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const C_CUSTOM_CONTAINER_M = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const C_CUSTOM_CONTAINER_D = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'flex-start',
    'padding-top': '10px',
    'padding-left': '85px'
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/travel_map.jpg)',
      'padding-top': '80px',
      'padding-bottom': '125px',
      'background-position': '50% 50%',
      'background-size': 'cover'
    },
    overlay: {
      color: 'rgba(0,0,0,1)',
      opacity: '.3'
    }
  },
  containerStandart: _.merge({}, C_CUSTOM_CONTAINER),
  containerStandartM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerStandartD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerFull: _.merge({}, C_CUSTOM_CONTAINER),
  containerFullM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerFullD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerDeluxe: _.merge({}, C_CUSTOM_CONTAINER),
  containerDeluxeM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerDeluxeD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerUltimate: _.merge({}, C_CUSTOM_CONTAINER),
  containerUltimateM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerUltimateD: _.merge({}, C_CUSTOM_CONTAINER_D),
  componentsStandart: _.merge({}, C_CUSTOM_1),
  componentsStandartM: _.merge({}, C_CUSTOM_1_M),
  componentsStandartD: _.merge({}, C_CUSTOM_1D),
  componentsFull: _.merge({}, C_CUSTOM_2),
  componentsFullM: _.merge({}, C_CUSTOM_2_M),
  componentsFullD: _.merge({}, C_CUSTOM_2D),
  componentsDeluxe: _.merge({}, C_CUSTOM_3),
  componentsDeluxeM: _.merge({}, C_CUSTOM_3_M),
  componentsDeluxeD: _.merge({}, C_CUSTOM_3D),
  componentsUltimate: _.merge({}, C_CUSTOM_4),
  componentsUltimateM: _.merge({}, C_CUSTOM_4_M),
  componentsUltimateD: _.merge({}, C_CUSTOM_4D),
  edited: true
}

const COMPONENTS = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'Pic'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-cost',
    label: 'cost'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test',
    label: 'button'
  }
]

const COMPONENTS_M = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'Pic'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  }
]

const COMPONENTS_D = [
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  }
]
const GROUP_NAME = 'Products'
const NAME = 'ProductsExtendFantasy'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Product list side expanded view',

  mixins: [defaults, sectionMedia],

  cover: 'https://s3.protocol.one/images/PEFant.jpg',

  $schema: {
    mainStyle: types.ProductSection,
    container: types.StyleObject,
    containerStandart: types.StyleObject,
    containerStandartM: types.StyleObject,
    containerStandartD: types.StyleObject,
    containerFull: types.StyleObject,
    containerFullM: types.StyleObject,
    containerFullD: types.StyleObject,
    containerDeluxe: types.StyleObject,
    containerDeluxeM: types.StyleObject,
    containerDeluxeD: types.StyleObject,
    containerUltimate: types.StyleObject,
    containerUltimateM: types.StyleObject,
    containerUltimateD: types.StyleObject,
    componentsStandart: _.merge([], COMPONENTS),
    componentsStandartM: _.merge([], COMPONENTS_M),
    componentsStandartD: _.merge([], COMPONENTS_D),
    componentsFull: _.merge([], COMPONENTS),
    componentsFullM: _.merge([], COMPONENTS_M),
    componentsFullD: _.merge([], COMPONENTS_D),
    componentsDeluxe: _.merge([], COMPONENTS),
    componentsDeluxeM: _.merge([], COMPONENTS_M),
    componentsDeluxeD: _.merge([], COMPONENTS_D),
    componentsUltimate: _.merge([], COMPONENTS),
    componentsUltimateM: _.merge([], COMPONENTS_M),
    componentsUltimateD: _.merge([], COMPONENTS_D),
    heightRightStage: 0
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),

    async showSettings (panel) {
      let index = _.findIndex(this.$builder.sections, ['group', GROUP_NAME])

      this.setSettingSection(this.$builder.sections[index])

      await this.$nextTick()

      this.setControlPanel(panel)
    },

    selectProduct (key) {
      this.$sectionData.mainStyle.selectProduct.name = key
    },

    calcHeightRightStage () {
      let height = 0
      let slotsHeight = 0
      let index = this.$section.id
      let section = document.getElementById(`section_${index}`)

      let rightStage = section.querySelector('.b-products-columns-extend__right')
      let allItems = rightStage.querySelectorAll('.b-products-columns-extend__right-item')

      allItems.forEach(function (item, i, arr) {
        if (item.classList.contains('_hide')) return

        item.querySelectorAll('.b-slot').forEach(function (slot, i, arr) {
          slotsHeight += slot.offsetHeight
        })

        if (slotsHeight > height) height = slotsHeight
        slotsHeight = 0
      })

      this.$sectionData.heightRightStage = height
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  },

  mounted () {
    this.calcHeightRightStage()
  },

  updated () {
    this.calcHeightRightStage()
  }
}
</script>

<template>
  <section
    class="b-products-columns-extend"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid">
      <div class="b-section-padd">

        <div class="b-section-padd-border">
          <!-- Setting controls -->
          <div class="b-section-menu__controls">
            <div>
              <a href="#" class="b-section-menu__control"
                 tooltip="Products"
                 tooltip-position="bottom"
                 @click.stop="showSettings('SectionProductsColumnsSettings')">
                <icon-base name="cog" width="12" height="15" />
              </a>
            </div>
          </div>

          <div class="b-grid__row b-products-columns-extend__row"
           :style="{
             'align-items' : $sectionData.mainStyle.styles['align-items'],
             '--color-active': $sectionData.mainStyle.itemHoverColor
             }">
            <div class="b-grid__col-8 b-grid__col-m-12 b-products-columns-extend__left hidden-m">
              <!-- b-products-columns-extend__left -->
              <div class="b-grid__row b-products-columns-extend__row">
                <div class="b-grid__col-6 b-products-columns-extend__left-item"
                 v-for="(product, key) in $sectionData.mainStyle.products"
                 :key="key"
                 v-if="$sectionData.mainStyle.products[key].visible"
                 :data-index="key"
                 product-extend-preview="b-products-columns-extend__right-item_active"
                 @click="selectProduct(key)"
                 :class="{ 'b-products-columns-extend__left-item_active': $sectionData.mainStyle.selectProduct.name === key }"
                >
                  <sandbox
                    class="b-sandbox"
                    :container-path="`$sectionData.container${key}M`"
                    :components-path="`$sectionData.components${key}M`"
                  >

                    <draggable v-model="$sectionData['components' + key]" class="b-draggable-slot" :style="$sectionData[`container${key}M`].styles" @start="$_drag(`components${key}M`)" @change="$_dragStop">
                      <div
                        v-for="(component, index) in $sectionData[`components${key}M`]"
                        v-if="$sectionData[`components${key}M`].length !== 0"
                        :key="index"
                      >
                        <component class="b-products-colums-component"
                         v-styler:for="{ el: $sectionData[`components${key}M`][index].element, path: `$sectionData.components${key}M[${index}].element`, type: $sectionData[`components${key}M`][index].type, label: $sectionData[`components${key}M`][index].label }"
                         :is="component.name"
                         :href="$sectionData[`components${key}M`][index].element.link.href"
                         :target="$sectionData[`components${key}M`][index].element.link.target"
                         :path="`components${key}M[${index}].element`"
                         :style="$sectionData[`components${key}M`][index].element.styles"
                         :class="[$sectionData[`components${key}M`][index].element.classes, $sectionData[`components${key}M`][index].class]"
                        >
                          <div v-html="$sectionData[`components${key}M`][index].element.text"></div>
                        </component>
                      </div>
                    </draggable>
                  </sandbox>
                </div>
              </div><!--/.b-products-columns-extend__left-->
            </div>
            <div class="b-grid__col-4 b-grid__col-m-12 b-products-columns-extend__right"
                 :style="{ height: $sectionData.heightRightStage + 'px' }"
            >
              <!-- b-products-columns-extend__right -->
              <div class="b-products-columns-extend__right-stage">
                <div class="b-products-columns-extend__right-item"
                 v-for="(product, key) in $sectionData.mainStyle.products"
                 :key="key"
                 :class="[{ 'b-products-columns-extend__right-item_active': ($sectionData.mainStyle.selectProduct.name === key && $sectionData.mainStyle.products[key].visible)}, { '_hide' : !$sectionData.mainStyle.products[key].visible }]"
                 :product-extend-stage="key"
                 :data-index="key"
                >
                  <sandbox
                    class="b-sandbox"
                    :container-path="`$sectionData.container${key}`"
                    :components-path="`$sectionData.components${key}`"
                  >
                    <draggable v-model="$sectionData['components' + key]" class="b-draggable-slot" :style="$sectionData[`container${key}`].styles" @start="$_drag(`components${key}`)" @change="$_dragStop">
                      <div
                        v-for="(component, index) in $sectionData[`components${key}`]"
                        v-if="$sectionData[`components${key}`].length !== 0"
                        :key="index"
                      >
                        <component class="b-products-colums-component"
                         v-styler:for="{ el: $sectionData[`components${key}`][index].element, path: `$sectionData.components${key}[${index}].element`, type: $sectionData[`components${key}`][index].type, label: $sectionData[`components${key}`][index].label }"
                         :is="component.name"
                         :href="$sectionData[`components${key}`][index].element.link.href"
                         :target="$sectionData[`components${key}`][index].element.link.target"
                         :path="`components${key}[${index}].element`"
                         :style="$sectionData[`components${key}`][index].element.styles"
                         :class="[$sectionData[`components${key}`][index].element.classes, $sectionData[`components${key}`][index].class]"
                        >
                          <div v-html="$sectionData[`components${key}`][index].element.text"></div>
                        </component>
                      </div>
                    </draggable>
                  </sandbox>
                  <sandbox
                    class="b-sandbox"
                    :container-path="`$sectionData.container${key}D`"
                    :components-path="`$sectionData.components${key}D`"
                  >
                    <draggable v-model="$sectionData['components' + key + 'D']" class="b-draggable-slot" :style="$sectionData[`container${key}D`].styles" @start="$_drag(`components${key}D`)" @change="$_dragStop">
                      <div
                        v-for="(component, index) in $sectionData[`components${key}D`]"
                        v-if="$sectionData[`components${key}D`].length !== 0"
                        :key="index"
                      >
                        <component class="b-products-colums-component"
                         v-styler:for="{ el: $sectionData[`components${key}D`][index].element, path: `$sectionData.components${key}D[${index}].element`, type: $sectionData[`components${key}D`][index].type, label: $sectionData[`components${key}D`][index].label }"
                         :is="component.name"
                         :href="$sectionData[`components${key}D`][index].element.link.href"
                         :target="$sectionData[`components${key}D`][index].element.link.target"
                         :path="`components${key}D[${index}].element`"
                         :style="$sectionData[`components${key}D`][index].element.styles"
                         :class="[$sectionData[`components${key}D`][index].element.classes, $sectionData[`components${key}D`][index].class]"
                        >
                          <div v-html="$sectionData[`components${key}D`][index].element.text"></div>
                        </component>
                      </div>
                    </draggable>
                  </sandbox>
                </div>
              </div><!--/.b-products-columns-extend__right-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'
@import '../../../assets/sass/section-menu.sass'
@import '../../../assets/sass/_variables.sass'
@import '../../../assets/sass/_flex.sass'

.b-products-columns-extend
  $this: &
  &__row
    justify-content: center
    align-items: center
    flex-wrap: wrap
  &__icon-with-text
    color: inherit
    font-family: inherit

  &__left
    flex-wrap: wrap
    &-item
      &:hover,
      &_active
        color: var(--color-active) !important
        & .b-slot
          cursor: pointer
  &__right
    position: relative
    min-height: $size-step*15

    display: flex
    text-align: center
    justify-content: center
    .is-mobile &
      width: 100%
      height: auto !important
      min-height: auto !important
    .is-tablet &
      height: auto !important
      min-height: auto !important
    @media only screen and (max-width: 768px)
      &
        height: auto !important
        min-height: auto !important
    &-stage
      height: 100%
      display: flex
      width: 100%
      flex-direction: column
      align-items: center
      justify-content: center
    &-item
      position: absolute
      top: 0
      right: 0
      left: 0

      width: 100%
      min-height: 100%
      padding: 0

      visibility: hidden

      display: flex
      justify-content: center
      align-items: center
      flex-direction: column

      opacity: 0
      &_active
        visibility: visible
        opacity: 1
      .is-mobile &,
      .is-tablet &
        width: 100%
        height: auto
        position: relative
        visibility: visible
        margin: 1.6rem 0
        display: flex !important
        opacity: 1 !important
      @media only screen and (max-width: 768px)
        &
          width: 100%
          height: auto
          position: relative
          visibility: visible
          margin: 1.6rem 0
          display: flex !important
          opacity: 1 !important

.b-draggable-slot_row
  flex-direction: row !important
  & > div
    margin: $size-step/8

.b-slot
  height: auto !important
</style>
