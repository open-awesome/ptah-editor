<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn119.cdn.stg.gamenet.ru/0/7RbIo/o_1Ci11S.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '64px',
        'height': '147px'
      }
    }
  },
  {
    element: {
      text: 'Early Access Available Now',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '32px',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'Watch the trailer',
      video: 'Qg4n9IpjMg0',
      styles: {
        'background-color': 'transparent',
        'background-image': 'url(https://gn267.cdn.stg.gamenet.ru/0/7RbUP/o_KcVd3.png)',
        'background-size': 'cover',
        'color': '#ffffff',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'width': '352px',
        'height': '102px'
      },
      classes: [
        'ptah-a-fade'
      ]
    }
  },
  {
    element: {
      text: 'Play now',
      styles: {
        'background-color': 'transparent',
        'background-image': 'url(https://gn342.cdn.stg.gamenet.ru/0/7RbXk/o_1j8P9r.png)',
        'background-size': 'cover',
        'color': 'transparent',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'width': '352px',
        'height': '54px'
      },
      classes: [
        'ptah-a-fade'
      ]
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn88.cdn.stg.gamenet.ru/0/7RaWm/o_1lKIVY.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    },
    classes: [
      'full-height'
    ]
  },
  components: _.merge({}, C_CUSTOM),
  edited: true
}

const GROUP_NAME = 'Hero'
const NAME = 'HeroHunt'

export default {
  name: NAME,

  group: GROUP_NAME,

  cover: 'https://gn805.cdn.stg.gamenet.ru/0/7RcdN/o_WboBn.png',

  components: {
    Draggable
  },

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: [
      {
        name: 'Logo',
        element: types.Logo,
        type: 'image',
        class: 'b-hunt-logo'
      },
      {
        name: 'Title',
        element: types.Title,
        type: 'title',
        class: 'b-hunt-title'
      },
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-hunt-button'
      },
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-hunt-button'
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
    onAddElement (element) {
      element.element.removable = true
      this.$section.data.components.push(element)
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
    class="b-hunt"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-5">
          <sandbox
            class="b-sandbox b-hunt-sandbox"
            ref="sandbox"
            path="$sectionData.container"
            direction="column"
          >
            <elements-list @addEl="onAddElement"></elements-list>
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
  </section>
</template>

<style lang="sass" scoped>
.b-hunt
  .b-grid,
  .b-grid__row
    height: 100%
  .b-hunt-sandbox
    height: 100%
    /deep/
      .b-draggable-slot
        height: 100%
        justify-content: flex-end
</style>
