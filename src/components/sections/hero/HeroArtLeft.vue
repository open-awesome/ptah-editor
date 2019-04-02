<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-hero">

  <slot name="video"/>
  <slot name="overlay"/>

  <div class="b-grid">
    <div class="b-grid__row">

      <div class="b-grid__col-6"></div>

      <div class="b-grid__col-6 b-grid__col-m-12">

        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            align="center"
            class="b-sandbox">

          <draggable v-model="$sectionData.components" :style="$sectionData.container.styles" class="b-draggable-slot">

            <div
                v-for="(component, index) in $sectionData.components"
                v-if="$sectionData.components.length !== 0"
                :key="`component-${ _uid }-${ index }`">

              <component class="b-hero-component"
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
                  :path="`components[${index}].element`">
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
import { StyleObject, Logo, VideoElement, Slogan, Button } from '@editor/types'
import { merge } from 'lodash-es'
import section from '../../mixins/section.js'

const [name, group, cover] = ['HeroArtLeft', 'Hero', '/img/covers/hero-art-left.png']

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
const defaultColumnComponents = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn120.cdn.stg.gamenet.ru/0/7aITH/o_1vTdxd.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '25rem',
        'height': '15rem',
        'margin-bottom': '1.6rem'
      }
    },
    key: 0
  },
  {
    element: {
      src: 'https://gn553.cdn.stg.gamenet.ru/0/7aJD3/o_1Od7Vf.mp4'
    },
    key: 6
  },
  {
    element: {
      text: 'The Caaat!'
    },
    key: 2
  },
  {
    element: {
      text: 'Button',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '30rem',
        'height': '6.4rem',
        'max-width': '100%',
        'border-radius': '2px'
      }
    },
    key: 3
  },
  {
    element: {
      text: 'Link',
      styles: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '30rem',
        'height': '6.4rem',
        'max-width': '100%',
        'border-radius': '2px',
        'font-size': '1.8rem',
        'background-color': 'transparent'
      }
    },
    key: 7
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn851.cdn.stg.gamenet.ru/0/7aKEG/o_hRVwx.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': '75% 50%'
    }
  },
  components: merge({}, defaultColumnComponents),
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
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 },
      { name: 'VideoElement', element: VideoElement, type: 'video', class: 'b-video', label: 'video', key: 5 },
      { name: 'TextElement', element: Slogan, type: 'text', class: 'b-slogan', label: 'slogan', key: 6 },
      { name: 'Button', element: Button, type: 'button', class: 'b-button-test', label: 'button', key: 3 },
      { name: 'Button', element: Button, type: 'button', class: 'b-link', label: 'link', key: 7 }
    ]
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

.b-link:hover
  text-decoration: underline !important

</style>
