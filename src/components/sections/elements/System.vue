<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import VuseIcon from '@editor/components/VuseIcon'
import section from '../../mixins/section.js'
import { mapActions } from 'vuex'

const REQUIREMENTS = {
  'OS': { text: {}, min: types.TextInherit, max: types.TextInherit },
  'Processor': { text: {}, min: types.TextInherit, max: types.TextInherit },
  'Memory': { text: {}, min: types.TextInherit, max: types.TextInherit },
  'Graphics': { text: {}, min: types.TextInherit, max: types.TextInherit },
  'Direct X': { text: {}, min: types.TextInherit, max: types.TextInherit },
  'Storage': { text: {}, min: types.TextInherit, max: types.TextInherit },
  'Sound Card': { text: {}, min: types.TextInherit, max: types.TextInherit }
}

const REQUIREMENTS_WINDOWS = {
  'OS': {
    text: { text: 'OS' },
    min: { text: 'Windows 7, 8, 10' },
    max: { text: 'Windows 7, 8, 10' }
  },
  'Processor': {
    text: { text: 'Processor' },
    min: { text: 'Intel Core 2 Duo 2.5 GHz' },
    max: { text: 'Intel Core i5 3.0 GHz' }
  },
  'Memory': {
    text: { text: 'Memory' },
    min: { text: '1 GB RAM' },
    max: { text: '2 GB RAM' }
  },
  'Graphics': {
    text: { text: 'Graphics' },
    min: { text: 'NVIDIA 9xxx / ATI 2xxx' },
    max: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X' }
  },
  'Direct X': {
    text: { text: 'Direct X' },
    min: { text: 'Version 9.0c' },
    max: { text: 'Version 9.0c' }
  },
  'Storage': {
    text: { text: 'Storage' },
    min: { text: '5 GB' },
    max: { text: '5 GB' }
  },
  'Sound Card': {
    text: { text: 'Sound Card' },
    min: { text: 'DirectX9 Compatible' },
    max: { text: 'DirectX9 Compatible' }
  }
}

const REQUIREMENTS_OS = {
  'OS': {
    text: { text: 'OS' },
    min: { text: 'Mac OSX 10.7.5' },
    max: { text: 'Mac OSX 10.7.5' }
  },
  'Processor': {
    text: { text: 'Processor' },
    min: { text: 'Intel Core 2 Duo 2.5 GHz' },
    max: { text: 'Intel Core i5 3.0 GHz' }
  },
  'Memory': {
    text: { text: 'Memory' },
    min: { text: '1 GB RAM' },
    max: { text: '2 GB RAM' }
  },
  'Graphics': {
    text: { text: 'Graphics' },
    min: { text: 'NVIDIA 9xxx / ATI 2xxx' },
    max: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X' }
  },
  'Direct X': {
    text: { text: 'Direct X' },
    min: { text: 'Version 9.0c' },
    max: { text: 'Version 9.0c' }
  },
  'Storage': {
    text: { text: 'Storage' },
    min: { text: '5 GB' },
    max: { text: '5 GB' }
  },
  'Sound Card': {
    text: { text: 'Sound Card' },
    min: { text: 'DirectX9 Compatible' },
    max: { text: 'DirectX9 Compatible' }
  }
}

const REQUIREMENTS_LINUX = {
  'OS': {
    text: { text: 'OS' },
    min: { text: 'Ubuntu/SteamOS' },
    max: { text: 'Ubuntu/SteamOS' }
  },
  'Processor': {
    text: { text: 'Processor' },
    min: { text: 'Intel Core 2 Duo 2.5 GHz' },
    max: { text: 'Intel Core i5 3.0 GHz' }
  },
  'Memory': {
    text: { text: 'Memory' },
    min: { text: '1 GB RAM' },
    max: { text: '2 GB RAM' }
  },
  'Graphics': {
    text: { text: 'Graphics' },
    min: { text: 'NVIDIA 9xxx / ATI 2xxx' },
    max: { text: 'NVIDIA GeForce GTX 760 / AMD Radeon R9 280X' }
  },
  'Direct X': {
    text: { text: 'Direct X' },
    min: { text: 'Version 9.0c' },
    max: { text: 'Version 9.0c' }
  },
  'Storage': {
    text: { text: 'Storage' },
    min: { text: '5 GB' },
    max: { text: '5 GB' }
  },
  'Sound Card': {
    text: { text: 'Sound Card' },
    min: { text: '—' },
    max: { text: '—' }
  }
}

