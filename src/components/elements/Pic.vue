<template>
  <div class="b-image is-editable"></div>
</template>

<script>
export default {
  name: 'Pic'
}
</script>

<style lang="sass" scoped>
.b-image
  display: inline-block
  margin: 1.6rem
  text-align: center
  width: 20rem
  height: 20rem
  &.is-editable
    border: 1px dashed #18d88b
</style>
