<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenFantasy01'
const BG_SECTION = 'url(https://gn823.cdn.stg.gamenet.ru/0/8ifGM/o_7byuz.jpg)'

const COMPONENTS_2 = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo-fs',
    label: 'logo'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text-fs',
    label: 'text'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-fs',
    label: 'button'
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn543.cdn.stg.gamenet.ru/0/8iMxM/o_18R5TC.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '500px',
        'height': '121px',
        'margin': '25px 0 20px 13px',
        'padding': '0'
      }
    }
  },
  {
    element: {
      text: '<p>HERE SHOULD BE A LITTLE TEXT ABOUT YOURE GAME</b></p>',
      styles: {
        'font-family': 'Cinzel',
        'font-size': '5.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin': '25px 0 20px 15px',
        'text-align': 'left',
        'padding': '0 0 0 13px'
      }
    }
  },
  {
    element: {
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#AF2E12',
        'color': '#ffffff',
        'font-family': 'Cinzel',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border': '1px solid #000000',
        'margin': '25px 0 70px 38px',
        'padding': '0'
      },
      pseudo: {
        'hover': {
          'background-color': '#333333 !important',
          'border': '1px solid #AF2E12 !important'
        }
      }
    }
  }
]

const COMPONENTS_3 = [
  {
    name: 'Delimiter',
    element: types.Delimiter,
    type: 'delimiter',
    class: 'b-delimiter-fs',
    label: 'Spacer'
  },
  {
    name: 'SocialNetworks',
    element: types.SocialNetworks,
    type: 'networks',
    class: 'b-social-networks-fs',
    label: 'Social Networks'
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      styles: {
        width: '40px',
        height: '120px'
      }
    }
  },
  {
    element: {
      socialNetworks: {
        'facebook': {
          name: 'Facebook',
          expand: false,
          visible: true,
          url: ''
        },
        'instagram': {
          name: 'Instagram',
          expand: false,
          visible: true,
          url: ''
        },
        'twitter': {
          name: 'Twitter',
          expand: false,
          visible: true,
          url: ''
        },
        'youtube': {
          name: 'Youtube',
          expand: false,
          visible: true,
          url: ''
        }
      },
      colorFill: {
        color: '#C53314'
      },
      sizeIcons: {
        width: 30
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'cover',
      'background-color': '#4A4A4A',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'background-position': 'right bottom',
      'height': '100vh'
    }
  },
  container: {
    width: 5,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container'
  },
  components2: _.merge({}, C_CUSTOM_2),
  container2: {
    width: 7,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container'],
    selfName: '$sectionData.container2',
    styles: {
      'padding': '0',
      'align-items': 'flex-start'
    }
  },
  container3: {
    width: 12
  },
  components3: _.merge({}, C_CUSTOM_3),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Fantasy title Maximum main screen',

  mixins: [defaults],

  cover: '/img/covers/first-screen-fantasy-01.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: [],
    components2: COMPONENTS_2,
    components3: COMPONENTS_3
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
    class="b-first-screen-fantasy-01"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12 hidden-m" :class="`b-grid__col-${$sectionData.container.width}`">
          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            class="b-sandbox">

            <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container.styles" @change="dragStop">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                  >
                  <div v-html="$sectionData.components[index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container2.width}`">
          <sandbox
              container-path="$sectionData.container2"
              components-path="$sectionData.components2"
              direction="column"
              class="b-sandbox">

            <draggable v-model="$sectionData.components2" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container2.styles" @change="dragStop">
              <div v-for="(component, index) in $sectionData.components2" v-if="$sectionData.components2.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components2[index].element, path: `$sectionData.components2[${index}].element`, type: $sectionData.components2[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[$sectionData.components2[index].element.classes, $sectionData.components2[index].class]"
                  >
                  <div v-html="$sectionData.components2[index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container3.width}`">
          <sandbox
            container-path="$sectionData.container3"
            components-path="$sectionData.components3"
            direction="column"
            class="b-sandbox">

            <draggable v-model="$sectionData.components3" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container3.styles" @change="dragStop">
              <div v-for="(component, index) in $sectionData.components3" v-if="$sectionData.components3.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components3[index].element, path: `$sectionData.components3[${index}].element`, type: $sectionData.components3[index].type, label: component.label }"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.link.href"
                  :target="$sectionData.components3[index].element.link.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[$sectionData.components3[index].element.classes, $sectionData.components3[index].class]"
                  >
                  <div v-html="$sectionData.components3[index].element.text"></div>
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
.b-first-screen-fantasy-01
  @media only screen and (width: 1024px) and (height: 1366px)
    &
      background-position: 45% bottom !important
  .b-logo-fs
    @media only screen and (max-width: 900px) and (max-height: 450px)
      &
        margin: 1.6rem 0 !important
  .b-text-fs
    letter-spacing: -0.02em
    .is-mobile &,
    .is-tablet &
      font-size: 2.4rem !important
      margin: 0 auto 8px !important
      text-align: center !important
    @media only screen and (max-width: 840px)
      &
        font-size: 2.4rem !important
        margin: 0 auto 8px !important
    @media only screen and (max-width: 500px)
      &
        text-align: center !important
    @media only screen and (max-width: 900px) and (max-height: 450px)
      &
        text-align: left !important
  .b-button-fs
    box-shadow: 0px 8px 70px rgba(0, 0, 0, 0.2)
    transition: background-color 200ms
    @media only screen and (max-width: 900px) and (max-height: 450px)
      &
        margin: 1.6rem !important

  .b-delimiter-fs
    @media only screen and (max-width: 980px) and (max-height: 700px)
      &
        display: none !important

</style>
