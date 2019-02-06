<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-footer-game-logo',
    label: 'logo',
    key: 0
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-footer-copyright',
    label: 'description',
    key: 1
  },
  {
    name: 'Link',
    element: types.Link,
    type: 'button',
    class: 'b-footer-link',
    label: 'link',
    key: 2
  },
  {
    name: 'Link',
    element: types.Link,
    type: 'button',
    class: 'b-footer-link',
    label: 'link',
    key: 3
  },
  {
    name: 'Link',
    element: types.Link,
    type: 'button',
    class: 'b-footer-link',
    label: 'link',
    key: 4
  },
  {
    name: 'AgeRestrictions',
    element: types.AgeRestrictions,
    type: 'restrictions',
    class: 'b-age-restrictions',
    label: 'age restrictions',
    key: 5
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn341.cdn.stg.gamenet.ru/0/7MZTn/o_21pVfk.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'width': '153px',
        'height': '71px'
      }
    },
    key: 0
  },
  {
    element: {
      text: '2018—2019. Some text for footer',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    },
    key: 1
  },
  {
    element: {
      text: 'Information',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'color': '#FF6D64',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'font-size': '1.6rem'
      }
    },
    key: 2
  },
  {
    element: {
      text: 'Legal',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'color': '#FF6D64',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'font-size': '1.6rem'
      }
    },
    key: 3
  },
  {
    element: {
      text: 'Something',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'color': '#FF6D64',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'font-size': '1.6rem'
      }
    },
    key: 4
  }
]

const GROUP_NAME = 'Footer'
const NAME = 'Footer'
const BG_SECTION = 'url(https://gn685.cdn.stg.gamenet.ru/0/7MZzz/o_bJr44.jpg)'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
  },
  components: _.merge({}, C_CUSTOM),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/footer.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionDataStore = this.$store.state.Landing.sectionData[NAME]
    let sectionData = this.canRestore(GROUP_NAME, NAME) ? sectionDataStore : SCHEMA_CUSTOM
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, NAME, SCHEMA_CUSTOM)
  }
}
</script>

<template>
  <section
    class="b-section-footer"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
    <div class="b-footer">
      <div class="b-grid">
        <div class="b-grid__row b-footer__row">
          <div class="b-grid__col-12 b-grid__col-m-12">
            <sandbox
                :style="$sectionData.container.styles"
                container-path="$sectionData.container"
                components-path="$sectionData.components"
                class="b-footer__col b-footer__col_1">

              <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
                <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                  <component
                    v-if="$sectionData.components[index].element.isComplex"
                    v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                    :is="component.name"
                    :href="$sectionData.components[index].element.link.href"
                    :target="$sectionData.components[index].element.link.target"
                    :style="$sectionData.components[index].element.styles"
                    :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                    :path="`components[${index}].element`"
                    class="b-footer-component"
                    >
                  </component>
                  <component
                    v-if="!$sectionData.components[index].element.isComplex"
                    v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                    v-html="$sectionData.components[index].element.text"
                    :is="component.name"
                    :href="$sectionData.components[index].element.link.href"
                    :target="$sectionData.components[index].element.link.target"
                    :style="$sectionData.components[index].element.styles"
                    :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                    :path="`components[${index}].element`"
                    class="b-footer-component"
                    >
                  </component>
                </div>
              </draggable>
            </sandbox>
          </div>
        </div><!--/.b-grid__row.b-footer__row-->
      </div><!--/.b-grid-->
    </div><!--/.b-footer-->
  </section>
</template>

<style lang="sass" scoped>
.b-section-footer
  position: relative
  width: 100%
  min-height: 14rem
  margin: 0
  display: flex
  text-align: center
  justify-content: center
  align-items: center
  flex-direction: column
  transition: background 200ms
  .is-mobile &,
  .is-tablet &
    position: relative
    height: auto
    padding: 2rem 0 1rem
  @media only screen and (max-width: 768px)
    &
      position: relative
      height: auto
      padding: 2rem 0 1rem
.b-logo
.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-weight: 800
  font-size: 3.2rem
  text-align: center
  letter-spacing: 0.2em
  text-transform: uppercase
  text-shadow: 0 1.6rem 0.8rem rgba(0, 0, 0, 0.15)
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    padding: 0 1rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      padding: 0 1rem
.b-text
  color: rgba(255, 255, 255, 0.3)
  font-size: 2rem
  text-align: center
  .is-mobile &,
  .is-tablet &
    font-size: 1.4rem !important
  @media only screen and (max-width: 768px)
    &
      font-size: 1.4rem !important
.b-button
  color: #fff
  font-family: Heebo
  font-style: normal
  font-size: 1.6rem
  text-align: center
  letter-spacing: 0.2em
  width: auto
  height: auto
  background-color: rgb(255, 109, 100)
  box-shadow: none
  margin: 1.6rem
  padding: 0
  min-width: auto
  min-height: auto
  text-transform: uppercase
  border-radius: 2px
  text-align: center
  .is-mobile &,
  .is-tablet &
    width: 80% !important
  @media only screen and (max-width: 768px)
    &
      width: 80% !important
.b-sandbox
  min-height: 36.5rem
  padding: 5rem 0
  justify-content: flex-start
  align-items: center
  background-color: rgba(0, 0, 0, 0.1)
  max-width: 118.4rem
  width: 100%
  .is-mobile &,
  .is-tablet &
    padding: 1rem 0
  @media only screen and (max-width: 768px)
    &
      padding: 1rem 0
.b-footer
  overflow: hidden
  position: absolute
  bottom: 0
  left: 0
  right: 0
  background-color: #0C173C
  &__row
    align-items: center
  &__col
    min-height: auto
  &-logo,
  &-game-logo
  &-copyright
  .is-mobile &,
  .is-tablet &
    position: relative
    height: auto
  @media only screen and (max-width: 768px)
    &
      position: relative
      height: auto

.b-footer-component

/deep/
  .b-draggable-slot
    width: 100%
    display: flex
    text-align: center
    justify-content: center
    align-items: center
    flex-direction: column

</style>
