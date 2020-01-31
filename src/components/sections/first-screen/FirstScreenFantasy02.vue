<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenFantasy02'
const BG_SECTION = 'url(https://s3.protocol.one/src/o_1jz4qB.jpg)'
const date = Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000

const COMPONENTS_1 = [
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
  }
]

const C_CUSTOM_1 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://s3.protocol.one/src/o_18R5TC.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '500px',
        'height': '121px',
        'margin-top': '25px',
        'margin-right': '0px',
        'margin-bottom': '20px',
        'margin-left': '13px'
      },
      media: {
        'is-mobile': {
          width: '270px',
          height: '100px',
          'margin-top': '25px',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '12px'
        }
      }
    }
  },
  {
    element: {
      text: '<h1>HERE SHOULD BE A LITTLE TEXT ABOUT YOURE GAME</h1>',
      styles: {
        'font-size': '5.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'text-align': 'left',
        'margin-top': '25px',
        'margin-right': '0px',
        'margin-bottom': '20px',
        'margin-left': '15px',
        'padding-left': '13px'
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'line-height': '1.4',
          'text-align': 'left',
          'margin-top': '16px',
          'margin-bottom': '16px',
          'margin-left': '8px',
          'margin-right': '20px',
          'padding-right': '80px'
        }
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
        'font-weight': 'normal',
        'line-height': '1',
        'color': '#ffffff',
        'margin-top': '0px',
        'margin-right': '0px',
        'margin-bottom': '27px',
        'margin-left': '25px',
        'padding-top': '0px',
        'padding-right': '0px',
        'padding-bottom': '0px',
        'padding-left': '0px'
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'margin-top': '16px',
          'margin-bottom': '16px',
          'margin-left': '8px',
          'margin-right': '20px',
          'padding-right': '80px'
        }
      }
    }
  },
  {
    element: {
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#AF2E12',
        'color': '#ffffff',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border': '1px solid #000000',
        'margin-top': '25px',
        'margin-right': '0px',
        'margin-bottom': '70px',
        'margin-left': '38px',
        'padding-top': '0px',
        'padding-right': '0px',
        'padding-bottom': '0px',
        'padding-left': '0px'
      },
      pseudo: {
        'hover': {
          'background-color': '#333333 !important',
          'border': '1px solid #AF2E12 !important'
        }
      },
      media: {
        'is-mobile': {
          'margin-top': '16px',
          'margin-bottom': '16px',
          'margin-left': '25px',
          'margin-right': '0'
        }
      }
    }
  }
]

const COMPONENTS_3 = [
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter-fs',
    label: 'Spacer'
  },
  {
    name: 'SocialNetworks',
    element: types.SocialNetworks,
    type: 'networks',
    class: 'b-social-networks-fs',
    label: 'Social Networks'
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      styles: {
        width: '40px',
        height: '120px'
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
      colorFill: {
        color: '#C53314'
      },
      sizeIcons: {
        width: 30
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'cover',
      'background-color': '#4A4A4A',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'background-position': '100% 0%',
      'height': '100vh'
    },
    media: {
      'is-mobile': {
        'background-position': '78% 0%'
      }
    }
  },
  components: _.merge({}, C_CUSTOM_1),
  container: {
    width: 9,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container',
    styles: {
      'align-items': 'flex-start'
    }
  },
  container2: {
    width: 3,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container'],
    selfName: '$sectionData.container2'
  },
  container3: {
    width: 12
  },
  components3: _.merge({}, C_CUSTOM_3),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Fantasy title face the Countdown main screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/first-screen-fantasy-02.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: COMPONENTS_1,
    components2: [],
    components3: COMPONENTS_3
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
    class="b-first-screen-fantasy-02"
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
        <div class="b-grid__col-m-12 hidden-m" :class="`b-grid__col-${$sectionData.container2.width}`">
          <sandbox
              container-path="$sectionData.container2"
              components-path="$sectionData.components2"
              class="b-sandbox">

            <draggable v-model="$sectionData.components2" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container2.styles" @start="$_drag('components2')" @change="$_dragStop">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: component.label }"
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
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container3.width}`">
          <sandbox
            container-path="$sectionData.container3"
            components-path="$sectionData.components3"
            class="b-sandbox">

            <draggable v-model="$sectionData.components3" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container3.styles" @start="$_drag('components3')" @change="$_dragStop">
              <div v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: component.label }"
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
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
</style>
