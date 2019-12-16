<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'
import { mapActions } from 'vuex'

let prev = [
  'https://gn257.cdn.stg.gamenet.ru/0/8dAso/o_1O03Wg.png',
  'https://gn292.cdn.stg.gamenet.ru/0/8dAtJ/o_1FdGcD.png',
  'https://gn546.cdn.stg.gamenet.ru/0/8dAtZ/o_2FiQhB.png',
  'https://gn452.cdn.stg.gamenet.ru/0/8dAtj/o_1ZxHzN.png'
]

let label = [
  'Start', 'Full', 'Delux', 'Ultimate'
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
          'width': '160px',
          'height': '160px'
        },
        media: {
          'is-mobile': {
            'width': '160px',
            'height': '160px'
          }
        }
      }
    },
    {
      element: {
        text: `<p><strong>${label[i]} edition</strong></p>`,
        styles: {
          'font-family': 'Montserrat',
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
        text: '<p><strong>BUY NOW</strong></p>',
        styles: {
          'background-color': 'transparent',
          'color': '#F4BC64',
          'font-family': 'Montserrat',
          'font-size:': '1.6rem',
          'text-align': 'center',
          'width': '190px',
          'height': '64px',
          'border-radius': '100px',
          'border-width': '2px',
          'border-style': 'solid',
          'border-color': '#F4BC64'
        },
        pseudo: {
          hover: {
            'color': '#FFFFFF !important',
            'border-width': '2px !important',
            'border-style': 'solid !important',
            'border-color': '#FFFFFF !important'
          }
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
        text: 'Starship mk1'
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
        text: 'Kinetic weapon mk1'
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
        text: 'Starship mk1'
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
        text: 'Kinetic weapon mk1'
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
        text: 'Starship mk1'
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
        text: 'Kinetic weapon mk1'
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
        text: 'Starship mk1'
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
        text: 'Kinetic weapon mk1'
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

const C_CUSTOM_CONTAINER_D = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'flex-start',
    'padding-left': '35px'
  },
  media: {
    'is-mobile': {
      'padding-left': '70px'
    }
  }
}

const C_CUSTOM = [
  {
    element: {
      styles: {
        'height': '60px'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn870.cdn.stg.gamenet.ru/0/8coGJ/o_u02v0.jpg)',
      'background-color': 'rgba(21,28,68,1)',
      'background-size': 'cover',
      'padding-top': '50px',
      'padding-bottom': '190px'
    }
  },
  components: _.merge({}, C_CUSTOM),
  containerStandart: _.merge({}, C_CUSTOM_CONTAINER),
  containerStandartD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerFull: _.merge({}, C_CUSTOM_CONTAINER),
  containerFullD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerDeluxe: _.merge({}, C_CUSTOM_CONTAINER),
  containerDeluxeD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerUltimate: _.merge({}, C_CUSTOM_CONTAINER),
  containerUltimateD: _.merge({}, C_CUSTOM_CONTAINER_D),
  componentsStandart: _.merge({}, C_CUSTOM_1),
  componentsStandartD: _.merge({}, C_CUSTOM_1D),
  componentsFull: _.merge({}, C_CUSTOM_2),
  componentsFullD: _.merge({}, C_CUSTOM_2D),
  componentsDeluxe: _.merge({}, C_CUSTOM_3),
  componentsDeluxeD: _.merge({}, C_CUSTOM_3D),
  componentsUltimate: _.merge({}, C_CUSTOM_4),
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
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test',
    label: 'button'
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
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
  }
]

const GROUP_NAME = 'Products'
const NAME = 'Products'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Product list horizontal view',

  mixins: [defaults, sectionMedia],

  cover: 'https://gn709.cdn.stg.gamenet.ru/0/8iEAD/o_1uYktu.jpg',

  $schema: {
    mainStyle: types.ProductSection,
    container: types.StyleObject,
    components: _.merge([], HEADER),
    containerStandart: types.StyleObject,
    containerStandartD: types.StyleObject,
    containerFull: types.StyleObject,
    containerFullD: types.StyleObject,
    containerDeluxe: types.StyleObject,
    containerDeluxeD: types.StyleObject,
    containerUltimate: types.StyleObject,
    containerUltimateD: types.StyleObject,
    componentsStandart: _.merge([], COMPONENTS),
    componentsStandartD: _.merge([], COMPONENTS_D),
    componentsFull: _.merge([], COMPONENTS),
    componentsFullD: _.merge([], COMPONENTS_D),
    componentsDeluxe: _.merge([], COMPONENTS),
    componentsDeluxeD: _.merge([], COMPONENTS_D),
    componentsUltimate: _.merge([], COMPONENTS),
    componentsUltimateD: _.merge([], COMPONENTS_D)
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
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
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
              >
                <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
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
                    >
                    <draggable v-model="$sectionData['components' + key]" class="b-draggable-slot" :style="$sectionData[`container${key}`].styles" @start="$_drag(`components${key}`)" @change="$_dragStop">
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
                    >
                    <draggable v-model="$sectionData['components' + key + 'D']" class="b-draggable-slot" :style="$sectionData[`container${key}D`].styles" @start="$_drag(`components${key}D`)" @change="$_dragStop">
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
@import '../../../assets/sass/section-media.sass'
@import '../../../assets/sass/section-menu.sass'
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

  .b-grid__col-3
    padding: .8rem

</style>
