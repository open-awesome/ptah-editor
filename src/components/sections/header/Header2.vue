<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-section-header">

  <slot name="video"/>

  <div class="b-grid b-header">
    <div class="b-grid__row b-footer__row">
      <div class="b-grid__col-12 b-grid__col-m-12">

        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="row"
            align="center"
            class="b-sandbox">

          <draggable v-model="$sectionData.components" :style="$sectionData.container.styles" class="b-draggable-slot">

            <div
                v-for="(component, index) in $sectionData.components"
                v-if="$sectionData.components.length !== 0"
                :key="`component-${ _uid }-${ index }`"
                :style="component.styles">

              <component
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
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"
                  class="b-header-component"/>

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
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"
                  class="b-header-component"/>

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
import { StyleObject, Logo, Link } from '@editor/types'
import { merge } from 'lodash-es'

const [name, group, cover] = ['Header2', 'header', '/img/covers/header-2.png']
const defaultComponents = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn120.cdn.stg.gamenet.ru/0/7aITH/o_1vTdxd.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '20rem',
        'height': '8rem',
        'margin': '.8rem 1.6rem',
        'position': 'absolute',
        'top': '0',
        'left': '0'
      }
    }
  },
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
        'min-width': '10rem',
        'height': '6.4rem',
        'border-radius': '2px',
        'font-size': '1.8rem'
      }
    }
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
        'min-width': '10rem',
        'height': '6.4rem',
        'border-radius': '2px',
        'font-size': '1.8rem'
      }
    }
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

  $schema: {
    mainStyle: StyleObject,
    container: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo' },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link' },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link' }
    ]
  },

  components: { Draggable },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  created () {
    this.seedData()
  },

  methods: {
    seedData () {
      if (this.$sectionData.edited === undefined) {
        Seeder.seed(merge(this.$sectionData, defaultSchema))
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-sandbox
  min-height: 10rem

.b-draggable-slot
  width: 100%
</style>
