<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-section-header">

  <slot name="video"/>
  <slot name="overlay"/>

  <div class="b-grid b-header">

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

    <div class="b-grid__row b-footer__row">
      <div class="b-grid__col-3 b-grid__col-m-12 mobile-header">

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
                :style="component.styles">

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
      <div :id="`mobile-menu-${ _uid }`" class="b-grid__col-9 b-grid__col-m-12 mobile-menu">

        <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="row"
            align="center"
            class="b-sandbox">

          <draggable
              v-if="$sectionData.components2.length"
              v-model="$sectionData.components2"
              :style="$sectionData.container2.styles"
              class="b-draggable-slot b-draggable-slot_horizont">

            <div
                v-for="(component, index) in $sectionData.components2"
                :key="`component-${ _uid }-${ index }`"
                :style="component.styles"
                :class="{ 'b-button-one': isOnlyOneButton(component) }">

              <component
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
                  class="b-header-component">
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

<script>
import { StyleObject, Logo, Button } from '@editor/types'
import { merge } from 'lodash-es'
import section from '../../mixins/section.js'

const [name, group, cover] = ['Header1', 'header', '/img/covers/header-1.png']
const defaultComponents = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn120.cdn.stg.gamenet.ru/0/7aITH/o_1vTdxd.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '150px',
        'height': '50px',
        'margin': '8px 16px'
      }
    },
    key: 0
  }
]
const defaultComponents2 = [
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
        'margin': '8px 16px',
        'width': 'auto'
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
        'margin': '8px 16px',
        'width': 'auto'
      }
    },
    key: 2
  },
  {
    styles: { marginLeft: 'auto' },
    element: {
      text: 'Button',
      styles: {
        'background-color': '#FF6D64',
        'background-image': 'none',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '150px',
        'height': '50px',
        'max-width': '100%',
        'border-radius': '2px',
        'margin': '8px 16px'
      }
    },
    key: 5
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
  components2: merge({}, defaultComponents2),
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
    container2: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 }
    ],
    components2: [
      { name: 'Link', element: Button, type: 'button', class: 'b-link', label: 'link', key: 1 },
      { name: 'Link', element: Button, type: 'button', class: 'b-link', label: 'link', key: 2 },
      { name: 'Button', element: Button, type: 'button', class: 'b-button', label: 'button', key: 5 }
    ]
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[group]
    let sectionDataStore = this.$store.state.Landing.sectionData[name]
    let sectionData = this.canRestore(group, name) ? sectionDataStore : defaultSchema
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, group, name, defaultSchema)
  },

  methods: {
    isOnlyOneButton ({ name }) {
      if (name !== 'Button') {
        return false
      }
      let buttons = this.$sectionData.components2.filter(({ name }) => name === 'Button')
      return buttons.length === 1
    }
  }
}
</script>

<style lang="sass" scoped>
.b-grid__col-3,
.b-grid__col-9
  padding: .8rem 1.6rem

.b-button-one
  margin-left: auto
  .is-mobile &
    margin-top: auto !important
    order: 1
  @media (max-width: 800px)
    margin-top: auto !important
    order: 1
</style>
