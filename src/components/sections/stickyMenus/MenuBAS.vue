<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'

const C_CUSTOM_LINKS = [
  {
    element: {
      text: 'Main',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    },
    key: 0
  },
  {
    element: {
      text: 'About',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'News',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    },
    key: 2
  },
  {
    element: {
      text: 'Support',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    },
    key: 3
  }
]

const C_CUSTOM_LOGO = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn416.cdn.gamenet.ru/TY0Xv85rCS/6MFzT/o_2eSur.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '23px'
      }
    },
    key: 4
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#303030'
    }
  },
  components: _.merge({}, C_CUSTOM_LINKS),
  components2: _.merge({}, C_CUSTOM_LOGO),
  edited: true
}

const GROUP_NAME = 'Sticky menu'
const NAME = 'MenuBAS'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: [
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link',
        key: 0
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link',
        key: 1
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link',
        key: 2
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link',
        key: 3
      }
    ],
    components2: [
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image',
        class: 'b-menu-logo',
        key: 4
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
  <section class="b-menu is-editable"
     :class="$sectionData.mainStyle.classes"
     :style="$sectionData.mainStyle.styles"
     v-styler:section="$sectionData.mainStyle">
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-4 b-menu-col">
          <!-- logo -->
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="row"
            class="b-sandbox"
          >
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-hero-component"
                           v-if="$sectionData.components2[index].element.isComplex"
                           v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                           :is="component.name"
                           :href="$sectionData.components2[index].element.href"
                           :target="$sectionData.components2[index].element.target"
                           :path="`components[${index}].element`"
                           :style="$sectionData.components2[index].element.styles"
                           :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                >
                </component>
                <component class="b-hero-component"
                           v-if="!$sectionData.components2[index].element.isComplex"
                           v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                           v-html="$sectionData.components2[index].element.text"
                           :is="component.name"
                           :href="$sectionData.components2[index].element.href"
                           :target="$sectionData.components2[index].element.target"
                           :path="`components2[${index}].element`"
                           :style="$sectionData.components2[index].element.styles"
                           :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>

        <div class="b-grid__col-8 b-menu-col">
          <!-- links -->
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="row"
            class="b-sandbox"
          >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-hero-component"
                           v-if="$sectionData.components[index].element.isComplex"
                           v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
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
                           v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
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
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
$height: 40px
.b-menu
  height: $height
  position: fixed
  top: 0
  width: 100%
  display: flex
  justify-content: center
  z-index: 2
  &-link
    text-transform: uppercase
    text-decoration: underline
    &:hover
      color: #FFFFFF
      text-decoration: none
  &-logo
    margin: 0
  &-col
    padding-top: 0 !important
    padding-bottom: 0 !important
  &.is-editable
    top: 7.2rem
  /deep/
    .b-sandbox
      min-height: 0px
.b-grid__col-8 .b-sandbox
  justify-content: flex-end
  height: $height
.b-grid__col-4 .b-sandbox
  justify-content: flex-start
  height: $height
</style>
9223730676
