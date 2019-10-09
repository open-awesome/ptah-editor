<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-footer-game-logo',
    label: 'logo'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-footer-copyright',
    label: 'description'
  },
  {
    name: 'SocialNetworks',
    element: types.SocialNetworks,
    type: 'networks',
    class: 'b-social-networks-fs',
    label: 'Social Networks'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-footer-link',
    label: 'button'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-footer-link',
    label: 'button'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-footer-link',
    label: 'button'
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://s3.protocol.one/images/gamelogo.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '228px',
        'height': '55px'
      }
    }
  },
  {
    element: {
      text: '<p>2018—2019.<br> Some text for footer</p>',
      styles: {
        'font-family': 'Lato',
        'font-size': '1.4rem',
        'color': '#fff',
        'padding-right': '16px',
        'padding-left': '16px',
        'text-align': 'left'
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
        color: '#AF2E11'
      },
      sizeIcons: {
        width: 30
      }
    }
  },
  {
    element: {
      text: 'Information',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#AF2E11',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '130px',
        'height': '32px',
        'font-size': '1.8rem'
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    }
  },
  {
    element: {
      text: 'Legal',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#AF2E11',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '80px',
        'height': '32px',
        'font-size': '1.8rem'
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    }
  },
  {
    element: {
      text: 'Blog',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#AF2E11',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '80px',
        'height': '32px',
        'font-size': '1.8rem'
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    }
  }
]

const GROUP_NAME = 'Footer'
const NAME = 'FooterFantasy'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#000',
      'background-size': 'cover',
      'background-position': '50% 0%',
      'background-repeat': 'no-repeat',
      'padding-top': '8px',
      'padding-bottom': '8px'
    }
  },
  container: {
    width: 12,
    styles: {
      'padding-top': '8px',
      'padding-bottom': '8px',
      'flex-direction': 'row'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column'
      }
    }
  },
  components: _.merge({}, C_CUSTOM),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Lined up lower block with set of elements',

  mixins: [defaults, sectionMedia],

  cover: 'https://s3.protocol.one/images/FootFantCover3.jpg',

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
  <footer
    class="b-section-footer"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-footer">
      <div class="b-grid">
        <div class="b-grid__row b-footer__row">
          <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
            <sandbox
              container-path="$sectionData.container"
              components-path="$sectionData.components"
              class="b-footer__col b-footer__col_1">

              <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_horizont" :style="$sectionData.container.styles" @start="drag('components')" @change="dragStop">
                <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                  <component
                    v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                    :is="component.name"
                    :href="$sectionData.components[index].element.link.href"
                    :target="$sectionData.components[index].element.link.target"
                    :style="$sectionData.components[index].element.styles"
                    :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                    :path="`components[${index}].element`"
                    class="b-footer-component"
                  >
                    <div v-html="$sectionData.components[index].element.text"></div>
                  </component>
                </div>
              </draggable>
            </sandbox>
          </div>
        </div><!--/.b-grid__row.b-footer__row-->
      </div><!--/.b-grid-->
    </div><!--/.b-footer-->
  </footer>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'

.b-section-footer
  position: relative
  width: 100%
  margin: 0
  display: flex
  text-align: center
  justify-content: center
  align-items: center
  flex-direction: column
  transition: background 200ms
  .is-mobile &,
  .is-tablet &
    position: relative
    padding: 2rem 0 1rem
  @media only screen and (max-width: 768px)
    &
      position: relative
      padding: 2rem 0 1rem

.b-footer
  width: 100%
  &__row
    align-items: center
  &__col
    min-height: auto
  &-logo,
  &-game-logo
  &-copyright
  .is-mobile &,
  .is-tablet &
    position: relative
    height: auto
  @media only screen and (max-width: 768px)
    &
      position: relative
      height: auto
  &-link
  .is-mobile &
    font-size: 1.6rem
    @media (max-width: 800px)
      font-size: 1.6rem

  &-component
    margin: 0.8rem
    .is-mobile &,
    .is-tablet &
      margin: 0.8rem auto
    @media only screen and (max-width: 768px)
      &
        margin: 0.8rem auto
</style>
