<template>
    <div class="b-delimiter"></div>
</template>

<script>
export default {
  name: 'Delimiter'
}
</script>

<style lang="sass" scoped>
.b-delimiter
  width: 4rem
  height: 4rem
  position: relative
  padding: 0
  display: flex
  align-items: center
  justify-content: center
  &.is-editable
    border: 1px dashed #18d88b
</style>
