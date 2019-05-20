<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const GROUP_NAME = 'Video'
const NAME = 'Video'
const BG_SECTION = 'url(https://gn123.cdn.stg.gamenet.ru/0/7opzP/o_NvNe4.jpg)'

const COMPONENTS = [
  {
    name: 'Title',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title',
    key: 0
  },
  {
    name: 'VideoElement',
    element: types.VideoElement,
    type: 'video',
    class: 'b-video',
    label: 'video',
    key: 1
  }
]

const C_CUSTOM = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Heebo',
        'font-size': '5.6rem',
        'color': '#ffffff'
      }
    },
    key: 0
  },
  {
    element: {
      videoUrl: 'https://gn616.cdn.stg.gamenet.ru/0/7opu4/o_n0x1o.mp4',
      styles: {
        width: '640px',
        height: '400px'
      }
    },
    key: 1
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll'
    }
  },
  components: _.merge([], C_CUSTOM),
  container: {},
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults],

  cover: '/img/covers/video-thumbnail.png',

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
    class="b-video-section"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
   >
    <slot name="menu"/> <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
              container-path="$sectionData.container"
              components-path="$sectionData.components"
              direction="column"
              class="b-sandbox">

            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-if="$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  :path="`components[${index}].element`"
                  >
                </component>
                <component
                  v-if="!$sectionData.components[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  v-html="$sectionData.components[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  :path="`components[${index}].element`"
                  >
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
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-video-section
</style>
