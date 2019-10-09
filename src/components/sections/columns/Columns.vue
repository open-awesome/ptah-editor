<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'
import { mapActions } from 'vuex'

const C_CUSTOM_COLUMN = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn436.cdn.stg.gamenet.ru/0/8colJ/o_GfDXg.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '256px',
        'height': '221px'
      },
      media: {
        'is-mobile': {
          'width': '200px',
          'height': '200px'
        }
      }
    }
  },
  {
    element: {
      text: '<p><strong>This is a header</strong></p>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '3.2rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions.' +
      '<div>Her yet there truth merit.</div>' +
      '<div>Mrs all projecting favourable now unpleasing.</div>',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'color': '#ffffff'
      }
    }
  },
  {},
  {
    element: {
      text: '<p><strong>SECONDARY BUTTON</strong></p>',
      styles: {
        'background-color': 'transparent',
        'color': '#F4BC64',
        'font-family': 'Montserrat',
        'font-size:': '1.6rem',
        'text-align': 'center',
        'width': '280px',
        'height': '64px',
        'border-radius': '100px',
        'border-width': '2px',
        'border-style': 'solid',
        'border-color': '#F4BC64'
      },
      pseudo: {
        hover: {
          'color': '#FFFFFF !important',
          'border-width': '2px !important',
          'border-style': 'solid !important',
          'border-color': '#FFFFFF !important'
        }
      }
    }
  }
]

const C_CUSTOM_COLUMN2 = _.cloneDeep(C_CUSTOM_COLUMN)
C_CUSTOM_COLUMN2[0].element.styles['background-image'] = 'url("https://gn908.cdn.stg.gamenet.ru/0/8conm/o_1qkwy5.png")'

const C_CUSTOM_COLUMN3 = _.cloneDeep(C_CUSTOM_COLUMN)
C_CUSTOM_COLUMN3[0].element.styles['background-image'] = 'url("https://gn681.cdn.stg.gamenet.ru/0/8cooT/o_1AhevN.png")'

const C_CUSTOM = [{
  element: {
    styles: {
      height: '60px'
    }
  }
}]

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn870.cdn.stg.gamenet.ru/0/8coGJ/o_u02v0.jpg)',
      'background-color': '#151C44',
      'background-position': '50% 50%',
      'background-size': 'cover',
      'padding-bottom': '122px'
    },
    count: 3
  },
  container: _.merge({}, C_CUSTOM_CONTAINER),
  components: _.merge({}, C_CUSTOM),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  components2: _.merge({}, C_CUSTOM_COLUMN2),
  components3: _.merge({}, C_CUSTOM_COLUMN3),
  components4: _.merge({}, C_CUSTOM_COLUMN),
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
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter',
    label: 'delimiter'
  }
]

const GROUP_NAME = 'Columns'
const NAME = 'Columns'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Three columns additional features presentation',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/columns-space.jpg',

  $schema: {
    mainStyle: types.Columns,
    container: types.StyleObject,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    components: _.merge([], HEADER, [{ key: 20 }]),
    components1: _.merge([], COMPONENTS, [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }]),
    components2: _.merge([], COMPONENTS, [{ key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]),
    components3: _.merge([], COMPONENTS, [{ key: 10 }, { key: 11 }, { key: 12 }, { key: 13 }, { key: 14 }]),
    components4: _.merge([], COMPONENTS, [{ key: 15 }, { key: 16 }, { key: 17 }, { key: 18 }, { key: 19 }])
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
    class="b-columns"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <sandbox
          class="b-sandbox"
          container-path="$sectionData.container"
          components-path="$sectionData.components"
        >

          <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="drag('components')" @change="dragStop">
            <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
              <component class="b-columns-component"
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
      <div class="b-section-padd">
        <div class="b-section-padd-border">
          <!-- Setting controls -->
          <div class="b-section-menu__controls">
            <div>
              <a href="#" class="b-section-menu__control"
                 tooltip="Number of columns"
                 tooltip-position="right"
                 @click.stop="showSettings('SectionColumnsSettings')">
                <icon-base name="cog" width="12" height="15" />
              </a>
            </div>
          </div>

          <div class="b-grid__row"
            :style="{ 'align-items' : $sectionData.mainStyle.styles['align-items']}"
            >
            <div class="b-grid__col-m-12"
              :class="`b-grid__col-${12/$sectionData.mainStyle.count}`"
              v-for="(column, key) in $sectionData"
              v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) <= $sectionData.mainStyle.count"
              :key="key"
              >
              <sandbox
                class="b-sandbox"
                :container-path="`$sectionData.container${key.split('components')[1]}`"
                :components-path="`$sectionData.components${key.split('components')[1]}`"
                >
                <draggable v-model="$sectionData[key]" class="b-draggable-slot" :style="$sectionData[`container${key.split('components')[1]}`].styles" @start="drag(`components${key.split('components')[1]}`)" @change="dragStop">
                  <div :class="`b-draggable-slot__${component.type}`"
                     v-for="(component, index) in $sectionData[key]"
                     v-if="$sectionData[key].length !== 0"
                     :key="index"
                    >
                    <component class="b-columns-component"
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
            </div><!--/.b-grid__col-3 b-grid__col-m-12-->
          </div><!--/.b-grid__row-->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'
@import '../../../assets/sass/section-menu.sass'
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'
</style>
