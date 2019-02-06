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
  width: 70rem
  display: flex
  align-items: center
  justify-content: center
  @media only screen and (max-width: 768px)
    &
      flex-direction: column
  input
    width: 45rem
    border: 0.2rem solid rgba(255, 125, 125, 0.5)
    background: #fff
    font-size: 2rem
    color: #2a2a2a
    border-radius: 2px
    height: 64px
    padding: 10px
    @media only screen and (max-width: 768px)
      &
        max-width: 100%
  button
    min-width: 22.4rem
    padding: 0 20px
    background-color: rgba(255, 109, 100, 1)
    color: #FFFFFF
    font-size: 1.6rem
    border-radius: 2px
    height: 64px
    border: none
    text-transform: uppercase
    font-family: 'Lato'
    letter-spacing: .28em
    margin-left: 2rem
    @media only screen and (max-width: 768px)
      &
        min-width: auto
        max-width: 100%
</style>
