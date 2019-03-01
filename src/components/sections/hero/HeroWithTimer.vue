<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'

const GROUP_NAME = 'Hero'
const NAME = 'HeroWithTimer'
const BG_SECTION = 'url(https://gn269.cdn.stg.gamenet.ru/0/7o9OH/o_l6SvX.jpg)'

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
    name: 'Timer',
    element: types.Timer,
    type: 'timer',
    class: 'b-timer',
    label: 'Timer',
    key: 9
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button',
    label: 'button',
    key: 3
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn860.cdn.stg.gamenet.ru/0/7o9P9/o_KucA7.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '600px',
        'height': '124px'
      }
    },
    key: 0
  },
  {
    element: {
      text: 'Excellent title',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '5.6rem',
        'color': '#ffffff'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'This is a short description',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '2rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    },
    key: 2
  },
  {
    key: 9
  },
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': 'rgb(139, 1, 1)',
        'color': '#ffffff',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'font-size': '2rem',
        'width': '352px',
        'height': '64px',
        'border-radius': '2px'
      }
    },
    key: 3
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll'
    },
    classes: ['full-height']
  },
  components: _.merge([], C_CUSTOM),
  container: {},
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/hero-with-timer.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS
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
    class="b-hero-with-timer"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
              container-path="$sectionData.container"
              components-path="$sectionData.components"
              direction="column"
              class="b-sandbox">

            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-if="$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  :path="`components[${index}].element`"
                  >
                </component>
                <component
                  v-if="!$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  v-html="$sectionData.components[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  :path="`components[${index}].element`"
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
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-hero-with-timer
  position: relative

  width: 100%
  min-height: $size-step*1.75
  margin: 0
  padding-bottom: $size-step/4

  text-align: center

  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

  transition: background 200ms
  .is-mobile &,
  .is-tablet &
    position: relative
    height: auto
    padding: $size-step/2 0 $size-step/4
  @media only screen and (max-width: 768px)
    &
      position: relative
      height: auto
      padding: 2rem 0 1rem
.b-logo
  .is-mobile &
    max-width: $size-step*7.5 !important
  @media only screen and (max-width: 768px)
    &
      max-width: $size-step*7.5 !important
.b-title
  color: rgba($white, 1)
  font-style: normal
  font-weight: 800
  font-size: 3.2rem
  text-align: center
  letter-spacing: 0.2em
  text-transform: uppercase
  text-shadow: 0 1.6rem 0.8rem rgba($black, 0.15)
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    padding: 0 1rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      padding: 0 1rem
.b-text
  color: rgba($white, 0.3)
  font-size: 2rem
  text-align: center
  .is-mobile &,
  .is-tablet &
    font-size: 1.4rem !important
  @media only screen and (max-width: 768px)
    &
      font-size: 1.4rem !important
.b-button
  color: #fff
  font-family: 'PT Serif'
  font-style: normal
  font-size: 1.6rem
  text-align: center
  letter-spacing: 0.2em
  text-transform: uppercase

  width: auto
  height: auto
  background-color: rgb(255, 109, 100)
  box-shadow: none
  margin: $size-step/2
  padding: 0
  width: $size-step*10
  height: $size-step
  min-width: auto
  min-height: auto

  background-color: rgb(255, 109, 100)
  box-shadow: none
  border-radius: 2px

.b-sandbox
  min-height: $size-step*10
  padding: $size-step/2 0
  width: 100%
  .is-mobile &,
  .is-tablet &
    padding: $size-step/4 0
  @media only screen and (max-width: 768px)
    &
      padding: $size-step/4 0

/deep/
  .b-draggable-slot
    width: 100%
    display: flex
    text-align: center
    justify-content: center
    align-items: flex-start
    flex-direction: column

</style>
