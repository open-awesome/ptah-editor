<script>
export default {
  name: 'BaseFieldset',

  props: {
    hasToggle: {
      type: Boolean,
      default: false
    },
    isOpened: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    isOpened (value) {
      this.isOpenedInner = value
    }
  },

  data () {
    return {
      isOpenedInner: this.isOpened
    }
  }
}
</script>

<template>
  <section class="b-base-fieldset">
    <header class="b-base-fieldset__header"
      @click="isOpenedInner = !isOpenedInner">
      <span class="b-base-fieldset__toggle-icon" v-if="hasToggle">
        <IconBase name="arrowDropDown" width="6" height="4" color="#888888" />
      </span>
      <slot name="heading"></slot>
    </header>
    <base-dropdown v-if="hasToggle" :isOpened="isOpenedInner">
      <slot></slot>
    </base-dropdown>
    <template v-else>
      <slot></slot>
    </template>
  </section>
</template>

<style lang="sass" scoped>
.b-base-fieldset
  // dropping down common styles defined by tag name
  background: transparent
  z-index: auto

  margin-bottom: 4.5rem
  text-align: left

  &__header
    cursor: pointer
    position: relative

  &__toggle-icon
    position: absolute
    left: -1.4rem
    top: 50%
    margin-top: -1px

    svg
      margin: 0
      vertical-align: top
</style>
