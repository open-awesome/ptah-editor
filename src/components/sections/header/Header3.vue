<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-section-header">

  <slot name="video"/>

  <div class="b-grid b-header js-hamburger">
    <div class="b-grid__row b-footer__row">
      <div class="b-grid__col-12 b-grid__col-m-12 hamburger-container">

        <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="row"
            align="center"
            class="b-sandbox hamburger-container__menu">

          <draggable
              v-if="$sectionData.components2.length"
              v-model="$sectionData.components2"
              :style="$sectionData.container2.styles"
              class="b-draggable-slot">

            <div
                v-for="(component, index) in $sectionData.components"
                :key="`component-${ _uid }-${ index }`"
                :style="component.styles">

              <component
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
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components2[${index}].element`"
                  class="b-header-component"/>

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
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components2[${index}].element`"
                  class="b-header-component"/>

            </div>

          </draggable>

          <base-button @click="showMenu" class="hamburger-button" color="transparent">
            <div class="hamburger-box">
              <span class="hamburger-inner"></span>
              <span class="hamburger-inner"></span>
              <span class="hamburger-inner"></span>
            </div>
          </base-button>

        </sandbox>

      </div>
    </div>
  </div>

</section>
</template>

<script>
import { StyleObject, Link } from '@editor/types'
import { merge } from 'lodash-es'
import section from '../../mixins/section.js'

const [name, group, cover] = ['Header3', 'header', '/img/covers/header-3.png']
const defaultComponents = [
  {
    element: {
      text: 'Link 1',
      styles: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'min-width': '100px',
        'height': '64px',
        'border-radius': '2px',
        'font-size': '18px'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'Link 2',
      styles: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'min-width': '100px',
        'height': '64px',
        'border-radius': '2px',
        'font-size': '18px'
      }
    },
    key: 2
  },
  {
    element: {
      text: 'Link 3',
      styles: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'min-width': '100px',
        'height': '64px',
        'border-radius': '2px',
        'font-size': '18px'
      }
    },
    key: 3
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn819.cdn.stg.gamenet.ru/0/7L5P8/o_Dyakc.png)',
      'background-color': '#151C44',
      'background-position': 'center',
      'background-size': 'cover'
    }
  },
  components2: merge({}, defaultComponents),
  edited: true
}

export default {
  name,
  group,
  cover,

  mixins: [section],

  $schema: {
    isHeader: true,
    mainStyle: StyleObject,
    container2: StyleObject,
    components2: [
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link', key: 1 },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link', key: 2 },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link', key: 3 }
    ]
  },

  inject: ['device'],

  watch: {
    'device.type' () {
      this.$el.querySelector('.hamburger-container').classList.remove('active')
      this.$el.querySelector('.hamburger-button').classList.remove('active')
    }
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[group]
    let sectionDataStore = this.$store.state.Landing.sectionData[name]
    let sectionData = this.canRestore(group, name) ? sectionDataStore : defaultSchema
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, group, name, defaultSchema)
  },

  methods: {
    showMenu () {
      this.$el.querySelector('.hamburger-container').classList.toggle('active')
      this.$el.querySelector('.hamburger-button').classList.toggle('active')
    }
  }
}
</script>

<style lang="sass" scoped>
.b-sandbox
  min-height: 10rem

.b-draggable-slot
  width: 100%

.is-mobile .hamburger-container,
.is-tablet .hamburger-container
  display: flex !important
  .b-draggable-slot
    display: none
    position: relative
    top: 8rem
    padding-bottom: 8rem
  &.active .b-draggable-slot
    display: flex

@media only screen and (max-width: 1100px)
  .hamburger-container
    display: flex !important
    .b-draggable-slot
      display: none
      position: relative
      top: 8rem
      padding-bottom: 8rem
    &.active .b-draggable-slot
      display: flex
</style>
