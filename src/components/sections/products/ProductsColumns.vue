<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    }
  },
  {
    element: {
      text: 'Start Edition'
    }
  },
  {
    element: {
      text: '39$'
    }
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    }
  },
  {
    element: {
      icon: {
        text: 'Suit of Legacy Armor'
      }
    }
  },
  {
    element: {
      icon: {
        text: 'Mithril Box'
      }
    }
  },
  {
    element: {
      icon: {
        text: 'Heroic Boosters'
      }
    }
  },
  {
    element: {
      icon: {
        text: 'Summon Mistfire Wolf Elite Skil'
      }
    }
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    }
  },
  {
    element: {
      text: 'Full Edition'
    }
  },
  {
    element: {
      text: '49$'
    }
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions.' +
      '<div>Her yet there truth merit.</div>' +
      '<div>Mrs all projecting favourable now unpleasing.</div>'
    }
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    }
  },
  {
    element: {
      text: 'Deluxe Edition'
    }
  },
  {
    element: {
      text: '59$'
    }
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions.' +
      '<div>Her yet there truth merit.</div>' +
      '<div>Mrs all projecting favourable now unpleasing.</div>'
    }
  }
]

const C_CUSTOM_4 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn537.cdn.stg.gamenet.ru/0/7RH35/o_1XowOi.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '160px',
        'height': '130px'
      }
    }
  },
  {
    element: {
      text: 'Ultimate Edition'
    }
  },
  {
    element: {
      text: '79$'
    }
  },
  {
    element: {
      text: 'Buy now',
      styles: {
        'background-color': 'rgba(245,166,35,1)',
        'color': '#000',
        'font-family': 'Lato',
        'font-size:': '1.4rem',
        'text-align': 'center',
        'width': '224px',
        'height': '56px',
        'border-radius': '2px'
      }
    }
  },
  {
    element: {
      text: 'An sincerity so extremity he additions.' +
      '<div>Her yet there truth merit.</div>' +
      '<div>Mrs all projecting favourable now unpleasing.</div>'
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn664.cdn.stg.gamenet.ru/0/7RIc1/o_4g83t.jpg)',
      'background-color': 'rgba(21,28,68,0.73)'
    }
  },
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM_2),
  components3: _.merge({}, C_CUSTOM_3),
  components4: _.merge({}, C_CUSTOM_4),
  edited: true
}

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo'
  },
  {
    name: 'Title',
    element: types.IconWithText,
    type: 'text',
    class: 'b-title'
  },
  {
    name: 'Cost',
    element: types.Cost,
    type: 'text',
    class: 'b-cost'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'text',
    class: 'b-text-icon'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'text',
    class: 'b-text-icon'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'text',
    class: 'b-text-icon'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'text',
    class: 'b-text-icon'
  }
]