const PLATFORMS_CUSTOM = {
  'windows': {
    text: { text: 'Windows' },
    requirements: _.merge({}, REQUIREMENTS_WINDOWS)
  },
  'apple': {
    text: { text: 'Apple' },
    requirements: _.merge({}, REQUIREMENTS_OS)
  },
  'linux': {
    text: { text: 'Linux' },
    requirements: _.merge({}, REQUIREMENTS_LINUX)
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn819.cdn.stg.gamenet.ru/0/7L5P8/o_Dyakc.png)',
      'background-color': '#151C44',
      'background-position': 'center center',
      'background-size': 'cover',
      'font-family': 'Lato',
      'font-size': 1.4,
      'font-weight': false,
      'font-style': false,
      'text-decoration': false,
      'text-align': 'center',
      'color': '#fff'
    }
  },
  platforms: _.merge({}, PLATFORMS_CUSTOM),
  edited: true
}

const GROUP_NAME = 'System'
const NAME = 'System'

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/system.jpg',

  components: {
    VuseIcon
  },

  $schema: {
    mainStyle: types.SystemRequirements,
    platforms: {
      'windows': {
        element: types.TextInherit,
        requirements: _.merge({}, REQUIREMENTS),
        text: types.TextInherit,
        min: types.TextInherit,
        rec: types.TextInherit
      },
      'apple': {
        element: types.TextInherit,
        requirements: _.merge({}, REQUIREMENTS),
        text: types.TextInherit,
        min: types.TextInherit,
        rec: types.TextInherit
      },
      'linux': {
        element: types.TextInherit,
        requirements: _.merge({}, REQUIREMENTS),
        button: types.Button,
        text: types.TextInherit,
        min: types.TextInherit,
        rec: types.TextInherit
      }
    }
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
    let groupDataStore = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionDataStore = this.$store.state.Landing.sectionData[NAME]
    let sectionData = this.canRestore(GROUP_NAME, NAME) ? sectionDataStore : SCHEMA_CUSTOM
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, NAME, SCHEMA_CUSTOM)
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
    <div class="b-system">
      <div class="b-system__padd-border">
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

        <div class="b-system-platforms flex flex_center">
          <div tabs-link="tabs-link" class="b-system-platforms__item" v-for="(value, key) in $sectionData.platforms" :key="key"
               v-show="$sectionData.mainStyle.systemRequirements[key].visible"
               :class="{ 'b-system-platforms__item_opacity' : false === $sectionData.platforms[key].visible }">
            <div
              class="b-system-platforms__item__tab"
              @click="selectPlatform(key)"
              :class="{ 'b-system-platforms__item__tab_active': key === $sectionData.mainStyle.selectPlatform.name }"
              >
              <span class="b-system-platforms__item__tab-icon"
                :style="{ width: $sectionData.mainStyle.sizeIcons.width + 'px', fill: $sectionData.mainStyle.colorFill.color }"
                >
                <VuseIcon :name="key"></VuseIcon>
              </span>
              <span class="b-system-platforms__item__tab-text"
                v-html="$sectionData.platforms[key].text.text"
                v-styler:for="{ el: $sectionData.platforms[key].text, path: `$sectionData.platforms[${key}].text`, type: 'inline'}"
                :style="{
                  'color' : $sectionData.mainStyle.table.head['color'],
                  'font-family' : $sectionData.mainStyle.table.head['font-family'],
                  'font-size' : $sectionData.mainStyle.table.head['font-size'],
                  'font-weight' : $sectionData.mainStyle.table.head['font-weight'],
                  'font-style' : $sectionData.mainStyle.table.head['font-style'],
                  'text-decoration' : $sectionData.mainStyle.table.head['text-decoration']
                }"
                @click="selectPlatform(key)"
                >
                {{ $sectionData.platforms[key].text.text }}
              </span>
            </div>
          </div>
        </div>
        <div class="b-system-requirements">
          <div class="b-system-requirements__table">
            <div tabs-content="tabs-content" v-for="(value, key) in $sectionData.platforms" :key="key"
                v-show="$sectionData.mainStyle.systemRequirements[key].visible && $sectionData.mainStyle.selectPlatform.name === key">
              <div>
                <div class="b-system-requirements__table-row  flex flex_center"
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
                      Minimum
                    </span>
                  </div>
                  <div class="b-system-requirements__table-col">
                    <span class="b-system-requirements__table-chapter">
                      Recommended
                    </span>
                  </div>
                </div><!--/.b-system-requirements__table-row-->
                <div class="b-system-requirements__table-row flex flex_center"
                  v-for="(v, index) in value.requirements" :key="index"
                  v-if="$sectionData.mainStyle.rowsRequirements[index].visible"
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
                  <div class="b-system-requirements__table-col b-system-requirements__table-col_name"
                    v-html="$sectionData.platforms[key].requirements[index].text.text"
                    >
                  </div>
                  <div class="b-system-requirements__table-col"
                    v-styler:for="{ el: $sectionData.platforms[key].requirements[index].min, path: `$sectionData.platforms[${key}].requirements[${index}].min`}"
                    :style="$sectionData.platforms[key].requirements[index].min.styles"
                    v-html="$sectionData.platforms[key].requirements[index].min.text"
                    >
                  </div>
                  <div class="b-system-requirements__table-col"
                       v-styler:for="{ el: $sectionData.platforms[key].requirements[index].max, path: `$sectionData.platforms[${key}].requirements[${index}].max`}"
                       :style="$sectionData.platforms[key].requirements[index].max.styles"
                       v-html="$sectionData.platforms[key].requirements[index].max.text"
                    >
                  </div>
                </div><!--/.b-system-requirements__table-row-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'
