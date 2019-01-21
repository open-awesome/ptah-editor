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

      <span class="b-menu-subitem__selected-icon">
        <IconBase
          name="arrowRight"
          width="8"
          height="14"
          color="transparent"
          strokeColor="rgba(255,255,255,0.24)"
          />
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
$selected-bg-color: rgba(#202020, 0.35)

.b-menu-subitem
  cursor: pointer
  color: #474747
  font-size: 1.4rem
  padding: 0

  &:hover:not(.b-menu-subitem_selected)
    background: rgba(#202020, 0.08)

  &__inner
    display: flex
    align-items: center
    height: 4.8rem
    border-radius: 0.2rem

    &.item-main
      border-left: 7px solid #436FEE
      border-radius: 0 0.2rem 0.2rem 0

    &.item-child
      border-left: 7px solid rgba(67, 111, 238, .3)
      padding-left: 1.4em
      border-radius: 0 0.2rem 0.2rem 0

    .b-menu-subitem_selected &
      background: #4D7DD8
      color: #ffffff

  &__drag-icon
    visibility: hidden
    width: 3.2rem
    padding-left: 0.1rem

    .b-menu-subitem:hover &
      visibility: visible

  &__title
    flex-grow: 1

  &__selected-icon
    visibility: hidden
    margin-right: 1.8rem

    .b-menu-subitem_selected &
      visibility: visible
</style>
