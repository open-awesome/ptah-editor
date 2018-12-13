<template>
  <div class="b-available-platforms">
    <div class="b-available-platforms__item"
      v-for="(value, key) in platforms" :key="key"
      :class="{ 'b-available-platforms__item_opacity' : false === platforms[key].visible }"
      >
      <a class="b-available-platforms__item-button flex flex_center"
        :style="{ fill: colorFill['color'] }"
        :title="platforms[key].name"
        >
        <VuseIcon title="asd" :name="key"></VuseIcon>
      </a>
    </div>
  </div>
</template>

<script>
import VuseIcon from '@editor/components/VuseIcon'

export default {
  name: 'AvailablePlatforms',
  inject: ['$section'],
  components: {
    VuseIcon
  },

  props: {
    path: {
      type: String
    }
  },

  computed: {
    platforms () {
      return this.$section.get(`$sectionData.${this.path}.availablePlatforms`)
    },
    colorFill () {
      return this.$section.get(`$sectionData.${this.path}.colorFill`)
    }
  }
}
</script>

<style lang="sass" scoped="scoped">

.b-available-platforms
  width: 100%
  max-width: 100rem
  margin: 1.6rem
  min-height: 5rem
  display: flex
  justify-content: center
  align-items: center
  .is-tablet &, .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative
    margin: 1rem
    &_opacity
      display: none
    &-button
      width: 5rem
      height: 5rem
      padding: 1rem
      border: none
      position: relative
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
         height: auto
         fill: inherit

</style>
