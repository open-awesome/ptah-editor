<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'

let slot1 = {
  container: types.StyleObject,
  components: [
    {
      name: 'Logo',
      element: types.Logo,
      type: 'image',
      class: 'b-logo-test'
    },
    {
      name: 'Delimiter',
      element: types.StyleObject,
      type: 'section',
      class: 'b-delimiter-test'
    },
    {
      name: 'Button',
      element: _.merge(types.Button, { text: 'Button' }),
      type: 'button',
      class: 'b-button-test'
    },
    {
      name: 'Delimiter',
      element: types.StyleObject,
      type: 'section'
    },
    {
      name: 'Title',
      element: _.merge(types.Text, { text: 'Reloaded is a multiplayer game, free-to-play first-person shooter' }),
      type: 'text',
      class: 'b-text-test'
    }
  ]
}

export default {
  name: 'Hero1',
  cover: '/img/covers/hero1.jpg',
  group: 'Hero',
  $schema: {
    mainStyle: types.StyleObject,
    slots: [
      Seeder.seed(slot1)
    ]
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    onAddElement (element) {
      element.element.removable = true
      this.$section.data.slots[0].components.push(element)
    }
  }
}
</script>

<template>
  <section
    class="b-hero"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
    <sandbox class="b-sandbox"
      ref="sandbox"
      path="$sectionData.slots[0].container"
      v-styler:section="$sectionData.slots[0].container"
      v-bind:style="$sectionData.slots[0].container.styles"
      >
      <elements-list @addEl="onAddElement"></elements-list>
      <component v-for="(component, index) in $sectionData.slots[0].components"
        v-if="$sectionData.slots[0].components.length !== 0"
        :is="component.name"
        :key="index"
        :href="$sectionData.slots[0].components[index].element.href"
        v-html="$sectionData.slots[0].components[index].element.text"
        :style="$sectionData.slots[0].components[index].element.styles"
        :class="[$sectionData.slots[0].components[index].element.classes, $sectionData.slots[0].components[index].class]"
        v-styler:for="{ el: $sectionData.slots[0].components[index].element, path: `$sectionData.slots[0].components[${index}].element`, type: $sectionData.slots[0].components[index].type }"
        >
      </component>
    </sandbox>
  </section>
</template>

<style lang="sass" scoped>
$h: 100vh
.b-hero
  position: relative
  width: 100%
  min-height: #{$h}
  margin: 0
  padding: 1rem
  background-image: url(https://gn158.cdn.stg.gamenet.ru/0/7IahR/o_1thKM9.jpg)
  background-size: cover
  background-repeat: no-repeat
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &.is-editable
    min-height: calc(#{$h} - 7.2rem)
.b-delimiter-test
  height: 25rem
.b-logo-test
  background-position: center center !important
  background-repeat: no-repeat !important
  background-size: contain !important
  background-color: rgba(0, 0, 0, 0) !important
.b-button-test
  color: rgb(0, 0, 0)
  border-radius: 0
  font-family: Roboto
  text-align: center
  background-color: rgb(245, 166, 35)
  border-color: rgb(245, 166, 35)
  font-weight: bold
  width: 28rem
  height: 8rem
  font-size: 4rem
.b-text-test
  color: rgb(255, 255, 255)
  font-size: 2rem
</style>
