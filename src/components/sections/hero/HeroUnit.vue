<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'GenericMainScreen'
const BG_SECTION = 'url(https://gn987.cdn.stg.gamenet.ru/0/7K0NZ/o_1zKuK8.png)'

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
    class: 'b-title',
    label: 'text'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: ' ',
    label: 'text'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button',
    label: 'button'
  },
  {
    name: 'AvailablePlatforms',
    element: types.AvailablePlatforms,
    type: 'available',
    class: 'b-available-platforms',
    label: 'Available Platforms'
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn675.cdn.stg.gamenet.ru/0/7K0Jf/o_15rRBx.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px'
      }
    }
  },
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Lato',
        'font-size': '4.8rem',
        'color': '#ffffff',
        'margin-bottom': '32px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.6rem',
          'line-height': '1.4'
        }
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions. Her yet there truth merit.' +
      '<p>Mrs all projecting favourable now unpleasing. Son law garden chatty temper</p>' +
      '<p>Oh children provided to mr elegance marriage strongly.</p>',
      styles: {
        'font-family': 'Lato',
        'font-size': '2rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '352px',
        'height': '64px',
        'border-radius': '2px'
      }
    }
  },
  {
    element: {
      availablePlatforms: {
        'windows': {
          name: 'Windows',
          visible: true
        },
        'apple': {
          name: 'Apple',
          visible: true
        },
        'linuxfull': {
          name: 'Linux',
          visible: false
        },
        'steam': {
          name: 'Steam',
          visible: false
        },
        'gog': {
          name: 'GOG Galaxy',
          visible: false
        }
      },
      colorFill: {
        color: '#fff'
      },
      sizeIcons: {
        width: 15
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'cover',
      'background-color': '#000',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll'
    }
  },
  components: _.merge({}, C_CUSTOM),
  container: {
    width: 8
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Simplified all-purpose main screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/hero-unit.png',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS
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
    class="b-hero"
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
              container-path="$sectionData.container"
              components-path="$sectionData.components"
              direction="column"
              class="b-sandbox">

            <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container.styles" @start="drag('components')" @change="dragStop">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-hero-component"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
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
    </div>
  </section>
</template>

<style lang="sass" scoped>
  @import '../../../assets/sass/section-media.sass'
</style>
