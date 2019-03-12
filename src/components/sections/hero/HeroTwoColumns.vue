<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-hero">

  <slot name="video"/>

  <div class="b-grid">
    <div class="b-grid__row">

      <div
          v-for="(prefix, index) in prefixes"
          :key="`hero-two-column-${ _uid }-${ index }`"
          :class="{
            'b-grid__col-4': prefix === '',
            'b-grid__col-8': prefix === '2'
          }"
          class="b-grid__col-m-12">

        <sandbox
            :container-path="`$sectionData.container${ prefix }`"
            :components-path="`$sectionData.components${ prefix }`"
            :align="(prefix === '') ? 'flex-start' : 'center'"
            :direction="(prefix === '') ? 'row' : 'column'"
            :class="`b-sandbox__${ prefix || 1 }`"
            class="b-sandbox">

          <!-- eslint-disable-next-line vue/valid-v-model -->
          <draggable v-model="$sectionData[`components${ prefix }`]" :style="$sectionData[`container${ prefix }`].styles" class="b-draggable-slot">

            <div
                v-for="(component, index) in $sectionData[`components${ prefix }`]"
                v-if="$sectionData[`components${ prefix }`].length !== 0"
                :key="`component1-${ _uid }-${ index }`">

              <component class="b-hero-component"
                  v-if="component.element.isComplex"
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components${ prefix }[${index}].element`
                  }"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :class="[component.element.classes, component.class]"
                  :path="`components${ prefix }[${index}].element`"/>

              <component
                  v-else
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components${ prefix }[${index}].element`
                  }"
                  v-html="component.element.text"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :class="[component.element.classes, component.class]"
                  :path="`components${ prefix }[${index}].element`"/>

            </div>

          </draggable>

        </sandbox>

      </div>

    </div>
  </div>

</section>
</template>

<script>
import { StyleObject, Logo, Title, Text, Delimiter, Button } from '@editor/types'
import { merge } from 'lodash-es'
import section from '../../mixins/section.js'

const [name, group, cover] = ['HeroTwoColumns', 'Hero', '/img/covers/hero-two-columns.png']

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
const defaultColumnComponents1 = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn675.cdn.stg.gamenet.ru/0/7K0Jf/o_15rRBx.svg)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px'
      }
    },
    key: 0
  }
]
const defaultColumnComponents2 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '48px',
        'color': '#ffffff'
      }
    },
    key: 1
  },
  {
    element: {
      text: `
        An sincerity so extremity he additions. Her yet there truth merit.
        <span>Mrs all projecting favourable now unpleasing. Son law garden chatty temper</span>
        <span>Oh children provided to mr elegance marriage strongly.</span>
      `,
      styles: {
        'font-family': 'Lato',
        'font-size': '20px',
        'line-height': '1.5',
        'color': '#FFF'
      }
    },
    key: 2
  },
  {
    key: 8
  },
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '352px',
        'max-width': '100%',
        'height': '64px',
        'border-radius': '2px'
      }
    },
    key: 3
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn367.cdn.stg.gamenet.ru/0/7a0MG/o_1SlgxQ.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': '75% 50%'
    }
  },
  components: merge({}, defaultColumnComponents1),
  components2: merge({}, defaultColumnComponents2),
  edited: true
}

export default {
  name,
  group,
  cover,

  mixins: [section],

  $schema: {
    mainStyle: StyleObject,
    container: StyleObject,
    container2: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 }
    ],
    components2: [
      { name: 'Title', element: Title, type: 'title', class: 'b-title', label: 'title', key: 1 },
      { name: 'Description', element: Text, type: 'text', class: 'b-text', label: 'description', key: 2 },
      { name: 'Delimiter', element: Delimiter, type: 'delimiter', class: 'b-delimiter', label: 'delimiter', key: 8 },
      { name: 'Button', element: Button, type: 'button', class: 'b-button-test', label: 'button', key: 3 }
    ]
  },

  data () {
    return {
      prefixes: ['', '2']
    }
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[group]
    let sectionDataStore = this.$store.state.Landing.sectionData[name]
    let sectionData = this.canRestore(group, name) ? sectionDataStore : defaultSchema
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, group, name, defaultSchema)
  }
}
</script>

<style lang="sass" scoped>
$h: 100vh

.b-sandbox,
.b-draggable-slot
  max-width: 100%
  height: 100%

.b-sandbox
  justify-content: center
  align-items: center
  &__1
    min-height: auto

.b-draggable-slot
  padding: 1.6rem .8rem

.b-hero
  position: relative
  width: 100%
  height: max-content
  min-height: 60rem
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms

.b-delimiter
  height: 2rem
  .is-mobile &,
  .is-tablet &
    display: none
  @media only screen and (max-width: 768px)
    &
      display: none

.b-logo
  margin: 0

.b-grid__col-8
  .is-mobile &,
  .is-tablet &
    padding-top: 0
  @media only screen and (max-width: 768px)
    padding-top: 0

.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-weight: 800
  line-height: 6.7rem
  font-size: 4.8rem
  text-align: center
  letter-spacing: 0.15em
  text-transform: uppercase
  margin: 0 0 2rem
  text-shadow: 0 1.6rem 0.8rem rgba(0, 0, 0, 0.15)
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    line-height: 4rem
    padding: 0 1rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      line-height: 4rem
      padding: 0 1rem

.b-text
  color: rgba(255, 255, 255, 0.3)
  font-size: 2rem
  line-height: 4rem
  text-align: center
  .is-mobile &,
  .is-tablet &
    font-size: 1.4rem !important
    line-height: 2rem
  @media only screen and (max-width: 768px)
    &
      font-size: 1.4rem !important
      line-height: 2rem

.b-button
  .is-mobile &,
  .is-tablet &
    height: 4rem !important
    font-size: 1.4rem !important
  @media only screen and (max-width: 768px)
    &
      height: 4rem !important
      font-size: 1.4rem !important
</style>
