<script>
import { mapState } from 'vuex'

export default {
  name: 'ControlAvailablePlatforms',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    platforms () {
      return this.settingObjectOptions.availablePlatforms
    }
  },

  methods: {
    visible (key) {
      this.platforms[key].visible = !this.platforms[key].visible
    }
  }
}
</script>

<template>
  <div class="b-available-platforms">
    <div class="b-available-platforms__item is-editable"
      v-for="(value, key) in platforms" :key="key"
      :class="{ 'b-available-platforms__item_opacity' : false === platforms[key].visible, 'b-available-platforms__item_select' : platforms[key].expand }"
      >

      <span class="b-available-platforms__item-check"
        @click="visible(key)"
        title="Show / Hide"
        :class="{ 'b-available-platforms__item-check_color' : true === platforms[key].visible }"
        >
        <icon-base width="10" height="7" name="checkMark"
          v-show="platforms[key].visible"
        />
      </span>

      <a class="b-available-platforms__item-button"
        :title="platforms[key].name"
        @click="visible(key)"
        >
        {{ platforms[key].name }}
      </a>

    </div>
  </div><!--/.b-available-platforms-->
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-available-platforms
  width: 100%
  max-width: 100rem
  margin: 0 auto
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
      .vuse-icon
         width: 100%
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
