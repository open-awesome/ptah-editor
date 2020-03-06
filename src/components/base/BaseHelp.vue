<template>
  <div class="b-base-help" @click="openLink">
    <div class="b-base-help__content" v-if="!hasLink">
      <div class="b-base-help__content-padd">
        <slot></slot>
        <div v-if="link !== ''">
          <a class="b-base-help__link" :href="link" target="_blank">Learn more</a>
        </div>
      </div>
    </div>
    <IconBase name="questionCircle" width="16" height="16" />
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String
    },
    hasLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openLink () {
      if (!this.hasLink) {
        return
      }
      window.open(this.link)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-base-help
  font-size: 1.4rem
  line-height: 1.7rem
  font-weight: normal
  color: rgba($dark-grey, 0.6)

  transition: color 0.1s ease
  margin-left: 1rem
  cursor: pointer
  position: relative
  & svg
    fill: $grey
  &:hover svg
    fill: $main-green
  &__content
    display: none
    position: absolute
    top: -1.3rem
    left: 2rem
    width: 19rem
    height: auto

    background: $white
    border-radius: 0.3rem

    font-size: 1.4rem
    letter-spacing: -0.01em

    box-shadow: 0px 0.4rem 1rem rgba($black, 0.35)
    transition: all 0.1s ease
    &-padd
      width: 100%
      height: 100%
      padding: $size-step/2 $size-step $size-step/2 $size-step/2
      position: relative
      z-index: 1

      background: $white
    &:before
      content: ""
      position: absolute
      width: 1rem
      height: 1rem
      top: 1.5rem
      left: -0.5rem
      background: $white
      transform: rotate(-45deg)
      z-index: 2
    &:after
      content: ""
      position: absolute
      width: 1rem
      height: 1rem
      top: 1.5rem
      left: -0.5rem
      background: $white
      transform: rotate(-45deg)
      box-shadow: 0 0 2rem 0 rgba($black, 0.35)
      z-index: 0
  &:hover &__content,
    display: block
  &__link
    color: $main-green
    text-decoration: none

    display: block
    margin: $size-step/3 0 0
</style>
