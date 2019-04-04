<template>
  <div class="b-menu-subitem"
    :class="{'b-menu-subitem_selected': isSelected }"
    @click="handleClick">
    <div class="b-menu-subitem__inner" :class="{'item-main': isMain, 'item-child': isChild}">
      <span class="b-menu-subitem__drag-icon">
        <IconBase
          v-if="hasDraggableIcon"
          slot="icon"
          name="drag" />
      </span>

      <span class="b-menu-subitem__title">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MenuSubitem',

  props: {
    /**
     * Configurates selected item view
     */
    isSelected: {
      type: Boolean,
      default: false
    },

    isMain: {
      type: Boolean,
      default: false
    },

    hasDraggableIcon: {
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
        .querySelectorAll('.b-menu-subitem_selected')
        .forEach(el => el.classList.remove('b-menu-subitem_selected'))
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-menu-subitem
  cursor: pointer
  color: $white
  font-size: 1.4rem
  width: 100%
  padding: 0

  &:hover:not(.b-menu-subitem_selected)
    background: $dark-blue-krayola

  &__inner
    display: flex
    align-items: center
    height: 4.8rem

    &.item-main
      border-left: 7px solid #436FEE
      border-radius: 0 0.2rem 0.2rem 0

    &.item-child
      border-left: 7px solid rgba(67, 111, 238, .3)
      padding-left: 1.4em
      border-radius: 0 0.2rem 0.2rem 0

    .b-menu-subitem_selected &
      background: $dark-blue-krayola
      color: #ffffff

  &__drag-icon
    visibility: hidden
    width: $size-step/2
    padding-left: 0.1rem

    .b-menu-subitem:hover &
      visibility: visible

  &__title
    flex-grow: 1
    display: flex

    line-height: 4.8rem
    &-num
      width: $size-step
      text-align: center
    &-text
      display: inline-block
      width: 12rem
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
  &__icons
    width: 9rem
    margin: 0 $size-step/4 0 $size-step/4.5
    display: flex
    flex-wrap: nowrap
    align-items: center
    justify-content: space-between
    height: 5rem
  &__icon
    display: none
    & svg
      width: 1.6rem
      height: 1.6rem
    &_background
      & svg
        position: relative
        top: 0
        width: 1.4rem
  &_selected,
  &__inner:hover
    .b-menu-subitem__title
      .b-menu-subitem__icon
        display: inline-block
        opacity: 0.7
        &:hover
          opacity: 1

</style>
