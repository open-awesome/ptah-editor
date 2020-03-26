<template>
  <div class="caption">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCaption'
}
</script>

<style lang="sass" scoped>
.caption
  font-family: 'Open Sans'
  font-style: normal
  font-weight: bold
  font-size: 1.3rem
  line-height: 1.8rem
  letter-spacing: 0.065em
  text-transform: uppercase
  margin-bottom: 1.8rem
  color: $main-green
</style>
