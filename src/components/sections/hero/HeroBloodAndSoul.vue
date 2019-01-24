<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn67.cdn.gamenet.ru/TY0Xv2riHu/6OTe4/o_2ALU6l.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '544px',
        'height': '70px'
      }
    }
  },
  {
    element: {
      text: 'Chronicles of your ascent',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '28px',
        'color': '#000000'
      }
    }
  }
]

const C_CUSTOM2 = [
  {
    element: {
      text: 'Play game',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '36px',
        'color': '#000000',
        'background-color': '#ffa800',
        'width': '256px',
        'height': '70px',
        'border-radius': '2px'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn717.cdn.gamenet.ru/TY0Xv85rCS/6MG9a/o_2UvGS.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
  },
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM2),
  edited: true
}

const GROUP_NAME = 'Hero'
const NAME = 'HeroBAS'

export default {
  name: NAME,

  group: GROUP_NAME,

  cover: 'https://gn811.cdn.stg.gamenet.ru/0/7cEKX/o_182BvQ.png',

  components: {
    Draggable
  },

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    components: [
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image',
        class: 'b-logo'
      },
      {
        name: 'Title',
        element: types.Title,
        type: 'title',
        class: 'b-title'
      }
    ],
    components2: [
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-button-test'
      }
    ]
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

    onAddElement (element) {
      element.element.removable = true
      this.$section.data.components.push(element)
    },
    onAddElement2 (element) {
      element.element.removable = true
      this.$section.data.components2.push(element)
    },

    storeData: _.after(2, (self) => {
      let data = {}
      self.$sectionData.components.forEach(component => {
        data[component.name] = component.element.text
      })
      self.updateGroupData({ name: GROUP_NAME, data })
      self.updateSectionData({
        name: NAME,
        data: _.cloneDeep(self.$sectionData)
      })
    }),

    canRestore () {
      return this.$store.state.Landing.groups.indexOf(GROUP_NAME) === -1 && !!this.$store.state.Landing.sectionData[NAME]
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      let data = this.canRestore() ? this.$store.state.Landing.sectionData[NAME] : SCHEMA_CUSTOM
      Seeder.seed(_.merge(this.$sectionData, data))
    }

    _.forEach(this.$store.state.Landing.groupData[GROUP_NAME], (text, name) => {
      let elementObj = _.find(this.$sectionData.components, { name })
      if (elementObj) {
        elementObj.element.text = text
      }
    })
  },

  updated () {
    this.storeData(this)
  }
}
</script>

<template>
  <section
    class="b-hero"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle">
    <div class="b-div">
      &nbsp;
    </div>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            class="b-sandbox"
          >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-hero-component"
                           v-if="$sectionData.components[index].element.isComplex"
                           v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
                           :is="component.name"
                           :href="$sectionData.components[index].element.href"
                           :target="$sectionData.components[index].element.target"
                           :path="`components[${index}].element`"
                           :style="$sectionData.components[index].element.styles"
                           :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                >
                </component>
                <component class="b-hero-component"
                           v-if="!$sectionData.components[index].element.isComplex"
                           v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
                           v-html="$sectionData.components[index].element.text"
                           :is="component.name"
                           :href="$sectionData.components[index].element.href"
                           :target="$sectionData.components[index].element.target"
                           :path="`components[${index}].element`"
                           :style="$sectionData.components[index].element.styles"
                           :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
      </div>
    </div>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="column"
            class="b-sandbox"
          >
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-hero-component"
                           v-if="$sectionData.components2[index].element.isComplex"
                           v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                           :is="component.name"
                           :href="$sectionData.components2[index].element.href"
                           :target="$sectionData.components2[index].element.target"
                           :path="`components[${index}].element`"
                           :style="$sectionData.components2[index].element.styles"
                           :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                >
                </component>
                <component class="b-hero-component"
                           v-if="!$sectionData.components2[index].element.isComplex"
                           v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                           v-html="$sectionData.components2[index].element.text"
                           :is="component.name"
                           :href="$sectionData.components2[index].element.href"
                           :target="$sectionData.components2[index].element.target"
                           :path="`components2[${index}].element`"
                           :style="$sectionData.components2[index].element.styles"
                           :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
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
.b-hero
  position: relative
  width: 100%
  min-height: 70rem
  margin: 0
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  .b-div
    height: 4rem
.b-logo
  .is-mobile &
    max-width: 25rem !important
  @media only screen and (max-width: 768px)
    &
      max-width: 25rem !important
</style>
