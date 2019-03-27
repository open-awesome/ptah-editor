<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'

const C_CUSTOM_1 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 0
  },
  {
    element: {
      text: 'Start Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 1
  },
  {
    element: {
      text: '39$',
      styles: {
        'color': '#e4a11e',
        'font-size': '3.2rem',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-family': 'Lato',
        'text-decoration': ''
      }
    },
    key: 2
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.2rem',
        'text-align': 'center',
        'width': '192px',
        'height': '52px',
        'border-radius': '2px'
      }
    },
    key: 3
  }
]

const C_CUSTOM_1_M = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 4
  },
  {
    element: {
      text: 'Start Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 5
  }
]

const C_CUSTOM_1D = [
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Suit of Legacy Armor'
      }
    },
    key: 6
  },
  {
    element: {
      colorFill: {
        color: 'rgba(74,74,74,1)'
      },
      icon: {
        value: 'close',
        name: 'close',
        text: 'Mithril Box'
      }
    },
    key: 7
  },
  {
    element: {
      colorFill: {
        color: 'rgba(74,74,74,1)'
      },
      icon: {
        value: 'close',
        name: 'close',
        text: 'Heroic Boosters'
      }
    },
    key: 8
  },
  {
    element: {
      colorFill: {
        color: 'rgba(208,2,27,1)'
      },
      icon: {
        value: 'close',
        name: 'close',
        text: 'Summon Mistfire Wolf Elite Skil'
      }
    },
    key: 9
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 10
  },
  {
    element: {
      text: 'Full Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 11
  },
  {
    element: {
      text: '49$',
      styles: {
        'color': '#e4a11e',
        'font-size': '3.2rem',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-family': 'Lato',
        'text-decoration': ''
      }
    },
    key: 12
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.2rem',
        'text-align': 'center',
        'width': '192px',
        'height': '52px',
        'border-radius': '2px'
      }
    },
    key: 13
  }
]

const C_CUSTOM_2_M = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 14
  },
  {
    element: {
      text: 'Full Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 15
  }
]

const C_CUSTOM_2D = [
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Suit of Legacy Armor'
      }
    },
    key: 16
  },
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Mithril Box'
      }
    },
    key: 17
  },
  {
    element: {
      colorFill: {
        color: 'rgba(74,74,74,1)'
      },
      icon: {
        value: 'close',
        name: 'close',
        text: 'Heroic Boosters'
      }
    },
    key: 18
  },
  {
    element: {
      colorFill: {
        color: 'rgba(74,74,74,1)'
      },
      icon: {
        value: 'close',
        name: 'close',
        text: 'Summon Mistfire Wolf Elite Skil'
      }
    },
    key: 19
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 20
  },
  {
    element: {
      text: 'Deluxe Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 21
  },
  {
    element: {
      text: '59$',
      styles: {
        'color': '#e4a11e',
        'font-size': '3.2rem',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-family': 'Lato',
        'text-decoration': ''
      }
    },
    key: 22
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.2rem',
        'text-align': 'center',
        'width': '192px',
        'height': '52px',
        'border-radius': '2px'
      }
    },
    key: 23
  }
]

const C_CUSTOM_3_M = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 24
  },
  {
    element: {
      text: 'Deluxe Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 25
  }
]

const C_CUSTOM_3D = [
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Suit of Legacy Armor'
      }
    },
    key: 26
  },
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Mithril Box'
      }
    },
    key: 27
  },
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Heroic Boosters'
      }
    },
    key: 28
  },
  {
    element: {
      colorFill: {
        color: 'rgba(74,74,74,1)'
      },
      icon: {
        value: 'close',
        name: 'close',
        text: 'Summon Mistfire Wolf Elite Skil'
      }
    },
    key: 29
  }
]

