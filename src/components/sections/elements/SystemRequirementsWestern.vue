<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import VuseIcon from '@editor/components/VuseIcon'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const REQUIREMENTS = [
  {
    name: 'TextElement',
    nameCol: 'OS-text',
    prop: 'OS',
    element: types.Text
  },
  {
    name: 'TextElement',
    nameCol: 'OS-min',
    prop: 'OS',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'OS-max',
    prop: 'OS',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Processor-text',
    prop: 'Processor',
    element: types.Text
  },
  {
    name: 'TextElement',
    nameCol: 'Processor-min',
    prop: 'Processor',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Processor-max',
    prop: 'Processor',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Memory-text',
    prop: 'Memory',
    element: types.Text
  },
  {
    name: 'TextElement',
    nameCol: 'Memory-min',
    prop: 'Memory',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Memory-max',
    prop: 'Memory',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Graphics-text',
    prop: 'Graphics',
    element: types.Text
  },
  {
    name: 'TextElement',
    nameCol: 'Graphics-min',
    prop: 'Graphics',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Graphics-max',
    prop: 'Graphics',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Direct X-text',
    prop: 'Direct X',
    element: types.Text
  },
  {
    name: 'TextElement',
    nameCol: 'Direct X-min',
    prop: 'Direct X',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Direct X-max',
    prop: 'Direct X',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Storage-text',
    prop: 'Storage',
    element: types.Text
  },
  {
    name: 'TextElement',
    nameCol: 'Storage-min',
    prop: 'Storage',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Storage-max',
    prop: 'Storage',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Sound Card-text',
    prop: 'Sound Card',
    element: types.Text
  },
  {
    name: 'TextElement',
    nameCol: 'Sound Card-min',
    prop: 'Sound Card',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  },
  {
    name: 'TextElement',
    nameCol: 'Sound Card-max',
    prop: 'Sound Card',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'Text'
  }
]

