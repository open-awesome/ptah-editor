<script>
export default {
  props: {
    /* options */
    options: {
      type: Array,
      default: () => []
    },
    /* value */
    value: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    showOptions: false
  }),
  methods: {
    selectOption (option) {
      this.$emit('input', option)
    }
  }
}
</script>

<template>
  <div class="l-pth-base-select"  @click="showOptions = !showOptions">
    <div class="b-pth-base-select">
      <div class="b-pth-base-select__container">
        <span class="b-pth-base-select__name">
          {{ value ? value.name : 'Select...' }}
        </span>
        <span class="b-pth-base-select__arrow">
          <icon-base class="b-pth-base-select__icon"
            :class="{ 'b-pth-base-select__icon_up': showOptions }"
            name="arrowDown"
            width="6"
            height="4"
            color="#888">
          </icon-base>
        </span>
      </div>
      <ul class="b-pth-base-select__options" v-if="showOptions" >
        <li class="b-pth-base-select__options-item" v-for="(option, index) in options" :key="index" @click="selectOption(option)">
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
.b-pth-base-select
  height: 2.5rem
  background-color: transparent
  border-bottom: 0.1rem solid #888
  display: flex
  max-width: 50rem
  cursor: pointer
  position: relative
  width: 100%
  font-family: Lato, Roboto, Helvetica, Arial, sans-serif
  &__container
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
  &__name
    font-size: 1.6rem
    line-height: 2.4rem
    color: #272727
    padding: 0
    cursor: pointer
  &__arrow
    width: 0.8rem
    height: 0.4rem
  &__icon
    margin: 0
    display: block
    &_up
      transform: rotate(-180deg)
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  &__options
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    max-height: 18rem
    border-top: none
    overflow: auto
    position: absolute
    top: 100%
    left: 0
    right: 0
    z-index: 0
    margin: 0
    padding: 0
    &-item
      height: 2.4rem
      line-height: 2.4rem
      font-size: 1.6rem
      padding: 0
      background-color: #f5f5fa
      border-bottom: 1px solid #dddddd
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      &:last-child
        border-bottom: none
      &:hover
        color: #fafafa
        background-color: #436FEE
        border-bottom: 1px solid #436FEE
</style>
