<template>
  <div class="b-builder-modal-content-layout">
    <div class="b-builder-modal-content-layout__inner">
      <slot></slot>
    </div>
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
  flex-grow: 1;

  &__inner
    padding: 4rem
    overflow-y: auto
    flex-grow: 1

  &__controls
    display: flex
    flex-shrink: 0
    border-top: 1px solid #E2E2E2
    padding: 1.6rem
    justify-content: flex-end
    box-shadow: 0 -0.3rem 0.3rem rgba(0,0,0,0.08)

</style>
