<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenWesternVideoPlayer02'
const BG_SECTION = 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/5fd9c812-bd2a-48f4-a55b-795e7fa8fd6e.jpg)'

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
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-fs',
    label: 'button'
  }
]

const COMPONENTS_2 = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text-fs',
    label: 'text'
  }
]

const COMPONENTS_3 = [
  {
    name: 'SocialNetworks',
    element: types.SocialNetworks,
    type: 'networks',
    class: 'b-social-networks-fs',
    label: 'Social Networks'
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/1bd4af05-b7db-4784-b9d4-f5a2b88d821a.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '174px',
        'height': '67px',
        'margin-top': '25px',
        'margin-bottom': '57px'
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
        url: 'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/video/12d0f9ed-754f-4c45-b84b-907db319ee09.mp4'
      },
      styles: {
        width: '540px',
        height: '295px'
      }
    }
  },
  {
    element: {
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#1A83FF',
        'color': '#ffffff',
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border-radius': '10px',
        'margin-top': '46px'
      },
      pseudo: {
        'hover': {
          'color': '#1A83FF',
          'background-color': '#ffffff !important'
        }
      }
    }
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      text: '<p><b>Here should be a little text describing your beautiful game</b></p>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '3.6rem',
        'line-height': '1.4',
        'color': '#000000',
        'text-align': 'left'
      },
      media: {
        'is-mobile': {
          'text-align': 'center'
        }
      }
    }
  }
]

const C_CUSTOM_3 = [
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
      styles: {
        'margin-top': '64px'
      },
      colorFill: {
        color: '#1A83FF'
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
      'background-color': '#000000',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'height': '100vh'
    },
    media: {
      'is-mobile': {
        'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/aa96a7d3-1a1f-4208-8281-a39c22639a68.jpg)',
        'background-position': '46% 0%',
        'background-size': 'auto'
      }
    }
  },
  container: {
    width: 8,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container'
  },
  container2: {
    width: 4,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container'],
    selfName: '$sectionData.container2',
    styles: {
      'align-items': 'center'
    }
  },
  container3: {
    width: 12,
    styles: {
      'padding-top': '32px'
    },
    media: {
      'is-mobile': {
        'align-items': 'center'
      }
    }
  },
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM_2),
  components3: _.merge({}, C_CUSTOM_3),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Western title Video to Action main screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/first-screen-western-video-player-02.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS,
    container2: types.StyleObject,
    components2: COMPONENTS_2,
    container3: types.StyleObject,
    components3: COMPONENTS_3
  },

  data () {
    return {
      prefixes: ['', '2']
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
    class="b-first-screen-western-video-player"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div
          v-for="(prefix, index) in prefixes"
          :key="`hero-three-column-${ _uid }-${ index }`"
          :class="[`b-grid__col-${$sectionData[`container${prefix}`].width}`]"
          class="b-grid__col-m-12">

          <sandbox
            :container-path="`$sectionData.container${ prefix }`"
            :components-path="`$sectionData.components${ prefix }`"
            :class="`b-sandbox__${ prefix || 1 }`"
            class="b-sandbox">

            <!-- eslint-disable-next-line vue/valid-v-model -->
            <draggable v-model="$sectionData[`components${ prefix }`]" :style="$sectionData[`container${ prefix }`].styles" class="b-draggable-slot" @start="$_drag(`components${ prefix }`)" @change="$_dragStop">

              <div
                v-for="(component, index) in $sectionData[`components${ prefix }`]"
                v-if="$sectionData[`components${ prefix }`].length !== 0"
                :key="`component1-${ _uid }-${ index }`">

                <component class="b-hero-component"
                           v-styler:for="{
                      el: component.element,
                      type: component.type,
                      label: component.label,
                      path: `$sectionData.components${ prefix }[${index}].element`
                    }"
                           :is="component.name"
                           :href="component.element.link.href"
                           :target="component.element.link.target"
                           :style="component.element.styles"
                           :class="[component.element.classes, component.class]"
                           :path="`components${ prefix }[${index}].element`">
                  <div v-html="$sectionData[`components${ prefix }`][index].element.text"></div>
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
            class="b-sandbox">

            <draggable v-model="$sectionData.components3" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container3.styles" @start="$_drag('components3')" @change="$_dragStop">
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
@import '../../../assets/sass/section-media.sass'
</style>
