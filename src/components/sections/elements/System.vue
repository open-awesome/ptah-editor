<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import VuseIcon from '@editor/components/VuseIcon'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import { mapActions } from 'vuex'

const REQUIREMENTS = [
  {
    name: 'OS-text',
    prop: 'OS',
    element: types.TextInherit
  },
  {
    name: 'OS-min',
    prop: 'OS',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'OS-max',
    prop: 'OS',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Processor-text',
    prop: 'Processor',
    element: types.TextInherit
  },
  {
    name: 'Processor-min',
    prop: 'Processor',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Processor-max',
    prop: 'Processor',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Memory-text',
    prop: 'Memory',
    element: types.TextInherit
  },
  {
    name: 'Memory-min',
    prop: 'Memory',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Memory-max',
    prop: 'Memory',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Graphics-text',
    prop: 'Graphics',
    element: types.TextInherit
  },
  {
    name: 'Graphics-min',
    prop: 'Graphics',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Graphics-max',
    prop: 'Graphics',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Direct X-text',
    prop: 'Direct X',
    element: types.TextInherit
  },
  {
    name: 'Direct X-min',
    prop: 'Direct X',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Direct X-max',
    prop: 'Direct X',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Storage-text',
    prop: 'Storage',
    element: types.TextInherit
  },
  {
    name: 'Storage-min',
    prop: 'Storage',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Storage-max',
    prop: 'Storage',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Sound Card-text',
    prop: 'Sound Card',
    element: types.TextInherit
  },
  {
    name: 'Sound Card-min',
    prop: 'Sound Card',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  },
  {
    name: 'Sound Card-max',
    prop: 'Sound Card',
    element: types.TextInherit,
    type: 'inline',
    label: 'Text'
  }
]

const REQUIREMENTS_WINDOWS = [
  {
    name: 'OS-text',
    element: { text: 'OS version' },
    key: 11
  },
  {
    name: 'OS-min',
    element: { text: 'Windows 7, 8, 10' },
    key: 12
  },
  {
    name: 'OS-max',
    element: { text: 'Windows 7, 8, 10' },
    key: 13
  },
  {
    name: 'Processor-text',
    element: { text: 'CPU' },
    key: 21
  },
  {
    name: 'Processor-min',
    element: { text: 'Intel Core 2 Duo 2.5 GHz' },
    key: 22
  },
  {
    name: 'Processor-max',
    element: { text: 'Intel Core i5 3.0 GHz' },
    key: 23
  },
  {
    name: 'Memory-text',
    element: { text: 'RAM' },
    key: 31
  },
  {
    name: 'Memory-min',
    element: { text: '1 GB' },
    key: 32
  },
  {
    name: 'Memory-max',
    element: { text: '2 GB' },
    key: 33
  },
  {
    name: 'Graphics-text',
    element: { text: 'Graphics' },
    key: 41
  },
  {
    name: 'Graphics-min',
    element: { text: 'NVIDIA 9xxx / ATI 2xxx' },
    key: 42
  },
  {
    name: 'Graphics-max',
    element: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X' },
    key: 43
  },
  {
    name: 'Direct X-text',
    element: { text: 'DX version' },
    key: 41
  },
  {
    name: 'Direct X-min',
    element: { text: 'Version 9.0c' },
    key: 42
  },
  {
    name: 'Direct X-max',
    element: { text: 'Version 9.0c' },
    key: 43
  },
  {
    name: 'Storage-text',
    element: { text: 'Storage space' },
    key: 51
  },
  {
    name: 'Storage-min',
    element: { text: '5 GB' },
    key: 52
  },
  {
    name: 'Storage-max',
    element: { text: '5 GB' },
    key: 53
  },
  {
    name: 'Sound Card-text',
    element: { text: 'Sound Card' },
    key: 61
  },
  {
    name: 'Sound Card-min',
    element: { text: '—' },
    key: 62
  },
  {
    name: 'Sound Card-max',
    element: { text: '—' },
    key: 63
  }
]
const COMPONENTS_WINDOWS_KEYS = [
  {
    key: 11
  },
  {
    key: 12
  },
  {
    key: 13
  },
  {
    key: 21
  },
  {
    key: 22
  },
  {
    key: 23
  },
  {
    key: 31
  },
  {
    key: 32
  },
  {
    key: 33
  },
  {
    key: 41
  },
  {
    key: 42
  },
  {
    key: 43
  },
  {
    key: 41
  },
  {
    key: 42
  },
  {
    key: 43
  },
  {
    key: 51
  },
  {
    key: 52
  },
  {
    key: 53
  },
  {
    key: 61
  },
  {
    key: 62
  },
  {
    key: 63
  }
]

