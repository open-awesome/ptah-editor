<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    class="b-hero">

  <slot name="menu"/>
  <slot name="video"/>
  <slot name="overlay"/>

  <div class="b-grid">
    <div class="b-grid__row">

      <div
          v-for="(prefix, index) in prefixes"
          :key="`hero-two-column-${ _uid }-${ index }`"
          :class="`b-grid__col-${$sectionData[`container${prefix}`].width}`"
          class="b-grid__col-m-12">

        <sandbox
            :container-path="`$sectionData.container${ prefix }`"
            :components-path="`$sectionData.components${ prefix }`"
            :align="(prefix === '') ? 'flex-start' : 'center'"
            :direction="(prefix === '') ? 'row' : 'column'"
            :class="`b-sandbox__${ prefix || 1 }`"
            class="b-sandbox">

          <!-- eslint-disable-next-line vue/valid-v-model -->
          <draggable v-model="$sectionData[`components${ prefix }`]" :style="$sectionData[`container${ prefix }`].styles" class="b-draggable-slot" @start="drag(`components${ prefix }`)" @change="dragStop">

            <div
                v-for="(component, index) in $sectionData[`components${ prefix }`]"
                v-if="$sectionData[`components${ prefix }`].length !== 0"
                :key="`component1-${ _uid }-${ index }`">

              <component class="b-hero-component"
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components${ prefix }[${index}].element`
                  }"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :class="[component.element.classes, component.class]"
                  :path="`components${ prefix }[${index}].element`">
                <div v-html="$sectionData[`components${ prefix }`][index].element.text"></div>
              </component>

            </div>

          </draggable>

        </sandbox>

      </div>

    </div>
  </div>

</section>
</template>

<script>
import { StyleObject, Logo, Text, Delimiter, Button } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const [name, group, cover] = ['TwoSegmentHeroScreen', 'FirstScreen', '/img/covers/hero-two-columns.png']

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
const defaultColumnComponents1 = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn675.cdn.stg.gamenet.ru/0/7K0Jf/o_15rRBx.svg)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px'
      }
    },
    key: 0
  }
]
const defaultColumnComponents2 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Lato',
        'font-size': '4.8rem',
        'color': '#ffffff'
      }
    },
    key: 1
  },
  {
    element: {
      text: `
        An sincerity so extremity he additions. Her yet there truth merit.
        <span>Mrs all projecting favourable now unpleasing. Son law garden chatty temper</span>
        <span>Oh children provided to mr elegance marriage strongly.</span>
      `,
      styles: {
        'font-family': 'Lato',
        'font-size': '2rem',
        'line-height': '1.5',
        'color': '#FFF'
      }
    },
    key: 2
  },
  {
    key: 8
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
        'max-width': '100%',
        'height': '64px',
        'border-radius': '2px'
      }
    },
    key: 3
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn367.cdn.stg.gamenet.ru/0/7a0MG/o_1SlgxQ.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': '75% 50%'
    }
  },
  container: {
    width: 4,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container'
  },
  container2: {
    width: 8,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container'],
    selfName: '$sectionData.container2'
  },
  components: merge({}, defaultColumnComponents1),
  components2: merge({}, defaultColumnComponents2),
  edited: true
}

export default {
  name,
  group,
  cover,

  description: 'Two parts split main screen',

  mixins: [defaults, sectionMedia],

  $schema: {
    mainStyle: StyleObject,
    container: StyleObject,
    container2: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 }
    ],
    components2: [
      { name: 'TextElement', element: Text, type: 'text', class: 'b-title', label: 'title', key: 1 },
      { name: 'TextElement', element: Text, type: 'text', class: 'b-text', label: 'description', key: 2 },
      { name: 'Delimiter', element: Delimiter, type: 'delimiter', class: 'b-delimiter', label: 'delimiter', key: 8 },
      { name: 'Button', element: Button, type: 'button', class: 'b-button-test', label: 'button', key: 3 }
    ]
  },

  data () {
    return {
      prefixes: ['', '2']
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, defaultSchema))
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'
.b-grid__col-8
  .is-mobile &,
  .is-tablet &
    padding-top: 0
  @media only screen and (max-width: 768px)
    padding-top: 0
</style>
