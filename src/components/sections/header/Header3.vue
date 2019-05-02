<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-section-header">

  <slot name="video"/>
  <slot name="overlay"/>

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

      <div :id="`mobile-menu-${ _uid }`" class="b-grid__col-12 b-grid__col-m-12 mobile-menu">

        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="row"
            align="center"
            class="b-sandbox hamburger-container__menu">

          <draggable
              v-if="$sectionData.components.length"
              v-model="$sectionData.components"
              :style="$sectionData.container.styles"
              class="b-draggable-slot  b-draggable-slot_horizont">

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

    </div>
  </div>

</section>
</template>

<script>
import { StyleObject, Button } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

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
        'margin': '8px 16px',
        'width': 'auto'
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
  components: merge({}, defaultComponents),
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
    components: [
      { name: 'Link', element: Button, type: 'button', class: 'b-link', label: 'link', key: 1 },
      { name: 'Link', element: Button, type: 'button', class: 'b-link', label: 'link', key: 2 },
      { name: 'Link', element: Button, type: 'button', class: 'b-link', label: 'link', key: 3 }
    ]
  },

  created () {
    Seeder.seed(merge(this.$sectionData, defaultSchema))
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
</style>