const REQUIREMENTS_OS = [
  {
    name: 'OS-text',
    element: { text: 'OS version' },
    key: 111
  },
  {
    name: 'OS-min',
    element: { text: 'Mac OSX 10.7.5' },
    key: 112
  },
  {
    name: 'OS-max',
    element: { text: 'Mac OSX 10.7.5' },
    key: 113
  },
  {
    name: 'Processor-text',
    element: { text: 'CPU' },
    key: 121
  },
  {
    name: 'Processor-min',
    element: { text: 'Intel Core 2 Duo 2.5 GHz' },
    key: 122
  },
  {
    name: 'Processor-max',
    element: { text: 'Intel Core i5 3.0 GHz' },
    key: 123
  },
  {
    name: 'Memory-text',
    element: { text: 'RAM' },
    key: 131
  },
  {
    name: 'Memory-min',
    element: { text: '1 GB' },
    key: 132
  },
  {
    name: 'Memory-max',
    element: { text: '2 GB' },
    key: 133
  },
  {
    name: 'Graphics-text',
    element: { text: 'Graphics' },
    key: 141
  },
  {
    name: 'Graphics-min',
    element: { text: 'NVIDIA 9xxx / ATI 2xxx' },
    key: 142
  },
  {
    name: 'Graphics-max',
    element: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X' },
    key: 143
  },
  {
    name: 'Direct X-text',
    element: { text: 'DX version' },
    key: 141
  },
  {
    name: 'Direct X-min',
    element: { text: 'Version 9.0c' },
    key: 142
  },
  {
    name: 'Direct X-max',
    element: { text: 'Version 9.0c' },
    key: 143
  },
  {
    name: 'Storage-text',
    element: { text: 'Storage space' },
    key: 151
  },
  {
    name: 'Storage-min',
    element: { text: '5 GB' },
    key: 152
  },
  {
    name: 'Storage-max',
    element: { text: '5 GB' },
    key: 153
  },
  {
    name: 'Sound Card-text',
    element: { text: 'Sound Card' },
    key: 161
  },
  {
    name: 'Sound Card-min',
    element: { text: '—' },
    key: 162
  },
  {
    name: 'Sound Card-max',
    element: { text: '—' },
    key: 163
  }
]
const COMPONENTS_OS_KEYS = [
  {
    key: 111
  },
  {
    key: 112
  },
  {
    key: 113
  },
  {
    key: 121
  },
  {
    key: 122
  },
  {
    key: 123
  },
  {
    key: 131
  },
  {
    key: 132
  },
  {
    key: 133
  },
  {
    key: 141
  },
  {
    key: 142
  },
  {
    key: 143
  },
  {
    key: 141
  },
  {
    key: 142
  },
  {
    key: 143
  },
  {
    key: 151
  },
  {
    key: 152
  },
  {
    key: 153
  },
  {
    key: 161
  },
  {
    key: 162
  },
  {
    key: 163
  }
]