export default {
  name: 'ProductsColumns',
  components: {
    Draggable
  },
  cover: '/img/covers/columns3.jpg',
  group: 'Products',
  $schema: {
    mainStyle: types.ProductSection,
    header: types.Title,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    components: COMPONENTS,
    components2: COMPONENTS,
    components3: COMPONENTS,
    components4: COMPONENTS
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
    onAddElement2 (element) {
      element.element.removable = true
      this.$section.data.components2.push(element)
    },
    onAddElement3 (element) {
      element.element.removable = true
      this.$section.data.components3.push(element)
    },
    onAddElement4 (element) {
      element.element.removable = true
      this.$section.data.components4.push(element)
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
    class="b-products-colums"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <div class="b-grid">
      <div class="b-grid__row b-products-colums__row">
        <div class="b-grid__col-3 b-grid__col-m-12 "
          v-if="$sectionData.mainStyle.products['Standart'].visible"
          >
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <elements-list @addEl="onAddElement"></elements-list>
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
              <div :class="{ 'b-products-colums__icon-with-text' : component.name === 'IconWithText' }"
                v-for="(component, index) in $sectionData.components"
                v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-products-colums-component"
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
                <component class="b-products-colums-component"
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
        <div class="b-grid__col-3 b-grid__col-m-12"
          v-if="$sectionData.mainStyle.products['Full'].visible"
          >
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container2"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <elements-list @addEl="onAddElement2"></elements-list>
            <draggable v-model="$sectionData.components2" class="b-draggable-slot" :style="$sectionData.container2.styles">
              <div :class="{ 'b-products-colums__icon-with-text' : component.name === 'IconWithText' }"
                   v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components2[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.href"
                  :target="$sectionData.components2[index].element.target"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
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
        <div class="b-grid__col-3 b-grid__col-m-12"
          v-if="$sectionData.mainStyle.products['Deluxe'].visible"
          >
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container3"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <elements-list @addEl="onAddElement3"></elements-list>
            <draggable v-model="$sectionData.components3" class="b-draggable-slot" :style="$sectionData.container3.styles">
              <div :class="{ 'b-products-colums__icon-with-text' : component.name === 'IconWithText' }"
                   v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components3[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.href"
                  :target="$sectionData.components3[index].element.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components3[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
                  v-html="$sectionData.components3[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.href"
                  :target="$sectionData.components3[index].element.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  >
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-3 b-grid__col-m-12"
          v-if="$sectionData.mainStyle.products['Ultimate'].visible"
          >
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container4"
            direction="column"
            :style="{ 'background-color' : $sectionData.mainStyle.styles['background-color'] }"
            >
            <elements-list @addEl="onAddElement4"></elements-list>
            <draggable v-model="$sectionData.components4" class="b-draggable-slot" :style="$sectionData.container4.styles">
              <div :class="{ 'b-products-colums__icon-with-text' : component.name === 'IconWithText' }"
                   v-for="(component, index) in $sectionData.components4" v-if="$sectionData.components4.length !== 0" :key="index">
                <component class="b-products-colums-component"
                  v-if="$sectionData.components4[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type }"
                  :is="component.name"
                  :href="$sectionData.components4[index].element.href"
                  :target="$sectionData.components4[index].element.target"
                  :path="`components4[${index}].element`"
                  :style="$sectionData.components4[index].element.styles"
                  :class="[$sectionData.components4[index].element.classes, $sectionData.components4[index].class]"
                  >
                </component>
                <component class="b-products-colums-component"
                  v-if="!$sectionData.components4[index].element.isComplex"
                  v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type }"
                  v-html="$sectionData.components4[index].element.text"
                  :is="component.name"
                  :href="$sectionData.components4[index].element.href"
                  :target="$sectionData.components4[index].element.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components4[index].element.styles"
                  :class="[$sectionData.components4[index].element.classes, $sectionData.components4[index].class]"
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
$h: 100vh
.b-products-colums
  position: relative
  width: 100%
  min-height: 76rem
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &-component
    margin: 1.2rem
  &__row
    justify-content: center
  &__icon-with-text
    width: 100%
    color: inherit
    font-family: inherit
  .b-delimiter
    height: 2rem
    .is-mobile &,
    .is-tablet &
      display: none
    @media only screen and (max-width: 768px)
      &
        display: none
  .b-logo
    margin: 1.6rem 0
  .b-title
    color: inherit
    font-style: normal
    font-size: 2.4rem
    font-weight: 400
    text-align: center
    letter-spacing: 0.15em
    text-transform: uppercase
    margin: 1.6rem 0
    .is-mobile &,
    .is-tablet &
      font-size: 2rem !important
    @media only screen and (max-width: 768px)
      &
        font-size: 2rem !important
  .b-text
    color: inherit
    font-size: 1.6rem
    text-align: left
    .is-mobile &,
    .is-tablet &
      font-size: 1.4rem !important
    @media only screen and (max-width: 768px)
      &
        font-size: 1.4rem !important
  .b-button
    color: inherit
    font-family: Lato
    font-style: normal
    font-size: 1.4rem
    text-align: center
    letter-spacing: 0.28em
    text-transform: uppercase
    width: 22.4rem
    height: 5.6rem
    box-sizing: border-box
    border-radius: 0.2rem
    .is-mobile &,
    .is-tablet &
      width: 80%
    @media only screen and (max-width: 768px)
      &
        width: 80%
  .b-cost
.b-sandbox
  min-height: 20rem
  display: flex
  justify-content: center
  align-items: center
</style>
