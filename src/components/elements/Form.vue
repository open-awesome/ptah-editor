<template>
  <form class="b-form-element ptah-form">
    <input type="email" name="email" :placeholder="placeholder">
    <button type="submit">{{ buttonText }}</button>
  </form>
</template>

<script>
export default {
  name: 'Form',

  inject: ['$section'],

  props: {
    path: {
      type: String
    }
  },

  computed: {
    placeholder () {
      return this.$section.get(`$sectionData.${this.path}.placeholder`)
    },

    buttonText () {
      return this.$section.get(`$sectionData.${this.path}.buttonText`)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-form-element
  display: flex
  align-items: center
  justify-content: center
  @media only screen and (max-width: 768px)
    &
      flex-direction: column
  input
    border: 0.2rem solid rgba(255, 125, 125, 0.5)
    background: #fff
    color: #2a2a2a
    border-radius: 2px
    padding: 10px
    @media only screen and (max-width: 768px)
      &
        max-width: 100%
  button
    padding: 0 20px
    background-color: rgba(255, 109, 100, 1)
    color: #FFFFFF
    border-radius: 2px
    border: none
    text-transform: uppercase
    font-family: 'Lato'
    letter-spacing: .28em
    margin-left: 2rem
    @media only screen and (max-width: 768px)
      &
        min-width: auto
        max-width: 100%
  &--big
    width: 70rem
    input
      width: 45rem
      height: 64px
      font-size: 2rem
    button
      min-width: 22.4rem
      height: 64px
      font-size: 1.6rem
  &--medium
    width: auto
    input
      width: 25rem
      height: 40px
      font-size: 1.6rem
    button
      min-width: 11rem
      height: 40px
      font-size: 1.4rem
</style>
