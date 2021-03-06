<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'HeroWithTimerColumns'
const BG_SECTION = 'url(https://s3.protocol.one/src/o_1A6qDa.jpg)'

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo'
  }
]

const COMPONENTS_2 = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
  },
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
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
        'background-image': 'url(https://s3.protocol.one/src/o_2HZnCR.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '224px',
        'height': '124px'
      },
      media: {
        'is-mobile': {
          width: '240px',
          height: '140px',
          'margin-top': '0'
        }
      }
    }
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      text: `Excellent title`,
      styles: {
        'font-size': '5.6rem',
        'color': '#ffffff'
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
      text: 'This is a short description',
      styles: {
        'font-size': '2rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  {
    element: {
      styles: {
        'height': '172px'
      }
    }
  },
  {},
  {
    element: {
      text: 'Play Now',
      styles: {
        'background-color': 'rgba(159,104,5,1)',
        'color': '#ffffff',
        'text-align': 'center',
        'font-size': '2rem',
        'width': '352px',
        'height': '64px',
        'border-radius': '2px'
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
      'height': '80vh'
    }
  },
  components: _.merge([], C_CUSTOM),
  components2: _.merge([], C_CUSTOM_2),
  container: {
    width: 4,
    minWidth: 2,
    maxWidth: 10,
    styles: {
      'justify-content': 'flex-start',
      'align-items': 'center'
    },
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container'
  },
  container2: {
    width: 8,
    minWidth: 2,
    maxWidth: 10,
    styles: {
      'justify-content': 'flex-start',
      'align-items': 'center'
    },
    grow: ['$sectionData.container'],
    selfName: '$sectionData.container2'
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Shooter title Countdown two columns main screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/hero-with-timer-columns.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: COMPONENTS,
    components2: COMPONENTS_2
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
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container2.width}`">
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            class="b-sandbox">
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles" @start="$_drag('components2')" @change="$_dragStop">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  :path="`components2[${index}].element`"
                  >
                  <div v-html="$sectionData.components2[index].element.text"></div>
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
