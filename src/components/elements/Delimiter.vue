<template>
    <div class="b-delimiter is-editable"></div>
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
  .is-mobile &,
  .is-tablet &
    display: none
  @media only screen and (max-width: 768px)
    &
      display: none

</style>
