<script>
import { mapState } from 'vuex'
import ControlTextStylesChapter from './../controls/TheControlTextStylesChapter.vue'
import ControlTextStylesText from './../controls/TheControlTextStylesText.vue'

export default {
  name: 'ControlSectionGalleryStyle',

  components: {
    ControlTextStylesChapter,
    ControlTextStylesText
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ])
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div>
      <div class="b-text-controls__control" v-if="settingObjectOptions.isChapter">
        <control-text-styles-chapter/>
      </div>
    </div>
    <div>
      <div class="b-text-controls__control">
        <control-text-styles-text/>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: #272727
    display: flex
    align-items: center
    cursor: pointer
    margin: 1.6rem 0
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
  &__control
    margin-top: 2.2rem

.b-system-requirements
  width: 100%
  max-width: 100rem
  margin: 1rem auto
  display: inline-block
  min-height: 5rem
  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative

    margin: $size-step/2 0
    min-height: $size-step/2

    display: flex
    justify-content: flex-start
    align-items: center

    font-size: 1.6rem
    line-height: 2.4rem
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: $black
      fill: $black
    &-button
      padding: 0 $size-step/2
      border: none
      position: relative
      display: inline-block
      user-select: none
      text-align: left
      width: 20rem
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
    &-check
      width: 2rem
      height: 2rem

      border: 0.2rem solid $grey
      border-radius: 0.3rem
      background: transparent
      text-align: center

      display: inline-block
      & svg
        fill: $dark-grey
        vertical-align: middle

        position: relative
        top: -0.5rem
      &_color
        border: 0.2rem solid rgba($cornflower-blue, 0.5)
</style>
