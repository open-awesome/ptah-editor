<script>
import VueScrollbar from 'vue2-scrollbar'
require('vue2-scrollbar/dist/style/vue2-scrollbar.css')

export default {
  components: {
    VueScrollbar
  },
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
    },
    label: {
      type: String
    }
  },
  data: () => ({
    showOptions: false
  }),
  computed: {
    colorFill: function () {
      return this.showOptions ? '#0B99FF' : '#888888'
    }
  },
  methods: {
    selectOption (option) {
      this.$emit('input', option)
    },
    onClickOutside (e, el) {
      this.showOptions = false
    }
  }
}
</script>

<template>
  <div class="l-pth-base-select"  @click="showOptions = !showOptions" v-click-outside="onClickOutside">
    <base-label v-if="label">
      {{label}}
    </base-label>
    <div class="b-pth-base-select">
      <div class="b-pth-base-select__container">
        <span class="b-pth-base-select__name">
          {{ value ? value.name : 'Select...' }}
        </span>
        <span class="b-pth-base-select__arrow">
          <icon-base class="b-pth-base-select__icon"
            :class="{ 'b-pth-base-select__icon_up': showOptions }"
            name="arrowDropDown"
            width="6"
            height="4"
            :color="colorFill">
          </icon-base>
        </span>
      </div>
      <div class="b-pth-base-select__dropdown" v-if="showOptions">
        <vue-scrollbar classes="b-pth-base-select__scrollbar">
          <ul class="b-pth-base-select__options">
            <li class="b-pth-base-select__options-item" v-for="(option, index) in options" :key="index" @click="selectOption(option)">
              {{ option.name }}
            </li>
          </ul>
        </vue-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.b-pth-base-select
  height: 2.5rem
  background-color: transparent
  border-bottom: 1px solid #888
  display: flex
  max-width: 50rem
  cursor: pointer
  position: relative
  width: 100%
  font-family: Lato, Roboto, Helvetica, Arial, sans-serif
  & *
    user-select: none
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
    display: block !important
    &_up
      transform: rotate(-180deg)
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  &__dropdown
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    max-height: 10rem
    border-top: none
    overflow: hidden
    position: absolute
    top: 100%
    left: -1.2rem
    right: -1.2rem
    z-index: 10
    margin: 0
    padding: 0
    box-shadow: 0 0.6rem 2.4rem 0 rgba(0, 0, 0, 0.15)
  &__options
    margin: 0
    padding: 0
    min-height: 11rem
    &-item
      padding: 0 1.2rem
      height: 3.2rem
      line-height: 2.8rem
      font-size: 1.6rem
      list-style: none
      color: #272727
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      &:last-child
        border-bottom: none
      &:hover
        background-color: rgba(11, 153, 255, 0.25)
  &__scrollbar
    width: 100%
    min-width: 20rem
    height: 10rem

.vue-scrollbar__scrollbar-vertical
  width: 0.4rem
  height: 92%
  top: 0.4rem
  bottom: 0.4rem
  right: 0.4rem
  & .scrollbar
    width: 0.4rem
    border-radius: 0.4rem

</style>
