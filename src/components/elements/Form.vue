<template>
  <form class="b-form-element ptah-form" :data-action="$builder.settings.mailchimpUrl">
    <input type="email" name="EMAIL" :placeholder="placeholder" class="b-form-element-input">
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true">
      <input type="text" name="b_24eb68ed5e4875cb24309c0dd_994b03af6b" tabindex="-1" value="">
    </div>
    <button type="submit" class="b-form-element-button ptah-submit">{{ buttonText }}</button>
  </form>
</template>

<script>
export default {
  name: 'Form',

  inject: ['$section', '$builder'],

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
