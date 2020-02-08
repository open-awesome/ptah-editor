<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'HeroWithTimerSlogan2'
const BG_SECTION = 'url(https://s3.protocol.one/src/o_1ToUuI.jpg)'

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
    class: 'b-slogan',
    label: 'slogan'
  },
  {
    name: 'Timer',
    element: types.Timer,
    type: 'timer',
    class: 'b-timer',
    label: 'Timer'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button',
    label: 'button'
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url(https://s3.protocol.one/src/o_1iIFD9.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '440px',
        'height': '124px'
      },
      media: {
        'is-mobile': {
          width: '270px',
          height: '80px',
          'margin-bottom': '0'
        }
      }
    }
  },
  {
    element: {
      styles: {
        'color': '#fff',
        'font-family': 'Lato',
        'text-align': 'center',
        'font-size': '4.8rem',
        'font-weight': 'bold'
      },
      media: {
        'is-mobile': {
          'font-size': '3.6rem',
          'line-height': '1.4'
        }
      }
    }
  },
  {},
  {
    element: {
      text: 'Play Now',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-image': 'url(https://s3.protocol.one/src/o_1KjCvL.png)',
        'background-size': 'contain',
        'color': '#000',
        'font-family': 'Heebo',
        'text-align': 'center',
        'font-size': '3.6rem',
        'width': '384px',
        'height': '116px',
        'border-radius': '0',
        'font-weight': 'bold',
        'padding-bottom': '14px'
      },
      media: {
        'is-mobile': {
          width: '270px',
          height: '110px',
          'margin-bottom': '0',
          'font-size': '2.4rem',
          'line-height': '1',
          'padding-bottom': '8px'
        }
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'background-position': '50% 0%',
      'height': '100vh'
    }
  },
  components: _.merge([], C_CUSTOM),
  container: {
    width: 6
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Shooter title Right Countdown main screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/hero-with-timer-slogan2.jpg',

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
    class="b-hero-with-timer-two-columns"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
    >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid">
      <div class="b-grid__row">
        <div class="hidden-m" :class="`b-grid__col-${12 - $sectionData.container.width}`">
          <!-- empty col -->
        </div>
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
          <sandbox
              container-path="$sectionData.container"
              components-path="$sectionData.components"
              class="b-sandbox">
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  :path="`components[${index}].element`"
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
