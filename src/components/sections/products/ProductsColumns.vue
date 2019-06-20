<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import { mapActions } from 'vuex'

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

const C_CUSTOM = [
  {
    element: {
      text: 'Chapter for products',
      styles: {
        'font-family': 'Lato',
        'font-size': '4rem',
        'color': '#fff'
      }
    },
    key: 0
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn664.cdn.stg.gamenet.ru/0/7RIc1/o_4g83t.jpg)',
      'background-color': 'rgba(21,28,68,1)'
    }
  },
  components: _.merge({}, C_CUSTOM),
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

const HEADER = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  }
]

const GROUP_NAME = 'Products'
const NAME = 'ProductsColumns'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults],

  cover: '/img/covers/products.jpg',

  $schema: {
    mainStyle: types.ProductSection,
    container: types.StyleObject,
    components: _.merge([], HEADER, { key: 0 }),
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
    componentsStandart: _.merge([], COMPONENTS, [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }]),
    componentsStandartM: _.merge([], COMPONENTS_M, [{ key: 4 }, { key: 5 }]),
    componentsStandartD: _.merge([], COMPONENTS_D, [{ key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]),
    componentsFull: _.merge([], COMPONENTS, [{ key: 10 }, { key: 11 }, { key: 12 }, { key: 13 }]),
    componentsFullM: _.merge([], COMPONENTS_M, [{ key: 14 }, { key: 15 }]),
    componentsFullD: _.merge([], COMPONENTS_D, [{ key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }]),
    componentsDeluxe: _.merge([], COMPONENTS, [{ key: 20 }, { key: 21 }, { key: 22 }, { key: 23 }]),
    componentsDeluxeM: _.merge([], COMPONENTS_M, [{ key: 24 }, { key: 25 }]),
    componentsDeluxeD: _.merge([], COMPONENTS_D, [{ key: 26 }, { key: 27 }, { key: 28 }, { key: 29 }]),
    componentsUltimate: _.merge([], COMPONENTS, [{ key: 30 }, { key: 31 }, { key: 32 }, { key: 33 }]),
    componentsUltimateM: _.merge([], COMPONENTS_M, [{ key: 34 }, { key: 35 }]),
    componentsUltimateD: _.merge([], COMPONENTS_D, [{ key: 36 }, { key: 37 }, { key: 38 }, { key: 39 }])
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),

    async showSettings (panel) {
      let index = _.findIndex(this.$builder.sections, ['group', GROUP_NAME])

      this.setSettingSection(this.$builder.sections[index])

      await this.$nextTick()

      this.setControlPanel(panel)
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
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
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

        <div class="b-grid">
          <div class="b-grid__row">
            <div class="b-grid__col-12">
              <sandbox
                class="b-sandbox"
                container-path="$sectionData.container"
                components-path="$sectionData.components"
                direction="column"
                :style="$sectionData.container.styles"
              >
                <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @change="dragStop">
                  <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                    <component
                      v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                      :is="component.name"
                      :href="$sectionData.components[index].element.link.href"
                      :target="$sectionData.components[index].element.link.target"
                      :path="`components[${index}].element`"
                      :style="$sectionData.components[index].element.styles"
                      :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                      >
                      <div v-html="$sectionData.components[index].element.text"></div>
                    </component>
                  </div>
                </draggable>
              </sandbox>
            </div>
          </div>
          <div class="b-products-colums__padd">
            <div class="b-products-colums__padd-border">
              <!-- Setting controls -->
                <div class="b-products-colums__controls">
                  <div>
                    <a href="#" class="b-products-colums__control"
                       tooltip="Products"
                       tooltip-position="bottom"
                       @click.stop="showSettings('SectionProductsColumnsSettings')">
                      <icon-base name="cog" width="12" height="15" />
                    </a>
                  </div>
                  <!--div>
                    <a href="#" class="b-products-colums__control"
                       tooltip="Products style"
                       tooltip-position="bottom"
                       @click.stop="showSettings('SectionProductsColumnsStyle')">
                      <icon-base name="style" width="12" height="15" />
                    </a>
                  </div-->
                </div>

              <div class="b-grid__row b-products-colums__row"
                   :style="{ 'align-items' : $sectionData.mainStyle.styles['align-items']}">
                <div class="b-grid__col-3 b-grid__col-m-12 "
                  v-for="(product, key) in $sectionData.mainStyle.products"
                  :key="key"
                  v-if="$sectionData.mainStyle.products[key].visible"
                  >
                  <sandbox
                    class="b-sandbox"
                    :container-path="`$sectionData.container${key}`"
                    :components-path="`$sectionData.components${key}`"
                    direction="column"
                    :style="{ backgroundColor : $sectionData.mainStyle.styles['background-color'] }"
                    >
                    <draggable v-model="$sectionData['components' + key]" class="b-draggable-slot" :style="$sectionData[`container${key}`].styles" @change="dragStop">
                      <div
                        v-for="(component, index) in $sectionData[`components${key}`]"
                        v-if="$sectionData[`components${key}`].length !== 0"
                        :key="index"
                        >
                        <component class="b-products-colums-component"
                          v-styler:for="{ el: $sectionData[`components${key}`][index].element, path: `$sectionData.components${key}[${index}].element`, type: $sectionData[`components${key}`][index].type, label: $sectionData[`components${key}`][index].label }"
                          :is="$sectionData[`components${key}`][index].name"
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
                    direction="column"
                    :style="{ backgroundColor : $sectionData.mainStyle.styles['background-color'] }"
                    >
                    <draggable v-model="$sectionData['components' + key + 'D']" class="b-draggable-slot" :style="$sectionData[`container${key}D`].styles" @change="dragStop">
                      <div
                        v-for="(component, index) in $sectionData[`components${key}D`]"
                        v-if="$sectionData[`components${key}D`].length !== 0"
                        :key="index"
                        >
                        <component class="b-products-colums-component"
                          v-styler:for="{ el: $sectionData[`components${key}D`][index].element, path: `$sectionData.components${key}D[${index}].element`, type: $sectionData[`components${key}D`][index].type, label: $sectionData[`components${key}D`][index].label }"
                          :is="$sectionData[`components${key}D`][index].name"
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
              </div>
            </div><!--/.b-products-colums__padd-border-->
          </div><!--/.b-products-colums__padd-->
        </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_variables.sass'
@import '../../../assets/sass/_flex.sass'

.b-products-colums
  $this: &
  &__row
    justify-content: center
    align-items: flex-start

  &__icon-with-text
    color: inherit
    font-family: inherit

  &__padd
    padding: $size-step/4

    transition: border 0.25s
    border: 0.2rem dotted transparent

    position: relative
    .is-mobile &
      padding: 0
    @media only screen and (max-width: 540px)
      &
        padding: 0
    &-border
      padding: $size-step/4
      transition: border 0.25s
      border: 1px dotted transparent
      .is-editable #{$this}__padd:hover &
        border: 1px dashed $dark-blue-krayola

  &__controls
    position: absolute
    top: -14px
    left: $size-step/3.4

    display: flex
    align-items: flex-end
    justify-content: flex-start

    display: none
    .is-editable #{$this}__padd:hover &
      display: flex !important
  &__control
    display: flex
    align-items: center
    justify-content: center

    width: $size-step/1.5
    height: $size-step/1.5

    background: $dark-blue-krayola
    box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)

    cursor: pointer
    & svg
      fill:  $white
      width: 14px
      height: 14px

    &:hover, .active
      background: $white
      svg
        fill: $dark-blue-krayola

</style>
