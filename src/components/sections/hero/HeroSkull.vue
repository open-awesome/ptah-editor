<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import VuseIcon from '@editor/components/VuseIcon'

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
  }
]

const COMPONENTS_2 = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-footer-game-logo'
  }
]

const COMPONENTS_3 = [
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-footer-copyright'
  }
]

const COMPONENTS_4 = [
  {
    name: 'Link',
    element: types.Link,
    type: 'button',
    class: 'b-footer-link'
  },
  {
    name: 'Link',
    element: types.Link,
    type: 'button',
    class: 'b-footer-link'
  },
  {
    name: 'Link',
    element: types.Link,
    type: 'button',
    class: 'b-footer-link'
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

const C_CUSTOM_2 = [
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
    }
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      text: '2018—2019. Some text for footer',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  }
]

const C_CUSTOM_4 = [
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
    }
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
    }
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
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn685.cdn.stg.gamenet.ru/0/7MZzz/o_bJr44.jpg)',
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
  },
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM_2),
  components3: _.merge({}, C_CUSTOM_3),
  components4: _.merge({}, C_CUSTOM_4),
  edited: true
}

export default {
  name: 'HeroSkull',
  components: {
    VuseIcon
  },
  cover: '/img/covers/footer-social-restrictions.jpg',
  group: 'Footers',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    components: COMPONENTS,
    components2: COMPONENTS_2,
    components3: COMPONENTS_3,
    components4: COMPONENTS_4
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
    class="b-hero-skull"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <sandbox
      class="b-sandbox"
      ref="sandbox"
      path="$sectionData.container"
      direction="column"
      :style="$sectionData.container.styles"
      >
      <elements-list @addEl="onAddElement"></elements-list>
      <component v-for="(component, index) in $sectionData.components"
        v-if="$sectionData.components.length !== 0"
        :is="component.name"
        :key="index"
        :href="$sectionData.components[index].element.href"
        v-html="$sectionData.components[index].element.text"
        :style="$sectionData.components[index].element.styles"
        :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
        v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
        >
      </component>
    </sandbox>
    <div class="b-footer">
      <div class="b-grid">
        <div class="b-grid__row b-footer__row">
          <div class="b-grid__col-4 b-grid__col-m-12">
            <sandbox
              class="b-footer__col b-footer__col_1"
              ref="sandbox"
              path="$sectionData.container2"
              direction="row"
              :style="$sectionData.container2.styles"
              >
              <elements-list @addEl="onAddElement"></elements-list>
              <component v-for="(component, index) in $sectionData.components2"
                v-if="$sectionData.components2.length !== 0"
                :is="component.name"
                :key="index"
                :href="$sectionData.components2[index].element.href"
                v-html="$sectionData.components2[index].element.text"
                :style="$sectionData.components2[index].element.styles"
                :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type }"
                >
              </component>
            </sandbox>
          </div>
          <div class="b-grid__col-4 b-grid__col-m-12">
            <sandbox
              class="b-footer__col b-footer__col_2"
              ref="sandbox"
              path="$sectionData.container3"
              direction="column"
              :style="$sectionData.container3.styles"
              >
              <elements-list @addEl="onAddElement"></elements-list>
              <component v-for="(component, index) in $sectionData.components3"
                v-if="$sectionData.components3.length !== 0"
                :is="component.name"
                :key="index"
                :href="$sectionData.components3[index].element.href"
                v-html="$sectionData.components3[index].element.text"
                :style="$sectionData.components3[index].element.styles"
                :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type }"
                >
              </component>
            </sandbox>
          </div>
          <div class="b-grid__col-4 b-grid__col-m-12">
            <sandbox
              class="b-footer__col b-footer__col_3"
              ref="sandbox"
              path="$sectionData.container4"
              direction="row"
              :style="$sectionData.container4.styles"
              >
              <elements-list @addEl="onAddElement"></elements-list>
              <component v-for="(component, index) in $sectionData.components4"
                v-if="$sectionData.components4.length !== 0"
                :is="component.name"
                :key="index"
                :href="$sectionData.components4[index].element.href"
                v-html="$sectionData.components4[index].element.text"
                :style="$sectionData.components4[index].element.styles"
                :class="[$sectionData.components4[index].element.classes, $sectionData.components4[index].class]"
                v-styler:for="{ el: $sectionData.components4[index].element, path: `$sectionData.components4[${index}].element`, type: $sectionData.components4[index].type }"
                >
              </component>
            </sandbox>
          </div>
        </div><!--/.b-grid__row.b-footer__row-->
      </div><!--/.b-grid-->
    </div><!--/.b-footer-->
  </section>
</template>

<style lang="sass" scoped>
$h: 100vh
.b-hero-skull
  position: relative
  width: 100%
  height: #{$h}
  min-height: 56rem
  margin: 0
  padding: 8.2rem 0 1rem
  display: flex
  text-align: center
  justify-content: flex-start
  flex-direction: column
  transition: background 200ms
  &.is-editable
    height: calc(#{$h} - 7.2rem)
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
  margin: 3rem 0 8rem
  .is-mobile &,
  .is-tablet &
    margin: 3rem 0 3rem
  @media only screen and (max-width: 768px)
    &
      margin: 3rem 0 3rem
.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-weight: 800
  line-height: 4.8rem
  font-size: 3.2rem
  text-align: center
  letter-spacing: 0.2em
  text-transform: uppercase
  margin: 2rem 0
  text-shadow: 0 1.6rem 0.8rem rgba(0, 0, 0, 0.15)
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    line-height: 4rem
    padding: 0 1rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      line-height: 4rem
      padding: 0 1rem
.b-text
  color: rgba(255, 255, 255, 0.3)
  font-size: 2rem
  line-height: 4rem
  text-align: center
  .is-mobile &,
  .is-tablet &
    font-size: 1.4rem !important
    line-height: 2rem
  @media only screen and (max-width: 768px)
    &
      font-size: 1.4rem !important
      line-height: 2rem
.b-button
  color: #fff
  font-family: Heebo
  font-style: normal
  line-height: 2.7
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
  height: 8rem
  background-color: #0C173C
  &__row
    align-items: center
  &__col
    min-height: auto
  &-logo,
  &-game-logo
    margin: 0
  &-copyright
    line-height: 1.4
  .is-mobile &,
  .is-tablet &
    position: relative
    height: auto
  @media only screen and (max-width: 768px)
    &
      position: relative
      height: auto

</style>
