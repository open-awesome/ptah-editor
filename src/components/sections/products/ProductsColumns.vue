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
      text: '39$'
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
      text: '49$'
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
      text: '59$'
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
      text: '79$'
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
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const C_CUSTOM_CONTAINER_M = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'flex-start'
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
    name: 'Cost',
    element: types.Cost,
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
const NAME = 'ProductsColumns'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/products.jpg',

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
    class="b-products-colums"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <div class="b-grid">
      <div class="b-grid__row b-products-colums__row">
        <div class="b-grid__col-3 b-grid__col-m-12 "
          v-if="$sectionData.mainStyle.products['Standart'].visible"
          >
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container1"
            components-path="$sectionData.components1"
            direction="column"
            :style="{ backgroundColor : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components1" class="b-draggable-slot" :style="$sectionData.container1.styles">
              <div
                v-for="(component, index) in $sectionData.components1"
                v-if="$sectionData.components1.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
            <draggable v-model="$sectionData.components3" class="b-draggable-slot" :style="$sectionData.container3.styles">
              <div
                v-for="(component, index) in $sectionData.components3"
                v-if="$sectionData.components3.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
        <div class="b-grid__col-3 b-grid__col-m-12"
          v-if="$sectionData.mainStyle.products['Full'].visible"
          >
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container4"
            components-path="$sectionData.components4"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components4" class="b-draggable-slot" :style="$sectionData.container4.styles">
              <div
                   v-for="(component, index) in $sectionData.components4" v-if="$sectionData.components4.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components6" class="b-draggable-slot" :style="$sectionData.container6.styles">
              <div
                   v-for="(component, index) in $sectionData.components6" v-if="$sectionData.components6.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
        <div class="b-grid__col-3 b-grid__col-m-12"
          v-if="$sectionData.mainStyle.products['Deluxe'].visible"
          >
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container7"
            components-path="$sectionData.components7"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components7" class="b-draggable-slot" :style="$sectionData.container7.styles">
              <div
                   v-for="(component, index) in $sectionData.components7" v-if="$sectionData.components7.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components9" class="b-draggable-slot" :style="$sectionData.container9.styles">
              <div
                   v-for="(component, index) in $sectionData.components9" v-if="$sectionData.components9.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
        <div class="b-grid__col-3 b-grid__col-m-12"
          v-if="$sectionData.mainStyle.products['Ultimate'].visible"
          >
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container10"
            components-path="$sectionData.components10"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components10" class="b-draggable-slot" :style="$sectionData.container10.styles">
              <div
                   v-for="(component, index) in $sectionData.components10" v-if="$sectionData.components10.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components12" class="b-draggable-slot" :style="$sectionData.container12.styles">
              <div
                   v-for="(component, index) in $sectionData.components12" v-if="$sectionData.components12.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.b-products-colums
  &__row
    justify-content: center
    align-items: flex-start
  &__icon-with-text
    color: inherit
    font-family: inherit

</style>
