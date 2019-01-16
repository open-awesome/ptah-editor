<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'
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
    }
  },
  {
    element: {
      text: 'Start Edition',
      styles: {
        'color': '#fff'
      }
    }
  },
  {
    element: {
      text: '39$'
    }
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
    }
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
    }
  },
  {
    element: {
      text: 'Start Edition',
      styles: {
        'color': '#fff'
      }
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  {
    element: {
      text: 'Full Edition',
      styles: {
        'color': '#fff'
      }
    }
  },
  {
    element: {
      text: '49$'
    }
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
    }
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
    }
  },
  {
    element: {
      text: 'Full Edition',
      styles: {
        'color': '#fff'
      }
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  {
    element: {
      text: 'Deluxe Edition',
      styles: {
        'color': '#fff'
      }
    }
  },
  {
    element: {
      text: '59$'
    }
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
    }
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
    }
  },
  {
    element: {
      text: 'Deluxe Edition',
      styles: {
        'color': '#fff'
      }
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  {
    element: {
      text: 'Ultimate Edition',
      styles: {
        'color': '#fff'
      }
    }
  },
  {
    element: {
      text: '79$'
    }
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
    }
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
    }
  },
  {
    element: {
      text: 'Ultimate Edition',
      styles: {
        'color': '#fff'
      }
    }
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
    }
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
    }
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
    }
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
    }
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
    class: 'b-logo'
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text'
  },
  {
    name: 'Cost',
    element: types.Cost,
    type: 'text',
    class: 'b-cost'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test'
  }
]

const COMPONENTS_M = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo'
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text'
  }
]

const COMPONENTS_D = [
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'icon',
    class: 'b-text-icon'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'icon',
    class: 'b-text-icon'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'icon',
    class: 'b-text-icon'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'icon',
    class: 'b-text-icon'
  }
]

const GROUP_NAME = 'Products'
const NAME = 'ProductsColumns'

