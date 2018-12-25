<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'

const C_CUSTOM_LINKS = [
  {
    element: {
      text: 'Main',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    }
  },
  {
    element: {
      text: 'About',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    }
  },
  {
    element: {
      text: 'News',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    }
  },
  {
    element: {
      text: 'Support',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '10px',
        'color': '#e1c543'
      }
    }
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
    }
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

export default {
  name: 'MenuBAS',

  group: 'Sticky menu',

  components: {
    Draggable
  },

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: [
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link'
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link'
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link'
      },
      {
        name: 'Link',
        element: types.Link,
        type: 'button',
        class: 'b-menu-link'
      }
    ],
    components2: [
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image',
        class: 'b-menu-logo'
      }
    ]
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  methods: {
    onAddElement (element) {
      element.element.removable = true
      this.$section.data.components.push(element)
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
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
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container2"
            direction="row"
          >
            <elements-list @addEl="onAddElement"></elements-list>
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
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container"
            direction="row"
          >
            <elements-list @addEl="onAddElement"></elements-list>
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
