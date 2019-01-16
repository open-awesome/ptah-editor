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
      text: 'Start Edition'
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
      text: 'Start Edition'
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
      text: 'Full Edition'
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
      text: 'Full Edition'
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
      text: 'Deluxe Edition'
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
      text: 'Deluxe Edition'
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
      text: 'Ultimate Edition'
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
      text: 'Ultimate Edition'
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

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn664.cdn.stg.gamenet.ru/0/7RIc1/o_4g83t.jpg)',
      'background-color': 'rgba(21,28,68,0.73)'
    }
  },
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
  cover: '/img/covers/products.jpg',
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
    components4d: COMPONENTS_D,
    listComponents: {}
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

    storeData: _.after(2, (self) => {
      let data = self.$sectionData.listComponents
      for (var key in data) {
        self.$sectionData[key].forEach(component => {
          data[key].push(component)
        })
      }
      self.updateGroupData({ name: GROUP_NAME, data })
      self.updateSectionData({
        name: NAME,
        data: _.cloneDeep(self.$sectionData)
      })
    }),

    canRestore () {
      return this.$store.state.Landing.groups.indexOf(GROUP_NAME) === -1 && !!this.$store.state.Landing.sectionData[NAME]
    },

    setListComponents () {
      for (var key in this.$sectionData) {
        if (key.indexOf('components') !== -1) {
          this.$sectionData.listComponents[key] = []
        }
      }
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      let data = this.canRestore() ? this.$store.state.Landing.sectionData[NAME] : SCHEMA_CUSTOM
      Seeder.seed(_.merge(this.$sectionData, data))
    }

    if (this.$store.state.Landing.groupData[GROUP_NAME]) {
      _.forEach(this.$store.state.Landing.groupData[GROUP_NAME], (arrComponents, name) => {
        this.$sectionData[name] = arrComponents
      })
    }

    this.setListComponents()
  },

  updated () {
    this.setListComponents()
    this.storeData(this)
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
                  v-styler:for="{ el: $sectionData.components1[index].element, path: `$sectionData.components1[${index}].element`, type: $sectionData.components1[index].type }"
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
                  v-styler:for="{ el: $sectionData.components1d[index].element, path: `$sectionData.components1d[${index}].element`, type: $sectionData.components1d[index].type }"
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
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
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
            direction="column"
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <draggable v-model="$sectionData.components2d" class="b-draggable-slot" :style="$sectionData.container2d.styles">
              <div
                   v-for="(component, index) in $sectionData.components2d" v-if="$sectionData.components2d.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
                <component class="b-products-colums-component"
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
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
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
            direction="column"
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >

            <draggable v-model="$sectionData.components3d" class="b-draggable-slot" :style="$sectionData.container3d.styles">
              <div
                   v-for="(component, index) in $sectionData.components3d" v-if="$sectionData.components3d.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
                <component class="b-products-colums-component"
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
                  v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type }"
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
            direction="column"
            align="flex-start"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >

            <draggable v-model="$sectionData.components4d" class="b-draggable-slot" :style="$sectionData.container4d.styles">
              <div
                   v-for="(component, index) in $sectionData.components4d" v-if="$sectionData.components4d.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
                <component class="b-products-colums-component"
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
