<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const COMPONENTS_1 = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo',
    key: 0
  }
]

const COMPONENTS_2 = [
  {
    name: 'TextElement',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title',
    key: 1
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
    label: 'delimiter',
    key: 3
  },
  {
    name: 'Form',
    element: types.Form,
    type: 'form',
    class: 'b-form',
    label: 'form',
    key: 4
  }
]

const C_CUSTOM_1 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn675.cdn.stg.gamenet.ru/0/7K0Jf/o_15rRBx.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px'
      }
    },
    key: 0
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Lato',
        'font-size': '2.8rem',
        'color': '#ffffff'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'An sincerity so extremity he additions. Her yet there truth merit.',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.4rem',
        'color': 'rgba(255, 255, 255, 0.5)'
      }
    },
    key: 2
  },
  {
    key: 3
  },
  {
    element: {
      placeholder: 'Email',
      buttonText: 'Submit',
      styles: {
        'color': '#000000',
        'border-radius': '2px',
        'font-family': 'Lato',
        'font-weight': 'normal',
        'font-style': 'none',
        'font-size': '1.6rem',
        'text-decoration': 'none'
      }
    },
    key: 4
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-size': 'cover',
      'background-color': 'rgb(21, 28, 68, 1)',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll'
    }
  },
  components: _.merge({}, C_CUSTOM_1),
  components2: _.merge({}, C_CUSTOM_2),
  container: {
    styles: {
      'align-items': 'flex-start'
    }
  },
  container2: {
    styles: {
      'justify-content': 'flex-start',
      'align-items': 'flex-start',
      'width': '100%'
    }
  },
  edited: true
}

const GROUP_NAME = 'Forms'
const NAME = 'FormRight'

export default {
  name: NAME,

  mixins: [defaults],

  cover: 'https://gn550.cdn.stg.gamenet.ru/TY0Xv53wUG/7mHAD/o_1HEQ3v.png',

  group: GROUP_NAME,

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: COMPONENTS_1,
    components2: COMPONENTS_2
  },

  created () {
    Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
  }
}
</script>

<template>
  <section
    class="b-form"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-6">
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            class="b-sandbox b-grid__col-m-12 b-form__left-col">

            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
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
        <div class="b-grid__col-6 b-grid__col-m-12">
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            class="b-sandbox">

            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
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
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.b-form
  &__left-col
    align-items: stretch
  .b-draggable-slot
    .is-mobile &,
    .is-tablet &
      align-items: center !important
    @media only screen and (max-width: 768px)
      &
        align-items: center !important
</style>