const REQUIREMENTS_LINUX = [
  {
    name: 'OS-text',
    element: { text: 'OS version' },
    key: 211
  },
  {
    name: 'OS-min',
    element: { text: 'Ubuntu/SteamOS' },
    key: 212
  },
  {
    name: 'OS-max',
    element: { text: 'Ubuntu/SteamOS' },
    key: 213
  },
  {
    name: 'Processor-text',
    element: { text: 'CPU' },
    key: 221
  },
  {
    name: 'Processor-min',
    element: { text: 'Intel Core 2 Duo 2.5 GHz' },
    key: 222
  },
  {
    name: 'Processor-max',
    element: { text: 'Intel Core i5 3.0 GHz' },
    key: 223
  },
  {
    name: 'Memory-text',
    element: { text: 'RAM' },
    key: 231
  },
  {
    name: 'Memory-min',
    element: { text: '1 GB' },
    key: 232
  },
  {
    name: 'Memory-max',
    element: { text: '2 GB' },
    key: 233
  },
  {
    name: 'Graphics-text',
    element: { text: 'Graphics' },
    key: 241
  },
  {
    name: 'Graphics-min',
    element: { text: 'NVIDIA 9xxx / ATI 2xxx' },
    key: 242
  },
  {
    name: 'Graphics-max',
    element: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X' },
    key: 243
  },
  {
    name: 'Direct X-text',
    element: { text: 'DX version' },
    key: 241
  },
  {
    name: 'Direct X-min',
    element: { text: 'Version 9.0c' },
    key: 242
  },
  {
    name: 'Direct X-max',
    element: { text: 'Version 9.0c' },
    key: 243
  },
  {
    name: 'Storage-text',
    element: { text: 'Storage space' },
    key: 251
  },
  {
    name: 'Storage-min',
    element: { text: '5 GB' },
    key: 252
  },
  {
    name: 'Storage-max',
    element: { text: '5 GB' },
    key: 253
  },
  {
    name: 'Sound Card-text',
    element: { text: 'Sound Card' },
    key: 261
  },
  {
    name: 'Sound Card-min',
    element: { text: '—' },
    key: 262
  },
  {
    name: 'Sound Card-max',
    element: { text: '—' },
    key: 263
  }
]
const COMPONENTS_LINUX_KEYS = [
  {
    key: 211
  },
  {
    key: 212
  },
  {
    key: 213
  },
  {
    key: 221
  },
  {
    key: 222
  },
  {
    key: 223
  },
  {
    key: 231
  },
  {
    key: 232
  },
  {
    key: 233
  },
  {
    key: 241
  },
  {
    key: 242
  },
  {
    key: 243
  },
  {
    key: 241
  },
  {
    key: 242
  },
  {
    key: 243
  },
  {
    key: 251
  },
  {
    key: 252
  },
  {
    key: 253
  },
  {
    key: 261
  },
  {
    key: 262
  },
  {
    key: 263
  }
]

const C_CUSTOM = [
  {
    element: {
      text: 'System requirements',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4rem',
        'color': '#000'
      }
    },
    key: 0
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#8CD2B5',
      'background-position': 'center center',
      'background-size': 'cover',
      'font-family': 'Lato',
      'font-size': 1.4,
      'font-weight': false,
      'font-style': false,
      'text-decoration': false,
      'text-align': 'center',
      'color': '#fff'
    },
    sizeIcons: {
      width: 32
    },
    colorFill: {
      color: '#393192'
    }
  },
  componentsRequirementswindows: _.merge({}, REQUIREMENTS_WINDOWS),
  componentsRequirementsapple: _.merge({}, REQUIREMENTS_OS),
  componentsRequirementslinux: _.merge({}, REQUIREMENTS_LINUX),
  components: _.merge({}, C_CUSTOM),
  edited: true
}

const HEADER = [
  {
    name: 'TextElement',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title'
  }
]

const GROUP_NAME = 'System'
const NAME = 'System'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults],

  cover: '/img/covers/system.jpg',

  components: {
    VuseIcon
  },

  $schema: {
    mainStyle: types.SystemRequirements,
    container: types.StyleObject,
    components: _.merge([], HEADER, { key: 0 }),
    componentsRequirementswindows: _.merge([], REQUIREMENTS, COMPONENTS_WINDOWS_KEYS),
    componentsRequirementsapple: _.merge([], REQUIREMENTS, COMPONENTS_OS_KEYS),
    componentsRequirementslinux: _.merge([], REQUIREMENTS, COMPONENTS_LINUX_KEYS)
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),

    selectPlatform (key) {
      if (!this.$sectionData.mainStyle.systemRequirements[key].visible) {
        return
      }

      this.$sectionData.mainStyle.selectPlatform.name = key
    },

    async showSettings (panel) {
      let index = _.findIndex(this.$builder.sections, ['group', GROUP_NAME])

      this.setSettingSection(this.$builder.sections[index])

      await this.$nextTick()

      this.setControlPanel(panel)
    }
  },

  created () {
    Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
  },

  mounted () {
    this.selectPlatform('apple')
  }
}
</script>

