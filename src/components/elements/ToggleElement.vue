<template>
  <div data-toggle-element="" class="b-toggle-element is-editable"
    :style="{ 'text-align': styles['text-align'] }"
    >
    <div class="b-toggle-element__item is-editable"
      @click="toggle"
      >
      <div class="b-toggle-element__item-col b-toggle-element__item-col-icon" v-if="el.isIconVisible"
        >
        <span class="b-toggle-element__icon" :style="{ fill: el.color, width: el.size + 'px'  }">
          <icon-base :name="el.icon.value"/>
        </span>
      </div>
      <div class="b-toggle-element__item-col b-toggle-element__item-col-description">
        <span v-text="el.description"/>
      </div>
    </div>
    <div data-toggle-element-text="" class="b-toggle-element__item b-toggle-element__item-text" v-show="el.isTextVisible">
      <span v-text="el.text"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleElement',

  inject: ['$section'],

  props: {
    path: {
      type: String
    }
  },

  computed: {
    styles () {
      return this.$section.get(`$sectionData.${this.path}.styles`)
    },
    el () {
      return this.$section.get(`$sectionData.${this.path}.element`)
    }
  },

  methods: {
    toggle () {
      let visible = !this.el.isTextVisible
      this.$section.set(`$sectionData.${this.path}.element.isTextVisible`, visible)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-toggle-element
  width: 100%
  position: relative
  text-align: left
  &::selection,
  & ::selection
    color: #ff0
    background: #000
  &__item
    display: flex
    align-items: center
    justify-content: inherit

    padding: 0.8rem 0
    cursor: pointer
    &-col
      padding: 0 0.4rem
      &-icon
        width: 3.2rem
        min-width: 3.2rem
    &-text
      max-width: 100%
  &_hide
    padding: 0 1.6rem
  &__icon
    display: inline-block
    svg
      fill: inherit
      width: 100%
      height: auto

</style>
