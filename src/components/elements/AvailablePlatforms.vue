<template>
  <div class="b-available-platforms">
    <div class="b-available-platforms__item"
      v-for="(value, key) in platforms" :key="key"
      v-if="platforms[key].visible"
      >
      <a class="b-available-platforms__item-button flex flex_center"
        :style="{ fill: colorFill['color'], width: sizeIcons.width + 'px'  }"
        :title="platforms[key].name"
        >
        <VuseIcon :name="key"></VuseIcon>
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
    },
    sizeIcons () {
      return this.$section.get(`$sectionData.${this.path}.sizeIcons`)
    }
  }
}
</script>

<style lang="sass" scoped="scoped">

.b-available-platforms
  width: auto
  max-width: 100rem
  margin: 1.6rem
  min-height: 5rem
  min-width: 5rem
  display: flex
  justify-content: center
  align-items: center
  &.is-editable
    border: 1px dashed #18d88b
  .is-tablet &, .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative
    margin: 1.6rem
    &-button
      border: none
      position: relative
      .vuse-icon
         width: 100%
         height: auto
         fill: inherit

</style>
