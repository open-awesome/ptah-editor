<template>
  <section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, { '--bg-color': $sectionData.mainStyle.styles['background-color'] }]"
    class="b-section-header">

    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid b-header">

      <button
        id="js-hamburger"
        class="hamburger hamburger--slider"
        type="button"
        :data-target="`#mobile-menu-${ _uid }`"
        @click.stop="toggle">

      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>

      </button>

      <div class="b-grid__row">
        <div class="b-grid__col-m-12 mobile-header" :class="`b-grid__col-${$sectionData.container.width}`">

          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="row"
            align="center"
            class="b-sandbox">

            <draggable
              v-model="$sectionData.components"
              :style="$sectionData.container.styles"
              class="b-draggable-slot b-draggable-slot_horizont"
              @start="drag('components')" @change="dragStop"
            >

              <div
                v-for="(component, index) in $sectionData.components"
                :key="`component-${ _uid }-${ index }`"
                v-if="$sectionData.components.length !== 0"
                :style="component.styles">

                <component
                  v-styler:for="{
                    el: $sectionData.components[index].element,
                    type: $sectionData.components[index].type,
                    label: $sectionData.components[index].label,
                    path: `$sectionData.components[${index}].element`
                  }"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"
                  class="b-header-component">
                  <div v-html="$sectionData.components[index].element.text"></div>
                </component>

              </div>

            </draggable>

          </sandbox>

        </div>
        <div :id="`mobile-menu-${ _uid }`" class="b-grid__col-m-12 mobile-menu mobile-menu_drop"
             :class="[{ 'mobile-menu_hide': !$sectionData.isToggle }, `b-grid__col-${$sectionData.container2.width}`]"
        >

          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            direction="row"
            align="center"
            class="b-sandbox">

            <draggable
              v-model="$sectionData.components2"
              :style="$sectionData.container2.styles"
              class="b-draggable-slot b-draggable-slot_horizont"
              @start="drag('components2')" @change="dragStop"
            >

              <div
                v-for="(component, index) in $sectionData.components2"
                :key="`component-${ _uid }-${ index }`"
                v-if="$sectionData.components2.length"
                :style="component.styles"
                :class="{ 'b-one': isOnlyOneButton(component) }">

                <component
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components2[${index}].element`
                  }"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components2[${index}].element`"
                  class="b-header-component">
                  <div v-html="$sectionData.components2[index].element.text"></div>
                </component>

              </div>

            </draggable>

          </sandbox>

        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { StyleObject, Logo, SocialNetworks, Button } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const [name, group, cover] = ['SmmFantasyHeader', 'Header', 'https://s3.protocol.one/images/cover2.jpg']
const defaultComponents = [
  {
    element: {
      styles: {
        'background-image': 'url("https://s3.protocol.one/images/gamelogo.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '303px',
        'height': '73px',
        'margin': '0'
      }
    }
  }
]
const defaultComponents2 = [
  {
    element: {
      text: 'About',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#AF2E11',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '80px',
        'height': '32px',
        'font-size': '2.4rem',
        'margin': '0'
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
      text: 'Features',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#AF2E11',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '80px',
        'height': '32px',
        'font-size': '2.4rem',
        'margin': '0'
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
      text: 'Media',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#AF2E11',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '80px',
        'height': '32px',
        'font-size': '2.4rem',
        'margin': '0'
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
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'none',
      'background-color': '#000',
      'background-position': 'center',
      'background-size': 'cover'
    }
  },
  container: {
    styles: {
      'margin': '0 150px 0 0',
      'padding': '0'
    },
    width: 3,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container'
  },
  container2: {
    styles: {
      padding: 0,
      'justify-content': 'space-between'
    },
    width: 9,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container'],
    selfName: '$sectionData.container2'
  },
  components: merge({}, defaultComponents),
  components2: merge({}, defaultComponents2),
  edited: true
}

export default {
  name,
  group,
  cover,

  description: 'Lined up upper block with set of elements',

  mixins: [defaults],

  $schema: {
    isHeader: true,
    mainStyle: StyleObject,
    container: StyleObject,
    container2: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-header-logo', label: 'logo', key: 0 }
    ],
    components2: [
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link', key: 1 },
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link', key: 2 },
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link', key: 3 },
      { name: 'SocialNetworks', element: SocialNetworks, type: 'networks', class: 'b-social-networks-fs', label: 'Social Networks', key: 6 }
    ],
    isToggle: false
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, defaultSchema))
    }
  },

  methods: {
    isOnlyOneButton ({ name }) {
      if (name !== 'SocialNetworks') {
        return false
      }
      let socilas = this.$sectionData.components2.filter(({ name }) => name === 'SocialNetworks')
      return socilas.length === 1
    },

    toggle () {
      this.$sectionData.isToggle = !this.$sectionData.isToggle
    }
  }
}
</script>

<style lang="sass" scoped>
.b-section-header
  .is-tablet &,
  .is-mobile &
    text-align: left

  @media (max-width: 800px)
    text-align: left

  .mobile-menu
    transition: all 200ms
    .is-mobile &
      &_hide
        display: none
    .is-mobile &
      &_drop
        background-color: var(--bg-color) !important
    @media (max-width: 800px)
      &_drop
        background-color: var(--bg-color) !important

  .b-grid__col-3,
  .b-grid__col-9
    padding: .8rem 1.6rem
  .b-grid__row
    .is-mobile &
      padding: 0 !important
    @media (max-width: 800px)
      &
        padding: 0 !important

.b-one
  .is-mobile &
    margin-top: auto !important
    order: 1
  @media (max-width: 800px)
    margin-top: auto !important
    margin-bottom: 8px !important
    order: 1
  @media (max-height: 420px)
    width: auto !important
    margin-top: 8px !important
    margin-bottom: 8px !important

.b-header-link
  .is-mobile &
    font-size: 1.6rem
  @media (max-width: 800px)
    font-size: 1.6rem

.b-logo
  display: block
  .is-tablet &,
  .is-mobile &
    margin: 0.4rem auto !important

  @media (max-width: 800px)
    margin: 0.4rem auto !important

@media (max-height: 420px) and (max-width: 800px) and (min-width: 480px)
  .b-slot .b-draggable-slot > div
    width: 50% !important
</style>