const REQUIREMENTS_WINDOWS = [
  {
    nameCol: 'OS-text',
    element: { text: 'OS version' }
  },
  {
    nameCol: 'OS-min',
    element: { text: 'Windows 7, 8, 10', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'OS-max',
    element: { text: 'Windows 7, 8, 10', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Processor-text',
    element: { text: 'CPU' }
  },
  {
    nameCol: 'Processor-min',
    element: { text: 'Intel Core 2 Duo 2.5 GHz', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Processor-max',
    element: { text: 'Intel Core i5 3.0 GHz', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Memory-text',
    element: { text: 'RAM' }
  },
  {
    nameCol: 'Memory-min',
    element: { text: '1 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Memory-max',
    element: { text: '2 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Graphics-text',
    element: { text: 'Graphics' }
  },
  {
    nameCol: 'Graphics-min',
    element: { text: 'NVIDIA 9xxx / ATI 2xxx', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Graphics-max',
    element: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Direct X-text',
    element: { text: 'DX version' }
  },
  {
    nameCol: 'Direct X-min',
    element: { text: 'Version 9.0c', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Direct X-max',
    element: { text: 'Version 9.0c', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Storage-text',
    element: { text: 'Storage space' }
  },
  {
    nameCol: 'Storage-min',
    element: { text: '5 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Storage-max',
    element: { text: '5 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Sound Card-text',
    element: { text: 'Sound Card' }
  },
  {
    nameCol: 'Sound Card-min',
    element: { text: '—', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Sound Card-max',
    element: { text: '—', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  }
]

const REQUIREMENTS_OS = [
  {
    nameCol: 'OS-text',
    element: { text: 'OS version' }
  },
  {
    nameCol: 'OS-min',
    element: { text: 'Mac OSX 10.7.5', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'OS-max',
    element: { text: 'Mac OSX 10.7.5', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Processor-text',
    element: { text: 'CPU' }
  },
  {
    nameCol: 'Processor-min',
    element: { text: 'Intel Core 2 Duo 2.5 GHz', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Processor-max',
    element: { text: 'Intel Core i5 3.0 GHz', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Memory-text',
    element: { text: 'RAM' }
  },
  {
    nameCol: 'Memory-min',
    element: { text: '1 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Memory-max',
    element: { text: '2 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Graphics-text',
    element: { text: 'Graphics' }
  },
  {
    nameCol: 'Graphics-min',
    element: { text: 'NVIDIA 9xxx / ATI 2xxx', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Graphics-max',
    element: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Direct X-text',
    element: { text: 'DX version' }
  },
  {
    nameCol: 'Direct X-min',
    element: { text: 'Version 9.0c', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Direct X-max',
    element: { text: 'Version 9.0c', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Storage-text',
    element: { text: 'Storage space' }
  },
  {
    nameCol: 'Storage-min',
    element: { text: '5 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Storage-max',
    element: { text: '5 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Sound Card-text',
    element: { text: 'Sound Card' }
  },
  {
    nameCol: 'Sound Card-min',
    element: { text: '—', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Sound Card-max',
    element: { text: '—', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  }
]

const REQUIREMENTS_LINUX = [
  {
    nameCol: 'OS-text',
    element: { text: 'OS version' }
  },
  {
    nameCol: 'OS-min',
    element: { text: 'Ubuntu/SteamOS', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'OS-max',
    element: { text: 'Ubuntu/SteamOS', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Processor-text',
    element: { text: 'CPU' }
  },
  {
    nameCol: 'Processor-min',
    element: { text: 'Intel Core 2 Duo 2.5 GHz', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Processor-max',
    element: { text: 'Intel Core i5 3.0 GHz', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Memory-text',
    element: { text: 'RAM' }
  },
  {
    nameCol: 'Memory-min',
    element: { text: '1 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Memory-max',
    element: { text: '2 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Graphics-text',
    element: { text: 'Graphics' }
  },
  {
    nameCol: 'Graphics-min',
    element: { text: 'NVIDIA 9xxx / ATI 2xxx', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Graphics-max',
    element: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Direct X-text',
    element: { text: 'DX version' }
  },
  {
    nameCol: 'Direct X-min',
    element: { text: 'Version 9.0c', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Direct X-max',
    element: { text: 'Version 9.0c', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Storage-text',
    element: { text: 'Storage space' }
  },
  {
    nameCol: 'Storage-min',
    element: { text: '5 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Storage-max',
    element: { text: '5 GB', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Sound Card-text',
    element: { text: 'Sound Card' }
  },
  {
    nameCol: 'Sound Card-min',
    element: { text: '—', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  },
  {
    nameCol: 'Sound Card-max',
    element: { text: '—', removable: false, canCopy: false, editor: { styles: true, tags: false, link: false } }
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<h1><b>System requirements</b><h1>',
      styles: {
        'font-size': '4rem',
        'color': '#fff',
        'padding-top': '60px'
      },
      media: {
        'is-mobile': {
          'font-size': '3rem',
          'padding-top': '10px'
        }
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/92242961-9cc0-4545-8b63-2d707be38e17.jpg)',
      'background-color': '#000000',
      'background-position': '50% 50%',
      'background-size': 'cover',
      'font-size': 1.4,
      'font-weight': false,
      'font-style': false,
      'text-decoration': false,
      'text-align': 'center',
      'color': '#fff',
      'height': '100vh'
    },
    sizeIcons: {
      width: 39
    },
    colorIcons: {
      default: '#1A83FF',
      active: '#ffffff'
    },
    table: {
      head: {
        'font-size': '1.6rem',
        'color': '#ffffff',
        'background-color': 'rgba(0,0,0,0)'
      },
      body: {
        'font-size': '1.6rem',
        'color': '#ffffff',
        'background-color': 'rgba(0,0,0,0)'
      }
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
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  }
]

const GROUP_NAME = 'Elements'
const NAME = 'SystemRequirementsWestern'

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'System requirements presentation screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/system-western.jpg',

  components: {
    VuseIcon
  },

  $schema: {
    mainStyle: types.SystemRequirements,
    container: types.StyleObject,
    components: _.merge([], HEADER),
    componentsRequirementswindows: _.merge([], REQUIREMENTS),
    componentsRequirementsapple: _.merge([], REQUIREMENTS),
    componentsRequirementslinux: _.merge([], REQUIREMENTS)
  },

  methods: {
    selectPlatform (key) {
      if (!this.$sectionData.mainStyle.systemRequirements[key].visible) {
        return
      }

      this.$sectionData.mainStyle.selectPlatform.name = key
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  },

  mounted () {
    this.selectPlatform('windows')
  }
}
</script>

<template>
  <section class="l-system"
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia, $sectionData.objVarsSizeIcons, $sectionData.objVarsTable]"
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
              :style="$sectionData.container.styles"
            >
              <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
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
            <div class="b-section-padd">
              <div class="b-section-padd-border">
                <div class="b-system-platforms flex flex_center">
                  <div tabs-link="tabs-link" class="b-system-platforms__item" v-for="(value, key) in $sectionData.mainStyle.systemRequirements" :key="key"
                       v-show="$sectionData.mainStyle.systemRequirements[key].visible"
                       :class="{ 'b-system-platforms__item_opacity' : false === $sectionData.mainStyle.systemRequirements[key].visible, 'b-system-platforms__item_active': key === $sectionData.mainStyle.selectPlatform.name }">
                    <div
                      class="b-system-platforms__item__tab"
                      @click.stop="selectPlatform(key)"
                      :class="{ 'b-system-platforms__item__tab_active': key === $sectionData.mainStyle.selectPlatform.name }"
                      >
                      <span class="b-system-platforms__item__tab-corner">
                        <svg width="32" height="9" viewBox="0 0 32 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M31.5885 8.5L16 1L0.41156 8.5" :stroke="$sectionData.mainStyle.colorIcons.active"/>
                        </svg>
                      </span>
                      <span class="b-system-platforms__item__tab-icon b-size-icons"
                        :style="{
                          width: $sectionData.mainStyle.sizeIcons.width + 'px',
                          height: $sectionData.mainStyle.sizeIcons.width + 'px',
                          '--color-default': $sectionData.mainStyle.colorIcons.default,
                          '--color-active': $sectionData.mainStyle.colorIcons.active
                         }"
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
                        <div class="b-system-requirements__table-row b-table-media-head flex"
                          :style="{
                            'color' : $sectionData.mainStyle.table.head['color'],
                            'font-size' : $sectionData.mainStyle.table.head['font-size'],
                            'line-height' : $sectionData.mainStyle.table.head['line-height'],
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
                              Minimal
                            </span>
                          </div>
                          <div class="b-system-requirements__table-col">
                            <span class="b-system-requirements__table-chapter">
                              Recommended
                            </span>
                          </div>
                        </div><!--/.b-system-requirements__table-row-->
                        <div class="b-system-requirements__table-row b-table-media-body flex"
                          v-for="(row, i) in $sectionData.mainStyle.rowsRequirements" :key="i"
                          v-show="$sectionData.mainStyle.rowsRequirements[i].visible"
                          :style="{
                            'color' : $sectionData.mainStyle.table.body['color'],
                            'font-size' : $sectionData.mainStyle.table.body['font-size'],
                            'line-height' : $sectionData.mainStyle.table.body['line-height'],
                            'font-weight' : $sectionData.mainStyle.table.body['font-weight'],
                            'font-style' : $sectionData.mainStyle.table.body['font-style'],
                            'text-decoration' : $sectionData.mainStyle.table.body['text-decoration'],
                            'background-color' : $sectionData.mainStyle.table.body['background-color']
                          }"
                          >
                          <div class="b-system-requirements__table-col"
                             v-for="(col, index) in $sectionData[`componentsRequirements${key}`]"
                             :key="index"
                             v-if="col.prop === i"
                            >
                            <div class="b-system-requirements__table-col_name b-table-media-body"
                              v-if="$sectionData[`componentsRequirements${key}`][index].nameCol.indexOf('-text') !== -1"
                              v-html="$sectionData[`componentsRequirements${key}`][index].element.text"
                              >
                            </div>
                            <div class=""
                              v-if="$sectionData[`componentsRequirements${key}`][index].nameCol.indexOf('-min') !== -1"
                              >
                              <component
                                v-styler:for="{ el: $sectionData[`componentsRequirements${key}`][index].element, path: `$sectionData.componentsRequirements${key}[${index}].element`, type: $sectionData[`componentsRequirements${key}`][index].type, label: $sectionData[`componentsRequirements${key}`][index].label }"
                                :path="`componentsRequirements${key}[${index}].element`"
                                :is="$sectionData[`componentsRequirements${key}`][index].name"
                                :class="[$sectionData[`componentsRequirements${key}`][index].element.classes, $sectionData[`componentsRequirements${key}`][index].class, 'b-table-media-body']"
                                >
                                <div v-html="$sectionData[`componentsRequirements${key}`][index].element.text"></div>
                              </component><!--/.-->
                            </div>
                            <div class=""
                              v-if="$sectionData[`componentsRequirements${key}`][index].nameCol.indexOf('-max') !== -1"
                              >
                              <component
                                v-styler:for="{ el: $sectionData[`componentsRequirements${key}`][index].element, path: `$sectionData.componentsRequirements${key}[${index}].element`, type: $sectionData[`componentsRequirements${key}`][index].type, label: $sectionData[`componentsRequirements${key}`][index].label }"
                                :path="`componentsRequirements${key}[${index}].element`"
                                :is="$sectionData[`componentsRequirements${key}`][index].name"
                                :class="[$sectionData[`componentsRequirements${key}`][index].element.classes, $sectionData[`componentsRequirements${key}`][index].class, 'b-table-media-body']"
                                >
                                <div v-html="$sectionData[`componentsRequirements${key}`][index].element.text"></div>
                              </component><!--/.-->
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
</style>
