<template>
<header
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, {'_sticky' : $sectionData.mainStyle.sticky }]"
    :style="[$sectionData.mainStyle.styles, { '--bg-color': $sectionData.mainStyle.styles['background-color'] }, $sectionData.objVarsMedia]"
    class="b-smm-header b-button-header b-section-header">

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

const [name, group, cover] = ['ActionButtonWesternHeader', 'Header', '/img/covers/header-western-01.jpg']

const defaultComponents = [
  {
    element: {
      styles: {
        'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/60830e1a-779e-4674-83dc-f550bdea0ace.png)',
        'background-color': 'rgba(0, 0, 0, 1)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '130px',
        'height': '50px',
        'margin-top': '8px',
        'margin-right': '16px',
        'margin-bottom': '8px',
        'margin-left': '16px'
      },
      media: {
        'is-mobile': {
          width: '100px',
          height: '40px',
          'margin-top': '0',
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
        'color': '#1A83FF',
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
        'color': '#1A83FF',
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
        'color': '#1A83FF',
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
        'background-color': '#1A83FF',
        'color': '#000000',
        'font-family': 'Montserrat',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '186px',
        'height': '50px',
        'border-radius': '10px'
      },
      pseudo: {
        'hover': {
          'color': '#1A83FF',
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
      'background-color': 'rgba(0, 0, 0, 1)'
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
        'flex-direction': 'column',
        'margin-top': '-8px'
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
</style>
