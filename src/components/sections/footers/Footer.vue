<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'

const COMPONENTS = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-footer-game-logo',
    label: 'logo',
    key: 0
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-footer-copyright',
    label: 'description',
    key: 1
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-footer-link',
    label: 'text',
    key: 2
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-footer-link',
    label: 'text',
    key: 3
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-footer-link',
    label: 'text',
    key: 4
  },
  {
    name: 'AgeRestrictions',
    element: types.AgeRestrictions,
    type: 'restrictions',
    class: 'b-age-restrictions',
    label: 'age restrictions',
    key: 5
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn341.cdn.stg.gamenet.ru/0/7MZTn/o_21pVfk.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'width': '153px',
        'height': '71px'
      }
    },
    key: 0
  },
  {
    element: {
      text: '2018—2019. Some text for footer',
      styles: {
        'font-family': 'PT Serif',
        'font-size': '1.6rem',
        'color': 'rgba(255, 255, 255, 0.3)'
      }
    },
    key: 1
  },
  {
    element: {
      text: '<a href="#">Information</a>',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'color': '#FF6D64',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'font-size': '1.6rem'
      }
    },
    key: 2
  },
  {
    element: {
      text: '<a href="#">Legal</a>',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'color': '#FF6D64',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'font-size': '1.6rem'
      }
    },
    key: 3
  },
  {
    element: {
      text: '<a href="#">Something</a>',
      styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        'color': '#FF6D64',
        'font-family': 'PT Serif',
        'text-align': 'center',
        'font-size': '1.6rem'
      }
    },
    key: 4
  }
]

const GROUP_NAME = 'Footer'
const NAME = 'Footer'
const BG_SECTION = 'url(https://gn685.cdn.stg.gamenet.ru/0/7MZzz/o_bJr44.jpg)'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#151C44',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
  },
  components: _.merge({}, C_CUSTOM),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [defaults],

  cover: '/img/covers/footer.jpg',

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
  <section
    class="b-section-footer"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-footer">
      <div class="b-grid">
        <div class="b-grid__row b-footer__row">
          <div class="b-grid__col-12 b-grid__col-m-12">
            <sandbox
                :style="$sectionData.container.styles"
                container-path="$sectionData.container"
                components-path="$sectionData.components"
                class="b-footer__col b-footer__col_1">

              <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_horizont" :style="$sectionData.container.styles" @change="dragStop">
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
  </section>
</template>

<style lang="sass" scoped>
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

  &-component
    margin: 0.8rem
    .is-mobile &,
    .is-tablet &
      margin: 0.8rem auto
    @media only screen and (max-width: 768px)
      &
        margin: 0.8rem auto

</style>
