<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const C_CUSTOM_COLUMN = [
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
    }
  },
  {
    element: {
      text: 'This is a header',
      styles: {
        'font-family': 'Lato',
        'font-size': '2.4rem',
        'color': '#ffffff'
      }
    }
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
    }
  },
  {},
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
    }
  }
]

const C_CUSTOM = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Lato',
        'font-size': '3.2rem',
        'color': '#ffffff'
      }
    }
  }
]

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn819.cdn.stg.gamenet.ru/0/7L5P8/o_Dyakc.png)',
      'background-color': '#151C44',
      'background-position': 'center center',
      'background-size': 'cover'
    },
    count: 2
  },
  container: _.merge({}, C_CUSTOM_CONTAINER),
  components: _.merge({}, C_CUSTOM),
  components0: _.merge({}, C_CUSTOM_COLUMN),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  components2: _.merge({}, C_CUSTOM_COLUMN),
  components3: _.merge({}, C_CUSTOM_COLUMN),
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
    label: 'title'
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
    mainStyle: types.Columns,
    container: types.StyleObject,
    container0: types.StyleObject,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: _.merge([], HEADER, [{ key: 20 }]),
    components0: _.merge([], COMPONENTS, [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }]),
    components1: _.merge([], COMPONENTS, [{ key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]),
    components2: _.merge([], COMPONENTS, [{ key: 10 }, { key: 11 }, { key: 12 }, { key: 13 }, { key: 14 }]),
    components3: _.merge([], COMPONENTS, [{ key: 15 }, { key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }])
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
      <div class="b-grid__row">
        <div class="b-grid__col-3 b-grid__col-m-12 "
          v-for="(column, key) in $sectionData"
          v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
          :key="key"
          >
          <sandbox
            class="b-sandbox"
            :container-path="`$sectionData.container${key.split('components')[1]}`"
            :components-path="`$sectionData.components${key.split('components')[1]}`"
            direction="column"
            :style="`$sectionData.container${key.split('components')[1]}.styles`"
            >
            <draggable v-model="$sectionData[key]" class="b-draggable-slot" :style="$sectionData[`container${key.split('components')[1]}`].styles">
              <div :class="`b-draggable-slot__${component.type}`"
                 v-for="(component, index) in $sectionData[key]"
                 v-if="$sectionData[key].length !== 0"
                 :key="index"
                >
                <component class="b-columns2-component"
                  v-styler:for="{ el: $sectionData[key][index].element, path: `$sectionData.components[${key}][${index}].element`, type: $sectionData[key][index].type, label: $sectionData[key][index].label }"
                  :is="component.name"
                  :href="$sectionData[key][index].element.link.href"
                  :target="$sectionData[key][index].element.link.target"
                  :path="`components[${key}][${index}].element`"
                  :style="$sectionData[key][index].element.styles"
                  :class="[$sectionData[key][index].element.classes, $sectionData[key][index].class]"
                  >
                  <div v-html="$sectionData[key][index].element.text"></div>
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
