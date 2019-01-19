<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import VuseIcon from '@editor/components/VuseIcon'
import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'

const GROUP_NAME = 'Hero'
const NAME = 'HeroSkull'
const BG_SECTION = 'url(https://gn685.cdn.stg.gamenet.ru/0/7MZzz/o_bJr44.jpg)'

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo'
  },
  {
    name: 'Title',
    element: types.Title,
    type: 'text',
    class: 'b-title'
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button'
  },
  {
    name: 'AvailablePlatforms',
    element: types.AvailablePlatforms,
    type: 'available',
    class: 'b-available-platforms'
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn582.cdn.stg.gamenet.ru/0/7MYK7/o_Chxze.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'width': '74px',
        'height': '88px'
      }
    }
  },
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Heebo',
        'font-size': '5.6rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'This is a short description',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '2rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Heebo',
        'text-align': 'center',
        'font-size': '2rem',
        'width': '352px',
        'height': '64px',
        'border-radius': '2px'
      }
    }
  }
]

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
  components: {
    VuseIcon,
    Draggable
  },
  cover: '/img/covers/hero-skull.jpg',
  group: GROUP_NAME,
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS,
    groupDataStore: {},
    temp: {}
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  methods: {
    ...mapActions('Landing', [
      'updateGroupData',
      'updateSectionData'
    ]),

    checkSectionProps (newProps, oldProps, nameObj) {
      let props = {}
      props[nameObj] = {}

      for (let key in newProps) {
        if (key === 'styles') {
          for (let style in newProps[key]) {
            if (JSON.stringify(newProps[key][style]) !== JSON.stringify(oldProps[key][style])) {
              props[nameObj][key] = {}
              props[nameObj][key][style] = newProps[key][style]
            }
          }
        } else {
          if (JSON.stringify(newProps[key]) !== JSON.stringify(oldProps[key])) {
            props[nameObj][key] = newProps[key]
          }
        }
      }
      return props
    },

    storeData: _.after(2, function () {
      let self = this
      let data = {}
      let ms = {}
      let mainStyle = this.$sectionData.mainStyle
      let groupDataStore = self.$sectionData.groupDataStore
      let components = this.$sectionData.components
      let temp = self.$sectionData.temp

      // get change props of compoents
      groupDataStore.components = []
      components.forEach(function (item, i, arr) {
        let change = {}
        groupDataStore.components.push({})
        change = self.checkSectionProps(components[i].element, temp.components[i].element, 'element')
        groupDataStore.components[i] = change
      })

      // get change props of section styles
      ms = self.checkSectionProps(mainStyle, temp.mainStyle, 'mainStyle')

      _.merge(data, groupDataStore, ms)

      this.updateGroupData({ name: GROUP_NAME, data })
      this.updateSectionData({
        name: NAME,
        data: _.cloneDeep(this.$sectionData)
      })
    }),

    canRestore () {
      return this.$store.state.Landing.groups.indexOf(GROUP_NAME) !== -1 && !!this.$store.state.Landing.sectionData[NAME]
    }
  },

  created () {
    let groupData = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionData = this.$store.state.Landing.sectionData[NAME]

    if (sectionData !== undefined && sectionData.edited !== undefined) {
      this.$sectionData.edited = sectionData.edited
    }

    // set temp section data
    if (this.$sectionData.edited === undefined) {
      let data = this.canRestore() ? sectionData : SCHEMA_CUSTOM
      Seeder.seed(_.merge(this.$sectionData, data))
      if (groupData) {
        Seeder.seed(_.merge(this.$sectionData, groupData))
        _.merge(this.$sectionData.groupDataStore, groupData)
      }
    } else {
      if (this.canRestore()) {
        Seeder.seed(_.merge(this.$sectionData, sectionData))
      }
      if (groupData) {
        Seeder.seed(_.merge(this.$sectionData, groupData))
        _.merge(this.$sectionData.groupDataStore, groupData)
      }
    }

    // set temp section data for get the differences after change props
    this.$sectionData.temp = _.merge({}, this.$sectionData)
  },

  updated () {
    this.storeData()
  }
}
</script>

<template>
  <section
    class="b-hero-skull"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="video"/>
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
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
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
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
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
.b-hero-skull
  position: relative
  width: 100%
  min-height: 56rem
  margin: 0
  padding-bottom: 8rem
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
  max-width: 118.4rem
  width: 100%
  .is-mobile &,
  .is-tablet &
    padding: 1rem 0
  @media only screen and (max-width: 768px)
    &
      padding: 1rem 0
.b-footer
  // overflow: hidden
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
