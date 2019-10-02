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
    <div class="b-grid__row">

      <div class="b-grid__col-12 b-grid__col-m-12 mobile-header">

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

      </div>

      <div
          :id="`mobile-menu-${ _uid }`"
          class="b-grid__col-12 b-grid__col-m-12 mobile-menu mobile-menu_drop"
          :class="{ 'mobile-menu_hide': !$sectionData.isToggle }"
        >

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
                v-if="$sectionData.components.length"
                :style="component.styles"
                :class="{ 'b-logo-one': isOnlyOneLogo(component) }">

              <component
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
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

const [name, group, cover] = ['CenteredLogoHeader', 'Header', '/img/covers/header-space-03.jpg']
const defaultComponents = [
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
        'font-size': '1.8rem',
        'margin-right': '16px',
        'margin-left': '16px'
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    },
    key: 1
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
        'font-size': '1.8rem',
        'margin-right': '16px',
        'margin-left': '16px'
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    },
    key: 2
  },
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
      }
    },
    key: 0
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
        'font-size': '1.8rem',
        'margin-right': '16px',
        'margin-left': '16px'
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    },
    key: 3
  },
  {
    element: {
      text: 'Packs',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '80px',
        'height': '32px',
        'font-size': '1.8rem',
        'margin-right': '16px',
        'margin-left': '16px'
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    },
    key: 4
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn736.cdn.stg.gamenet.ru/0/8dI9p/o_cm1BL.jpg)',
      'background-color': 'rgba(51, 51, 51, 0.95)',
      'background-position': 'center',
      'background-size': 'cover'
    }
  },
  container: {
    styles: {
      'flex-direction': 'row'
    }
  },
  components: merge({}, defaultComponents),
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
    components: [
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link', key: 1 },
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link', key: 2 },
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 },
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link', key: 3 },
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link', key: 4 }
    ],
    isToggle: false
  },

  computed: {
    logoSlot () {
      let elements = this.$sectionData.components || []
      let component = elements.find(element => element.name === 'Logo')
      let index = elements.findIndex(element => element.name === 'Logo')
      return (component) ? { component, index } : null
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, defaultSchema))
    }
  },

  methods: {
    isOnlyOneLogo ({ name }) {
      if (name !== 'Logo') {
        return false
      }
      let logos = this.$sectionData.components.filter(({ name }) => name === 'Logo')
      return logos.length === 1
    },

    toggle () {
      this.$sectionData.isToggle = !this.$sectionData.isToggle
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/sectionMedia.sass'

.b-section-header
  z-index: 2
  .is-tablet &,
  .is-mobile &
    min-height: 7rem
    text-align: left

  @media (max-width: 800px)
    min-height: 7rem
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

.mobile-header
  padding: 0
  display: none
  .is-mobile &
    display: block
  @media (max-width: 800px)
    display: block

.b-logo
  .is-mobile &
    display: block
    background-position: center
  @media (max-width: 800px)
    display: block
    background-position: center

.b-header-link
  .is-mobile &
    font-size: 1.6rem
  @media (max-width: 800px)
    font-size: 1.6rem

.b-logo-one
  .is-mobile &
    margin-top: auto
    order: 1
  @media (max-width: 800px)
    margin-top: auto
    margin-bottom: 8px
    order: 1
  @media (max-height: 420px)
    width: auto
    margin-top: 8px
    margin-bottom: 8px

@media (max-height: 420px) and (max-width: 800px) and (min-width: 480px)
  .b-slot .b-draggable-slot > div
    width: 50% !important
</style>
