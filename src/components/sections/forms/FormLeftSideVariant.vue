<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const COMPONENTS_1 = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo'
  }
]

const COMPONENTS_2 = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description',
    key: 2
  },
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
  },
  {
    name: 'Form',
    element: types.Form,
    type: 'form',
    class: 'b-form',
    label: 'form'
  }
]

const C_CUSTOM_1 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://s3.protocol.one/src/o_15rRBx.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px',
        'margin-top': '32px'
      }
    }
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Lato',
        'font-size': '5.6rem',
        'color': '#ffffff'
      },
      media: {
        'is-mobile': {
          'font-size': '3.6rem',
          'padding-bottom': '16px'
        }
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions. Her yet there truth merit.',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.5)'
      }
    }
  },
  {},
  {
    element: {
      placeholder: 'Email',
      buttonText: 'Submit',
      styles: {
        'color': '#000000',
        'border-radius': '2px',
        'font-family': 'Lato',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-size': '1.6rem',
        'text-decoration': 'none'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-size': 'cover',
      'background-color': 'rgba(21, 28, 68, 1)',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll'
    }
  },
  components: _.merge({}, C_CUSTOM_1),
  components2: _.merge({}, C_CUSTOM_2),
  container: {
    width: 6,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container',
    styles: {
      'align-items': 'center',
      'justify-content': 'flex-start'
    },
    media: {
      'is-mobile': {
        'align-items': 'center',
        'justify-content': 'flex-start'
      }
    }
  },
  container2: {
    width: 6,
    styles: {
      'justify-content': 'center',
      'align-items': 'center'
    },
    media: {
      'is-mobile': {
        'justify-content': 'flex-start',
        'align-items': 'center'
      }
    },
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container'],
    selfName: '$sectionData.container2'
  },
  edited: true
}

const GROUP_NAME = 'Forms'
const NAME = 'FormLeft'

export default {
  name: NAME,

  description: 'Left-centered small e-mail form screen',

  mixins: [defaults, sectionMedia],

  cover: 'https://s3.protocol.one/src/o_1Nioez.png',

  group: GROUP_NAME,

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: COMPONENTS_1,
    components2: COMPONENTS_2
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
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container2.width}`">
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            class="b-sandbox">

            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles" @start="$_drag('components2')" @change="$_dragStop">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-hero-component"
                           v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: component.label }"
                           :is="component.name"
                           :href="$sectionData.components2[index].element.link.href"
                           :target="$sectionData.components2[index].element.link.target"
                           :path="`components2[${index}].element`"
                           :style="$sectionData.components2[index].element.styles"
                           :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                >
                  <div v-html="$sectionData.components2[index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            class="b-sandbox b-grid__col-m-12 b-form__left-col">

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
