<template>
  <section
    class="b-hero"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
  >
  </section>
</template>

<script>
import * as types from '@editor/types'

export default {
  name: 'Hero1',
  cover: '/img/covers/button1.png',
  group: 'Hero',
  $schema: {
    mainStyle: types.StyleObject
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
$h: 100vh
.b-hero
  position: relative
  width: 100%
  height: #{$h}
  margin: 0
  padding: 9
  background-color: #a7a1a1
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  transition: background 200ms
  &.is-editable
    height: calc(#{$h} - 7.2rem)
</style>
