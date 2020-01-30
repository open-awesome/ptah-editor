<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenSpace02'
const BG_SECTION = 'url(https://s3.protocol.one/src/o_ogapi.jpg)'
const date = Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo-fs',
    label: 'logo'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text-fs',
    label: 'text'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text-fs',
    label: 'text'
  },
  {
    name: 'Timer',
    element: types.Timer,
    type: 'timer',
    class: 'b-timer-fs',
    label: 'timer'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-fs',
    label: 'button'
  },
  {
    name: 'SocialNetworks',
    element: types.SocialNetworks,
    type: 'networks',
    class: 'b-social-networks-fs',
    label: 'Social Networks'
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://s3.protocol.one/src/o_1Y54Cu.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '246px',
        'height': '96px',
        'margin-top': '25px',
        'margin-bottom': '25px'
      }
    }
  },
  {
    element: {
      text: '<p><b>Place for a short description of your beautiful game.</b></p>',
      styles: {
        'font-size': '3.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin-top': '10px',
        'margin-right': '80px',
        'margin-bottom': '10px',
        'margin-left': '80px'
      }
    }
  },
  {
    element: {
      text: '<p><b>Time left</b></p>',
      styles: {
        'font-size': '3.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin-top': '21px',
        'margin-bottom': '10px'
      }
    }
  },
  {
    element: {
      timer: {
        timestamp: date,
        UTC: new Date().getTimezoneOffset() / 60 * (-1),
        labels: {
          show: false
        },
        colorTile: 'rgba(0,0,0,0)'
      },
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'font-size': '4rem',
        'font-weight': '800',
        'line-height': '1',
        'color': '#ffffff',
        'margin-bottom': '62px'
      }
    }
  },
  {
    element: {
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#F4BC64',
        'color': '#000000',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border-radius': '100px',
        'margin-top': '25px',
        'margin-bottom': '25px'
      },
      pseudo: {
        'hover': {
          'background-color': '#ffffff !important'
        }
      }
    }
  },
  {
    element: {
      socialNetworks: {
        'facebook': {
          name: 'Facebook',
          expand: false,
          visible: true,
          url: ''
        },
        'instagram': {
          name: 'Instagram',
          expand: false,
          visible: true,
          url: ''
        },
        'twitter': {
          name: 'Twitter',
          expand: false,
          visible: true,
          url: ''
        },
        'youtube': {
          name: 'Youtube',
          expand: false,
          visible: true,
          url: ''
        }
      },
      styles: {
        'margin-top': '25px'
      },
      colorFill: {
        color: '#F4BC64'
      },
      sizeIcons: {
        width: 32
      }
    },
    key: 4
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'cover',
      'background-color': '#000',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'height': '100vh'
    }
  },
  components: _.merge({}, C_CUSTOM),
  container: {
    width: 7
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Space title face the Countdown main screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/first-screen-space-02.jpg',

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
    class="b-first-screen-space-02"
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
              class="b-sandbox">

            <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
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
</style>
