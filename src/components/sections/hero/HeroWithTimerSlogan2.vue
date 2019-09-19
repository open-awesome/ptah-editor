<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const GROUP_NAME = 'FirstScreen'
const NAME = 'HeroWithTimerSlogan2'
const BG_SECTION = 'url(https://gn866.cdn.stg.gamenet.ru/0/7oE1x/o_1ToUuI.jpg)'

/**
 * Base keys for elements in Hero sections
 * Logo - 0
 * Title - 1
 * Description - 2
 * Button - 3
 * Available Platforms - 4
 * Video - 5
 * Slogan - 6
 * Link - 7
 * Delimiter- 8
 * Timer - 9
 * */
const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo',
    key: 0
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-slogan',
    label: 'slogan',
    key: 6
  },
  {
    name: 'Timer',
    element: types.Timer,
    type: 'timer',
    class: 'b-timer',
    label: 'Timer',
    key: 9
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button',
    label: 'button',
    key: 3
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn39.cdn.stg.gamenet.ru/0/7oE24/o_1iIFD9.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '440px',
        'height': '124px'
      }
    },
    key: 0
  },
  {
    element: {
      styles: {
        'color': '#fff',
        'font-family': 'Lato',
        'text-align': 'center',
        'font-size': '4.8rem',
        'font-weight': 'bold'
      }
    },
    key: 6
  },
  {
    key: 9
  },
  {
    element: {
      text: 'Play Now',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-image': 'url(https://gn757.cdn.stg.gamenet.ru/0/7oEGs/o_1KjCvL.png)',
        'background-size': 'contain',
        'color': '#000',
        'font-family': 'Heebo',
        'text-align': 'center',
        'font-size': '3.6rem',
        'width': '384px',
        'height': '116px',
        'border-radius': '0',
        'font-weight': 'bold'
      }
    },
    key: 3
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll'
    },
    classes: ['full-height']
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

  mixins: [defaults],

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
    :style="$sectionData.mainStyle.styles"
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
              direction="column"
              class="b-sandbox">
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="drag('components')" @change="dragStop">
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
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-hero-with-timer-two-columns
  .is-mobile &,
  .is-tablet &
    position: relative
    height: auto
    padding: $size-step/2 0 $size-step/4
  @media only screen and (max-width: 768px)
    &
      position: relative
      height: auto
      padding: 2rem 0 1rem

</style>
