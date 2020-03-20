<template>
  <div class="b-base-radio-check">
    <div class="b-base-radio-check__row"
      v-for="(item, index) in list"
      :key="index"
      :class="{'b-base-radio-check__row_selected': isSelected(item.value)}"
      @click="selectItem(item.value)">
      <div class="b-base-radio-check__icon">
      </div>
      <div class="b-base-radio-check__text" v-if="item.text">
        {{ item.text }}
      </div>
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
     *
     * @type {string | string[]}
     */
    value: {
      required: true
    }
  },

  methods: {
    isSelected (itemValue) {
      return this.value === itemValue
    },

    selectItem (itemValue) {
      let value

      value = itemValue
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-base-radio-check
  width: 100%
  display: flex
  flex-direction: column

  margin: 0 0 0 $size-step/2
  &__row
    cursor: pointer
    transition: all .3s ease

    display: flex
    align-items: center

    margin: $size-step/4 0

    outline: none
    opacity: 0.5
    &:hover
      opacity: 1
      .b-base-radio-check__icon
        border: 0.2rem solid $main-green
    &_selected
      opacity: 1
      color: $main-green
      .b-base-radio-check__icon
        border: 0.2rem solid $main-green

        display: flex
        justify-content: center
        align-items: center
        &:before
          content: ""
          width: 1rem
          height: 1rem

          background-color: $main-green
          border-radius: 100%
  &__icon
    width: 2rem
    height: 2rem

    border-radius: 100%
    border: 1px solid $grey-middle
    transition: all .3s ease
  &__text
    font-size: 1.3rem
    font-weight: 400
    white-space: nowrap
    letter-spacing: -0.02em
    padding-left: 1.4rem
    transition: all .3s ease
</style>
