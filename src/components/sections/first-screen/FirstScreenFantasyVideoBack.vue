<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenFantasyVideoBack'
const BG_SECTION = 'url(https://gn780.cdn.stg.gamenet.ru/0/8iMuX/o_JEnQO.jpg)'
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
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn543.cdn.stg.gamenet.ru/0/8iMxM/o_18R5TC.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '500px',
        'height': '121px',
        'margin': '25px 0 20px'
      }
    }
  },
  {
    element: {
      text: '<p>HERE SHOULD BE A LITTLE TEXT ABOUT YOURE GAME</b></p>',
      styles: {
        'font-family': 'Cinzel',
        'font-size': '5.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin': '25px 0 20px'
      }
    }
  },
  {
    element: {
      text: '<p><b>Time left</b></p>',
      styles: {
        'font-family': 'Cinzel',
        'font-size': '3.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin': '25px 0 12px'
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
        'font-family': 'Cinzel',
        'font-size': '4rem',
        'font-weight': 'normal',
        'line-height': '1',
        'color': '#ffffff',
        'padding': '0',
        'margin': '0 0 27px 0'
      }
    }
  },
  {
    element: {
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#AF2E12',
        'color': '#ffffff',
        'font-family': 'Cinzel',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border': '1px solid #000000',
        'margin': '25px 0'
      },
      pseudo: {
        'hover': {
          'background-color': '#333333 !important',
          'border': '1px solid #AF2E12 !important'
        }
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
      'height': '100vh'
    },
    backgroundType: 'video',
    backgroundVideo: 'https://gn357.cdn.stg.gamenet.ru/0/8iNCR/o_1vLDJn.mp4',
    overlay: {
      color: '#000000',
      opacity: '0.5'
    }
  },
  components: _.merge({}, C_CUSTOM),
  container: {
    width: 9,
    styles: {
      padding: '0 0 120px 0'
    }
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Fantasy title animated background main screen',

  mixins: [defaults],

  cover: '/img/covers/first-screen-fantasy-video-back.jpg',

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
    class="b-first-screen-space-video-back"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
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

            <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container.styles" @change="dragStop">
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
.b-first-screen-space-video-back
  .b-text-fs
    letter-spacing: -0.02em
    .is-mobile &,
    .is-tablet &
      font-size: 2.4rem !important
      margin: 0 auto 8px !important
    @media only screen and (max-width: 840px)
      &
        font-size: 2.4rem !important
        margin: 0 auto 8px !important
  .b-button-fs
    box-shadow: 0px 8px 70px rgba(0, 0, 0, 0.2)
    transition: background-color 200ms
  .b-timer-fs
    .is-mobile &,
    .is-tablet &
      margin: 0 auto 8px !important
    @media only screen and (max-width: 840px)
      &
        font-size: 2.4rem !important
        margin: 0 auto 8px !important

</style>
