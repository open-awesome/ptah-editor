<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'

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
    },
    key: 0
  },
  {
    element: {
      text: 'This is a header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '2.4rem',
        'color': '#ffffff'
      }
    },
    key: 1
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
    },
    key: 2
  },
  {
    key: 3
  },
  {
    element: {
      text: 'Secondary',
      styles: {
        'background-color': 'rgba(255, 125, 125, 0.5)',
        'color': '#ffffff',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    },
    key: 4
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
    class: 'b-logo',
    label: 'logo',
    key: 0
  },
  {
    name: 'Title',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title',
    key: 1
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description',
    key: 2
  },
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter',
    key: 3
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test',
    label: 'button',
    key: 4
  }
]

const GROUP_NAME = 'ThreeColumns'
const NAME = 'ThreeColumns'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/columns3.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    header: types.Title,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: _.merge([], COMPONENTS, [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }]),
    components2: _.merge([], COMPONENTS, [{ key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]),
    components3: _.merge([], COMPONENTS, [{ key: 10 }, { key: 11 }, { key: 12 }, { key: 13 }, { key: 14 }])
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
    class="b-columns3"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <h2 class="b-header"
            v-html="$sectionData.header.text"
            v-styler:for="{ el: $sectionData.header, path: `$sectionData.header` }"
            :style="$sectionData.header.styles"
            >
        </h2>
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-4 b-grid__col-m-12 ">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            :style="$sectionData.container.styles"
            >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div :class="`b-draggable-slot__${component.type}`"  v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-columns3-component"
                  v-if="$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  >
                </component>
                <component class="b-columns3-component"
                  v-if="!$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                  v-html="$sectionData.components[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-4 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            :style="$sectionData.container2.styles"
            >
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div :class="`b-draggable-slot__${component.type}`"  v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-columns3-component"
                  v-if="$sectionData.components2[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: $sectionData.components2[index].label }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  >
                </component>
                <component class="b-columns3-component"
                  v-if="!$sectionData.components2[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: $sectionData.components2[index].label }"
                  v-html="$sectionData.components2[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-4 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container3"
            components-path="$sectionData.components3"
            direction="column"
            :style="$sectionData.container3.styles"
            >
            <draggable v-model="$sectionData.components3" class="b-draggable-slot" :style="$sectionData.container3.styles">
              <div :class="`b-draggable-slot__${component.type}`"  v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
                <component class="b-columns3-component"
                  v-if="$sectionData.components3[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: $sectionData.components3[index].label }"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.link.href"
                  :target="$sectionData.components3[index].element.link.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  >
                </component>
                <component class="b-columns3-component"
                  v-if="!$sectionData.components3[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: $sectionData.components3[index].label }"
                  v-html="$sectionData.components3[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.link.href"
                  :target="$sectionData.components3[index].element.link.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
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
  .is-mobile &,
  .is-tablet &
    width: 100% !important
  @media only screen and (max-width: 992px)
    &
      width: 100% !important
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
  box-sizing: border-box
  border-radius: 0.2rem
  .is-tablet &,
  .is-mobile &
    width: 100% !important
  @media only screen and (max-width: 992px)
    &
      width: 100% !important
.b-sandbox
  min-height: 20rem
  display: flex
  justify-content: center
  align-items: center

.b-draggable-slot,
.b-draggable-slot
  & > div
    max-width: 100%
    max-height: 100%
    & > div,
    & > a
      .is-mobile &,
      .is-tablet &
        margin: 1.2rem 0 !important
      @media only screen and (max-width: 992px)
        &
          margin: 1.2rem 0 !important
  &__image,
  &__logo,
  &__slogan,
  &__button
    .is-mobile &,
    .is-tablet &
      width: 100% !important
    @media only screen and (max-width: 992px)
      &
        width: 100% !important
</style>
