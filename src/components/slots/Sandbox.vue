<template>
  <div class="b-slot">
    <base-button @click="showSandboxSidebar" class="sandbox-equalizer" color="light-gray">
      <icon-base name="equalizer"/>
    </base-button>
    <slot/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Sandbox',

  inject: ['$section'],

  props: {
    containerPath: String,
    componentsPath: String
  },

  computed: {
    styles () {
      return this.$section.get(this.containerPath).styles
    },

    components () {
      return this.$section.get(this.componentsPath)
    }
  },

  methods: {
    ...mapMutations('Sidebar', [
      'toggleSandboxSidebar',
      'setSandboxPaths',
      'setSection'
    ]),

    showSandboxSidebar () {
      this.setSection(this.$section)
      this.setSandboxPaths({
        components: this.componentsPath,
        container: this.containerPath
      })
      setImmediate(() => this.toggleSandboxSidebar(true))
    }
  }
}
</script>

<style lang="sass" scoped>
.b-slot
  $this: &
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  position: relative
  width: 100%
  min-height: 20rem
  .is-editable &
    border: 1px dashed $green
  /deep/
    .b-draggable-slot
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-items: center
      color: inherit
      &_100
        width: 100%

.sandbox-equalizer
  position: absolute
  top: 0
  right: 0

  width: auto
  height: auto
  padding: .8rem

  display: flex
  align-items: center
  justify-content: center

  line-height: 1.5em
  opacity: .3

  > svg
    margin: 0

  &:hover
    opacity: 1
</style>
