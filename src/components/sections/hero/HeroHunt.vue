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
        'font-size': '32px',
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
  components: _.merge({}, C_CUSTOM),
  edited: true
}

const GROUP_NAME = 'Hero'
const NAME = 'HeroHunt'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

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
        name: 'Title',
        element: types.Title,
        type: 'title',
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
    class="b-hunt"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-6">
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            class="b-sandbox b-hunt-sandbox"
          >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-hero-component"
                  v-if="$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.href"
                  :target="$sectionData.components[index].element.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                >
                </component>
                <component class="b-hero-component"
                  v-if="!$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  v-html="$sectionData.components[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components[index].element.href"
                  :target="$sectionData.components[index].element.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-6">
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

/deep/
  .b-draggable-slot
    width: 100%
    display: flex
    text-align: center
    justify-content: flex-start
    align-items: flex-start
    flex-direction: column
    .is-mobile & > div,
    .is-tablet & > div
      width: 100%
    @media only screen and (max-width: 768px)
      & > div
        width: 100%
</style>
