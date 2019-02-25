<template>
<video class="b-video" controls></video>
</template>

<script>
export default {
  name: 'Video'
}
</script>

<style lang="sass" scoped>
.b-video
  width: calc(100% - 1.6rem)
  max-height: 100%
  margin: 1.6rem .8rem

  &.is-editable
    border: .1rem dashed #18d88b
</style>