const C_CUSTOM_4 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 30
  },
  {
    element: {
      text: 'Ultimate Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 31
  },
  {
    element: {
      text: '79$',
      styles: {
        'color': '#e4a11e',
        'font-size': '3.2rem',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-family': 'Lato',
        'text-decoration': ''
      }
    },
    key: 32
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.2rem',
        'text-align': 'center',
        'width': '192px',
        'height': '52px',
        'border-radius': '2px'
      }
    },
    key: 33
  }
]

const C_CUSTOM_4_M = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    },
    key: 34
  },
  {
    element: {
      text: 'Ultimate Edition',
      styles: {
        'color': '#fff'
      }
    },
    key: 35
  }
]

const C_CUSTOM_4D = [
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Suit of Legacy Armor'
      }
    },
    key: 36
  },
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Mithril Box'
      }
    },
    key: 37
  },
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Heroic Boosters'
      }
    },
    key: 37
  },
  {
    element: {
      colorFill: {
        color: 'rgba(245,166,35,1)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: 'Summon Mistfire Wolf Elite Skil'
      }
    },
    key: 39
  }
]

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'row',
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
    'align-items': 'flex-start'
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn664.cdn.stg.gamenet.ru/0/7RIc1/o_4g83t.jpg)',
      'background-color': 'rgba(21,28,68,0.73)'
    }
  },
  container1: _.merge({}, C_CUSTOM_CONTAINER),
  container2: _.merge({}, C_CUSTOM_CONTAINER_M),
  container3: _.merge({}, C_CUSTOM_CONTAINER_D),
  container4: _.merge({}, C_CUSTOM_CONTAINER),
  container5: _.merge({}, C_CUSTOM_CONTAINER_M),
  container6: _.merge({}, C_CUSTOM_CONTAINER_D),
  container7: _.merge({}, C_CUSTOM_CONTAINER),
  container8: _.merge({}, C_CUSTOM_CONTAINER_M),
  container9: _.merge({}, C_CUSTOM_CONTAINER_D),
  container10: _.merge({}, C_CUSTOM_CONTAINER),
  container11: _.merge({}, C_CUSTOM_CONTAINER_M),
  container12: _.merge({}, C_CUSTOM_CONTAINER_D),
  components1: _.merge({}, C_CUSTOM_1),
  components2: _.merge({}, C_CUSTOM_1_M),
  components3: _.merge({}, C_CUSTOM_1D),
  components4: _.merge({}, C_CUSTOM_2),
  components5: _.merge({}, C_CUSTOM_2_M),
  components6: _.merge({}, C_CUSTOM_2D),
  components7: _.merge({}, C_CUSTOM_3),
  components8: _.merge({}, C_CUSTOM_3_M),
  components9: _.merge({}, C_CUSTOM_3D),
  components10: _.merge({}, C_CUSTOM_4),
  components11: _.merge({}, C_CUSTOM_4_M),
  components12: _.merge({}, C_CUSTOM_4D),
  edited: true
}

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo'
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
    label: 'text'
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
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo'
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
    type: 'icon',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'icon',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'icon',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'icon',
    class: 'b-text-icon',
    label: 'icon with text'
  }
]

