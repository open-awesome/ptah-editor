<template>
  <div>
  <form class="b-form-element ptah-form"
    :data-action="$builder.settings.mailchimpUrl"
    method="post"
    target="_blank"
    :style="{
      'background-color' : styles['background-color'],
    }"
    >
    <input
      type="email"
      name="EMAIL"
      required
      :style="{
        'color' : styles['color'],
        'background-color': formStyles['input-color'],
        'font-family' : styles['font-family'],
        'font-size' : styles['font-size'],
        'font-weight' : styles['font-weight'],
        'font-style' : styles['font-style'],
        'text-decoration' : styles['text-decoration']
      }"
      :placeholder="placeholder"
      class="b-form-element-input ptah-input"
      >
    <div class="b-form-element__hidden-input" aria-hidden="true">
      <input type="text" :name="roboCheck" tabindex="-1" value="" class="ptah-valid">
    </div>
    <button type="submit" class="b-form-element-button ptah-submit"
     :style="{
      'color': styles['color'],
      'background-color': formStyles['button-color'],
      'color' : styles['color'],
      'font-family' : styles['font-family'],
      'font-size' : styles['font-size'],
      'font-weight' : styles['font-weight'],
      'font-style' : styles['font-style'],
      'text-decoration' : styles['text-decoration']
     }"
      >
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

    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    },

    formStyles () {
      return this.$section.get(`$sectionData.${this.path}.formStyles`)
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

  width: 100%
  padding: 0.4rem 0.8rem
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08)
  .is-mobile &,
  .is-tablet &
    flex-direction: column
  @media only screen and (max-width: 768px)
    &
      flex-direction: column

  &__hidden-input
    position: absolute
    left: -5000px

  input
    width: 65%
    min-width: 50%
    height: 4.8rem
    margin: 0.2rem

    font-size: 2rem

    overflow: hidden
    .is-mobile &,
    .is-tablet &
      width: 100%
    @media only screen and (max-width: 768px)
      &
        width: 100%
  button
    max-width: 50%
    height: 4.8rem
    margin: 0.2rem

    font-size: 1.6rem
    word-break: keep-all
    overflow: hidden
    .is-mobile &,
    .is-tablet &
      width: 100%
    @media only screen and (max-width: 768px)
      &
        width: 100%

.b-form-element-button
  padding: 0 2rem
  border-radius: 0.2rem
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
  border: none
  background: #fff
  color: #2a2a2a
  border-radius: 0.2rem
  padding: 1rem
  .is-mobile &,
  .is-tablet &
    max-width: 100%
    margin-bottom: 1rem
  @media only screen and (max-width: 768px)
    &
      max-width: 100%
      margin-bottom: 1rem
</style>
