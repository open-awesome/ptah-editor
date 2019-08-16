<template>
  <div class="b-builder-modal-content-layout">
    <base-scroll-container class="b-scrolled-content" backgroundBar="#999" v-if="!noScroll">
      <div class="b-scrolled-content__inner">
        <slot></slot>
      </div>
    </base-scroll-container>

    <div class="b-scrolled-content" v-if="noScroll">
      <div class="b-scrolled-content__inner">
        <slot></slot>
      </div>
    </div>

    <div class="b-builder-modal-content-layout__controls" v-if="$slots.controls">
      <slot class="b-builder-modal-content-layout__controls-slot" name="controls"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuilderModalContentLayout',
  props: {
    noScroll: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-builder-modal-content-layout
  display: flex
  flex-direction: column
  flex-grow: 1
  height: 100%

  &__controls
    & > div
      border-top: 1px solid $ligth-grey
      padding: $size-step/2

      display: flex
      justify-content: flex-end
      flex-shrink: 0

.b-scrolled-content
  margin: 0
  flex-grow: 1
  &__inner
    height: 100%
    padding: $size-step/2 $size-step

</style>
