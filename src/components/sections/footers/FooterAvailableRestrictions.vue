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

const SOCIALS_CUSTOM = {
  'windows': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'apple': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'linuxfull': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'steam': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  },
  'gog': {
    button: {
      styles: { 'fill': '#8196E3' }
    }
  }
}

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
  socials: _.merge({}, SOCIALS_CUSTOM),
  edited: true
}

export default {
  name: 'AvailableRestrictions',
  components: {
    VuseIcon
  },
  cover: '/img/covers/footer-social-restrictions.jpg',
  group: 'Footers',
  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
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
        type: 'text',
        class: 'b-title'
      },
      {
        name: 'Button',
        element: types.Button,
        type: 'button',
        class: 'b-button'
      }
    ],
    socials: {
      'windows': {
        name: 'Windows',
        visible: true,
        button: types.Icon
      },
      'apple': {
        name: 'Apple',
        visible: true,
        button: types.Icon
      },
      'linuxfull': {
        name: 'Linux',
        visible: true,
        button: types.Icon
      },
      'steam': {
        name: 'Steam',
        visible: true,
        button: types.Icon
      },
      'gog': {
        name: 'GOG Galaxy',
        visible: true,
        button: types.Icon
      }
    },
    restrictions: {
      'age': {
        visible: true,
        selected: { value: '0+', img: 'https://gn215.cdn.stg.gamenet.ru/0/759Ga/o_20S5qo.svg' },
        options: [
          { value: '0+', img: 'https://gn215.cdn.stg.gamenet.ru/0/759Ga/o_20S5qo.svg' },
          { value: '6+', img: 'https://gn215.cdn.stg.gamenet.ru/0/759H0/o_1KX2IR.svg' },
          { value: '12+', img: 'https://gn695.cdn.stg.gamenet.ru/0/759HF/o_DNNg8.svg' },
          { value: '18+', img: 'https://gn24.cdn.stg.gamenet.ru/0/759HU/o_1AgXj1.svg' },
          { value: '21+', img: 'https://gn822.cdn.stg.gamenet.ru/0/759Hf/o_299afp.svg' }
        ]
      },
      'pegi': {
        visible: true,
        selected: { value: '3', img: 'https://gn875.cdn.stg.gamenet.ru/0/759I0/o_13iwpA.svg' },
        options: [
          { value: '3', img: 'https://gn875.cdn.stg.gamenet.ru/0/759I0/o_13iwpA.svg' },
          { value: '7', img: 'https://gn414.cdn.stg.gamenet.ru/0/759ID/o_vuop.svg' },
          { value: '12', img: 'https://gn793.cdn.stg.gamenet.ru/0/759IR/o_1S1h6M.svg' },
          { value: '16', img: 'https://gn800.cdn.stg.gamenet.ru/0/759Il/o_ANYUX.svg' },
          { value: '18', img: 'https://gn653.cdn.stg.gamenet.ru/0/759Ix/o_Xqb9n.svg' }
        ]
      },
      'usk': {
        visible: true,
        selected: { value: '0', img: 'https://gn191.cdn.stg.gamenet.ru/0/759JH/o_1g38pS.svg' },
        options: [
          { value: '0', img: 'https://gn191.cdn.stg.gamenet.ru/0/759JH/o_1g38pS.svg' },
          { value: '6', img: 'https://gn182.cdn.stg.gamenet.ru/0/759JS/o_25hRrV.svg' },
          { value: '12', img: 'https://gn972.cdn.stg.gamenet.ru/0/759Jf/o_amDyU.svg' },
          { value: '16', img: 'https://gn972.cdn.stg.gamenet.ru/0/759Jf/o_amDyU.svg' },
          { value: '18', img: 'https://gn320.cdn.stg.gamenet.ru/0/759K2/o_x4V42.svg' }
        ]
      },
      'cero': {
        visible: true,
        selected: { value: 'All ages', img: 'https://gn773.cdn.stg.gamenet.ru/0/759KN/o_sazoN.svg' },
        options: [
          { value: 'All ages', img: 'https://gn773.cdn.stg.gamenet.ru/0/759KN/o_sazoN.svg' },
          { value: 'Ages 12 and up only', img: 'https://gn925.cdn.stg.gamenet.ru/0/759LL/o_zwWo0.svg' },
          { value: 'Ages 15 and up only', img: 'https://gn572.cdn.stg.gamenet.ru/0/759LZ/o_qfcL4.svg' },
          { value: 'Ages 17 and up only', img: 'https://gn959.cdn.stg.gamenet.ru/0/759Lq/o_FHJmm.svg' },
          { value: 'Ages 18 and up only', img: 'https://gn640.cdn.stg.gamenet.ru/0/759MA/o_4FtnT.svg' },
          { value: 'Education/Database', img: 'https://gn119.cdn.stg.gamenet.ru/0/759MN/o_18ADS5.svg' },
          { value: 'Rating pending', img: 'https://gn801.cdn.stg.gamenet.ru/0/759MZ/o_1b7UOI.svg' }
        ]
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
    visibleSocial (key) {
      this.$sectionData.socials[key].visible = !this.$sectionData.socials[key].visible
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
      <component class="b-hero-component" v-for="(component, index) in $sectionData.components"
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
              <button class="b-socials__item-eye controller-button is-blue is-editable-show"
                @click="$sectionData.socials[key].visible = !$sectionData.socials[key].visible"
                title="Show / Hide"
                >
                <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
              </button>
            </div>
          </div><!--/.b-socials-->
        </div>
        <div class="b-grid__col-2 hidden-m">
        </div>
        <div class="b-grid__col-5 b-grid__col-m-12">
          <div class="b-restrictions">
            <div class="b-restrictions__item"
               v-for="(value, key) in $sectionData.restrictions" :key="key"
               :class="{ 'b-restrictions__item_opacity' : false === $sectionData.restrictions[key].visible }"
              >
              <div class="b-restrictions__item-img">
                <img
                     :src="$sectionData.restrictions[key].selected.img"
                     :alt="$sectionData.restrictions[key].selected.value"
                     :title="$sectionData.restrictions[key].selected.value"
                  />
              </div>
              <div>
                <select class="b-restrictions__item-select is-editable-show" v-model="$sectionData.restrictions[key].selected">
                  <option v-for="(option, index) in $sectionData.restrictions[key].options" :value="option" v-bind:key="index">
                    {{ option.value }}
                  </option>
                </select>
              </div>
              <button class="b-restrictions__item-eye controller-button is-blue is-editable-show"
                @click="$sectionData.restrictions[key].visible = !$sectionData.restrictions[key].visible"
                title="Show / Hide"
                >
                <VuseIcon class="vuse-icon" name="eye"></VuseIcon>
              </button>
            </div>
          </div>
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
  &-component
    margin: 1.2rem
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
  height: 100%
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
  height: 100%
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
  height: 100%
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
</style>
