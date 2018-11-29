<template>
  <div class="b-logo"></div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="sass" scoped>
.b-logo
  display: inline-block
  margin: 1rem auto
  text-align: center
  width: 20rem
  height: 20rem
  .is-mobile &
    margin: 1rem auto
    height: auto
  @media only screen and (max-width: 540px)
    &
      margin: 1rem auto
      height: auto
</style>
