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
    },
    label: {
      type: String
    },
    search: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '10'
    },
    typeItems: {
      default: 'text',
      type: String,
      validator (value) {
        const values = [
          'text',
          'class'
        ]
        return values.indexOf(value) !== -1
      }
    }
  },
  data: () => ({
    showOptions: false,
    valueSearch: ''
  }),
  computed: {
    colorFill: function () {
      return this.showOptions ? '#C6C6C6' : '#C6C6C6'
    },
    filteredOptions () {
      return this.valueSearch ?
        this.options.filter((option) => ~option.name.toLowerCase().indexOf(this.valueSearch.toLowerCase())) :
        this.options
    }
  },
  methods: {
    selectOption (option) {
      this.showOptions = !this.showOptions
      this.$emit('input', option)
    },
    onClickOutside (e, el) {
      this.showOptions = false
    }
  }
}
</script>

<template>
  <div class="l-pth-base-select" v-click-outside="onClickOutside">
    <base-label v-if="label" @click="showOptions = !showOptions">
      {{ label }}
    </base-label>
    <div class="b-pth-base-select">
      <div class="b-pth-base-select__container" @click="showOptions = !showOptions">
        <span class="b-pth-base-select__name" v-if="typeItems === 'text'">
          {{ value ? value.name : 'Select...' }}
        </span>
        <span class="b-pth-base-select__name" v-if="typeItems === 'class'">
          <i :class="`b-pth-base-select__name-icon b-pth-base-select__name-icon-${value.name}`" />
        </span>
        <span class="b-pth-base-select__arrow">
          <icon-base class="b-pth-base-select__icon"
            :class="{ 'b-pth-base-select__icon_up': showOptions }"
            name="arrowDown"
            width="12"
            height="8">
          </icon-base>
        </span>
      </div>
      <div class="b-pth-base-select__dropdown" v-if="showOptions">
        <BaseScrollContainer classes="b-pth-base-select__scrollbar"
          :styling="{ width: '100%', height: `${height}rem` }" backgroundBar="#474747"
          >
          <ul class="b-pth-base-select__options">
            <li v-if="search" class="b-pth-base-select__options-item">
              <input v-model="valueSearch" />
            </li>
            <li class="b-pth-base-select__options-item"
                :class="{ 'selected': value.name === option.name }"
                v-for="(option, index) in filteredOptions"
                :key="index"
                @click="selectOption(option)">
              {{ option.name }}
            </li>
          </ul>
        </BaseScrollContainer>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../assets/sass/_variables.sass'
.b-pth-base-select
  width: 100%
  height: 3.4rem
  max-width: 50rem
  margin-bottom: 1.5rem

  position: relative
  display: flex

  background-color: white
  border: 1px solid rgba(162, 165, 165, 0.7)
  border-radius: 5px

  transition: border-color 0.2s ease
  cursor: pointer
  & *
    user-select: none
  &:hover
    border-color: $main-green
  &__container
    display: flex
    justify-content: space-between
    align-items: center

    width: 100%
    padding: .5rem 1.5rem
  &__name
    font-size: 1.6rem
    line-height: 1.8rem
    color: $dark-grey
    cursor: pointer
    & input
      border: transparent solid 1px
  &__arrow
    width: 0.8rem
    height: 0.4rem
  &__icon
    margin: 0
    display: block !important
    &_up
      transform: rotate(-180deg)
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      fill: $main-green
  &__dropdown
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    border-top: none
    overflow: hidden

    background: #fff

    position: absolute
    top: 100%
    left: 0
    right: 0
    z-index: 999

    margin: .2rem .1rem
    padding: 0
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25)
    border-radius: 5px
  &__options
    margin: 0
    padding: 0
    min-height: 6rem
    &-item
      padding: 1.2rem $size-step
      line-height: 1.6rem
      font-size: 1.4rem
      list-style: none
      color: #272727
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      &:last-child
        border-bottom: none
      &:hover, &.selected
        background-color: rgba(0, 173, 182, 0.05)

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
