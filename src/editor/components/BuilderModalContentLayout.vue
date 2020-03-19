<template>
  <div class="b-builder-modal-content-layout">
    <div class="b-builder-modal-content-layout__content">
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
  height: 100%
   position: relative
  &__content
    position: absolute
    top: 0
    bottom: 9rem
    right: 0
    left: 0
  &__controls
    position: absolute
    bottom: 0
    right: 0
    left: 0
    height: 9rem

    & > div
      border-top: 1px solid $ligth-grey
      height: 100%
      padding: 0 2.2rem

      display: flex
      align-items: center
      justify-content: flex-end

.b-scrolled-content
  margin: 0
  flex-grow: 1
  &__inner
    height: 100%
    padding: 0 1rem 0 0

</style>
