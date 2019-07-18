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
          :class="{ 'mobile-menu_hide': !isToggle }"
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
              @change="dragStop"
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

</section>
</template>

<script>
import { StyleObject, Logo, Text } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const [name, group, cover] = ['HeaderSpace03', 'header', '/img/covers/header-space-03.jpg']
const defaultComponents = [
  {
    element: {
      text: '<a href="#">About</a>',
      styles: {
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'font-size': '1.8rem',
        'margin': '8px 16px'
      },
      textLinkStyles: {
        a: {
          'color': '#F4BC64',
          'text-decoration': 'none'
        },
        hover: {
          'color': '#fff',
          'text-decoration': 'underline'
        }
      }
    },
    key: 1
  },
  {
    element: {
      text: '<a href="#">Features</a>',
      styles: {
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'font-size': '1.8rem',
        'margin': '8px 16px'
      },
      textLinkStyles: {
        a: {
          'color': '#F4BC64',
          'text-decoration': 'none'
        },
        hover: {
          'color': '#fff',
          'text-decoration': 'underline'
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
        'margin': '8px 16px'
      }
    },
    key: 0
  },
  {
    element: {
      text: '<a href="#">Media</a>',
      styles: {
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'font-size': '1.8rem',
        'margin': '8px 16px'
      },
      textLinkStyles: {
        a: {
          'color': '#F4BC64',
          'text-decoration': 'none'
        },
        hover: {
          'color': '#fff',
          'text-decoration': 'underline'
        }
      }
    },
    key: 3
  },
  {
    element: {
      text: '<a href="#">Packs</a>',
      styles: {
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'font-size': '1.8rem',
        'margin': '8px 16px'
      },
      textLinkStyles: {
        a: {
          'color': '#F4BC64',
          'text-decoration': 'none'
        },
        hover: {
          'color': '#fff',
          'text-decoration': 'underline'
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
  components: merge({}, defaultComponents),
  edited: true
}

export default {
  name,
  group,
  cover,

  mixins: [defaults],

  $schema: {
    isHeader: true,
    mainStyle: StyleObject,
    container: StyleObject,
    components: [
      { name: 'TextElement', element: Text, type: 'text', class: 'b-header-link', label: 'link', key: 1 },
      { name: 'TextElement', element: Text, type: 'text', class: 'b-header-link', label: 'link', key: 2 },
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 },
      { name: 'TextElement', element: Text, type: 'text', class: 'b-header-link', label: 'link', key: 3 },
      { name: 'TextElement', element: Text, type: 'text', class: 'b-header-link', label: 'link', key: 4 }
    ]
  },

  data () {
    return {
      isToggle: false
    }
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
      this.isToggle = !this.isToggle
    }
  }
}
</script>

<style lang="sass" scoped>
.b-section-header
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
    background-position: center !important
  @media (max-width: 800px)
    display: block
    background-position: center !important

.b-logo-one
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

@media (max-height: 420px) and (max-width: 800px) and (min-width: 480px)
  .b-slot .b-draggable-slot > div
    width: 50% !important
</style>
