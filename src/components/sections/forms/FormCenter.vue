<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title',
    key: 1
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

const C_CUSTOM = [
  {
    element: {
      text: '<b>Header about form</b>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4.2rem',
        'color': '#ffffff',
        'padding-bottom': '67px'
      }
    },
    key: 1
  },
  {
    element: {
      placeholder: 'Email',
      buttonText: '<b>Call to Action</b>',
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
    },
    key: 4
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn870.cdn.stg.gamenet.ru/0/8coGJ/o_u02v0.jpg)',
      'background-position': 'center center',
      'background-size': 'cover',
      'padding': '62px 0 236px'
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

  mixins: [defaults],

  cover: 'https://gn982.cdn.stg.gamenet.ru/TY0Xv53wUG/7mH9m/o_1qPg3L.png',

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
    :style="$sectionData.mainStyle.styles"
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
            direction="column"
            class="b-sandbox">

            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @change="dragStop">
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
.b-draggable-slot > div
  width: 100%

</style>
