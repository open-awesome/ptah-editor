<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import VuseIcon from '@editor/components/VuseIcon'

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn675.cdn.stg.gamenet.ru/0/7K0Jf/o_15rRBx.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px'
      }
    }
  },
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '3.2rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'This is a short description',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.4rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
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
      'background-image': 'url(https://gn981.cdn.stg.gamenet.ru/0/7L7sp/o_e6GJq.png)',
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
  },
  components: _.merge({}, C_CUSTOM),
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
    class: 'b-logos-item'
  },
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logos-item'
  }
]

const COMPONENTS_3 = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-footer-logo'
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-copyright'
  }
]

const COMPONENTS_4 = [
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-link'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-link'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-link'
  }
]

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
    class="b-footer-social-restrictions"
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
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-5 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
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
        <div class="b-grid__col-2">
          <sandbox
            class="b-sandbox"
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
        <div class="b-grid__col-5 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
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
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
$h: 100vh
.b-footer-social-restrictions
  position: relative
  width: 100%
  min-height: 56rem
  margin: 0
  padding: 8.2rem 0 1rem
  display: flex
  text-align: center
  justify-content: flex-end
  flex-direction: column
  transition: background 200ms
.b-delimiter
  height: 2rem
  .is-mobile &,
  .is-tablet &
    display: none
  @media only screen and (max-width: 768px)
    &
      display: none
.b-logo
  margin: 0 0 2.9rem
.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-weight: 800
  line-height: 4.8rem
  font-size: 3.2rem
  text-align: center
  letter-spacing: 0.2em
  text-transform: uppercase
  margin: 0 0 1.4rem
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
  font-family: Lato
  font-style: normal
  font-weight: bold
  line-height: 3.2rem
  font-size: 1.6rem
  text-align: center
  letter-spacing: 0.28em
  text-transform: uppercase
  width: 35.2rem
  height: 6.4rem
  background: #FF6D64
  box-shadow: 0 2.4rem 4.4rem rgba(0, 0, 0, 0.15)
  margin: 3rem 0
  .is-mobile &,
  .is-tablet &
    width: 80% !important
    height: 4rem !important
    font-size: 1.4rem !important
  @media only screen and (max-width: 768px)
    &
      width: 80% !important
      height: 4rem !important
      font-size: 1.4rem !important
.b-sandbox
  min-height: 36.5rem
  padding: 5rem 0
  justify-content: flex-start
  align-items: center
  background-color: rgba(0, 0, 0, 0.1)

.b-socials
  width: 95%
  max-width: 100rem
  margin: 0 auto
  display: flex
  text-align: center
  justify-content: center
  align-items: center
  .is-tablet &, .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &-chapter
    font-size: 2rem
    text-align: center
    display: block
    width: 100%
    &__text
      display: inline-block
      margin: 2rem 0
  &__item
    position: relative
    margin: 0 1rem
    .is-tablet &,
    .is-mobile &
      margin: 0 0.5rem
    @media only screen and (max-width: 768px)
      &
        margin: 0 0.5rem
    &_opacity
      display: none
      .is-editable &
        opacity: 0.2
        display: inline-block
    &-button
      width: 5rem
      height: 5rem
      padding: 1rem
      border: none
      position: relative
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
         height: auto
         fill: inherit
         filter: drop-shadow(0 1.1rem 0.4rem rgba(0, 0, 0, 0.25))
    &-eye
      position: absolute
      top: -2rem
      left: -2rem
      z-index: 1

.b-restrictions
  max-width: 100rem
  margin: 0 auto
  display: flex
  text-align: center
  justify-content: flex-end
  align-items: center
  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    height: auto !important
    justify-content: center
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
      justify-content: center
  &__item
    position: relative
    margin: 1rem
    text-align: center
    &_opacity
      display: none
      .is-editable &
        opacity: 0.2
        display: inline-block
    &-eye
      position: absolute
      top: -2rem
      left: -2rem
      z-index: 1
    &-select
      background: $white
      color: $dark
      border: 0
      outline: 0
      width: 4rem
      height: auto
      border-radius: 0.2rem
      font-size: 1.2rem
      margin: 1rem auto
      padding: 0.2rem
      display: block
      & option:checked
        background-color: #333
        color: #fff
    &-img
      width: auto
      height: 4rem
      display: inline-block
      padding: 0 1rem 1rem 0
      & img
        height: 100%

.is-editable-show
  display: none
  .is-editable &
    display: inline-block

.vuse-icon_eye
  fill: rgb(129, 150, 227)

</style>
