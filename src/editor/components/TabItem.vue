<template>
  <div class="b-tab-item"
    :class="{'b-tab-item_selected': isSelected }"
    @click="handleClick">
    <div class="b-tab-item__inner">
      <span class="b-tab-item__title">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TabItem',

  props: {
    /**
     * Configurates selected item view
     */
    isSelected: {
      type: Boolean,
      default: false
    },

    sectionId: {
      type: Number
    }
  },

  data () {
    return {
      isChild: false
    }
  },

  computed: {
    ...mapState('Sidebar', ['sectionsGroups'])
  },

  watch: {
    // watch for child sections
    'sectionsGroups': {
      handler (value) {
        this.isChild = false

        value.forEach((obj) => {
          if (obj.children.indexOf(this.sectionId) > -1) {
            this.isChild = true
          }
        })
      }
    }
  },

  methods: {
    handleClick (event) {
      // --- rm class/es from menu items
      document
        .querySelectorAll('.b-tab-item_selected')
        .forEach(el => el.classList.remove('b-tab-item_selected'))
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-tab-item
  cursor: pointer
  margin: 0 $size-step/2

  color: $dark-grey
  font-size: 1.6rem
  white-space: nowrap
  &:hover:not(.b-tab-item_selected)
    color: $main-green
  &:first-child
    margin-left: 0

  &__inner
    font-size: 1.6rem
    line-height: 1

    height: calc(#{$size-step} - 0.2rem + 1px)
  &__title
    flex-grow: 1

  &_selected
    color: $main-green
    border-bottom: 0.2rem solid $main-green
</style>
