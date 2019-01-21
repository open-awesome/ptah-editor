<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    class="b-hero">

  <slot name="video"/>

  <div class="b-grid">
    <div class="b-grid__row">

      <div class="b-grid__col-6 b-grid__col-m-12">

        <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            direction="column"
            align="center"
            class="b-sandbox">

          <draggable v-model="$sectionData.components" :style="$sectionData.container.styles" class="b-draggable-slot">

            <div
                v-for="(component, index) in $sectionData.components"
                v-if="$sectionData.components.length !== 0"
                :key="`component-${ _uid }-${ index }`">

              <component class="b-hero-component"
                  v-if="component.element.isComplex"
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
                  :path="`components[${index}].element`"/>

              <component
                  v-else
                  v-styler:for="{
                    el: component.element,
                    type: component.type,
                    label: component.label,
                    path: `$sectionData.components[${index}].element`
                  }"
                  v-html="component.element.text"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"/>

            </div>

          </draggable>

        </sandbox>

      </div>

    </div>
  </div>

</section>
</template>

<script>
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'
import { StyleObject, Logo, Video, Slogan, Button, Link } from '@editor/types'
import { mapActions } from 'vuex'
import { merge, forEach, find, after, cloneDeep } from 'lodash-es'

const [name, group, cover] = ['HeroArtRight', 'Hero', '/img/covers/hero-art-right.png']
const defaultColumnComponents = [
  {
    element: {
      styles: {
        'background-image': 'url(https://gn120.cdn.stg.gamenet.ru/0/7aITH/o_1vTdxd.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '25rem',
        'height': '15rem',
        'margin-bottom': '1.6rem'
      }
    }
  },
  {
    element: {
      src: 'https://gn553.cdn.stg.gamenet.ru/0/7aJD3/o_1Od7Vf.mp4'
    }
  },
  {
    element: {
      text: 'The Caaat!'
    }
  },
  {
    element: {
      text: 'Button',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '30rem',
        'height': '6.4rem',
        'max-width': '100%',
        'border-radius': '2px'
      }
    }
  },
  {
    element: {
      text: 'Link',
      styles: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '30rem',
        'height': '6.4rem',
        'max-width': '100%',
        'border-radius': '2px',
        'font-size': '1.8rem'
      }
    }
  }
]
const defaultSchema = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn545.cdn.stg.gamenet.ru/0/7aIQe/o_1Mpn8F.jpg)',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': '75% 50%'
    }
  },
  components: merge({}, defaultColumnComponents),
  edited: true
}

export default {
  name,
  group,
  cover,

  $schema: {
    mainStyle: StyleObject,
    container: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-logo', label: 'logo' },
      { name: 'Video', element: Video, type: 'video', class: 'b-video', label: 'video' },
      { name: 'Slogan', element: Slogan, type: 'slogan', class: 'b-slogan', label: 'slogan' },
      { name: 'Button', element: Button, type: 'button', class: 'b-button-test', label: 'button' },
      { name: 'Link', element: Link, type: 'link', class: 'b-link', label: 'link' }
    ]
  },

  components: { Draggable },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  computed: {
    canRestore () {
      let { groups, sectionData } = this.$store.state.Landing
      return ~groups.indexOf(group) && Boolean(sectionData[name])
    }
  },

  created () {
    this.seedData()
    this.setGroupDataText()
  },

  updated () {
    this.storeData.call(this)
  },

  methods: {
    ...mapActions('Landing', ['updateGroupData', 'updateSectionData']),

    seedData () {
      if (this.$sectionData.edited === undefined) {
        let data = (this.canRestore) ? this.section : defaultSchema
        Seeder.seed(merge(this.$sectionData, data))
      }
    },

    setGroupDataText () {
      let groupData = this.$store.state.Landing.groupData[group]
      forEach(groupData, (text, name) => {
        let component = find(this.$sectionData.components, { name })
        if (component) {
          component.element.text = text
        }
      })
    },

    storeData: after(2, function () {
      let groupData = this.$sectionData.components.map(({ name, element }) => ({ [name]: element.text }))
      let sectionData = cloneDeep(this.$sectionData)
      this.updateGroupData({ name, data: groupData })
      this.updateSectionData({ name, data: sectionData })
    })
  }
}
</script>

<style lang="sass" scoped>
$h: 100vh

.b-sandbox,
.b-draggable-slot
  max-width: 100%
  height: 100%

.b-sandbox
  min-height: 20rem
  justify-content: center
  align-items: center

.b-draggable-slot
  padding: 1.6rem .8rem

.b-hero
  position: relative
  width: 100%
  min-height: 60rem
  margin: 0
  padding: 1rem
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &-component
    margin: 1.2rem

.b-delimiter
  height: 2rem
  .is-mobile &,
  .is-tablet &
    display: none
  @media only screen and (max-width: 768px)
    &
      display: none

.b-logo
  margin: 0 0 5.5rem

.b-title
  color: rgb(255, 255, 255)
  font-style: normal
  font-weight: 800
  line-height: 6.7rem
  font-size: 4.8rem
  text-align: center
  letter-spacing: 0.15em
  text-transform: uppercase
  margin: 0 0 2rem
  text-shadow: 0 1.6rem 0.8rem rgba(0, 0, 0, 0.15)
  .is-mobile &,
  .is-tablet &
    font-size: 2rem !important
    line-height: 4rem
    padding: 0 1rem
  @media only screen and (max-width: 768px)
    &
      font-size: 2rem !important
      line-height: 4rem
      padding: 0 1rem

.b-text
  color: rgba(255, 255, 255, 0.3)
  font-size: 2rem
  line-height: 4rem
  text-align: center
  .is-mobile &,
  .is-tablet &
    font-size: 1.4rem !important
    line-height: 2rem
  @media only screen and (max-width: 768px)
    &
      font-size: 1.4rem !important
      line-height: 2rem

.b-button
  color: #fff
  font-family: Lato
  font-style: normal
  font-weight: bold
  font-size: 1.6rem
  text-align: center
  letter-spacing: 0.28em
  text-transform: uppercase
  width: 35.2rem
  height: 6.4rem
  background: #FF6D64
  box-shadow: 0 2.4rem 4.4rem rgba(0, 0, 0, 0.15)
  .is-mobile &,
  .is-tablet &
    width: 80% !important
    height: 4rem !important
    font-size: 1.4rem !important
  @media only screen and (max-width: 768px)
    &
      width: 80% !important
      height: 4rem !important
      font-size: 1.4rem !important
</style>
