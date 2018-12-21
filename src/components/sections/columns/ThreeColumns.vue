<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn560.cdn.stg.gamenet.ru/0/7KUKv/o_6j0hJ.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '256px',
        'height': '221px'
      }
    }
  },
  {
    element: {
      text: 'This is a header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '2.4rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions.' +
      '<div>Her yet there truth merit.</div>' +
      '<div>Mrs all projecting favourable now unpleasing.</div>',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  {},
  {
    element: {
      text: 'Secondary',
      styles: {
        'background-color': 'transparent',
        'color': '#ffffff',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'none',
      'background-color': '#151C44'
    }
  },
  header: {
    text: 'This is a short header',
    styles: {
      'font-family': 'Montserrat',
      'font-size': '3.2rem',
      'color': '#ffffff'
    }
  },
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM),
  components3: _.merge({}, C_CUSTOM),
  edited: true
}

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo'
  },
  {
    name: 'Title',
    element: types.Title,
    type: 'text',
    class: 'b-title'
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text'
  },
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test'
  }
]

export default {
  name: 'ThreeColumns',
  components: {
    Draggable
  },
  cover: '/img/covers/columns3.jpg',
  group: 'Three Columns',
  $schema: {
    mainStyle: types.StyleObject,
    header: types.Title,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: COMPONENTS,
    components2: COMPONENTS,
    components3: COMPONENTS
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
    },
    onAddElement2 (element) {
      element.element.removable = true
      this.$section.data.components2.push(element)
    },
    onAddElement3 (element) {
      element.element.removable = true
      this.$section.data.components3.push(element)
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
  <section
    class="b-columns3"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <div class="b-grid">
      <div class="b-grid__row">
        <h2 class="b-header"
            v-html="$sectionData.header.text"
            v-styler:for="{ el: $sectionData.header, path: `$sectionData.header`}"
            :style="$sectionData.header.styles"
            >
        </h2>
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-4 b-grid__col-m-12 ">
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container"
            direction="column"
            :style="$sectionData.container.styles"
            >
            <elements-list @addEl="onAddElement"></elements-list>
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-columns3-component"
                  v-if="$sectionData.components[index].element.isComplex"
                  :is="component.name"
                  :href="$sectionData.components[index].element.href"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
                  >
                </component>
                <component class="b-columns3-component"
                  v-if="!$sectionData.components[index].element.isComplex"
                  :is="component.name"
                  :href="$sectionData.components[index].element.href"
                  v-html="$sectionData.components[index].element.text"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-4 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container2"
            direction="column"
            :style="$sectionData.container2.styles"
            >
            <elements-list @addEl="onAddElement2"></elements-list>
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-columns3-component"
                  v-if="$sectionData.components2[index].element.isComplex"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.href"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                  >
                </component>
                <component class="b-columns3-component"
                  v-if="!$sectionData.components2[index].element.isComplex"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.href"
                  v-html="$sectionData.components2[index].element.text"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-4 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container3"
            direction="column"
            :style="$sectionData.container3.styles"
            >
            <elements-list @addEl="onAddElement3"></elements-list>
            <draggable v-model="$sectionData.components3" class="b-draggable-slot" :style="$sectionData.container3.styles">
              <div v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
                <component class="b-columns3-component"
                  v-if="$sectionData.components3[index].element.isComplex"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.href"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
                  >
                </component>
                <component class="b-columns3-component"
                  v-if="!$sectionData.components3[index].element.isComplex"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.href"
                  v-html="$sectionData.components3[index].element.text"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
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
$h: 100vh
.b-columns3
  position: relative
  width: 100%
  min-height: 76rem
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &-component
    margin: 1.2rem
.b-header
  width: 100%
  color: rgb(255, 255, 255)
  font-style: normal
  font-weight: 800
  font-size: 4.8rem
  text-align: center
  letter-spacing: 0.15em
  text-transform: uppercase
  margin: 0 0 2rem
  text-shadow: 0 .4rem 1.9rem rgba(0, 0, 0, 0.9)
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    line-height: 4rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      line-height: 4rem
.b-delimiter
  height: 2rem
  .is-mobile &,
  .is-tablet &
    display: none
  @media only screen and (max-width: 768px)
    &
      display: none
.b-logo
  margin: 0 0 4rem
.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-size: 2.4rem
  font-weight: 400
  text-align: center
  letter-spacing: 0.15em
  text-transform: uppercase
  margin: 0 0 2rem
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
.b-text
  color: rgba(255, 255, 255, 0.3)
  font-size: 1.6rem
  text-align: center
  .is-mobile &,
  .is-tablet &
    font-size: 1.4rem !important
  @media only screen and (max-width: 768px)
    &
      font-size: 1.4rem !important
.b-button
  color: #fff
  font-family: Lato
  font-style: normal
  font-size: 1.4rem
  text-align: center
  letter-spacing: 0.28em
  text-transform: uppercase
  width: 22.4rem
  height: 5.6rem
  border: 0.2rem solid rgba(255, 125, 125, 0.5)
  box-sizing: border-box
  border-radius: 0.2rem
  .is-mobile &,
  .is-tablet &
    width: 80%
  @media only screen and (max-width: 768px)
    &
      width: 80%
.b-sandbox
  min-height: 20rem
  display: flex
  justify-content: center
  align-items: center
</style>
