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
        'width': '64px',
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
        'width': '64px',
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
        'width': '64px',
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
        'width': '64px',
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
  container1m: _.merge({}, C_CUSTOM_CONTAINER_M),
  container1d: _.merge({}, C_CUSTOM_CONTAINER_D),
  container2: _.merge({}, C_CUSTOM_CONTAINER),
  container2m: _.merge({}, C_CUSTOM_CONTAINER_M),
  container2d: _.merge({}, C_CUSTOM_CONTAINER_D),
  container3: _.merge({}, C_CUSTOM_CONTAINER),
  container3m: _.merge({}, C_CUSTOM_CONTAINER_M),
  container3d: _.merge({}, C_CUSTOM_CONTAINER_D),
  container4: _.merge({}, C_CUSTOM_CONTAINER),
  container4m: _.merge({}, C_CUSTOM_CONTAINER_M),
  container4d: _.merge({}, C_CUSTOM_CONTAINER_D),
  components1: _.merge({}, C_CUSTOM_1),
  components1m: _.merge({}, C_CUSTOM_1_M),
  components1d: _.merge({}, C_CUSTOM_1D),
  components2: _.merge({}, C_CUSTOM_2),
  components2m: _.merge({}, C_CUSTOM_2_M),
  components2d: _.merge({}, C_CUSTOM_2D),
  components3: _.merge({}, C_CUSTOM_3),
  components3m: _.merge({}, C_CUSTOM_3_M),
  components3d: _.merge({}, C_CUSTOM_3D),
  components4: _.merge({}, C_CUSTOM_4),
  components4m: _.merge({}, C_CUSTOM_4_M),
  components4d: _.merge({}, C_CUSTOM_4D),
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
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
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
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
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
    container1m: types.StyleObject,
    container1d: types.StyleObject,
    container2: types.StyleObject,
    container2m: types.StyleObject,
    container2d: types.StyleObject,
    container3: types.StyleObject,
    container3m: types.StyleObject,
    container3d: types.StyleObject,
    container4: types.StyleObject,
    container4m: types.StyleObject,
    container4d: types.StyleObject,
    components1: _.merge([], COMPONENTS, [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }]),
    components1m: _.merge([], COMPONENTS_M, [{ key: 4 }, { key: 5 }]),
    components1d: _.merge([], COMPONENTS_D, [{ key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]),
    components2: _.merge([], COMPONENTS, [{ key: 10 }, { key: 11 }, { key: 12 }, { key: 13 }]),
    components2m: _.merge([], COMPONENTS_M, [{ key: 14 }, { key: 15 }]),
    components2d: _.merge([], COMPONENTS_D, [{ key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }]),
    components3: _.merge([], COMPONENTS, [{ key: 20 }, { key: 21 }, { key: 22 }, { key: 23 }]),
    components3m: _.merge([], COMPONENTS_M, [{ key: 24 }, { key: 25 }]),
    components3d: _.merge([], COMPONENTS_D, [{ key: 26 }, { key: 27 }, { key: 28 }, { key: 29 }]),
    components4: _.merge([], COMPONENTS, [{ key: 30 }, { key: 31 }, { key: 32 }, { key: 33 }]),
    components4m: _.merge([], COMPONENTS_M, [{ key: 34 }, { key: 35 }]),
    components4d: _.merge([], COMPONENTS_D, [{ key: 36 }, { key: 37 }, { key: 38 }, { key: 39 }])
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
                  v-if="$sectionData.components1[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components1[index].element, path: `$sectionData.components1[${index}].element`, type: $sectionData.components1[index].type, label: $sectionData.components1[index].label }"
                  :is="component.name"
                  :href="$sectionData.components1[index].element.link.href"
                  :target="$sectionData.components1[index].element.link.target"
                  :path="`components1[${index}].element`"
                  :style="$sectionData.components1[index].element.styles"
                  :class="[$sectionData.components1[index].element.classes, $sectionData.components1[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components1[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components1[index].element, path: `$sectionData.components1[${index}].element`, type: $sectionData.components1[index].type, label: $sectionData.components1[index].label }"
                  v-html="$sectionData.components1[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components1[index].element.link.href"
                  :target="$sectionData.components1[index].element.link.target"
                  :path="`components1[${index}].element`"
                  :style="$sectionData.components1[index].element.styles"
                  :class="[$sectionData.components1[index].element.classes, $sectionData.components1[index].class]"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container1d"
            components-path="$sectionData.components1d"
            direction="column"
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components1d" class="b-draggable-slot" :style="$sectionData.container1d.styles">
              <div
                v-for="(component, index) in $sectionData.components1d"
                v-if="$sectionData.components1d.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components1d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components1d[index].element, path: `$sectionData.components1d[${index}].element`, type: $sectionData.components1d[index].type, label: $sectionData.components1d[index].label }"
                  :is="component.name"
                  :href="$sectionData.components1d[index].element.link.href"
                  :target="$sectionData.components1d[index].element.link.target"
                  :path="`components1d[${index}].element`"
                  :style="$sectionData.components1d[index].element.styles"
                  :class="[$sectionData.components1d[index].element.classes, $sectionData.components1d[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components1d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components1d[index].element, path: `$sectionData.components1d[${index}].element`, type: $sectionData.components1d[index].type, label: $sectionData.components1d[index].label }"
                  v-html="$sectionData.components1d[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components1d[index].element.link.href"
                  :target="$sectionData.components1d[index].element.link.target"
                  :path="`components1d[${index}].element`"
                  :style="$sectionData.components1d[index].element.styles"
                  :class="[$sectionData.components1d[index].element.classes, $sectionData.components1d[index].class]"
                  >
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
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div
                   v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components2[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: $sectionData.components2[index].label }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components2[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: $sectionData.components2[index].label }"
                  v-html="$sectionData.components2[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container2d"
            components-path="$sectionData.components2d"
            direction="column"
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components2d" class="b-draggable-slot" :style="$sectionData.container2d.styles">
              <div
                   v-for="(component, index) in $sectionData.components2d" v-if="$sectionData.components2d.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components2d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components2d[index].element, path: `$sectionData.components2d[${index}].element`, type: $sectionData.components2d[index].type, label: $sectionData.components2d[index].label }"
                  :is="component.name"
                  :href="$sectionData.components2d[index].element.link.href"
                  :target="$sectionData.components2d[index].element.link.target"
                  :path="`components2d[${index}].element`"
                  :style="$sectionData.components2d[index].element.styles"
                  :class="[$sectionData.components2d[index].element.classes, $sectionData.components2d[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components2d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components2d[index].element, path: `$sectionData.components2d[${index}].element`, type: $sectionData.components2d[index].type, label: $sectionData.components2d[index].label }"
                  v-html="$sectionData.components2d[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components2d[index].element.link.href"
                  :target="$sectionData.components2d[index].element.link.target"
                  :path="`components2d[${index}].element`"
                  :style="$sectionData.components2d[index].element.styles"
                  :class="[$sectionData.components2d[index].element.classes, $sectionData.components2d[index].class]"
                  >
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
            container-path="$sectionData.container3"
            components-path="$sectionData.components3"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components3" class="b-draggable-slot" :style="$sectionData.container3.styles">
              <div
                   v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components3[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: $sectionData.components3[index].label }"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.link.href"
                  :target="$sectionData.components3[index].element.link.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components3[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: $sectionData.components3[index].label }"
                  v-html="$sectionData.components3[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.link.href"
                  :target="$sectionData.components3[index].element.link.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container3d"
            components-path="$sectionData.components3d"
            direction="column"
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components3d" class="b-draggable-slot" :style="$sectionData.container3d.styles">
              <div
                   v-for="(component, index) in $sectionData.components3d" v-if="$sectionData.components3d.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components3d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3d[index].element, path: `$sectionData.components3d[${index}].element`, type: $sectionData.components3d[index].type, label: $sectionData.components3d[index].label }"
                  :is="component.name"
                  :href="$sectionData.components3d[index].element.link.href"
                  :target="$sectionData.components3d[index].element.link.target"
                  :path="`components3d[${index}].element`"
                  :style="$sectionData.components3d[index].element.styles"
                  :class="[$sectionData.components3d[index].element.classes, $sectionData.components3d[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components3d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3d[index].element, path: `$sectionData.components3d[${index}].element`, type: $sectionData.components3d[index].type, label: $sectionData.components3d[index].label }"
                  v-html="$sectionData.components3d[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components3d[index].element.link.href"
                  :target="$sectionData.components3d[index].element.link.target"
                  :path="`components3d[${index}].element`"
                  :style="$sectionData.components3d[index].element.styles"
                  :class="[$sectionData.components3d[index].element.classes, $sectionData.components3d[index].class]"
                  >
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
            container-path="$sectionData.container4"
            components-path="$sectionData.components4"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components4" class="b-draggable-slot" :style="$sectionData.container4.styles">
              <div
                   v-for="(component, index) in $sectionData.components4" v-if="$sectionData.components4.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components4[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type, label: $sectionData.components4[index].label }"
                  :is="component.name"
                  :href="$sectionData.components4[index].element.link.href"
                  :target="$sectionData.components4[index].element.link.target"
                  :path="`components4[${index}].element`"
                  :style="$sectionData.components4[index].element.styles"
                  :class="[$sectionData.components4[index].element.classes, $sectionData.components4[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components4[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type, label: $sectionData.components4[index].label }"
                  v-html="$sectionData.components4[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components4[index].element.link.href"
                  :target="$sectionData.components4[index].element.link.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components4[index].element.styles"
                  :class="[$sectionData.components4[index].element.classes, $sectionData.components4[index].class]"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container4d"
            components-path="$sectionData.components4d"
            direction="column"
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components4d" class="b-draggable-slot" :style="$sectionData.container4d.styles">
              <div
                   v-for="(component, index) in $sectionData.components4d" v-if="$sectionData.components4d.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components4d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components4d[index].element, path: `$sectionData.components4d[${index}].element`, type: $sectionData.components4d[index].type, label: $sectionData.components4d[index].label }"
                  :is="component.name"
                  :href="$sectionData.components4d[index].element.link.href"
                  :target="$sectionData.components4d[index].element.link.target"
                  :path="`components4d[${index}].element`"
                  :style="$sectionData.components4d[index].element.styles"
                  :class="[$sectionData.components4d[index].element.classes, $sectionData.components4d[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components4d[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components4d[index].element, path: `$sectionData.components4d[${index}].element`, type: $sectionData.components4d[index].type, label: $sectionData.components4d[index].label }"
                  v-html="$sectionData.components4d[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components4d[index].element.link.href"
                  :target="$sectionData.components4d[index].element.link.target"
                  :path="`components4d[${index}].element`"
                  :style="$sectionData.components4d[index].element.styles"
                  :class="[$sectionData.components4d[index].element.classes, $sectionData.components4d[index].class]"
                  >
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
$h: 100vh
.b-products-colums
  position: relative
  width: 100%
  min-height: 76rem
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &-component
    margin: 1.2rem
  &__row
    justify-content: center
  &__icon-with-text
    color: inherit
    font-family: inherit
  .b-delimiter
    height: 2rem
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
  .b-logo
    margin: 1.6rem 0
  .b-title
    color: inherit
    font-style: normal
    font-size: 2.4rem
    font-weight: 400
    text-align: center
    letter-spacing: 0.15em
    text-transform: uppercase
    margin: 1.6rem 0
    .is-mobile &,
    .is-tablet &
      font-size: 2rem !important
    @media only screen and (max-width: 768px)
      &
        font-size: 2rem !important
  .b-text
    color: inherit
    font-size: 1.6rem
    text-align: left
    .is-mobile &,
    .is-tablet &
      font-size: 1.4rem !important
    @media only screen and (max-width: 768px)
      &
        font-size: 1.4rem !important
  .b-button
    color: inherit
    font-family: Lato
    font-style: normal
    font-size: 1.4rem
    text-align: center
    letter-spacing: 0.28em
    text-transform: uppercase
    width: 22.4rem
    height: 5.6rem
    box-sizing: border-box
    border-radius: 0.2rem
    .is-mobile &,
    .is-tablet &
      width: 80%
    @media only screen and (max-width: 768px)
      &
        width: 80%
  .b-cost
.b-sandbox
  min-height: 20rem
  display: flex
  justify-content: center
  align-items: center
</style>
