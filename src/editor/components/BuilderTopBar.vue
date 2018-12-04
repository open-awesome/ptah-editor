<script>
import MenuPlatforms from './menu/MenuPlatforms.vue'
import { mapState } from 'vuex'

export default {
  components: {
    MenuPlatforms
  },

  props: {
    landingName: {
      required: true
    }
  },

  data: () => ({
    device: null
  }),

  computed: {
    ...mapState(['currentLanding'])
  },

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
      tooltip="back to landings"
      tooltip-position="bottom"
      >
      Back to landings
      <span class="b-top-bar__btn-back-arrow-a"/>
      <span class="b-top-bar__btn-back-arrow-b"/>
    </BaseButton>
  </div>
  <div class="b-top-bar__right">
    <div class="b-top-bar-right-menu">
      <div class="b-top-bar-right-menu__left">
        <div class="b-top-bar__logo-game">
          <img :src="currentLanding.settings.favicon" alt="">
        </div>
        <div class="b-top-bar__site-name">
          {{ landingName }}
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
          @click="$emit('save', $event)"
          tooltip="save"
          tooltip-position="bottom"
          >
          Save
        </BaseButton>
        <BaseButton
          :color="'light-gray'"
          :transparent="true"
          :size="'middle'"
          @click="$emit('preview', $event)"
          tooltip="preview"
          tooltip-position="bottom"
          >
          Preview
        </BaseButton>
        <BaseButton
          :color="'light-gray'"
          :transparent="true"
          :size="'middle'"
          @click="$emit('export', $event)"
          tooltip="export"
          tooltip-position="bottom"
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
    $self: &
    position: relative
    width: 20rem
    margin: 0 0 0 3rem
    border-left-color: transparent
    &-arrow-a,
    &-arrow-b
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
    &-arrow-b
      z-index: 1
      box-shadow: none
    &:hover
      #{$self}-arrow-a,
      #{$self}-arrow-b
        border-left: 0.2rem solid #436FEE
        border-bottom: 0.2rem  solid #436FEE
        background-color: #436FEE
        border-color: #436FEE
        color: #fafafa
      #{$self}-arrow-b
        z-index: 1
  &__logo-game
    width: 4rem
    height: 4rem
    background: #fff
    overflow: hidden
    border-radius: 100%
    margin: 0 1rem 0 2.9rem
    img
      max-width: 100%
  &__site-name
    color: #474747
    font-size: 1.8rem
    line-height: 4rem
    letter-spacing: 2%
    font-weight: bold
</style>
