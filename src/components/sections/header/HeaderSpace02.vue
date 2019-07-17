<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
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
        @click.stop>

      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>

    </button>

    <div class="b-grid__row">
      <div class="b-grid__col-3 b-grid__col-m-12 mobile-header">

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
      <div :id="`mobile-menu-${ _uid }`" class="b-grid__col-9 b-grid__col-m-12 mobile-menu">

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
              @change="dragStop"
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

</section>
</template>

<script>
import { StyleObject, Logo, Button, SocialNetworks } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const [name, group, cover] = ['HeaderSpace02', 'header', '/img/covers/header-space-02.jpg']
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
        'margin': '8px 16px'
      }
    },
    key: 0
  }
]
const defaultComponents2 = [
  {
    element: {
      text: 'Link1',
      styles: {
        'background-color': 'transparent',
        'background-image': 'none',
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '130px',
        'height': '30px',
        'font-size': '2.4rem',
        'margin': '8px 16px'
      },
      pseudo: {
        hover: {
          color: '#fff !important'
        }
      }
    },
    key: 1
  },
  {
    element: {
      text: 'Link2',
      styles: {
        'background-color': 'transparent',
        'background-image': 'none',
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '130px',
        'height': '30px',
        'font-size': '2.4rem',
        'margin': '8px 16px'
      },
      pseudo: {
        hover: {
          color: '#fff !important'
        }
      }
    },
    key: 2
  },
  {
    element: {
      text: 'Link3',
      styles: {
        'background-color': 'transparent',
        'background-image': 'none',
        'color': '#F4BC64',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '130px',
        'height': '30px',
        'font-size': '2.4rem',
        'margin': '8px 16px'
      },
      pseudo: {
        hover: {
          color: '#fff !important'
        }
      }
    },
    key: 2
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
        color: '#F4BC64'
      },
      sizeIcons: {
        width: 30
      }
    },
    key: 6
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn736.cdn.stg.gamenet.ru/0/8dI9p/o_cm1BL.jpg)',
      'background-color': '#121619',
      'background-position': 'center',
      'background-size': 'cover'
    }
  },
  container: {
    styles: {
      'margin': '0 150px 0 0',
      'padding': '0'
    }
  },
  container2: {
    styles: {
      'padding': 0,
      'justify-content': 'space-between'
    }
  },
  components: merge({}, defaultComponents),
  components2: merge({}, defaultComponents2),
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
    container2: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo', key: 0 }
    ],
    components2: [
      { name: 'Button', element: Button, type: 'button', class: 'b-link', label: 'link', key: 1 },
      { name: 'Button', element: Button, type: 'button', class: 'b-link', label: 'link', key: 2 },
      { name: 'Button', element: Button, type: 'button', class: 'b-link', label: 'link', key: 3 },
      { name: 'SocialNetworks', element: SocialNetworks, type: 'networks', class: 'b-social-networks-fs', label: 'Social Networks', key: 6 }
    ]
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
    @media (max-width: 800px)
      background-color: rgba(#060e1c, .8)

.b-grid__col-3,
.b-grid__col-9
  padding: .8rem 1.6rem

.b-button-one
  margin-left: auto
  .is-mobile &
    margin-top: auto !important
    order: 1
  @media (max-width: 800px)
    margin-top: auto !important
    order: 1

.b-logo
  display: block
  .is-tablet &,
  .is-mobile &
    margin: 0.4rem auto !important

  @media (max-width: 800px)
    margin: 0.4rem auto !important
</style>
