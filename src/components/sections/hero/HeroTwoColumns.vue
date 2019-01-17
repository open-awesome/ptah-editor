<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-hero">

  <slot name="video"/>

  <div class="b-grid">
    <div class="b-grid__row">

      <!-- column 1 -->
      <div class="b-grid__col-4 b-grid__col-m-12">
        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            align="flex-start"
            class="b-sandbox">
          <draggable
              v-model="$sectionData.components"
              :style="$sectionData.container.styles"
              class="b-draggable-slot">
            <div
                v-for="(component, index) in $sectionData.components"
                v-if="$sectionData.components.length !== 0"
                :key="`component1-${ _uid }-${ index }`">

              <component class="b-hero-component"
                  v-if="component.element.isComplex"
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components[${index}].element`
                  }"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"/>

              <component
                  v-else
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components[${index}].element`
                  }"
                  v-html="component.element.text"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"/>

            </div>
          </draggable>
        </sandbox>
      </div>

      <!-- column 2 -->
      <div class="b-grid__col-8 b-grid__col-m-12">
        <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            class="b-sandbox">
          <draggable
              v-model="$sectionData.components2"
              :style="$sectionData.container2.styles"
              class="b-draggable-slot">
            <div
                v-for="(component, index) in $sectionData.components2"
                v-if="$sectionData.components2.length !== 0"
                :key="`component1-${ _uid }-${ index }`">

              <component class="b-hero-component"
                  v-if="component.element.isComplex"
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components2[${index}].element`
                  }"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :class="[component.element.classes, component.class]"
                  :path="`components2[${index}].element`"/>

              <component
                  v-else
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components2[${index}].element`
                  }"
                  v-html="component.element.text"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :class="[component.element.classes, component.class]"
                  :path="`components2[${index}].element`"/>

            </div>
          </draggable>
        </sandbox>
      </div>

    </div>
  </div>

</section>
</template>

<script>
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'
import { StyleObject, Logo, Title, Text, Delimiter, Button } from '@editor/types'
import { mapActions } from 'vuex'
import { merge, forEach, find, after, cloneDeep } from 'lodash-es'

const [name, group, cover] = ['HeroTwoColumns', 'Hero', '/img/covers/hero-two-columns.png']
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
    }
  }
]
const defaultColumnComponents2 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4.8rem',
        'color': '#ffffff'
      }
    }
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
        'font-size': '2rem',
        'line-height': '1.5',
        'color': '#FFF'
      }
    }
  },
  {},
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
    }
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

  $schema: {
    mainStyle: StyleObject,
    container: StyleObject,
    container2: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo' }
    ],
    components2: [
      { name: 'Title', element: Title, type: 'title', class: 'b-title', label: 'title' },
      { name: 'Description', element: Text, type: 'text', class: 'b-text', label: 'description' },
      { name: 'Delimiter', element: Delimiter, type: 'delimiter', class: 'b-delimiter', label: 'delimiter' },
      { name: 'Button', element: Button, type: 'button', class: 'b-button-test', label: 'button' }
    ]
  },

  components: { Draggable },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  computed: {
    canRestore () {
      let { groups, sectionData } = this.$store.state.Landing
      return ~groups.indexOf(group) && Boolean(sectionData[name])
    }
  },

  created () {
    this.seedData()
    this.setGroupDataText()
  },

  updated () {
    this.storeData.call(this)
  },

  methods: {
    ...mapActions('Landing', ['updateGroupData', 'updateSectionData']),

    seedData () {
      if (this.$sectionData.edited === undefined) {
        let data = (this.canRestore) ? this.section : defaultSchema
        Seeder.seed(merge(this.$sectionData, data))
      }
    },

    setGroupDataText () {
      let groupData = this.$store.state.Landing.groupData[group]
      forEach(groupData, (text, name) => {
        let component = find(this.$sectionData.components, { name })
        if (component) {
          component.element.text = text
        }
      })
    },

    storeData: after(2, function () {
      let groupData = this.$sectionData.components.map(({ name, element }) => ({ [name]: element.text }))
      let sectionData = cloneDeep(this.$sectionData)
      this.updateGroupData({ name, data: groupData })
      this.updateSectionData({ name, data: sectionData })
    })
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
  min-height: 20rem
  justify-content: center
  align-items: center

.b-draggable-slot
  padding: 1.6rem .8rem

.b-hero
  position: relative
  width: 100%
  min-height: 60rem
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &-component
    margin: 1.2rem
  .is-mobile &,
  .is-tablet &
    background-position: 25% 50% !important
  @media only screen and (max-width: 768px)
    &
      background-position: 25% 50% !important

.b-delimiter
  height: 2rem
  .is-mobile &,
  .is-tablet &
    display: none
  @media only screen and (max-width: 768px)
    &
      display: none

.b-logo
  margin: 0 0 5.5rem

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
  color: #fff
  font-family: Lato
  font-style: normal
  font-weight: bold
  font-size: 1.6rem
  text-align: center
  letter-spacing: 0.28em
  text-transform: uppercase
  width: 35.2rem
  height: 6.4rem
  background: #FF6D64
  box-shadow: 0 2.4rem 4.4rem rgba(0, 0, 0, 0.15)
  .is-mobile &,
  .is-tablet &
    width: 80% !important
    height: 4rem !important
    font-size: 1.4rem !important
  @media only screen and (max-width: 768px)
    &
      width: 80% !important
      height: 4rem !important
      font-size: 1.4rem !important
</style>
