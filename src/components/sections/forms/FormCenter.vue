<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'Form',
    element: types.Form,
    type: 'form',
    class: 'b-form',
    label: 'form'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<p><b>Header about form</b></p>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4rem',
        'color': '#ffffff',
        'padding-bottom': '67px'
      },
      media: {
        'is-mobile': {
          'font-size': '3rem',
          'padding-bottom': '16px'
        }
      }
    }
  },
  {
    element: {
      placeholder: 'Email',
      buttonText: '<p><b>Call to Action</b></p>',
      styles: {
        'color': '#000000',
        'border-radius': '2px',
        'font-family': 'Montserrat',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-size': '1.6rem',
        'text-decoration': 'none'
      },
      formStyles: {
        'button-color': '#F4BC64',
        'border-radius': '50',
        'height': 64,
        'buttonHoverColor': '#fff'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3.protocol.one/src/o_u02v0.jpg)',
      'background-position': '50% 50%',
      'background-color': '#000',
      'background-size': 'cover',
      'padding-top': '62px',
      'padding-bottom': '236px'
    },
    media: {
      'is-mobile': {
        'padding-bottom': '64px'
      }
    }
  },
  components: _.merge({}, C_CUSTOM),
  container: {
    width: 9
  },
  edited: true
}

const GROUP_NAME = 'Forms'
const NAME = 'FormCenter'

export default {
  name: NAME,

  description: 'Centered e-mail gathering form screen',

  mixins: [defaults, sectionMedia],

  cover: 'https://s3.protocol.one/src/o_1LlVoh.jpg',

  group: GROUP_NAME,

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<template>
  <section
    class="b-form"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
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

            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
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
@import '../../../assets/sass/section-media.sass'
</style>
