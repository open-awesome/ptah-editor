<template>
  <div class="b-builder-settings-bar">
    <button class="b-builder-settings-bar__closer" @click="$emit('requestClose')">
      <!-- @todo move to icons -->
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.82118 0.202253C7.09085 -0.0674173 7.52808 -0.0674171 7.79775 0.202253C8.06742 0.471924 8.06742 0.909146 7.79775 1.17882L1.17882 7.79775C0.909146 8.06742 0.471923 8.06742 0.202253 7.79775C-0.0674175 7.52808 -0.0674177 7.09085 0.202253 6.82118L6.82118 0.202253Z" fill="#888888" fill-opacity="0.5"/>
        <path d="M7.79775 6.82118C8.06742 7.09085 8.06742 7.52808 7.79775 7.79775C7.52808 8.06742 7.09085 8.06742 6.82118 7.79775L0.202254 1.17882C-0.0674168 0.909146 -0.0674165 0.471923 0.202254 0.202253C0.471925 -0.0674177 0.909147 -0.0674176 1.17882 0.202253L7.79775 6.82118Z" fill="#888888" fill-opacity="0.5"/>
      </svg>
    </button>
    <h6 class="b-builder-settings-bar__title" :class="{ 'subtitle': elementSettings }">
      {{title}}
    </h6>
    <h6 class="b-builder-settings-bar__title" v-if="elementSettings">
      {{ settingObjectType }}
    </h6>
    <div class="b-builder-settings-bar__contents" v-if="title">
      <component :is="settingComponent" :builder="builder"></component>
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
  width: 24rem
  height: 100%
  background: #F5F5F5
  padding: 2.8rem 0.5rem 2.8rem 3.2rem
  display: flex
  flex-direction: column
  height: 100%

  &__title
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
    flex-grow: 2
    display: flex
</style>