<template>
  <section class="l-system"
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    >
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
                  <component
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
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <div class="b-system">
            <div class="b-system__padd">
              <!-- Setting controls -->
              <div class="b-system__controls">
                <div>
                  <a href="#" class="b-system__control" @click.stop="showSettings('SectionSystemSettings')">
                    <icon-base name="cog" width="12" height="15" />
                  </a>
                </div>
                <div>
                  <a href="#" class="b-system__control" @click.stop="showSettings('SectionSystemStyle')">
                    <icon-base name="style" width="12" height="15" />
                  </a>
                </div>
              </div>

              <div class="b-system__padd-border">
                <div class="b-system-platforms flex flex_center">
                  <div tabs-link="tabs-link" class="b-system-platforms__item" v-for="(value, key) in $sectionData.mainStyle.systemRequirements" :key="key"
                       v-show="$sectionData.mainStyle.systemRequirements[key].visible"
                       :class="{ 'b-system-platforms__item_opacity' : false === $sectionData.mainStyle.systemRequirements[key].visible, 'b-system-platforms__item_active': key === $sectionData.mainStyle.selectPlatform.name }">
                    <div
                      class="b-system-platforms__item__tab"
                      @click.stop="selectPlatform(key)"
                      :class="{ 'b-system-platforms__item__tab_active': key === $sectionData.mainStyle.selectPlatform.name }"
                      :style="{
                        'background-color' : $sectionData.mainStyle.table.body['background-color'],
                        'border-color' : $sectionData.mainStyle.table.head['background-color']
                      }"
                      >
                      <span class="b-system-platforms__item__tab-corner"
                        :style="{
                          'background-color' : $sectionData.mainStyle.table.body['background-color']
                        }"
                      />
                      <span class="b-system-platforms__item__tab-icon"
                        :style="{ width: $sectionData.mainStyle.sizeIcons.width + 'px', fill: $sectionData.mainStyle.colorFill.color }"
                        >
                        <VuseIcon :name="key"></VuseIcon>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="b-system-requirements">
                  <div class="b-system-requirements__table">
                    <div tabs-content="tabs-content" v-for="(value, key) in $sectionData.mainStyle.systemRequirements" :key="key"
                        v-show="$sectionData.mainStyle.systemRequirements[key].visible && $sectionData.mainStyle.selectPlatform.name === key">
                      <div>
                        <div class="b-system-requirements__table-row  flex"
                          :style="{
                            'color' : $sectionData.mainStyle.table.head['color'],
                            'font-family' : $sectionData.mainStyle.table.head['font-family'],
                            'font-size' : $sectionData.mainStyle.table.head['font-size'],
                            'font-weight' : $sectionData.mainStyle.table.head['font-weight'],
                            'font-style' : $sectionData.mainStyle.table.head['font-style'],
                            'text-decoration' : $sectionData.mainStyle.table.head['text-decoration'],
                            'background-color' : $sectionData.mainStyle.table.head['background-color']
                          }"
                          >
                          <div class="b-system-requirements__table-col">
                            <span class="b-system-requirements__table-chapter">
                              Component
                            </span>
                          </div>
                          <div class="b-system-requirements__table-col">
                            <span class="b-system-requirements__table-chapter">
                              Minimal requirement
                            </span>
                          </div>
                          <div class="b-system-requirements__table-col">
                            <span class="b-system-requirements__table-chapter">
                              Recommended
                            </span>
                          </div>
                        </div><!--/.b-system-requirements__table-row-->
                        <div class="b-system-requirements__table-row flex"
                          v-for="(row, i) in $sectionData.mainStyle.rowsRequirements" :key="i"
                          v-show="$sectionData.mainStyle.rowsRequirements[i].visible"
                          :style="{
                            'color' : $sectionData.mainStyle.table.body['color'],
                            'font-family' : $sectionData.mainStyle.table.body['font-family'],
                            'font-size' : $sectionData.mainStyle.table.body['font-size'],
                            'font-weight' : $sectionData.mainStyle.table.body['font-weight'],
                            'font-style' : $sectionData.mainStyle.table.body['font-style'],
                            'text-decoration' : $sectionData.mainStyle.table.body['text-decoration'],
                            'background-color' : $sectionData.mainStyle.table.body['background-color']
                          }"
                          >
                          <div class="b-system-requirements__table-col flex"
                             v-for="(col, index) in $sectionData[`componentsRequirements${key}`]"
                             :key="index"
                             v-if="col.prop === i"
                            >
                            <div class="b-system-requirements__table-col_name"
                              v-html="$sectionData[`componentsRequirements${key}`][index].element.text"
                              v-if="$sectionData[`componentsRequirements${key}`][index].name.indexOf('-text') !== -1"
                              >
                            </div>
                            <div class=""
                              v-styler:for="{ el: $sectionData[`componentsRequirements${key}`][index].element, path: `$sectionData.componentsRequirements${key}[${index}].element`, type: $sectionData[`componentsRequirements${key}`][index].type }"
                              :style="$sectionData[`componentsRequirements${key}`][index].element.styles"
                              v-html="$sectionData[`componentsRequirements${key}`][index].element.text"
                              v-if="$sectionData[`componentsRequirements${key}`][index].name.indexOf('-min') !== -1"
                              >
                            </div>
                            <div class=""
                                 v-styler:for="{ el: $sectionData[`componentsRequirements${key}`][index].element, path: `$sectionData.componentsRequirements${key}[${index}].element`, type: $sectionData[`componentsRequirements${key}`][index].type }"
                                 :style="$sectionData[`componentsRequirements${key}`][index].element.styles"
                                 v-html="$sectionData[`componentsRequirements${key}`][index].element.text"
                                 v-if="$sectionData[`componentsRequirements${key}`][index].name.indexOf('-max') !== -1"
                              >
                            </div>
                          </div>
                        </div><!--/.b-system-requirements__table-row-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><!--/.b-grid__col-->
      </div><!--/.b-grid__row-->
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'
@import '../../../assets/sass/_flex.sass'

