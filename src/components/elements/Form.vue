<template>
  <div>
  <form class="b-form-element ptah-form" :data-action="$builder.settings.mailchimpUrl" method="post" target="_blank">
    <input
      type="email"
      name="EMAIL"
      required
      :style="inputBorder"
      :placeholder="placeholder"
      class="b-form-element-input ptah-input">
    <div style="position: absolute; left: -5000px;" aria-hidden="true">
      <input type="text" :name="roboCheck" tabindex="-1" value="" class="ptah-valid">
    </div>
    <button type="submit" class="b-form-element-button ptah-submit" :style="buttonStyles">
      <span><icon-base name="checkMark" color="white"></icon-base></span>
      {{ buttonText }}
    </button>
  </form>
  </div>
</template>

<script>
import { getParameterByName } from '@editor/util'
import { mapState } from 'vuex'

export default {
  name: 'Form',

  inject: ['$section', '$builder'],

  props: {
    path: {
      type: String
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    placeholder () {
      return this.$section.get(`$sectionData.${this.path}.placeholder`)
    },

    buttonText () {
      return this.$section.get(`$sectionData.${this.path}.buttonText`)
    },

    buttonStyles () {
      return this.$section.get(`$sectionData.${this.path}.formStyles`)
    },

    inputBorder () {
      let color = this.buttonStyles['background-color']

      return `border-color: ${color}`
    },

    roboCheck () {
      let hash = getParameterByName('u', this.currentLanding.settings.mailchimpUrl)
      let list = getParameterByName('id', this.currentLanding.settings.mailchimpUrl)

      return `b_${hash}_${list}`
    }
  }
}
</script>

<style lang="sass" scoped>
.b-form-element
  display: flex
  align-items: center
  justify-content: center
  .is-mobile &,
  .is-tablet &
    flex-direction: column
  @media only screen and (max-width: 768px)
    &
      flex-direction: column

  &--big
    width: 70rem
    .is-mobile &,
    .is-tablet &
      width: 100%
    @media only screen and (max-width: 768px)
      &
        width: 100%
    input
      width: 45rem
      height: 64px
      font-size: 2rem
      .is-mobile &,
      .is-tablet &
        width: 100%
      @media only screen and (max-width: 768px)
        &
          width: 100%
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

.b-form-element-button
  padding: 0 20px
  background-color: rgba(255, 109, 100, 1)
  color: #FFFFFF
  border-radius: 2px
  border: none
  text-transform: uppercase
  font-family: 'Lato', sans-serif
  letter-spacing: .28em
  margin-left: 2rem
  transition: all ease-out .4s
  position: relative
  span
    display: none
  &.submited
    background-color: $emerald-green
  .is-mobile &,
  .is-tablet &
    min-width: auto
    max-width: 100%
    margin-left: 0
  @media only screen and (max-width: 768px)
    &
      min-width: auto
      max-width: 100%
      margin-left: 0
.b-form-element-input
  border: 0.2rem solid rgba(255, 125, 125, 0.5)
  background: #fff
  color: #2a2a2a
  border-radius: 2px
  padding: 10px
  .is-mobile &,
  .is-tablet &
    max-width: 100%
    margin-bottom: 10px
  @media only screen and (max-width: 768px)
    &
      max-width: 100%
      margin-bottom: 10px
</style>
