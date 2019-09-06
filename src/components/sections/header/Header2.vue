<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-section-header">

  <slot name="menu"/>
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

      <div class="b-grid__col-4 b-grid__col-m-12 mobile-header">

        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            align="flex-start"
            class="b-sandbox">

          <draggable
              v-model="$sectionData.components"
              :style="$sectionData.container.styles"
              class="b-draggable-slot b-draggable-slot_horizont b-draggable-slot_header"
              @start="drag('components')" @change="dragStop"
            >

            <div
                v-for="(component, index) in $sectionData.components"
                :key="`component-${ _uid }-${ index }`"
                v-if="$sectionData.components.length"
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

      <div :id="`mobile-menu-${ _uid }`" class="b-grid__col-8 b-grid__col-m-12 mobile-menu">

        <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="row"
            align="center"
            class="b-sandbox">

          <draggable
              v-model="$sectionData.components2"
              :style="$sectionData.container2.styles"
              class="b-draggable-slot b-draggable-slot_horizont"
              @start="drag('components2')" @change="dragStop"
            >

            <div
                v-for="(component, index) in $sectionData.components2"
                :key="`component-${ _uid }-${ index }`"
                v-if="$sectionData.components2.length"
                :style="component.styles">

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
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const [name, group, cover] = ['Header2', 'header', '/img/covers/header-2.png']
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
        'background-color': 'transparent',
        'background-image': 'none',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '100px',
        'height': '50px',
        'border-radius': '2px',
        'font-size': '1.8rem',
        'margin': '8px 16px'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'Link 2',
      styles: {
        'background-color': 'transparent',
        'background-image': 'none',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '100px',
        'height': '50px',
        'border-radius': '2px',
        'font-size': '1.8rem',
        'margin': '8px 16px'
      }
    },
    key: 2
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
  mixins: [defaults],

  $schema: {
    isHeader: true,
    mainStyle: StyleObject,
    container: StyleObject,
    container2: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 }
    ],
    components2: [
      { name: 'Button', element: Button, type: 'button', class: 'b-link', label: 'link', key: 1 },
      { name: 'Button', element: Button, type: 'button', class: 'b-link', label: 'link', key: 2 }
    ]
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, defaultSchema))
    }
  }
}
</script>

<style lang="sass" scoped>
.b-section-header
  .is-tablet &,
  .is-mobile &
    text-align: left

  @media (max-width: 800px)
    text-align: left
.b-grid__col-4,
.b-grid__col-8
  padding: .8rem 1.6rem

.b-grid__col-8 .b-draggable-slot
  justify-content: center
  padding-left: 4rem

  .is-tablet &,
  .is-mobile &
    padding-left: 0

  @media (max-width: 800px)
    padding-left: 0

.b-draggable-slot_header
  .is-tablet &,
  .is-mobile &
    padding: 0
  @media (max-width: 800px)
    padding: 0

.b-logo
  .is-tablet &,
  .is-mobile &
    margin: 0 !important

  @media (max-width: 800px)
    margin: 0 !important
</style>
