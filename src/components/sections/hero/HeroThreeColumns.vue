<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-hero">

  <slot name="video"/>
  <slot name="overlay"/>

  <div class="b-grid">
    <div class="b-grid__row">

      <div
          v-for="(prefix, index) in prefixes"
          :key="`hero-three-column-${ _uid }-${ index }`"
          :class="{
            'b-grid__col-6': prefix === '2',
            'b-grid__col-3': prefix !== '2',
            'b-grid__logo': prefix !== '2'
          }"
          class="b-grid__col-m-12">

        <sandbox
            :container-path="`$sectionData.container${ prefix }`"
            :components-path="`$sectionData.components${ prefix }`"
            :direction="(['', '3'].includes(prefix)) ? 'row' : 'column'"
            :class="`b-sandbox__${ prefix || 1 }`"
            align="center"
            class="b-sandbox">

          <!-- eslint-disable-next-line vue/valid-v-model -->`
          <draggable v-model="$sectionData[`components${ prefix }`]" :style="$sectionData[`container${ prefix }`].styles" class="b-draggable-slot">

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
import { StyleObject, Logo, Title, Text, Delimiter, Button } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const [name, group, cover] = ['HeroThreeColumns', 'Hero', '/img/covers/hero-three-columns.png']

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
        'background-image': 'url(https://gn215.cdn.stg.gamenet.ru/0/7a2Pg/o_20SELE.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '220px',
        'height': '150px'
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
        'font-size': '48px',
        'color': '#ffffff'
      }
    },
    key: 1
  },
  {
    element: {
      text: `
        An sincerity so extremity he additions. Her yet there truth merit.
        <span>Oh children provided to mr elegance marriage strongly.</span>
      `,
      styles: {
        'font-family': 'Lato',
        'font-size': '20px',
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
        'width': '300px',
        'max-width': '100%',
        'height': '64px',
        'border-radius': '2px'
      }
    },
    key: 3
  }
]
const defaultColumnComponents3 = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn673.cdn.stg.gamenet.ru/0/7a2Oy/o_ZmvP7.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '220px',
        'height': '150px'
      }
    },
    key: 9
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn565.cdn.stg.gamenet.ru/0/7a2gZ/o_1hCEY8.png)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': '75% 50%'
    }
  },
  components: merge({}, defaultColumnComponents1),
  components2: merge({}, defaultColumnComponents2),
  components3: merge({}, defaultColumnComponents3),
  edited: true
}

export default {
  name,
  group,
  cover,

  mixins: [defaults],

  $schema: {
    mainStyle: StyleObject,
    container: StyleObject,
    container2: StyleObject,
    container3: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 }
    ],
    components2: [
      { name: 'TextElement', element: Title, type: 'text', class: 'b-title', label: 'title', key: 1 },
      { name: 'TextElement', element: Text, type: 'text', class: 'b-text', label: 'description', key: 2 },
      { name: 'Delimiter', element: Delimiter, type: 'delimiter', class: 'b-delimiter', label: 'delimiter', key: 8 },
      { name: 'Button', element: Button, type: 'button', class: 'b-button-test', label: 'button', key: 3 }
    ],
    components3: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 9 }
    ]
  },

  data () {
    return {
      prefixes: ['', '2', '3']
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
.b-hero

</style>