export default {
  name: NAME,
  components: {
    Draggable
  },
  cover: '/img/covers/products_e.jpg',
  group: GROUP_NAME,
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
    components1: COMPONENTS,
    components1m: COMPONENTS_M,
    components1d: COMPONENTS_D,
    components2: COMPONENTS,
    components2m: COMPONENTS_M,
    components2d: COMPONENTS_D,
    components3: COMPONENTS,
    components3m: COMPONENTS_M,
    components3d: COMPONENTS_D,
    components4: COMPONENTS,
    components4m: COMPONENTS_M,
    components4d: COMPONENTS_D
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions('Landing', [
      'updateGroupData',
      'updateSectionData'
    ]),

    selectProduct (key) {
      this.$sectionData.mainStyle.selectProduct.name = key
    },

    storeData: _.after(2, (self) => {
      self.updateSectionData({
        name: NAME,
        data: _.cloneDeep(self.$sectionData)
      })
    })
  },

  created () {
    if (this.$sectionData.edited === undefined && !!this.$store.state.Landing.sectionData[NAME] === false) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    } else {
      Seeder.seed(_.merge(this.$sectionData, this.$store.state.Landing.sectionData[NAME]))
    }
  },

  updated: function () {
    this.storeData(this)
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
                container-path="$sectionData.container1m"
                components-path="$sectionData.components1"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >
                <draggable v-model="$sectionData.components1" class="b-draggable-slot" :style="$sectionData.container1m.styles">
                  <div
                    v-for="(component, index) in $sectionData.components1m"
                    v-if="$sectionData.components1m.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-if="$sectionData.components1m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components1m[index].element, path: `$sectionData.components1m[${index}].element`, type: $sectionData.components1m[index].type }"
                      :is="component.name"
                      :href="$sectionData.components1m[index].element.link.href"
                      :target="$sectionData.components1m[index].element.link.target"
                      :path="`components1m[${index}].element`"
                      :style="$sectionData.components1m[index].element.styles"
                      :class="[$sectionData.components1m[index].element.classes, $sectionData.components1m[index].class]"
                      >
                    </component>
                    <component class="b-products-columns-component"
                      v-if="!$sectionData.components1m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components1m[index].element, path: `$sectionData.components1m[${index}].element`, type: $sectionData.components1m[index].type }"
                      v-html="$sectionData.components1m[index].element.text"
                      :is="component.name"
                      :href="$sectionData.components1m[index].element.link.href"
                      :target="$sectionData.components1m[index].element.link.target"
                      :path="`components1m[${index}].element`"
                      :style="$sectionData.components1m[index].element.styles"
                      :class="[$sectionData.components1m[index].element.classes, $sectionData.components1m[index].class]"
                      >
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
                container-path="$sectionData.container2m"
                components-path="$sectionData.components2m"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >

                <draggable v-model="$sectionData.components2m" class="b-draggable-slot" :style="$sectionData.container2m.styles">
                  <div
                       v-for="(component, index) in $sectionData.components2m" v-if="$sectionData.components2m.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-if="$sectionData.components2m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components2m[index].element, path: `$sectionData.components2m[${index}].element`, type: $sectionData.components2m[index].type }"
                      :is="component.name"
                      :href="$sectionData.components2m[index].element.link.href"
                      :target="$sectionData.components2m[index].element.link.target"
                      :path="`components2m[${index}].element`"
                      :style="$sectionData.components2m[index].element.styles"
                      :class="[$sectionData.components2m[index].element.classes, $sectionData.components2m[index].class]"
                      >
                    </component>
                    <component class="b-products-columns-component"
                      v-if="!$sectionData.components2m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components2m[index].element, path: `$sectionData.components2m[${index}].element`, type: $sectionData.components2m[index].type }"
                      v-html="$sectionData.components2m[index].element.text"
                      :is="component.name"
                      :href="$sectionData.components2m[index].element.link.href"
                      :target="$sectionData.components2m[index].element.link.target"
                      :path="`components2m[${index}].element`"
                      :style="$sectionData.components2m[index].element.styles"
                      :class="[$sectionData.components2m[index].element.classes, $sectionData.components2m[index].class]"
                      >
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
                container-path="$sectionData.container3m"
                components-path="$sectionData.components3m"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >
                <draggable v-model="$sectionData.components3m" class="b-draggable-slot" :style="$sectionData.container3m.styles">
                  <div
                       v-for="(component, index) in $sectionData.components3m" v-if="$sectionData.components3m.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-if="$sectionData.components3m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components3m[index].element, path: `$sectionData.components3m[${index}].element`, type: $sectionData.components3m[index].type }"
                      :is="component.name"
                      :href="$sectionData.components3m[index].element.link.href"
                      :target="$sectionData.components3m[index].element.link.target"
                      :path="`components3m[${index}].element`"
                      :style="$sectionData.components3m[index].element.styles"
                      :class="[$sectionData.components3m[index].element.classes, $sectionData.components3m[index].class]"
                      >
                    </component>
                    <component class="b-products-columns-component"
                      v-if="!$sectionData.components3m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components3m[index].element, path: `$sectionData.components3m[${index}].element`, type: $sectionData.components3m[index].type }"
                      v-html="$sectionData.components3m[index].element.text"
                      :is="component.name"
                      :href="$sectionData.components3m[index].element.link.href"
                      :target="$sectionData.components3m[index].element.link.target"
                      :path="`components3m[${index}].element`"
                      :style="$sectionData.components3m[index].element.styles"
                      :class="[$sectionData.components3m[index].element.classes, $sectionData.components3m[index].class]"
                      >
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
                container-path="$sectionData.container4m"
                components-path="$sectionData.components4m"
                :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                >

                <draggable v-model="$sectionData.components4m" class="b-draggable-slot" :style="$sectionData.container4m.styles">
                  <div
                       v-for="(component, index) in $sectionData.components4m" v-if="$sectionData.components4m.length !== 0" :key="index">
                    <component class="b-products-columns-component"
                      v-if="$sectionData.components4m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components4m[index].element, path: `$sectionData.components4m[${index}].element`, type: $sectionData.components4m[index].type }"
                      :is="component.name"
                      :href="$sectionData.components4m[index].element.link.href"
                      :target="$sectionData.components4m[index].element.link.target"
                      :path="`components4m[${index}].element`"
                      :style="$sectionData.components4m[index].element.styles"
                      :class="[$sectionData.components4m[index].element.classes, $sectionData.components4m[index].class]"
                      >
                    </component>
                    <component class="b-products-columns-component"
                      v-if="!$sectionData.components4m[index].element.isComplex"
                      v-styler:for="{ el: $sectionData.components4m[index].element, path: `$sectionData.components4m[${index}].element`, type: $sectionData.components4m[index].type }"
                      v-html="$sectionData.components4m[index].element.text"
                      :is="component.name"
                      :href="$sectionData.components4m[index].element.link.href"
                      :target="$sectionData.components4m[index].element.link.target"
                      :path="`components4m[${index}].element`"
                      :style="$sectionData.components4m[index].element.styles"
                      :class="[$sectionData.components4m[index].element.classes, $sectionData.components4m[index].class]"
                      >
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
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components1" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container1.styles">
                        <div
                          v-for="(component, index) in $sectionData.components1"
                          v-if="$sectionData.components1.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components1[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components1[index].element, path: `$sectionData.components1[${index}].element`, type: $sectionData.components1[index].type }"
                            :is="component.name"
                            :href="$sectionData.components1[index].element.link.href"
                            :target="$sectionData.components1[index].element.link.target"
                            :path="`components1[${index}].element`"
                            :style="$sectionData.components1[index].element.styles"
                            :class="[$sectionData.components1[index].element.classes, $sectionData.components1[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components1[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components1[index].element, path: `$sectionData.components1[${index}].element`, type: $sectionData.components1[index].type }"
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
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components1d" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container1d.styles">
                        <div
                          v-for="(component, index) in $sectionData.components1d"
                          v-if="$sectionData.components1d.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components1d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components1d[index].element, path: `$sectionData.components1d[${index}].element`, type: $sectionData.components1d[index].type }"
                            :is="component.name"
                            :href="$sectionData.components1d[index].element.link.href"
                            :target="$sectionData.components1d[index].element.link.target"
                            :path="`components1d[${index}].element`"
                            :style="$sectionData.components1d[index].element.styles"
                            :class="[$sectionData.components1d[index].element.classes, $sectionData.components1d[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components1d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components1d[index].element, path: `$sectionData.components1d[${index}].element`, type: $sectionData.components1d[index].type }"
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
                  <div class="b-grid__col-12 b-grid__col-m-12 b-products-columns-extend__right-item"
                    v-show="$sectionData.mainStyle.selectProduct.name === 'Full' && $sectionData.mainStyle.products['Full'].visible"
                    :class="{ 'b-products-columns-extend__right-item_active': $sectionData.mainStyle.selectProduct.name === 'Full' }"
                    :product-extend-stage="1"
                    >
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container2"
                      components-path="$sectionData.components2"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components2" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container2.styles">
                        <div
                             v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components2[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                            :is="component.name"
                            :href="$sectionData.components2[index].element.link.href"
                            :target="$sectionData.components2[index].element.link.target"
                            :path="`components2[${index}].element`"
                            :style="$sectionData.components2[index].element.styles"
                            :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components2[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
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
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >

                      <draggable v-model="$sectionData.components2d" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container2d.styles">
                        <div
                             v-for="(component, index) in $sectionData.components2d" v-if="$sectionData.components2d.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components2d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components2d[index].element, path: `$sectionData.components2d[${index}].element`, type: $sectionData.components2d[index].type }"
                            :is="component.name"
                            :href="$sectionData.components2d[index].element.link.href"
                            :target="$sectionData.components2d[index].element.link.target"
                            :path="`components2d[${index}].element`"
                            :style="$sectionData.components2d[index].element.styles"
                            :class="[$sectionData.components2d[index].element.classes, $sectionData.components2d[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components2d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components2d[index].element, path: `$sectionData.components2d[${index}].element`, type: $sectionData.components2d[index].type }"
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
                  <div class="b-grid__col-12 b-grid__col-m-12 b-products-columns-extend__right-item"
                    v-show="$sectionData.mainStyle.selectProduct.name === 'Deluxe' && $sectionData.mainStyle.products['Deluxe'].visible"
                    :class="{ 'b-products-columns-extend__right-item_active': $sectionData.mainStyle.selectProduct.name === 'Deluxe' }"
                    :product-extend-stage="2"
                    >
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container3"
                      components-path="$sectionData.components3"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components3" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container3.styles">
                        <div
                             v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components3[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
                            :is="component.name"
                            :href="$sectionData.components3[index].element.link.href"
                            :target="$sectionData.components3[index].element.link.target"
                            :path="`components3[${index}].element`"
                            :style="$sectionData.components3[index].element.styles"
                            :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components3[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
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
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components3d" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container3d.styles">
                        <div
                             v-for="(component, index) in $sectionData.components3d" v-if="$sectionData.components3d.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components3d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components3d[index].element, path: `$sectionData.components3d[${index}].element`, type: $sectionData.components3d[index].type }"
                            :is="component.name"
                            :href="$sectionData.components3d[index].element.link.href"
                            :target="$sectionData.components3d[index].element.link.target"
                            :path="`components3d[${index}].element`"
                            :style="$sectionData.components3d[index].element.styles"
                            :class="[$sectionData.components3d[index].element.classes, $sectionData.components3d[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components3d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components3d[index].element, path: `$sectionData.components3d[${index}].element`, type: $sectionData.components3d[index].type }"
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
                  <div class="b-grid__col-12 b-grid__col-m-12 b-products-columns-extend__right-item"
                    v-show="$sectionData.mainStyle.selectProduct.name === 'Ultimate' && $sectionData.mainStyle.products['Ultimate'].visible"
                    :class="{ 'b-products-columns-extend__right-item_active': $sectionData.mainStyle.selectProduct.name === 'Ultimate' }"
                    :product-extend-stage="3"
                    >
                    <sandbox
                      class="b-sandbox"
                      container-path="$sectionData.container4"
                      components-path="$sectionData.components4"
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components4" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container4.styles">
                        <div
                             v-for="(component, index) in $sectionData.components4" v-if="$sectionData.components4.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components4[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type }"
                            :is="component.name"
                            :href="$sectionData.components4[index].element.link.href"
                            :target="$sectionData.components4[index].element.link.target"
                            :path="`components4[${index}].element`"
                            :style="$sectionData.components4[index].element.styles"
                            :class="[$sectionData.components4[index].element.classes, $sectionData.components4[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components4[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type }"
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
                      :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
                      >
                      <draggable v-model="$sectionData.components4d" class=" b-draggable-slot b-draggable-slot_100" :style="$sectionData.container4d.styles">
                        <div
                             v-for="(component, index) in $sectionData.components4d" v-if="$sectionData.components4d.length !== 0" :key="index">
                          <component class="b-products-columns-component"
                            v-if="$sectionData.components4d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components4d[index].element, path: `$sectionData.components4d[${index}].element`, type: $sectionData.components4d[index].type }"
                            :is="component.name"
                            :href="$sectionData.components4d[index].element.link.href"
                            :target="$sectionData.components4d[index].element.link.target"
                            :path="`components4d[${index}].element`"
                            :style="$sectionData.components4d[index].element.styles"
                            :class="[$sectionData.components4d[index].element.classes, $sectionData.components4d[index].class]"
                            >
                          </component>
                          <component class="b-products-columns-component"
                            v-if="!$sectionData.components4d[index].element.isComplex"
                            v-styler:for="{ el: $sectionData.components4d[index].element, path: `$sectionData.components4d[${index}].element`, type: $sectionData.components4d[index].type }"
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
              </div><!--/.b-products-columns-extend__right-->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
$h: 100vh
.b-products-columns-extend
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
