<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-section-header">

  <slot name="video"/>

  <div class="b-grid b-header">
    <div class="b-grid__row b-footer__row">

      <div class="b-grid__col-12 b-grid__col-m-12 mobile-header">

        <button
            id="js-hamburger"
            class="hamburger hamburger--slider"
            type="button"
            :data-target="`#mobile-menu-${ _uid }`"
            @click.stop>

          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>

        </button>

      </div>

      <div
          :id="`mobile-menu-${ _uid }`"
          class="b-grid__col-12 b-grid__col-m-12 mobile-menu">

        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="row"
            align="center"
            class="b-sandbox">

          <draggable
              v-if="$sectionData.components.length"
              v-model="$sectionData.components"
              :style="$sectionData.container.styles"
              class="b-draggable-slot b-draggable-slot_horizont">

            <div
                v-for="(component, index) in $sectionData.components"
                :key="`component-${ _uid }-${ index }`"
                :style="component.styles"
                :class="{ 'b-logo-one': isOnlyOneLogo(component) }">

              <component
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
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"
                  class="b-header-component">
                <div v-html="$sectionData.components[index].element.text"></div>
              </component>

            </div>

          </draggable>

        </sandbox>

      </div>
    </div>
  </div>

</section>
</template>

<script>
import { StyleObject, Link, Logo } from '@editor/types'
import { merge } from 'lodash-es'
import section from '../../mixins/section.js'

const [name, group, cover] = ['Header4', 'header', '/img/covers/header-4.png']
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
        'height': '50px',
        'border-radius': '2px',
        'font-size': '18px',
        'margin': '8px 16px'
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
        'height': '50px',
        'border-radius': '2px',
        'font-size': '18px',
        'margin': '8px 16px'
      }
    },
    key: 2
  },
  {
    element: {
      styles: {
        'background-image': 'url(https://gn120.cdn.stg.gamenet.ru/0/7aITH/o_1vTdxd.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '150px',
        'height': '50px',
        'margin': '8px 0'
      }
    },
    key: 0
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
        'height': '50px',
        'border-radius': '2px',
        'font-size': '18px',
        'margin': '8px 16px'
      }
    },
    key: 3
  },
  {
    element: {
      text: 'Link 4',
      styles: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'min-width': '100px',
        'height': '50px',
        'border-radius': '2px',
        'font-size': '18px',
        'margin': '8px 16px'
      }
    },
    key: 4
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
  components: merge({}, defaultComponents),
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
    container: StyleObject,
    components: [
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link', key: 1 },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link', key: 2 },
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link', key: 3 },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link', key: 4 }
    ]
  },

  computed: {
    logoSlot () {
      let elements = this.$sectionData.components || []
      let component = elements.find(element => element.name === 'Logo')
      let index = elements.findIndex(element => element.name === 'Logo')
      return (component) ? { component, index } : null
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
    isOnlyOneLogo ({ name }) {
      if (name !== 'Logo') {
        return false
      }
      let logos = this.$sectionData.components.filter(({ name }) => name === 'Logo')
      return logos.length === 1
    }
  }
}
</script>

<style lang="sass" scoped>
.b-grid__col-12
  padding: .8rem 1.6rem

.mobile-header
  padding: 0
  display: none
  .is-mobile &
    display: block
  @media (max-width: 800px)
    display: block
.b-logo
  .is-mobile &
    background-position: center !important
  @media (max-width: 800px)
    background-position: center !important

.b-logo-one
  .is-mobile &
    margin-top: auto !important
    order: 1
  @media (max-width: 800px)
    margin-top: auto !important
    order: 1
</style>
