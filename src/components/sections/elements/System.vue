<script>
import * as types from '@editor/types'
import VuseIcon from '@editor/components/VuseIcon'
import Seeder from '@editor/seeder'
import * as _ from 'lodash-es'

const REQUIREMENTS = {
  'OS': { text: types.TextInherit, min: types.TextInherit, max: types.TextInherit },
  'Processor': { text: types.TextInherit, min: types.TextInherit, max: types.TextInherit },
  'Memory': { text: types.TextInherit, min: types.TextInherit, max: types.TextInherit },
  'Graphics': { text: types.TextInherit, min: types.TextInherit, max: types.TextInherit },
  'Direct X': { text: types.TextInherit, min: types.TextInherit, max: types.TextInherit },
  'Storage': { text: types.TextInherit, min: types.TextInherit, max: types.TextInherit },
  'Sound Card': { text: types.TextInherit, min: types.TextInherit, max: types.TextInherit }
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

export default {
  name: 'System',
  components: {
    VuseIcon
  },
  cover: '/img/covers/system.jpg',
  group: 'elements',
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
  props: {
    id: {
      type: Number, required: true
    }
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
    if (this.$sectionData['edited'] === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
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
    <div class="b-system">
      <div class="b-system-platforms flex flex_center">
        <div tabs-link="tabs-link" class="b-system-platforms__item" v-for="(value, key) in $sectionData.platforms" :key="key"
             v-show="$sectionData.mainStyle.systemRequirements[key].visible"
             :class="{ 'b-system-platforms__item_opacity' : false === $sectionData.platforms[key].visible, 'b-system-platforms__item_active': key === $sectionData.mainStyle.selectPlatform.name }">
          <div
            class="b-system-platforms__item__tab"
            @click="selectPlatform(key)"
            >
            <span class="b-system-platforms__item__tab-icon"
              :style="{ width: $sectionData.mainStyle.sizeIcons.width + 'px', fill: $sectionData.mainStyle.colorFill.color }"
              >
              <VuseIcon :name="key"></VuseIcon>
            </span>
            <span
              v-html="$sectionData.platforms[key].text.text"
              v-styler:for="{ el: $sectionData.platforms[key].text, path: `$sectionData.platforms[${key}].text`}"
              :style="$sectionData.platforms[key].text.styles"
              @click="selectPlatform(key)"
              >
              Enter your text
            </span>
          </div>
        </div>
      </div>
      <div class="b-system-requirements">
        <div class="b-system-requirements__table">
          <div tabs-content="tabs-content" v-for="(value, key) in $sectionData.platforms" :key="key"
              v-show="$sectionData.mainStyle.systemRequirements[key].visible && $sectionData.mainStyle.selectPlatform.name === key">
            <div>
              <div class="b-system-requirements__table-row  flex flex_center">
                <div class="b-system-requirements__table-col">

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
                >
                <div class="b-system-requirements__table-col"
                  v-styler:for="{ el: $sectionData.platforms[key].requirements[index].text, path: `$sectionData.platforms[${key}].requirements[${index}].text`}"
                  :style="$sectionData.platforms[key].requirements[index].text.styles"
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
  </section>
</template>

<style lang="sass" scoped="scoped">
@import '../../../assets/sass/_flex.sass'

.l-system
  position: relative
  width: 100%
  background-position: center
  background-size: cover
  color: #000
  padding: 3.2rem
  line-height: 1.4
  display: flex
  justify-content: center
  align-items: center
  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    padding: 1.6rem 0
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
.b-system
  max-width: 100rem
  margin: 0 auto
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &-platforms
   justify-content: space-around
   padding: 2rem 0
   border-bottom: 0.2rem solid inherit
   border-color: inherit
   &__item
     font-weight: bold
     transition: all 200ms
     position: relative
     cursor: pointer
     opacity: 1
     border: dotted transparent 0.1rem
     &_opacity
       display: none
       .is-editable &
         opacity: 0.2
         display: block
     &__tab
       border: dotted transparent 0.1rem
       padding: 0.5rem 1rem
       z-index: 0
       position: relative
       max-width: 20rem
       text-overflow: ellipsis
       white-space: nowrap
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
       border: dotted inherit 0.2rem
       border-color: inherit
       filter: invert(10%)

.b-system-requirements
  &__table
    margin: 3rem 0 0
    &-chapter
      font-size: 1.6rem
      font-weight: bold
    &-row
      border-bottom: 0.1rem dotted #333
      border-color: inherit
      &_opacity
        display: none
        .is-editable &
          opacity: 0.2
          display: flex
    &-col
      padding: 1rem
      width: 38%
      text-align: center
      word-break: break-all
      &:nth-child(1)
        text-align: left
        width: 24%
        white-space: nowrap

</style>
