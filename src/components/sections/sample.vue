<script>
import * as types from '@editor/types'
import merge from 'lodash-es/merge'
import Seeder from '@editor/seeder'
import defaults from '../mixins/defaults'
import sectionMedia from '../mixins/sectionMedia'

export default {
  /**
   * Name, the group that the section belongs to, the cover and a short description
   * This information is used in the left panel of the editor
   */
  name: 'SampleSection',
  group: 'Elements',
  cover: '',
  description: 'Description for section',

  /**
   * The mixins are required for the section to function
   */
  mixins: [defaults, sectionMedia],

  /**
   * The section's schema
   * mainStyle - the object that describes the section
   * container - the object that describes the section's slot
   * components - the array of elements inside the slot
   *
   * This example has 1 slot with a header, that is an element of a 'text' type
   * The full list of available elements can be located in the component src/components/slots/ElementsList.vue
   *
   * The default values of all schema's parts are set in Seeder
   *
   * As the section instantiates, this data will be available via $sectionData
   */
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: [
      {
        name: 'TextElement',
        element: types.Text,
        type: 'text',
        class: 'b-title',
        label: 'title'
      }
    ]
  },

  created () {
    /**
     * Defining custom styles for the section
     */
    const SCHEMA_CUSTOM = {
      mainStyle: {
        styles: {
          'background-color': '#000'
        }
      },
      components: merge({}, [
        {
          element: {
            text: '<p><b>Section title</b></p>',
            styles: {
              'font-family': 'Montserrat',
              'font-size': '4rem',
              'color': 'white'
            },
            media: {
              'is-mobile': {
                'font-size': '3rem'
              }
            }
          }
        }
      ]),
      container: {
        width: 9 // The width of the slot inside the section (in coloumns, can be 1 to 12)
      },
      edited: true // This flag is required
    }

    /**
     * Stylng all section's components
     */
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }

    /**
     * These properties are available inside the component:
     *
     * $section - the instance of src/editor/section.js class that describes this component
     * $builder - the instance of the class that contains all sections of the landing page
     * $sectionData - Is a computed property that mirrors $section.data which contains the current
     * values (text, images, etc...) for the section.
     */
  }
}
</script>

<template>
  <!--
    The v-styler directive takes the path to the editable element so that elements' and styles' settings are editable
   -->
  <section
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <!-- menu, video, overlay - are required for settings and styles to function -->
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
          <!--
            The <sandbox> component describes a "slot" that contains elements.
            This particular section contains just a single text element.
            Sandbox takes 2 parameters - the path to the container and components described in the schema ($schema).
           -->
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            class="b-sandbox">

            <!-- <draggable> Is required for the drag'n'drop to function inside of the slot 
-->
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <!--
                Enumerating the elements and displaying them using meta-component <component>
                It requires all parameters and the v-styler directive that are described below
               -->
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-hero-component"
                   v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                   :is="component.name"
                   :href="$sectionData.components[index].element.link.href"
                   :target="$sectionData.components[index].element.link.target"
                   :path="`components[${index}].element`"
                   :style="$sectionData.components[index].element.styles"
                   :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                >
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

<style lang="sass" scoped>
</style>