@import '../../../assets/sass/_flex.sass'

.b-system
  $this: &
  max-width: 100rem
  margin: 0 auto 3.2rem
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__padd-border
    padding: $size-step
    margin: $size-step*2

    transition: border 0.25s
    border: 0.2rem dotted transparent

    position: relative
    #{$this}:hover &
      border: 0.2rem dotted #fff
  &-platforms
    justify-content: flex-start

    position: relative
    z-index: 0
    &__item
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
        position: relative
        z-index: 0

        padding: $size-step/4
        transition: all 200ms

        display: flex
        align-items: center
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
          @media only screen and (max-width: 540px)
            &
              max-width: 16rem
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
          border-radius: 4px
        &_active
          &:before
            content: ""
            position: absolute
            left: 50%
            bottom: 0

            width: $size-step/2
            height: $size-step/2
            margin: $size-step/4 0 0 -$size-step/4
            background-color: #fff

            transform: rotate(45deg)
            transition: all 200ms
  &__controls
    position: absolute
    top: -4rem
    left: 0

    display: flex
    align-items: center
    justify-content: center

    display: none
    #{$this}:hover &
      display: flex
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
    &-row
      border-bottom: 0.1rem dotted #333
      border-color: inherit
      &_opacity
        display: none
        .is-editable &
          opacity: 0.2
          display: flex
    &-col
      padding: $size-step/2
      width: 38%
      text-align: center
      word-break: break-all
      &:nth-child(1)
        text-align: left
        width: 24%
        white-space: nowrap
      &_name
        opacity: 0.6

</style>