const GROUP_NAME = 'Products'
const NAME = 'ProductsColumnsExtend'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/products_e.jpg',

  $schema: {
    mainStyle: types.ProductSection,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    container5: types.StyleObject,
    container6: types.StyleObject,
    container7: types.StyleObject,
    container8: types.StyleObject,
    container9: types.StyleObject,
    container10: types.StyleObject,
    container11: types.StyleObject,
    container12: types.StyleObject,
    components1: _.merge([], COMPONENTS, [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }]),
    components2: _.merge([], COMPONENTS_M, [{ key: 4 }, { key: 5 }]),
    components3: _.merge([], COMPONENTS_D, [{ key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]),
    components4: _.merge([], COMPONENTS, [{ key: 10 }, { key: 11 }, { key: 12 }, { key: 13 }]),
    components5: _.merge([], COMPONENTS_M, [{ key: 14 }, { key: 15 }]),
    components6: _.merge([], COMPONENTS_D, [{ key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }]),
    components7: _.merge([], COMPONENTS, [{ key: 20 }, { key: 21 }, { key: 22 }, { key: 23 }]),
    components8: _.merge([], COMPONENTS_M, [{ key: 24 }, { key: 25 }]),
    components9: _.merge([], COMPONENTS_D, [{ key: 26 }, { key: 27 }, { key: 28 }, { key: 29 }]),
    components10: _.merge([], COMPONENTS, [{ key: 30 }, { key: 31 }, { key: 32 }, { key: 33 }]),
    components11: _.merge([], COMPONENTS_M, [{ key: 34 }, { key: 35 }]),
    components12: _.merge([], COMPONENTS_D, [{ key: 36 }, { key: 37 }, { key: 38 }, { key: 39 }])
  },

  methods: {
    selectProduct (key) {
      this.$sectionData.mainStyle.selectProduct.name = key
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

<template>
  <section
    class="b-products-columns-extend"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <div class="b-grid">
      <div class="b-grid__row b-products-columns-extend__row">
        <div class="b-grid__col-6 b-grid__col-m-12 b-products-columns-extend__left hidden-m">
          <!-- b-products-columns-extend__left -->
          <div class="b-grid__row b-products-columns-extend__row">
            <div class="b-grid__col-6 b-products-columns-extend__left-item"
              v-if="$sectionData.mainStyle.products['Standart'].visible"
              :data-index="0"
              :product-extend-preview="'b-products-columns-extend__right-item_active'"
              @click="selectProduct('Standart')"
              :class="{ 'b-products-columns-extend__left-item_active': $sectionData.mainStyle.selectProduct.name === 'Standart' }"
              >
              <sandbox
                class="b-sandbox"
                container-path="$sectionData.container2"
                components-path="$sectionData.components2"
                direction="column"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >
                <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
                  <div
                    v-for="(component, index) in $sectionData.components2"
                    v-if="$sectionData.components2.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: $sectionData.components2[index].label }"
                      :is="component.name"
                      :href="$sectionData.components2[index].element.link.href"
                      :target="$sectionData.components2[index].element.link.target"
                      :path="`components2[${index}].element`"
                      :style="$sectionData.components2[index].element.styles"
                      :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                      >
                      <div v-html="$sectionData.components2[index].element.text"></div>
                    </component>
                  </div>
                </draggable>
              </sandbox>
            </div>
            <div class="b-grid__col-6 b-products-columns-extend__left-item"
              v-if="$sectionData.mainStyle.products['Full'].visible"
              :data-index="1"
              :product-extend-preview="'b-products-columns-extend__right-item_active'"
              @click="selectProduct('Full')"
              :class="{ 'b-products-columns-extend__left-item_active': $sectionData.mainStyle.selectProduct.name === 'Full' }"
              >
              <sandbox
                class="b-sandbox"
                container-path="$sectionData.container5"
                components-path="$sectionData.components5"
                direction="column"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >

                <draggable v-model="$sectionData.components5" class="b-draggable-slot" :style="$sectionData.container5.styles">
                  <div
                       v-for="(component, index) in $sectionData.components5" v-if="$sectionData.components5.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-styler:for="{ el: $sectionData.components5[index].element, path: `$sectionData.components5[${index}].element`, type: $sectionData.components5[index].type, label: $sectionData.components5[index].label }"
                      :is="component.name"
                      :href="$sectionData.components5[index].element.link.href"
                      :target="$sectionData.components5[index].element.link.target"
                      :path="`components5[${index}].element`"
                      :style="$sectionData.components5[index].element.styles"
                      :class="[$sectionData.components5[index].element.classes, $sectionData.components5[index].class]"
                      >
                      <div v-html="$sectionData.components5[index].element.text"></div>
                    </component>
                  </div>
                </draggable>
              </sandbox>
            </div>
            <div class="b-grid__col-6 b-products-columns-extend__left-item"
              v-if="$sectionData.mainStyle.products['Deluxe'].visible"
              :data-index="2"
              :product-extend-preview="'b-products-columns-extend__right-item_active'"
              @click="selectProduct('Deluxe')"
              :class="{ 'b-products-columns-extend__left-item_active': $sectionData.mainStyle.selectProduct.name === 'Deluxe' }"
              >
              <sandbox
                class="b-sandbox"
                container-path="$sectionData.container8"
                components-path="$sectionData.components8"
                direction="column"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >
                <draggable v-model="$sectionData.components8" class="b-draggable-slot" :style="$sectionData.container8.styles">
                  <div
                       v-for="(component, index) in $sectionData.components8" v-if="$sectionData.components8.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-styler:for="{ el: $sectionData.components8[index].element, path: `$sectionData.components8[${index}].element`, type: $sectionData.components8[index].type, label: $sectionData.components8[index].label }"
                      :is="component.name"
                      :href="$sectionData.components8[index].element.link.href"
                      :target="$sectionData.components8[index].element.link.target"
                      :path="`components8[${index}].element`"
                      :style="$sectionData.components8[index].element.styles"
                      :class="[$sectionData.components8[index].element.classes, $sectionData.components8[index].class]"
                      >
                      <div v-html="$sectionData.components8[index].element.text"></div>
                    </component>
                  </div>
                </draggable>
              </sandbox>
            </div>
            <div class="b-grid__col-6 b-products-columns-extend__left-item"
              v-if="$sectionData.mainStyle.products['Ultimate'].visible"
              :data-index="3"
              :product-extend-preview="'b-products-columns-extend__right-item_active'"
              @click="selectProduct('Ultimate')"
              :class="{ 'b-products-columns-extend__left-item_active': $sectionData.mainStyle.selectProduct.name === 'Ultimate' }"
              >
              <sandbox
                class="b-sandbox"
                container-path="$sectionData.container11"
                components-path="$sectionData.components11"
                direction="column"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >

                <draggable v-model="$sectionData.components11" class="b-draggable-slot" :style="$sectionData.container11.styles">
                  <div
                       v-for="(component, index) in $sectionData.components11" v-if="$sectionData.components11.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-styler:for="{ el: $sectionData.components11[index].element, path: `$sectionData.components11[${index}].element`, type: $sectionData.components11[index].type, label: $sectionData.components11[index].label }"
                      :is="component.name"
                      :href="$sectionData.components11[index].element.link.href"
                      :target="$sectionData.components11[index].element.link.target"
                      :path="`components11[${index}].element`"
                      :style="$sectionData.components11[index].element.styles"
                      :class="[$sectionData.components11[index].element.classes, $sectionData.components11[index].class]"
                      >
                      <div v-html="$sectionData.components11[index].element.text"></div>
                    </component>
                  </div>
                </draggable>
              </sandbox>
            </div>
          </div><!--/.b-products-columns-extend__left-->
        </div>
        <div class="b-grid__col-6 b-grid__col-m-12 b-products-columns-extend__right">
               <!-- b-products-columns-extend__right -->
                <div class="b-grid__row">
                  <div class="b-grid__col-12 b-products-columns-extend__right-item"
                    v-show="$sectionData.mainStyle.selectProduct.name === 'Standart' && $sectionData.mainStyle.products['Standart'].visible"
                    :class="{ 'b-products-columns-extend__right-item_active': $sectionData.mainStyle.selectProduct.name === 'Standart' }"
                    :product-extend-stage="0"
                    >
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container1"
                      components-path="$sectionData.components1"
                      direction="column"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components1" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container1.styles">
                        <div
                          v-for="(component, index) in $sectionData.components1"
                          v-if="$sectionData.components1.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components1[index].element, path: `$sectionData.components1[${index}].element`, type: $sectionData.components1[index].type, label: $sectionData.components1[index].label }"
                            :is="component.name"
                            :href="$sectionData.components1[index].element.link.href"
                            :target="$sectionData.components1[index].element.link.target"
                            :path="`components1[${index}].element`"
                            :style="$sectionData.components1[index].element.styles"
                            :class="[$sectionData.components1[index].element.classes, $sectionData.components1[index].class]"
                            >
                            <div v-html="$sectionData.components1[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container3"
                      components-path="$sectionData.components3"
                      direction="column"
                      align="flex-start"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components3" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container3.styles">
                        <div
                          v-for="(component, index) in $sectionData.components3"
                          v-if="$sectionData.components3.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: $sectionData.components3[index].label }"
                            :is="component.name"
                            :href="$sectionData.components3[index].element.link.href"
                            :target="$sectionData.components3[index].element.link.target"
                            :path="`components3[${index}].element`"
                            :style="$sectionData.components3[index].element.styles"
                            :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                            >
                            <div v-html="$sectionData.components3[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                  </div>
                  <div class="b-grid__col-12 b-grid__col-m-12 b-products-columns-extend__right-item"
                    v-show="$sectionData.mainStyle.selectProduct.name === 'Full' && $sectionData.mainStyle.products['Full'].visible"
                    :class="{ 'b-products-columns-extend__right-item_active': $sectionData.mainStyle.selectProduct.name === 'Full' }"
                    :product-extend-stage="1"
                    >
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container4"
                      components-path="$sectionData.components4"
                      direction="column"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components4" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container4.styles">
                        <div
                             v-for="(component, index) in $sectionData.components4" v-if="$sectionData.components4.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type, label: $sectionData.components4[index].label }"
                            :is="component.name"
                            :href="$sectionData.components4[index].element.link.href"
                            :target="$sectionData.components4[index].element.link.target"
                            :path="`components4[${index}].element`"
                            :style="$sectionData.components4[index].element.styles"
                            :class="[$sectionData.components4[index].element.classes, $sectionData.components4[index].class]"
                            >
                            <div v-html="$sectionData.components4[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container6"
                      components-path="$sectionData.components6"
                      direction="column"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >

                      <draggable v-model="$sectionData.components6" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container6.styles">
                        <div
                             v-for="(component, index) in $sectionData.components6" v-if="$sectionData.components6.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components6[index].element, path: `$sectionData.components6[${index}].element`, type: $sectionData.components6[index].type, label: $sectionData.components6[index].label }"
                            :is="component.name"
                            :href="$sectionData.components6[index].element.link.href"
                            :target="$sectionData.components6[index].element.link.target"
                            :path="`components6[${index}].element`"
                            :style="$sectionData.components6[index].element.styles"
                            :class="[$sectionData.components6[index].element.classes, $sectionData.components6[index].class]"
                            >
                            <div v-html="$sectionData.components6[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                  </div>
                  <div class="b-grid__col-12 b-grid__col-m-12 b-products-columns-extend__right-item"
                    v-show="$sectionData.mainStyle.selectProduct.name === 'Deluxe' && $sectionData.mainStyle.products['Deluxe'].visible"
                    :class="{ 'b-products-columns-extend__right-item_active': $sectionData.mainStyle.selectProduct.name === 'Deluxe' }"
                    :product-extend-stage="2"
                    >
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container7"
                      components-path="$sectionData.components7"
                      direction="column"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components7" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container7.styles">
                        <div
                             v-for="(component, index) in $sectionData.components7" v-if="$sectionData.components7.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components7[index].element, path: `$sectionData.components7[${index}].element`, type: $sectionData.components7[index].type, label: $sectionData.components7[index].label }"
                            :is="component.name"
                            :href="$sectionData.components7[index].element.link.href"
                            :target="$sectionData.components7[index].element.link.target"
                            :path="`components7[${index}].element`"
                            :style="$sectionData.components7[index].element.styles"
                            :class="[$sectionData.components7[index].element.classes, $sectionData.components7[index].class]"
                            >
                            <div v-html="$sectionData.components7[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container9"
                      components-path="$sectionData.components9"
                      direction="column"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components9" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container9.styles">
                        <div
                             v-for="(component, index) in $sectionData.components9" v-if="$sectionData.components9.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components9[index].element, path: `$sectionData.components9[${index}].element`, type: $sectionData.components9[index].type, label: $sectionData.components9[index].label }"
                            :is="component.name"
                            :href="$sectionData.components9[index].element.link.href"
                            :target="$sectionData.components9[index].element.link.target"
                            :path="`components9[${index}].element`"
                            :style="$sectionData.components9[index].element.styles"
                            :class="[$sectionData.components9[index].element.classes, $sectionData.components9[index].class]"
                            >
                            <div v-html="$sectionData.components9[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                  </div>
                  <div class="b-grid__col-12 b-grid__col-m-12 b-products-columns-extend__right-item"
                    v-show="$sectionData.mainStyle.selectProduct.name === 'Ultimate' && $sectionData.mainStyle.products['Ultimate'].visible"
                    :class="{ 'b-products-columns-extend__right-item_active': $sectionData.mainStyle.selectProduct.name === 'Ultimate' }"
                    :product-extend-stage="3"
                    >
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container10"
                      components-path="$sectionData.components10"
                      direction="column"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components10" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container10.styles">
                        <div
                             v-for="(component, index) in $sectionData.components10" v-if="$sectionData.components10.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components10[index].element, path: `$sectionData.components10[${index}].element`, type: $sectionData.components10[index].type, label: $sectionData.components10[index].label }"
                            :is="component.name"
                            :href="$sectionData.components10[index].element.link.href"
                            :target="$sectionData.components10[index].element.link.target"
                            :path="`components10[${index}].element`"
                            :style="$sectionData.components10[index].element.styles"
                            :class="[$sectionData.components10[index].element.classes, $sectionData.components10[index].class]"
                            >
                            <div v-html="$sectionData.components10[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container12"
                      components-path="$sectionData.components12"
                      direction="column"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components12" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container12.styles">
                        <div
                             v-for="(component, index) in $sectionData.components12" v-if="$sectionData.components12.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-styler:for="{ el: $sectionData.components12[index].element, path: `$sectionData.components12[${index}].element`, type: $sectionData.components12[index].type, label: $sectionData.components12[index].label }"
                            :is="component.name"
                            :href="$sectionData.components12[index].element.link.href"
                            :target="$sectionData.components12[index].element.link.target"
                            :path="`components12[${index}].element`"
                            :style="$sectionData.components12[index].element.styles"
                            :class="[$sectionData.components12[index].element.classes, $sectionData.components12[index].class]"
                            >
                            <div v-html="$sectionData.components12[index].element.text"></div>
                          </component>
                        </div>
                      </draggable>
                    </sandbox>
                  </div>
              </div><!--/.b-products-columns-extend__right-->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.b-products-columns-extend
  &__row
    justify-content: center
    align-items: center
  &__icon-with-text
    color: inherit
    font-family: inherit
  &__left
    &-item
      &:hover,
      &_active
        & .b-slot
          box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.8)
          cursor: pointer
  &__right
    position: relative
    min-height: 60rem
    display: flex
    text-align: center
    justify-content: center
    .is-mobile &
      width: 100%
      height: 100%
      min-height: auto
    .is-tablet &
      height: auto
      min-height: auto
    @media only screen and (max-width: 768px)
      &
        height: auto
        min-height: auto
    &-item
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      padding: 0
      visibility: hidden
      display: flex
      justify-content: center
      align-items: flex-start
      flex-direction: column
      &_active
        visibility: visible
      .is-mobile &,
      .is-tablet &
        width: 100%
        height: auto
        position: relative
        visibility: visible
        margin: 1.6rem 0
      @media only screen and (max-width: 768px)
        &
          width: 100%
          height: auto
          position: relative
          visibility: visible
          margin: 1.6rem 0

</style>
