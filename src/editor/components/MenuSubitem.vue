<template>
  <div class="b-menu-subitem"
    :class="{'b-menu-subitem_selected': isSelected}"
    @click="$emit('click', $event)">
    <span class="b-menu-subitem__drag-icon">
      <IconBase
        slot="icon"
        name="drag">
      </IconBase>
    </span>

    <span class="b-menu-subitem__title">
      <slot></slot>
    </span>

    <span
      class="b-menu-subitem__settings-icon"
      v-if="hasSettings"
      @click.stop="$emit('settingsClick')">

      <IconBase
        slot="icon"
        name="settings"
        width="16"
        height="14"
        :color="settingsIconColor">
      </IconBase>

    </span>
  </div>
</template>

<script>
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

    /**
     * Is settings button available?
     */
    hasSettings: {
      type: Boolean,
      default: false
    },

    /**
     * Is settings button pressed?
     */
    isSettingsSelected: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    settingsIconColor () {
      return this.isSettingsSelected ? '#0B99FF' : '#888888'
    }
  }
}
</script>

<style lang="sass" scoped>
$selected-bg-color: rgba(#202020, 0.35)

.b-menu-subitem
  display: flex
  height: 4.0rem
  align-items: center
  cursor: pointer
  color: #474747
  font-size: 1.4rem
  padding-right: 2.4rem
  position: relative

  &:hover
    background: rgba(#202020, 0.08)

  &_selected
    background: #4D7DD8
    color: #ffffff

    &:after
      content: ''
      background: #4D7DD8
      width: 0.8rem
      height: 0.8rem
      position: absolute
      right: -0.4rem
      transform: rotate(45deg)

  &__drag-icon
    visibility: hidden
    width: 3.2rem
    padding-left: 0.1rem

    .b-menu-subitem:hover &
      visibility: visible

  &__title
    flex-grow: 1

  &__settings-icon
    padding: 1rem
    visibility: hidden

    .b-menu-subitem:hover &
      visibility: visible
</style>
