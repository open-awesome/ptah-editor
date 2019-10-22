<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn67.cdn.gamenet.ru/TY0Xv2riHu/6OTe4/o_2ALU6l.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '544px',
        'height': '70px',
        'margin-bottom': '32px'
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
      text: 'Chronicles of your ascent',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '2.8rem',
        'color': '#000000',
        'margin-bottom': '200px'
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'margin-bottom': '100px'
        }
      }
    }
  }
]

const C_CUSTOM2 = [
  {
    element: {
      text: 'Play game',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '3.6rem',
        'color': '#000000',
        'background-color': '#ffa800',
        'width': '256px',
        'height': '70px',
        'border-radius': '2px'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn717.cdn.gamenet.ru/TY0Xv85rCS/6MG9a/o_2UvGS.jpg)',
      'background-size': 'cover',
      'background-position': 'center top',
      'background-repeat': 'no-repeat',
      'height': '80vh'
    },
    media: {
      'is-mobile': {
        'background-position': '17% 0%'
      }
    }
  },
  container: {
    width: 12
  },
  container2: {
    width: 12
  },
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM2),
  edited: true
}

const GROUP_NAME = 'FirstScreen'
const NAME = 'HeroBAS'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Fantasy title Play Game main screen',

  mixins: [defaults, sectionMedia],

  cover: 'https://gn811.cdn.stg.gamenet.ru/0/7cEKX/o_182BvQ.png',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: [
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
        label: 'title'
      }
    ],
    components2: [
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-button',
        label: 'button'
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
    class="b-hero"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle">

    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            class="b-sandbox"
          >
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
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container2.width}`">
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            class="b-sandbox"
          >
            <draggable v-model="$sectionData.components2" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container2.styles" @start="drag('components2')" @change="dragStop">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-hero-component"
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
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'
</style>
