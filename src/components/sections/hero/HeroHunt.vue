<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
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
const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn119.cdn.stg.gamenet.ru/0/7RbIo/o_1Ci11S.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '64px',
        'height': '147px'
      }
    },
    key: 0
  },
  {
    element: {
      text: 'Early Access Available Now',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '3.2rem',
        'color': '#ffffff'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'Watch the trailer',
      video: 'Qg4n9IpjMg0',
      styles: {
        'background-color': 'transparent',
        'background-image': 'url(https://gn267.cdn.stg.gamenet.ru/0/7RbUP/o_KcVd3.png)',
        'background-size': 'cover',
        'color': '#ffffff',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'width': '352px',
        'height': '102px'
      },
      classes: [
        'ptah-a-fade'
      ]
    },
    key: 3
  },
  {
    element: {
      text: 'Play now',
      styles: {
        'background-color': 'transparent',
        'background-image': 'url(https://gn342.cdn.stg.gamenet.ru/0/7RbXk/o_1j8P9r.png)',
        'background-size': 'cover',
        'color': 'transparent',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'width': '352px',
        'height': '54px'
      },
      classes: [
        'ptah-a-fade'
      ]
    },
    key: 5
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn157.cdn.stg.gamenet.ru/0/7T30j/o_1zIylP.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    },
    classes: [
      'full-height'
    ]
  },
  container: {
    width: 6
  },
  components: _.merge({}, C_CUSTOM),
  edited: true
}

const GROUP_NAME = 'FirstScreen'
const NAME = 'HeroHunt'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Shooter title Early Access main screen',

  mixins: [defaults],

  cover: 'https://gn372.cdn.stg.gamenet.ru/0/7cELj/o_1DWDoa.png',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: [
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image',
        class: 'b-hunt-logo',
        label: 'logo',
        key: 0
      },
      {
        name: 'TextElement',
        element: types.Text,
        type: 'text',
        class: 'b-hunt-title',
        label: 'title',
        key: 1
      },
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-hunt-button',
        label: 'button',
        key: 3
      },
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-hunt-button',
        label: 'button',
        key: 5
      }
    ]
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
    class="b-hunt"
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
            class="b-sandbox b-hunt-sandbox"
          >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="drag('components')" @change="dragStop">
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
        <div class="hidden-m" :class="`b-grid__col-${12 - $sectionData.container.width}`">
          <!-- empty col -->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.b-hunt
  .b-grid,
  .b-grid__row
    height: 80vh
  .b-hunt-sandbox
    height: 80vh
    /deep/
      .b-draggable-slot
        justify-content: flex-end
</style>
