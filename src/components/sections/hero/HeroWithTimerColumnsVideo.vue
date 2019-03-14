<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'

const GROUP_NAME = 'Hero'
const NAME = 'HeroWithTimerColumnsVideo'
const BG_SECTION = 'url(https://gn728.cdn.stg.gamenet.ru/0/7oAt2/o_1A6qDa.jpg)'

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
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter',
    key: 8
  },
  {
    name: 'VideoElement',
    element: types.VideoElement,
    type: 'video',
    class: 'b-video',
    label: 'video',
    key: 5
  }
]

const COMPONENTS_2 = [
  {
    name: 'TextElement',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title',
    key: 1
  },
  {
    name: 'TextElement',
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
    key: 10
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
        'background-image': 'url(https://gn710.cdn.stg.gamenet.ru/0/7oAyH/o_2HZnCR.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '224px',
        'height': '124px'
      }
    },
    key: 0
  },
  {
    element: {
      styles: {
        'height': '276px'
      }
    },
    key: 8
  },
  {
    element: {
      src: 'https://gn553.cdn.stg.gamenet.ru/0/7aJD3/o_1Od7Vf.mp4'
    },
    key: 5
  }
]

const C_CUSTOM_2 = [
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
    element: {
      styles: {
        'height': '132px'
      }
    },
    key: 10
  },
  {
    key: 9
  },
  {
    element: {
      text: 'Play Now',
      styles: {
        'background-color': 'rgba(159,104,5,1)',
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
  components2: _.merge([], C_CUSTOM_2),
  container: {},
  container2: {},
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/hero-with-timer-columns-video.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: COMPONENTS,
    components2: COMPONENTS_2
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
    class="b-hero-with-timer-two-columns"
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
              class="b-sandbox">
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  :path="`components[${index}].element`"
                  >
                  <div v-html="$sectionData.components[index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-6">
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            class="b-sandbox">
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  :path="`components2[${index}].element`"
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
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-hero-with-timer-two-columns
  position: relative

  width: 100%
  min-height: $size-step*1.75*10
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
  align-items: flex-start
  min-height: $size-step*5
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
