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
      :transparent="false"
      @click="$emit('backToLandings', $event)"
      >
      Back to landings
    </BaseButton>
  </div>
  <div class="b-top-bar__right">
    <div class="b-top-bar-right-menu">
      <div class="b-top-bar-right-menu__left">
        Site name
      </div>
      <div class="b-top-bar-right-menu__middle">
        <MenuPlatforms
          @setDevice="setDevice"
          ></MenuPlatforms>
      </div>
      <div class="b-top-bar-right-menu__right">
        <BaseButton
          :color="'light-gray'"
          :transparent="false"
          @click="$emit('preview', $event)"
          >
          Preview
        </BaseButton>
        <BaseButton
          :color="'light-gray'"
          :transparent="false"
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
    &__middle
      order: 2
      width: 14rem
    &__right
      order: 3
      width: 50%
      text-align: right
</style>
