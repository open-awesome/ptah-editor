<script>
import MenuPlatforms from './menu/MenuPlatforms.vue'

export default {
  components: {
    MenuPlatforms
  },

  data: () => ({
    device: null
  }),

  methods: {
    setDevice (type) {
      this.$emit('setDevice', type)
    }
  }
}
</script>

<template>
<div class="b-top-bar">
  <div class="b-top-bar__left">
    <BaseButton
      :color="'light-gray'"
      :transparent="true"
      :size="'middle'"
      @click="$emit('backToLandings', $event)"
      class="b-top-bar__btn-back"
      >
      Back to landings
    </BaseButton>
  </div>
  <div class="b-top-bar__right">
    <div class="b-top-bar-right-menu">
      <div class="b-top-bar-right-menu__left">
        <div class="b-top-bar__logo-game">
          <!-- insert logo game -->
        </div>
        <div class="b-top-bar__site-name">
          Site name
        </div>
      </div>
      <div class="b-top-bar-right-menu__middle">
        <MenuPlatforms
          @setDevice="setDevice"
          ></MenuPlatforms>
      </div>
      <div class="b-top-bar-right-menu__right">
        <BaseButton
          :color="'light-gray'"
          :transparent="true"
          :size="'middle'"
          @click="$emit('preview', $event)"
          >
          Preview
        </BaseButton>
        <BaseButton
          :color="'light-gray'"
          :transparent="true"
          :size="'middle'"
          @click="$emit('export', $event)"
          >
          Export
        </BaseButton>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
.b-top-bar
  background-color: #CDCDCD
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
  &__left
    order: 1
    width: 24rem
  &__right
    order: 2
    flex-grow: 1
  &-right-menu
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0.8rem
    &__left
      order: 1
      width: 50%
      display: flex
      align-items: center
      justify-content: flex-start
    &__middle
      order: 2
      width: 14rem
    &__right
      order: 3
      width: 50%
      text-align: right
  &__btn-back
    position: relative
    width: 20rem
    margin: 0 0 0 3rem
    border-left-color: transparent
    &:after,
    &:before
      content: ''
      position: absolute
      left: -1.4rem
      top: 50%
      width: 2.8rem
      height: 2.8rem
      margin-top: -1.4rem
      border-left: 0.2rem solid #fff
      border-bottom: 0.2rem solid #fff
      z-index: -1
      transform: rotate(45deg)
    &:before
      z-index: 1
      box-shadow: none
    &:hover
      &:after,
      &:before
        border-left: 0.2rem solid #165c8f
        border-bottom: 0.2rem  solid #165c8f
        background-color: #165c8f
        border-color: #165c8f
        color: #fafafa
      &:before
        z-index: 1
  &__logo-game
    width: 4rem
    height: 4rem
    background: #fff
    overflow: hidden
    border-radius: 100%
    margin: 0 1rem 0 2.9rem
  &__site-name
    color: #474747
    font-size: 1.8rem
    line-height: 4rem
    letter-spacing: 2%
    font-weight: bold
</style>
