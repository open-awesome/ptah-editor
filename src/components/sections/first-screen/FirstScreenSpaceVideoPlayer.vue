<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenSpace01'
const BG_SECTION = 'url(https://gn36.cdn.stg.gamenet.ru/0/8cqkG/o_3xWrv.jpg)'

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo-fs',
    label: 'logo'
  },
  {
    name: 'VideoElement',
    element: types.VideoElement,
    type: 'video',
    class: 'b-video',
    label: 'video'
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

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn623.cdn.stg.gamenet.ru/0/8cqjM/o_1Y54Cu.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '246px',
        'height': '96px',
        'margin': '25px 0'
      }
    }
  },
  {
    element: {
      settings: {
        loop: true,
        autoplay: true,
        rel: false,
        controls: false,
        url: 'https://gn657.cdn.stg.gamenet.ru/0/8dECC/o_1n2u0d.mp4'
      },
      styles: {
        width: '570px',
        height: '320px'
      }
    }
  },
  {
    element: {
      text: '<p><b>Here should be a little text describing youre beautiful game</b></p>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '3.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin': '10px 80px'
      }
    }
  },
  {
    element: {
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#F4BC64',
        'color': '#000000',
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border-radius': '100px',
        'margin': '25px 0'
      },
      pseudo: {
        'hover': {
          'background-color': '#ffffff !important'
        }
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'cover',
      'background-color': '#000',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'height': '100vh'
    }
  },
  components: _.merge({}, C_CUSTOM),
  container: {
    width: 7
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Space title Video to Action main screen',

  mixins: [defaults],

  cover: '/img/covers/first-screen-space-video-player.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS
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
    class="b-first-screen-space-video-player"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
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
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.b-first-screen-space-video-player
  .b-text-fs
    letter-spacing: -0.02em
    .is-mobile &,
    .is-tablet &
      font-size: 2.4rem !important
      margin: 0 auto 8px !important
    @media only screen and (max-width: 840px)
      &
        font-size: 2.4rem !important
        margin: 0 auto 8px !important
  .b-button-fs
    box-shadow: 0px 8px 70px rgba(0, 0, 0, 0.2)
    transition: background-color 200ms
  .b-timer-fs
    .is-mobile &,
    .is-tablet &
      margin: 0 auto 8px !important
    @media only screen and (max-width: 840px)
      &
        font-size: 2.4rem !important
        margin: 0 auto 8px !important

</style>
