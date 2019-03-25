<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'

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
        'background-image': 'url("https://gn67.cdn.gamenet.ru/TY0Xv2riHu/6OTe4/o_2ALU6l.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '544px',
        'height': '70px'
      }
    },
    key: 0
  },
  {
    element: {
      text: 'Chronicles of your ascent',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '28px',
        'color': '#000000'
      }
    },
    key: 1
  }
]

const C_CUSTOM2 = [
  {
    element: {
      text: 'Play game',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '36px',
        'color': '#000000',
        'background-color': '#ffa800',
        'width': '256px',
        'height': '70px',
        'border-radius': '2px'
      }
    },
    key: 3
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn717.cdn.gamenet.ru/TY0Xv85rCS/6MG9a/o_2UvGS.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
  },
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM2),
  edited: true
}

const GROUP_NAME = 'Hero'
const NAME = 'HeroBAS'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

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
        label: 'logo',
        key: 0
      },
      {
        name: 'TextElement',
        element: types.Title,
        type: 'title',
        class: 'b-title',
        label: 'title',
        key: 1
      }
    ],
    components2: [
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-button',
        label: 'button',
        key: 3
      }
    ]
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionDataStore = this.$store.state.Landing.sectionData[NAME]
    let sectionData = this.canRestore(GROUP_NAME, NAME) ? sectionDataStore : SCHEMA_CUSTOM
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, NAME, SCHEMA_CUSTOM)
  }
}
</script>

<template>
  <section
    class="b-hero"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle">
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            class="b-sandbox"
          >
            <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-hero-component"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.href"
                  :target="$sectionData.components[index].element.target"
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
        <div class="b-grid__col-12">
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            class="b-sandbox"
          >
            <draggable v-model="$sectionData.components2" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container2.styles">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-hero-component"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.href"
                  :target="$sectionData.components2[index].element.target"
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
.b-hero
  position: relative
  width: 100%
  min-height: 70rem
  margin: 0
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  .b-div
    height: 4rem
</style>
