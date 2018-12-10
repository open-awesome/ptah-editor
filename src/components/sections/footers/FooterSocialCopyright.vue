<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import VuseIcon from '@editor/components/VuseIcon'

const C_CUSTOM_1 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '1.6rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'One morning, when Gregor Samsa woke ' +
      'from troubled dreams, he found himself transformed ' +
      'in his bed into a horrible vermin',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.4rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      text: 'This is a short header',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '1.6rem',
        'color': '#ffffff'
      }
    }
  },
  {
    element: {
      text: 'One morning, when Gregor Samsa woke ' +
      'from troubled dreams, he found himself transformed ' +
      'in his bed into a horrible vermin',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.4rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn422.cdn.stg.gamenet.ru/0/7LwE2/o_1U7eMW.svg)',
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
      text: '2018-2109',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    }
  }
]

const SOCIALS_CUSTOM = {
  'facebook': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'instagram': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'vk': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'twitter': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'youtube': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'kickstarter': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'wechat': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#151C44',
      'background-position': 'center center',
      'background-size': 'cover'
    }
  },
  components: _.merge({}, C_CUSTOM_1),
  components2: _.merge({}, C_CUSTOM_2),
  components3: _.merge({}, C_CUSTOM_3),
  socials: _.merge({}, SOCIALS_CUSTOM),
  edited: true
}

const COMPONENTS = [
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
  }
]

const COMPONENTS_C = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo'
  },
  {
    name: 'Description',
    element: types.Text,
    type: 'text',
    class: 'b-text'
  }
]

export default {
  name: 'SocialCopyright',
  components: {
    VuseIcon
  },
  cover: '/img/covers/footer-social-copyright.jpg',
  group: 'Footers',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: COMPONENTS,
    components2: COMPONENTS,
    components3: COMPONENTS_C,
    socials: {
      'facebook': {
        name: 'Facebook',
        visible: true,
        button: types.Icon
      },
      'instagram': {
        name: 'Instagram',
        visible: true,
        button: types.Icon
      },
      'vk': {
        name: 'Vk',
        visible: true,
        button: types.Icon
      },
      'twitter': {
        name: 'Twitter',
        visible: true,
        button: types.Icon
      },
      'youtube': {
        name: 'Youtube',
        visible: true,
        button: types.Icon
      },
      'kickstarter': {
        name: 'Kickstarter',
        visible: true,
        button: types.Icon
      },
      'wechat': {
        name: 'Wechat',
        visible: true,
        button: types.Icon
      }
    }
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
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-6 b-grid__col-m-12 ">
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container"
            direction="column"
            :style="$sectionData.container.styles"
            >
            <elements-list @addEl="onAddElement"></elements-list>
            <component class="b-footer-social-restrions-component" v-for="(component, index) in $sectionData.components"
              v-if="$sectionData.components.length !== 0"
              :is="component.name"
              :key="index"
              :href="$sectionData.components[index].element.href"
              v-html="$sectionData.components[index].element.text"
              :style="$sectionData.components[index].element.styles"
              :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
              v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type }"
              >
            </component>          </sandbox>
        </div>
        <div class="b-grid__col-6 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container2"
            direction="column"
            :style="$sectionData.container2.styles"
            >
            <elements-list @addEl="onAddElement2"></elements-list>
            <component class="b-footer-social-restrions-component" v-for="(component, index) in $sectionData.components2"
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
      </div>
      <div class="b-grid__row b-footer-social-restrictions__socials">
        <div class="b-grid__col-12">
          <div class="b-socials">
              <div class="b-socials__item"
                 v-for="(value, key) in $sectionData.socials" :key="key"
                 :class="{ 'b-socials__item_opacity' : false === $sectionData.socials[key].visible }"
                >
                <a class="b-socials__item-button flex flex_center"
                  :target="$sectionData.socials[key].button.target"
                  :href="$sectionData.socials[key].button.href"
                  :title="$sectionData.socials[key].name"
                  v-styler:for="{ el: $sectionData.socials[key].button, path: `$sectionData.socials[${key}].button`}"
                  :style="$sectionData.socials[key].button.styles"
                  >
                  <VuseIcon :name="key"></VuseIcon>
                </a>
                <button class="b-socials__item-eye controller-button is-transparent is-editable-show"
                  @click="$sectionData.socials[key].visible = !$sectionData.socials[key].visible"
                  title="Show / Hide"
                  >
                  <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
                </button>
              </div>
            </div>
        </div>
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-4 hidden-m"></div>
        <div class="b-grid__col-4 b-grid__col-m-12">
          <sandbox
            class="b-sandbox"
            ref="sandbox"
            path="$sectionData.container3"
            direction="column"
            :style="$sectionData.container3.styles"
            >
            <elements-list @addEl="onAddElement3"></elements-list>
            <component class="b-footer-social-restrions-component" v-for="(component, index) in $sectionData.components3"
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
        <div class="b-grid__col-4 hidden-m"></div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
$h: 100vh
.b-footer-social-restrictions
  position: relative
  width: 100%
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: flex-start
  flex-direction: column
  transition: background 200ms
  &-component
    margin: 1.2rem
  &__socials
    border-top: 0.2rem solid #0E1330
    border-bottom: 0.2rem solid #0E1330

.b-logo
  margin: 0
.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-size: 1.6rem
  font-weight: 400
  line-height: 2.7rem
  text-align: center
  letter-spacing: 0.15em
  text-transform: uppercase
  margin: 0
  .is-mobile &,
  .is-tablet &
    font-size: 1.6rem !important
    line-height: 2.7rem
  @media only screen and (max-width: 768px)
    &
      font-size: 1.6rem !important
      line-height: 2.7rem
.b-text
  color: rgba(255, 255, 255, 0.3)
  font-size: 1.6rem
  line-height: 2.5rem
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
  font-size: 1.4rem
  line-height: 2.8rem
  text-align: center
  letter-spacing: 0.28em
  text-transform: uppercase

  width: 22.4rem
  height: 5.6rem
  border: 0.2rem solid rgba(255, 125, 125, 0.5)
  box-sizing: border-box
  border-radius: 0.2rem
  .is-mobile &,
  .is-tablet &
    width: 80%
  @media only screen and (max-width: 768px)
    &
      width: 80%

.b-sandbox
  min-height: 16rem
  display: flex
  justify-content: center
  align-items: center

.b-socials
  width: 95%
  max-width: 100rem
  margin: 0 auto
  display: flex
  text-align: center
  justify-content: center

  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative
    margin: 0 4rem
    .is-tablet &,
    .is-mobile &
      margin: 0
    @media only screen and (max-width: 768px)
      &
        margin: 0
    &_opacity
      display: none
      .is-editable &
        opacity: 0.2
        display: inline-block
    &-button
      width: 6rem
      height: 6rem
      padding: 1rem
      border: none
      display: inline-block
      .is-tablet &,
      .is-mobile &
        width: 5rem
        height: 5rem
      @media only screen and (max-width: 768px)
        &
          width: 5rem
          height: 5rem
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

.is-editable-show
  display: none
  .is-editable &
    display: inline-block

.vuse-icon_eye
  fill: rgb(129, 150, 227)
</style>
