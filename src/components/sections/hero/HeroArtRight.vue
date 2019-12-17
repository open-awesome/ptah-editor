<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    class="b-hero">

  <slot name="menu"/>
  <slot name="video"/>
  <slot name="overlay"/>

  <div class="b-grid">
    <div class="b-grid__row">

      <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">

        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            class="b-sandbox">

          <draggable v-model="$sectionData.components" :style="$sectionData.container.styles" class="b-draggable-slot" @start="$_drag('components')" @change="$_dragStop">

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

      <div class="hidden-m" :class="`b-grid__col-${12 - $sectionData.container.width}`">
        <!-- empty col -->
      </div>

    </div>
  </div>

</section>
</template>

<script>
import { StyleObject, Logo, VideoElement, Text, Button } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const [name, group, cover] = ['VideoHeroSplitScreen', 'FirstScreen', '/img/covers/hero-art-right.png']

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
        'background-image': 'url(https://s3.protocol.one/src/o_1vTdxd.png)',
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
      src: 'https://s3.protocol.one/src/o_1Od7Vf.mp4'
    },
    key: 5
  },
  {
    element: {
      text: 'The Caaat!'
    },
    key: 6
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
      'background-image': 'url(https://s3.protocol.one/src/o_1Mpn8F.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': '75% 50%'
    }
  },
  container: {
    width: 6
  },
  components: merge({}, defaultColumnComponents),
  edited: true
}

export default {
  name,
  group,
  cover,

  description: 'Game character to rightward of video main screen',

  mixins: [defaults, sectionMedia],

  $schema: {
    mainStyle: StyleObject,
    container: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 },
      { name: 'VideoElement', element: VideoElement, type: 'video', class: 'b-video', label: 'video', key: 5 },
      { name: 'TextElement', element: Text, type: 'text', class: 'b-slogan', label: 'slogan', key: 6 },
      { name: 'Button', element: Button, type: 'button', class: 'b-button-test', label: 'button', key: 3 },
      { name: 'Button', element: Button, type: 'button', class: 'b-link', label: 'link', key: 7 }
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
@import '../../../assets/sass/section-media.sass'
</style>
