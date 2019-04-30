<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const C_CUSTOM_1 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn499.cdn.stg.gamenet.ru/0/7L5qj/o_235Car.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '336px',
        'height': '236px'
      }
    },
    key: 0
  },
  {
    element: {
      text: 'This is a header',
      styles: {
        'font-family': 'Lato',
        'font-size': '2.4rem',
        'color': '#ffffff'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'One morning, when Gregor Samsa woke' +
      '<div>from troubled dreams, he found himself transformed</div>' +
      '<div>in his bed into a horrible vermin.</div>',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    },
    key: 2
  },
  {
    key: 3
  },
  {
    element: {
      text: 'Secondary',
      styles: {
        'background-color': 'rgba(255, 125, 125, 0.5)',
        'color': '#ffffff',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    },
    key: 4
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn987.cdn.stg.gamenet.ru/0/7L5wL/o_23f77k.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '365px',
        'height': '236px'
      }
    },
    key: 5
  },
  {
    element: {
      text: 'This is a header',
      styles: {
        'font-family': 'Lato',
        'font-size': '2.4rem',
        'color': '#ffffff'
      }
    },
    key: 6
  },
  {
    element: {
      text: 'One morning, when Gregor Samsa woke' +
      '<div>from troubled dreams, he found himself transformed</div>' +
      '<div>in his bed into a horrible vermin.</div>',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    },
    key: 7
  },
  {
    key: 8
  },
  {
    element: {
      text: 'Secondary',
      styles: {
        'background-color': 'rgba(255, 125, 125, 0.5)',
        'color': '#ffffff',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    },
    key: 9
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Lato',
        'font-size': '3.2rem',
        'color': '#ffffff'
      }
    },
    key: 10
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn819.cdn.stg.gamenet.ru/0/7L5P8/o_Dyakc.png)',
      'background-color': '#151C44',
      'background-position': 'center center',
      'background-size': 'cover'
    }
  },
  container3: {
    styles: {
      'min-height': '0px'
    }
  },
  components: _.merge({}, C_CUSTOM_1),
  components2: _.merge({}, C_CUSTOM_2),
  components3: _.merge({}, C_CUSTOM_3),
  edited: true
}

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo'
  },
  {
    name: 'TextElement',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
  },
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test',
    label: 'button'
  }
]

const HEADER = [
  {
    name: 'TextElement',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title',
    key: 10
  }
]

const GROUP_NAME = 'TwoColumns'
const NAME = 'TwoColumns'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults],

  cover: '/img/covers/columns2.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: _.merge([], COMPONENTS, [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }]),
    components2: _.merge([], COMPONENTS, [{ key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]),
    components3: _.merge([], HEADER, [{ key: 10 }])
  },

  created () {
    Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
  }
}
</script>

<template>
  <section
    class="b-columns2"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <sandbox
          class="b-sandbox"
          container-path="$sectionData.container3"
          components-path="$sectionData.components3"
          direction="column"
          :style="$sectionData.container3.styles"
        >

          <draggable v-model="$sectionData.components3" class="b-draggable-slot" :style="$sectionData.container3.styles">
            <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
              <component class="b-columns2-component"
                 v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: $sectionData.components3[index].label }"
                 :is="component.name"
                 :href="$sectionData.components3[index].element.link.href"
                 :target="$sectionData.components3[index].element.link.target"
                 :path="`components3[${index}].element`"
                 :style="$sectionData.components3[index].element.styles"
                 :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
              >
                <div v-html="$sectionData.components3[index].element.text"></div>
              </component>
            </div>
          </draggable>
        </sandbox>
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-6 b-grid__col-m-12 ">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            :style="$sectionData.container.styles"
            >

            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-columns2-component"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
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
            class="b-sandbox"
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            :style="$sectionData.container2.styles"
            >

            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-columns2-component"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: $sectionData.components2[index].label }"
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
.b-columns2

</style>
