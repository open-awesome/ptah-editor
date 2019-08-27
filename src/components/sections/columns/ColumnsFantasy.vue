<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import { mapActions } from 'vuex'

const C_CUSTOM_COLUMN = [
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
      text: 'You can add text for each of your game feature here.. Change the button bellow to open full description of game feature or just delete it</div>',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'line-height': '25px',
        'color': '#ffffff'
      }
    }
  },
  {},
  {
    element: {
      text: '<p><strong>SECONDARY BUTTON</strong></p>',
      styles: {
        'background-color': '#333333',
        'color': '#FFFFFF',
        'font-family': 'Cinzel',
        'font-size:': '1.6rem',
        'text-align': 'center',
        'width': '280px',
        'height': '64px',
        'border-width': '2px',
        'border-style': 'solid',
        'border-color': '#AF2E11'
      },
      pseudo: {
        hover: {
          'background-color': '#AF2E11 !important'
        }
      }
    }
  }
]

const C_CUSTOM_COLUMN2 = _.cloneDeep(C_CUSTOM_COLUMN)

const C_CUSTOM_COLUMN3 = _.cloneDeep(C_CUSTOM_COLUMN)

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center',
    'background-position': 'center bottom',
    'background-repeat': 'no-repeat',
    'background-size': 'contain',
    'margin-bottom': '-36px',
    'padding-bottom': '300px'
  }
}

const [C_CUSTOM_CONTAINER_1, C_CUSTOM_CONTAINER_2, C_CUSTOM_CONTAINER_3] = [
  _.merge({}, C_CUSTOM_CONTAINER, {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/Vred.png)'
    }
  }),
  _.merge({}, C_CUSTOM_CONTAINER, {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/Druket.png)'
    }
  }),
  _.merge({}, C_CUSTOM_CONTAINER, {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/Bolla.png)'
    }
  })
]

const C_CUSTOM = [{
  element: {
    styles: {
      height: '60px'
    }
  }
}]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/c_bg.jpg)',
      'background-color': '#151C44',
      'background-position': 'center center',
      'background-size': 'cover',
      'padding-bottom': '0px'
    },
    count: 3
  },
  container: _.merge({}, C_CUSTOM_CONTAINER),
  container1: _.merge({}, C_CUSTOM_CONTAINER_1),
  container2: _.merge({}, C_CUSTOM_CONTAINER_2),
  container3: _.merge({}, C_CUSTOM_CONTAINER_3),
  container4: _.merge({}, C_CUSTOM_CONTAINER_1),
  components: _.merge({}, C_CUSTOM),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  components2: _.merge({}, C_CUSTOM_COLUMN2),
  components3: _.merge({}, C_CUSTOM_COLUMN3),
  components4: _.merge({}, C_CUSTOM_COLUMN),
  edited: true
}

const COMPONENTS = [
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
const NAME = 'ColumnsFantasy'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Three columns additional features presentation',

  mixins: [defaults],

  cover: 'https://s3.protocol.one/images/ash_cover_col.jpg',

  $schema: {
    mainStyle: types.Columns,
    container: types.StyleObject,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    components: _.merge([], HEADER),
    components1: _.merge([], COMPONENTS),
    components2: _.merge([], COMPONENTS),
    components3: _.merge([], COMPONENTS),
    components4: _.merge([], COMPONENTS)
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
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">

      <div class="b-columns__padd">
        <div class="b-columns__padd-border">
          <!-- Setting controls -->
          <div class="b-columns__controls">
            <div>
              <a href="#" class="b-columns__control"
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
                direction="column"
                :style="`$sectionData.container${key.split('components')[1]}.styles`"
              >
                <draggable v-model="$sectionData[key]" class="b-draggable-slot" :style="$sectionData[`container${key.split('components')[1]}`].styles">
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
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-columns
  $this: &
  &__padd
    padding: $size-step/4

    transition: border 0.25s
    border: 0.2rem dotted transparent

    position: relative
    .is-mobile &
      padding: 0
    @media only screen and (max-width: 540px)
      &
        padding: 0
    &-border
      padding: $size-step/4
      transition: border 0.25s
      border: 1px dotted transparent
      .is-editable #{$this}__padd:hover &
        border: 1px dashed $dark-blue-krayola

  &__controls
    position: absolute
    top: -14px
    left: $size-step/4

    display: flex
    align-items: flex-end
    justify-content: flex-start

    display: none
    .is-editable #{$this}__padd:hover &
      display: flex !important
  &__control
    display: flex
    align-items: center
    justify-content: center

    width: $size-step/1.5
    height: $size-step/1.5

    background: $dark-blue-krayola
    box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)

    cursor: pointer
    & svg
      fill:  $white
      width: 14px
      height: 14px

    &:hover, .active
      background: $white
      svg
        fill: $dark-blue-krayola
</style>
