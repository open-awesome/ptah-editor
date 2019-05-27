<template>
  <div>{{section.name}}</div>
</template>

<script>
export default {
  name: 'MenuTreeItem',

  props: {
    section: {
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
  div
    background: $dark-blue-krayola
    color: $white
    padding: 1rem
    border-radius: 4px
    margin: .4rem 0
</style>
