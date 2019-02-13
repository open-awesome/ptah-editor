<template>
  <div class="b-builder-modal-content-layout">
    <base-scroll-container class="b-scrolled-content" backgroundBar="#999">
      <div class="b-scrolled-content__inner">
        <slot></slot>
      </div>
    </base-scroll-container>
    <div class="b-builder-modal-content-layout__controls" v-if="$slots.controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuilderModalContentLayout'
}
</script>

<style lang="sass" scoped>
.b-builder-modal-content-layout
  display: flex
  flex-direction: column
  flex-grow: 1
  position: absolute
  top: 0
  bottom: 0
  right: 0
  left: 0

  &__controls
    display: flex
    justify-content: space-between
    flex-shrink: 0
    border-top: 1px solid #E2E2E2
    padding: 1.6rem
    justify-content: space-evenly
    box-shadow: 0 -0.6rem 1.5rem rgba(0,0,0,0.1)

.b-scrolled-content
  margin: 0
  flex-grow: 1

  &__inner
    padding: 4rem

</style>
