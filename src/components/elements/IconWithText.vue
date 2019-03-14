<template>
    <div class="b-text-icon is-editable" :class="{ 'b-text-icon_hide': !icon.visible }">
      <div class="b-text-icon__item" v-if="icon.visible"
        >
        <span class="b-text-icon__icon" :style="{ fill: colorFill['color'], width: sizeIcons.width + 'px'  }">
          <icon-base :name="icon.value"></icon-base>
        </span>
      </div>
      <div class="b-text-icon__item">
        <span v-text="icon.text"></span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'IconWithText',

  inject: ['$section'],

  props: {
    path: {
      type: String
    }
  },

  computed: {
    icon () {
      return this.$section.get(`$sectionData.${this.path}.icon`)
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

<style lang="sass" scoped>
.b-text-icon
  color: #000
  font-family: 'Lato'
  position: relative
  text-align: center
  font-size: 1.4rem
  line-height: 1.4
  display: inline-block
  margin: 0.8rem
  padding: 0 1.6rem 0 3.2rem
  color: inherit
  font-family: inherit
  &::selection,
  & ::selection
    color: #ff0
    background: #000
  &_hide
    padding: 0 1.6rem
  &__icon
    position: absolute
    top: 0rem
    left: 0.8rem
    svg
      fill: inherit
      width: 100%
      height: auto

</style>
