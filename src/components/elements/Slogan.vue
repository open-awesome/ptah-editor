<template>
  <div class="b-slogan">
  </div>
</template>

<script>
export default {
  name: 'Slogan'
}
</script>

<style lang="sass">
.b-slogan
  margin: 1.6rem
  background-image: url(https://gn793.cdn.stg.gamenet.ru/0/79yeF/o_1PRuEc.png)
  background-size: contain
  background-position: center center
  background-repeat: no-repeat
  font-size: 4.8rem
  line-height: 1.2
  padding: 3.2rem
  color: #fff
  font-family: 'Lato'
  text-align: center
  display: flex
  text-align: center
  justify-content: center
  flex-direction: column
  &.is-editable
    border: 1px dashed #18d88b
  .is-mobile &
    margin: 1rem auto
    height: auto
  @media only screen and (max-width: 540px)
    &
      margin: 1rem auto
      height: auto
</style>
