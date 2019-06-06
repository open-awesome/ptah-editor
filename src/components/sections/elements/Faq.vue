<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import { mapActions } from 'vuex'

const C_CUSTOM_COLUMN = [
  {
    element: {
      styles: {
        'font-family': 'Lato',
        'font-size': '1.8rem',
        'color': '#ffffff'
      },
      element: {
        color: 'rgba(248,231,28,1)',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        description: 'Will I be able to play "OUR GAME" this year?',
        text: 'Yes you can. The exact date of the start of testing will be announced later.'
      }
    }
  },
  {
    element: {
      styles: {
        'font-family': 'Lato',
        'font-size': '1.8rem',
        'color': '#ffffff'
      },
      element: {
        color: 'rgba(248,231,28,1)',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        description: 'What anti-cheat do you plan to use?',
        text: 'We integrate anti-cheat P1, which has already proven itself to protect users of our other projects. The developers of this software are now searching for game vulnerabilities and optimizing P1 for the needs of "OUR GAME".'
      }
    }
  },
  {
    element: {
      styles: {
        'font-family': 'Lato',
        'font-size': '1.8rem',
        'color': '#ffffff'
      },
      element: {
        color: 'rgba(248,231,28,1)',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        description: 'What is "OUR GAME"?',
        text: '"OUR GAME" is a game that combines the classic gameplay of an isometric action-RPG of the old school with elements of MMO games.'
      }
    }
  },
  {
    element: {
      styles: {
        'font-family': 'Lato',
        'font-size': '1.8rem',
        'color': '#ffffff'
      },
      element: {
        color: 'rgba(248,231,28,1)',
        icon: {
          name: 'plus',
          value: 'plus'
        },
        description: 'When will closed beta testing begin?',
        text: 'Information about the start date of the PTA can be expected in 2019. We will definitely inform you about everything additionally - follow the news in the official communities of "OUR GAME"'
      }
    }
  }
]

const C_CUSTOM = [
  {
    element: {
      text: 'FAQ',
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

const C_CUSTOM_CONTAINER_1 = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'flex-start'
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn819.cdn.stg.gamenet.ru/0/7L5P8/o_Dyakc.png)',
      'background-color': '#151C44',
      'background-position': 'center center',
      'background-size': 'cover'
    }
  },
  container: _.merge({}, C_CUSTOM_CONTAINER),
  container1: _.merge({}, C_CUSTOM_CONTAINER_1),
  components: _.merge({}, C_CUSTOM),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  edited: true
}

const COMPONENTS = [
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  },
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  },
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  },
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  }
]

const HEADER = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  }
]

const GROUP_NAME = 'Faq'
const NAME = 'Faq'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults],

  cover: '/img/covers/faq.png',

  $schema: {
    mainStyle: types.Columns,
    container: types.StyleObject,
    container1: types.StyleObject,
    components: _.merge([], HEADER),
    components1: _.merge([], COMPONENTS)
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),

    async showSettings (panel) {
      let index = _.findIndex(this.$builder.sections, ['group', GROUP_NAME])

      this.setSettingSection(this.$builder.sections[index])

      await this.$nextTick()

      this.setControlPanel(panel)
    }
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
    class="b-faq"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            :style="$sectionData.container.styles"
            >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-faq-component"
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
        </div><!--/.b-grid__col-12-->
      </div><!--/.b-grid__row-->
      <div class="b-grid__row">
        <div class="b-grid__col-12"
          v-for="(column, key) in $sectionData"
          v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) <= $sectionData.mainStyle.count"
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
                <component class="b-faq-component"
                  v-styler:for="{ el: $sectionData[`${key}`][index].element, path: `$sectionData.${key}[${index}].element`, type: $sectionData[key][index].type, label: $sectionData[`${key}`][index].label }"
                  :is="component.name"
                  :href="$sectionData[key][index].element.link.href"
                  :target="$sectionData[key][index].element.link.target"
                  :path="`${key}[${index}].element`"
                  :style="$sectionData[key][index].element.styles"
                  :class="[$sectionData[key][index].element.classes, $sectionData[key][index].class]"
                  >
                  <div v-html="$sectionData[key][index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div><!--/.b-grid__col-12-->
      </div><!--/.b-grid__row-->
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-faq
  $this: &
  line-height: 1.4
  justify-content: flex-start
  .b-draggable-slot__toggleElement
    width: 100%
</style>
