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
  display: inline-block
  margin: 1.6rem
  display: flex
  align-items: center
  justify-content: center
  background-image: url(https://gn793.cdn.stg.gamenet.ru/0/79yeF/o_1PRuEc.png)
  background-size: contain
  background-position: center center
  background-repeat: no-repeat
  max-width: 98rem
  max-height: 90%
  font-size: 4rem
  line-height: 1.2
  padding: 3.2rem 6.4rem
  color: #fff
  font-family: 'Lato'
  text-align: center
  .is-mobile &
    margin: 1rem auto
    height: auto
  @media only screen and (max-width: 540px)
    &
      margin: 1rem auto
      height: auto
</style>