.b-system
  $this: &
  padding: 0
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
      padding: 0
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
      border: 0.2rem dotted transparent
      .is-editable #{$this}__padd:hover &
        border: 0.2rem dotted #fff
  &-platforms
    justify-content: flex-start

    position: relative
    z-index: 0
    .is-mobile &
      justify-content: center
    @media only screen and (max-width: 540px)
      &
        justify-content: center
    &__item
      $item: &
      transition: all 200ms
      position: relative
      cursor: pointer
      opacity: 1
      border: dotted transparent 0.1rem
      cursor: pointer
      &_opacity
        display: none
        .is-editable &
          opacity: 0.2
          display: block
      &__tab
        $tab: &
        position: relative
        z-index: 0

        padding: $size-step/4
        margin: 0 $size-step/4 0 0
        transition: all 200ms

        display: flex
        align-items: center

        border: 0.2rem solid rgba($black, 0.1)
        border-radius: 0.4rem
        &-text
          display: inline-block
          position: relative
          max-width: 20rem
          text-overflow: ellipsis
          white-space: nowrap
          padding: $size-step/8
          overflow: hidden
          .is-mobile &
            max-width: 16rem
            font-size: 1.4rem !important
          @media only screen and (max-width: 540px)
            &
              max-width: 16rem
              font-size: 1.4rem !important
        &-icon
          display: inline-block
          margin: 0.8rem
          & .vuse-icon
            width: 100%
            height: auto
            fill: inherit
        &:hover,
        &_active
          cursor: pointer
          background-color: #fff
          border: 0.2rem solid  #fff
          border-radius: 4px
          box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.25)
        #{$item}_active &
          #{$tab}-corner
            content: ""
            position: absolute
            left: 50%
            bottom: 0

            width: $size-step/2
            height: $size-step/2
            margin: $size-step/4 -$size-step/2 0 -$size-step/4
            background-color: #fff

            transform: rotate(45deg)
            transition: all 200ms
  &__controls
    position: absolute
    top: -$size-step
    left: $size-step/3

    display: flex
    align-items: center
    justify-content: center

    display: none
    .is-editable #{$this}__padd:hover &
      display: flex !important
  &__control
    width: 3.2rem
    height: 3.2rem
    display: flex
    align-items: center
    justify-content: center

    border-radius: 50%
    background: $white
    box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)
    margin-right: .4rem
    svg
      fill: $dark-blue-krayola
      margin-bottom: 0
    &:hover, .active
      background: $dark-blue-krayola
      svg
        fill: $white
        margin-bottom: 0

.b-system-requirements
  &__table
    margin: $size-step 0 0
    &-chapter
     .is-mobile &
       white-space: nowrap
       width: 6.5rem
       overflow: hidden
       text-overflow: ellipsis
       display: inline-block
     @media only screen and (max-width: 540px)
       &
         white-space: nowrap
         width: 6.5rem
         overflow: hidden
         text-overflow: ellipsis
         display: inline-block
    &-row
      border-bottom: 0.1rem dotted #333
      border-color: inherit
      &_opacity
        display: none
        .is-editable &
          opacity: 0.2
          display: flex
      &-padd
    &-col
      padding: $size-step/2
      width: 38%
      word-break: break-all
      text-align: left
      &:nth-child(1)
        width: 24%
        white-space: nowrap
        .is-mobile &
          width: 35%
        @media only screen and (max-width: 540px)
          &
            width: 35%
      &_name
        opacity: 0.6
      .is-mobile &
        padding: $size-step/4
        font-size: 1.4rem !important
      @media only screen and (max-width: 540px)
        &
          padding: $size-step/4
          font-size: 1.4rem !important
</style>
