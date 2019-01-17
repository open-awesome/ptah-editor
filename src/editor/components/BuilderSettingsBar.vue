<template>
  <div class="b-builder-settings-bar">
    <button class="b-builder-settings-bar__closer" @click="$emit('requestClose')">
      <icon-base width="10" height="10" name="close"/>
    </button>
    <h6 class="b-builder-settings-bar__title">
      {{ (elementSettings) ? settingObjectType : title }}
    </h6>
    <div v-if="title" class="b-builder-settings-bar__contents">
      <component :is="settingComponent" :builder="builder"/>
    </div>
  </div>
</template>

<script>
import BuilderSettingsBarSection from './BuilderSettingsBarSection'
import BuilderSettingsBarElement from './BuilderSettingsBarElement'

import { mapState } from 'vuex'

export default {
  name: 'BuilderSettingsBar',

  props: {
    title: {
      required: true,
      type: String
    },
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectType'
    ]),

    settingComponent () {
      const suffix = this.settingObjectType === 'section' ? 'Section' : 'Element'
      return `BuilderSettingsBar${suffix}`
    },

    elementSettings () {
      return this.settingObjectType !== 'section'
    }
  },

  components: {
    BuilderSettingsBarSection,
    BuilderSettingsBarElement
  }
}
</script>

<style lang="sass" scoped>
.b-builder-settings-bar
  position: relative
  max-width: 40rem
  width: 100%
  width: intrinsic
  width: -moz-max-content
  width: -webkit-max-content
  height: 100%
  display: flex
  flex-direction: column
  padding: 2.8rem 0.5rem 2.8rem 3.2rem
  background: #F5F5F5
  &__title
    min-width: 25rem
    margin: 0 0 2.8rem 0
    color: #272727
    font-size: 1.8rem
    font-weight: bold
    &:first-letter
      text-transform: uppercase
    &.subtitle
      color: rgba(39, 39, 39, 0.5)
      font-size: 1.4rem
      font-weight: normal
      margin: 0 0 1rem
  &__closer
    position: absolute
    right: 1rem
    top: 1rem
    padding: 0.6rem 1rem
    border: 0
    background: transparent
    cursor: pointer
  &__contents
    display: flex
    flex-grow: 2
    overflow: auto
</style>
