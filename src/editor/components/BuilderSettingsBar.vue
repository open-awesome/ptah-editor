<template>
  <div class="b-builder-settings-bar">
    <button class="b-builder-settings-bar__closer" @click="$emit('requestClose')">
      <icon-base width="10" height="10" name="close"/>
    </button>
    <h6 class="b-builder-settings-bar__title">
      {{ label }}
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
    ...mapState('Sidebar', ['settingObjectType', 'settingObjectLabel']),

    label () {
      if (this.settingObjectLabel) {
        return this.settingObjectLabel
      }
      return (this.elementSettings) ? this.settingObjectType : this.title
    },

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
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-builder-settings-bar
  position: relative
  width: $size-step*9
  height: 100%
  padding: 2.8rem 0.5rem 2.8rem 3.2rem

  display: flex
  flex-direction: column

  background: $white
  box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)
  &__title
    min-width: 28rem
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
