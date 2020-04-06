<template>
  <div class="b-base-button-tabs"
    :class="{'_buttons' : type === 'buttons'}"
  >
    <div class="b-base-button-tabs__label" v-if="label != ''">
      <base-label>
        {{ label }}
      </base-label>
    </div>
    <div class="b-base-button-tabs__row">
      <button class="b-base-button-tabs__button"
        type="button"
        v-for="(item, index) in list"
        :key="index"
        :class="{'_selected': isSelected(item.value)}"
        :title="item.tooltipText"
        @click="selectItem(item.value)">

        <IconBase
          width="12"
          height="12"
          class="b-base-button-tabs-button__icon"
          v-if="item.iconName"
          :name="item.iconName"
        />
        <span
          class="b-base-button-tabs-button__text"
          v-if="item.text"
          v-html="item.text"
        />
      </button>
    </div>
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
     * @type {{value: string, ?text: string, ?iconName: string, ?tooltipText: string }[]}
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
    },

    label: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: ''
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
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

$tabs-bg: #EEF9FA

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
  width: 100%
  &__label
    margin-bottom: 1.6rem
  &__row
    display: flex
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1)
    background-color: $tabs-bg

  &__button
    @include button-style-reset
    cursor: pointer
    transition: all .2s ease-out

    display: flex
    flex-basis: 0
    flex-grow: 1
    flex-shrink: 0
    justify-content: center
    align-items: center
    position: relative
    height: 3.7rem

    background-color: transparent
    color: #A2A5A5

    padding: $size-step/4 $size-step/2
    margin: 0
    font-size: 1.3rem
    white-space: nowrap
    text-transform: uppercase

    outline: none
    &:hover
      color: $main-green
    &._selected
      box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.05)
    &._selected,
    &._selected:hover
      color: #575A5F
      fill: #575A5F
      background: #FFFFFF
    &._selected:after,
    &._selected:before
      content: ''
      position: absolute
      width: .5rem
      height: 3.7rem
      z-index: 1
      top: 0
      background-color: $tabs-bg
      display: none
    &._selected:not(:last-child):after
      right: 0
      display: block
      border-radius: 0 0 0 5px
      box-shadow: inset 2px 1px 2px rgba(186, 186, 186, 0.34)
    &._selected:not(:first-child):before
      left: 0
      display: block
      border-radius: 0 0 5px 0
      box-shadow: inset -2px 1px 2px rgba(186, 186, 186, 0.34)

    &__icon + &__text
      margin-left: 0.6rem

  &._buttons
    .b-base-button-tabs__row
      justify-content: center
      background: transparent
      box-shadow: none
    .b-base-button-tabs__button
      width: 4.6rem
      height: 3.4rem
      margin: 0 .25rem
      background: #F3F6F6
      border-radius: 5px

      flex-grow: 0
      &:after,
      &:before
        display: none
      &:hover
        background: rgba(162, 165, 165, 0.5)
        & svg
          color: #575A5F
      &._selected
        color: #575A5F
        background: #00ADB6
        &:hover
          color: #575A5F
          background: #00ADB6
</style>
