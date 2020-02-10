<template>
<header
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, {'_sticky' : $sectionData.mainStyle.sticky }]"
    :style="[$sectionData.mainStyle.styles, { '--bg-color': $sectionData.mainStyle.styles['background-color'] }, $sectionData.objVarsMedia]"
    class="b-smm-header b-header-logo b-section-header">

  <slot name="menu"/>
  <slot name="video"/>
  <slot name="overlay"/>

  <div class="b-grid b-header">
    <div class="b-grid__row">

      <div class="b-grid__col-12 b-grid__col-m-12 mobile-header b-section-header__col">

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

      </div>

      <div
          :id="`mobile-menu-${ _uid }`"
          class="b-grid__col-12 b-grid__col-m-12 mobile-menu mobile-menu_drop b-section-header__col"
          :class="{ 'mobile-menu_hide': !$sectionData.isToggle }"
        >

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
    }
  },
  {
    element: {
      text: 'Features',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#F4BC64',
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
    }
  },
  {
    element: {
      styles: {
        'background-image': 'url("https://s3.protocol.one/src/o_1Y54Cu.svg")',
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
          'margin-top': '32px',
          'margin-right': '0',
          'margin-bottom': '16px',
          'margin-left': '0'
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
    }
  },
  {
    element: {
      text: 'Packs',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#F4BC64',
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
    }
  }
]
const defaultSchema = {
  mainStyle: {
    hamPosition: 17,
    styles: {
      'background-image': 'url(https://s3.protocol.one/src/o_cm1BL.jpg)',
      'background-color': 'rgba(51, 51, 51, 0.95)',
      'background-position': '50% 50%',
      'background-size': 'cover'
    }
  },
  container: {
    styles: {
      'flex-direction': 'row',
      'justify-content': 'center',
      'align-items': 'center'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column',
        'justify-content': 'flex-start'
      }
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
</style>
