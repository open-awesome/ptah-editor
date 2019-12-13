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
            class="b-sandbox">

          <draggable
            v-model="$sectionData.components"
            :style="$sectionData.container.styles"
            class="b-draggable-slot b-draggable-slot_horizont"
            @start="$_drag('components')" @change="$_dragStop"
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
      <div :id="`mobile-menu-${ _uid }`" class="b-grid__col-m-12 mobile-menu mobile-menu_drop b-section-header__col"
        :class="[{ 'mobile-menu_hide': !$sectionData.isToggle }, `b-grid__col-${$sectionData.container2.width}`]"
        >

        <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            class="b-sandbox">

          <draggable
            v-model="$sectionData.components2"
            :style="$sectionData.container2.styles"
            class="b-draggable-slot b-draggable-slot_horizont"
            @start="$_drag('components2')" @change="$_dragStop"
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

const [name, group, cover] = ['ActionButtonHeader', 'Header', '/img/covers/header-space-01.jpg']

const defaultComponents = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn623.cdn.stg.gamenet.ru/0/8cqjM/o_1Y54Cu.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '154px',
        'height': '60px',
        'margin-top': '8px',
        'margin-right': '16px',
        'margin-bottom': '8px',
        'margin-left': '16px'
      },
      media: {
        'is-mobile': {
          width: '100px',
          height: '40px',
          'margin-top': '8px',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0'
        }
      }
    },
    key: 0
  }
]
const defaultComponents2 = [
  {
    element: {
      text: 'About',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#F4BC64',
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
      text: 'Features',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#F4BC64',
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
      text: 'Media',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#F4BC64',
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
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#F4BC64',
        'color': '#000000',
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border-radius': '100px'
      },
      pseudo: {
        'hover': {
          'background-color': '#ffffff !important'
        }
      },
      media: {
        'is-mobile': {
          'margin-top': '32px',
          'margin-bottom': '16px'
        }
      }
    }
  }
]
const defaultSchema = {
  mainStyle: {
    hamPosition: 17,
    styles: {
      'background-image': 'url(https://gn736.cdn.stg.gamenet.ru/0/8dI9p/o_cm1BL.jpg)',
      'background-color': 'rgba(51, 51, 51, 0.95)',
      'background-position': '50% 50%',
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
    width: 3,
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

@media (max-height: 420px) and (max-width: 800px) and (min-width: 480px)
  .b-slot .b-draggable-slot > div
    width: auto !important
</style>
