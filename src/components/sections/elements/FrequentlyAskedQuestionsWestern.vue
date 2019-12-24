<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const C_CUSTOM_COLUMN = [
  {
    element: {
      styles: {
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'line-height': '1.2',
        'color': '#ffffff'
      },
      'sizeIcons': {
        width: 20
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'margin-top': '0',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0',
          'sizeIcons': {
            width: 20
          }
        }
      },
      el: {
        color: '#1A83FF',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        content: `
          <table>
            <tr>
              <th>Will I be able to play the game this year?</th>
            </tr>
            <tr>
              <td>
                <p>Yes you can. The exact date of the start of testing will be announced later.</p>
              </td>
            </tr>
          </table>
         `
      }
    }
  },
  {
    element: {
      styles: {
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'line-height': '1.2',
        'color': '#ffffff'
      },
      'sizeIcons': {
        width: 20
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'margin-top': '0',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0',
          'sizeIcons': {
            width: 20
          }
        }
      },
      el: {
        color: '#1A83FF',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        content: `
          <table>
            <tr>
              <th>Want anti-cheat do you plan to use?</th>
            </tr>
            <tr>
              <td>
                <p>We integrate anti-cheat P1, which has already proven itself to protect users of our other projects. The developers of this software are now searching for game vulnerabilities and optimizing P1 for the needs of "OUR GAME".</p>
              </td>
            </tr>
          </table>
         `
      }
    },
    key: 2
  },
  {
    element: {
      styles: {
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'line-height': '1.2',
        'color': '#ffffff'
      },
      'sizeIcons': {
        width: 20
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'margin-top': '0',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0',
          'sizeIcons': {
            width: 20
          }
        }
      },
      el: {
        color: '#1A83FF',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        content: `
          <table>
            <tr>
              <th>What is this game about?</th>
            </tr>
            <tr>
              <td>
                <p>"OUR GAME" is a game that combines the classic gameplay of an isometric action-RPG of the old school with elements of MMO games.</p>
              </td>
            </tr>
          </table>
         `
      }
    },
    key: 3
  },
  {
    element: {
      styles: {
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'line-height': '1.2',
        'color': '#ffffff'
      },
      'sizeIcons': {
        width: 20
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'margin-top': '0',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0',
          'sizeIcons': {
            width: 20
          }
        }
      },
      el: {
        color: '#1A83FF',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        content: `
          <table>
            <tr>
              <th>When does the closed beta start?</th>
            </tr>
            <tr>
              <td>
                <p>Information about the start date of the PTA can be expected in 2019. We will definitely inform you about everything additionally - follow the news in the official communities of "OUR GAME"</p>
              </td>
            </tr>
          </table>
         `
      }
    },
    key: 4
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<b>Frequently Asked Questions</b>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4rem',
        'line-height': '1.2',
        'color': '#ffffff'
      },
      media: {
        'is-mobile': {
          'font-size': '3rem'
        }
      }
    }
  }
]

const C_CUSTOM_CONTAINER = {
  width: 12,
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const C_CUSTOM_CONTAINER_1 = {
  width: 12,
  styles: {
    'flex-direction': 'column',
    'align-items': 'flex-start',
    'padding-left': '16px'
  },
  media: {
    'is-mobile': {
      'padding-left': '0'
    }
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/414bef4e-46a9-492d-8ca7-761ee4b80994.png)',
      'background-color': '#000000',
      'background-position': '50% 50%',
      'background-size': 'cover',
      'padding-top': '24px',
      'padding-bottom': '24px',
      'height': '100vh'
    }
  },
  container: _.merge({}, C_CUSTOM_CONTAINER),
  container1: _.merge({}, C_CUSTOM_CONTAINER_1),
  components: _.merge({}, C_CUSTOM),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  edited: true
}

const COMPONENTS = [
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  },
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  },
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  },
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  }
]

const HEADER = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  }
]

const GROUP_NAME = 'Elements'
const NAME = 'FrequentlyAskedQuestionsWestern'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Interactive FAQ presentation screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/faq-western.jpg',

  $schema: {
    mainStyle: types.Columns,
    container: types.StyleObject,
    container1: types.StyleObject,
    components: _.merge([], HEADER),
    components1: _.merge([], COMPONENTS)
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
    class="b-faq"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            :style="$sectionData.container.styles"
            >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-faq-component"
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
        </div><!--/.b-grid__col-12-->
      </div><!--/.b-grid__row-->
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container1.width}`">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container1"
            components-path="$sectionData.components1"
            :style="$sectionData.container1.styles"
            >
            <draggable v-model="$sectionData.components1" class="b-draggable-slot" :style="$sectionData.container1.styles" @start="$_drag('components1')" @change="$_dragStop">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components1" v-if="$sectionData.components1.length !== 0" :key="index">
                <component class="b-faq-component"
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
        </div><!--/.b-grid__col-12-->
      </div><!--/.b-grid__row-->
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'
</style>
