<template>
  <header
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, {'_sticky' : $sectionData.mainStyle.sticky }]"
    :style="[$sectionData.mainStyle.styles, { '--bg-color': $sectionData.mainStyle.styles['background-color'] }, $sectionData.objVarsMedia]"
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
        :style="{'top': $sectionData.mainStyle.hamPosition + 'px'}"
        @click.stop="toggle">

      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>

      </button>

      <div class="b-grid__row">
        <div class="b-grid__col-m-12 b-grid__col-l-12 mobile-header b-section-header__col" :class="`b-grid__col-${$sectionData.container.width}`">

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
              >

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
                :class="{ 'b-button-one': isOnlyOneButton(component) }">

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

  </header>
</template>

<script>
import { StyleObject, Logo, Button } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const [name, group, cover] = ['ActionButtonFantasyHeader', 'Header', 'https://s3.protocol.one/images/cover_header.jpg']

const defaultComponents = [
  {
    element: {
      styles: {
        'background-image': 'url("https://s3.protocol.one/images/gamelogo.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '303px',
        'height': '73px'
      },
      media: {
        'is-mobile': {
          width: '190px',
          height: '60px',
          'margin-top': '4px',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0'
        }
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
        'font-size': '2.4rem'
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
        'font-size': '2.4rem'
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
        'font-size': '2.4rem'
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
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#AF2E12',
        'color': '#ffffff',
        'font-family': 'Cinzel',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border': '1px solid #000000'
      },
      media: {
        'is-mobile': {
          'margin-top': '32px',
          'margin-bottom': '16px'
        }
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
const defaultSchema = {
  mainStyle: {
    hamPosition: 21,
    styles: {
      'background-image': 'none',
      'background-color': '#000',
      'background-position': 'center',
      'background-size': 'cover'
    }
  },
  container: {
    styles: {
      'flex-direction': 'row',
      'justify-content': 'flex-start',
      'align-items': 'flex-start'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column'
      }
    },
    width: 4,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container'
  },
  container2: {
    styles: {
      'flex-direction': 'row',
      'justify-content': 'space-between'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column',
        'justify-content': 'flex-start',
        'align-items': 'center'
      }
    },
    width: 8,
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

  mixins: [defaults, sectionMedia],

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
      { name: 'Button', element: Button, type: 'button', class: 'b-header-button', label: 'button', key: 5 }
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
      if (name !== 'Button') {
        return false
      }
      let buttons = this.$sectionData.components2.filter(({ name }) => name === 'Button')
      return buttons.length === 1
    },

    toggle () {
      this.$sectionData.isToggle = !this.$sectionData.isToggle
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'

.b-section-header
  z-index: 2

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

  &__col
    padding: 0 1.6rem !important

  .b-grid__row
    .is-mobile &
      padding: 0 !important
    @media (max-width: 800px)
      &
        padding: 0 !important

.b-button-one
  .is-mobile &
    order: 1
  @media (max-width: 800px)
    order: 1

@media (max-height: 420px) and (max-width: 800px) and (min-width: 480px)
  .b-slot .b-draggable-slot > div
    width: auto !important
</style>
