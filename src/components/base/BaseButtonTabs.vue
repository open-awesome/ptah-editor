<template>
  <div class="b-base-button-tabs">
    <button class="b-base-button-tabs-button"
      type="button"
      v-for="(item, index) in list"
      :key="index"
      :class="{'b-base-button-tabs-button_selected': isSelected(item.value)}"
      @click="selectItem(item.value)">

      <IconBase class="b-base-button-tabs-button__icon" v-if="item.iconName" :name="item.iconName" />
      <span class="b-base-button-tabs-button__text" v-if="item.text" v-html="item.text"></span>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    /**
     * Items list
     * list item should containt either text or iconName property
     *
     * @type {{value: string, ?text: string, ?iconName: string }[]}
     */
    list: {
      required: true,
      type: Array
    },

    /**
     * Selected value
     * Depending on its type (string or array) the component behaves differently
     * If string is passed - only single item can be selected
     * If array of strings is passed - multiple items can be selected
     *
     * @type {string | string[]}
     */
    value: {
      required: true
    }
  },

  computed: {
    isMultiple () {
      return Array.isArray(this.value)
    }
  },

  methods: {
    isSelected (itemValue) {
      if (this.isMultiple) {
        return this.value.indexOf(itemValue) !== -1
      }
      return this.value === itemValue
    },

    selectItem (itemValue) {
      let value
      if (this.isMultiple) {
        value = this.value.slice()
        const index = this.value.indexOf(itemValue)
        if (index === -1) {
          value.push(itemValue)
        } else {
          value.splice(index, 1)
        }
      } else {
        value = itemValue
      }
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="sass" scoped>
$border-color: rgba(#888888, 0.25)

@mixin button-style-reset()
  border: 0
  margin: 0
  padding: 0
  background: transparent
  display: inline
  font-size: inherit
  font-family: inherit
  overflow: visible

.b-base-button-tabs
  display: flex
  flex-direction: row

.b-base-button-tabs-button
  @include button-style-reset
  cursor: pointer
  transition: background-color 0.1s ease, color 0.1s ease

  display: flex
  flex-basis: 0rem
  flex-grow: 1
  flex-shrink: 0
  justify-content: center
  align-items: center

  background-color: #f5f5f5
  color: #888888
  border: 1px solid $border-color
  border-left: 0

  height: 4rem
  padding: 0 1.5rem
  font-size: 1.4rem
  line-height: 34px

  &:first-child
    border-radius: 0.4rem 0 0 0.4rem
    border-left: 1px solid $border-color

  &:last-child
    border-radius: 0 0.4rem 0.4rem 0

  &:hover
    background-color: #ffffff

  &_selected
    background-color: #ffffff
    color: #000000

  &__icon + &__text
    margin-left: 0.6rem
</style>
