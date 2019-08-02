<template>
  <div class="b-page b-page_404">
    <header-component/>
    <div class="wrapper wrapper-content">
      <div class="b-404">
        <div class="b-404__chapter">
          404
        </div>
        <div class="b-404__text">
          Sorry! We can't find the page you're looking for.
        </div>
        <div class="b-404__btn">
          <BaseButton color="blue" @click="returnToBoard">
            {{buttonText}}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './layout/Header.vue'
import FooterComponent from './layout/Footer.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },

  computed: {
    isGuest () {
      return localStorage.getItem('guest') !== null
    },

    buttonText () {
      return this.isGuest ? 'Return to main page' : 'Return to Dashboard'
    }
  },

  methods: {
    returnToBoard () {
      this.$router.push(this.isGuest ? '/' : '/dashboard/')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/_colors.sass'
@import '../assets/sass/_variables.sass'

.b-page_404
  overflow: hidden
  position: relative

  background-color: $grey
  background-image: url(../assets/img/404_back.png)
  baclground-position: center center
  background-size: auto 100%
.b-404
  position: absolute
  top: 50%
  left: 50%
  margin-top: -$size-step*5.5
  margin-left: -$size-step*5.5
  width: $size-step*11
  height: $size-step*11

  text-align: center
  color: $white
  &__chapter
    font-size: $size-step*6
    font-family: Lato
    font-weight: bold
  &__text
    color: $black

    font-size: $size-step
    font-family: Lato
    font-weight: bold

    text-align: center
  &__btn
    margin-top: $size-step/2
</style>
