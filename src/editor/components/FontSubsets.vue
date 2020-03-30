<template>
  <div
    class="subsets"
    :class="{ 'subsets__active': open }"
    @click="open = !open"
    v-click-outside="close"
  >
    <div class="subsets__toggle">Languages ({{subsetSum}})</div>
    <ul class="subsets__list">
      <li class="subsets__item"
          v-for="(subset, index) in subsets"
          :key="index"
          @click="toggleSubsetStatus(subset)"
      >
        <span
          class="subsets__check"
          v-if="subset.status"
        >
          <icon-base name="checkMark" width="12" height="15" />
        </span>
        {{ subset.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reduce, clone, find, filter } from 'lodash-es'

export default {
  name: 'FontSubsets',

  props: {
    font: {
      type: Object,
      required: true
    },
    subsets: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      open: false
    }
  },

  computed: {
    subsetSum () {
      return reduce(this.subsets, (res, subset) => {
        return subset.status ? res + 1 : res
      }, 0)
    }
  },

  methods: {
    close () {
      this.open = false
    },

    toggleSubsetStatus (subset) {
      let s = clone(this.subsets)

      find(s, subset).status = !find(s, subset).status

      let result = filter(s, { 'status': true }).map(o => o.name)

      this.$emit('input', { font: this.font, subsets: result })
    }
  }
}
</script>

<style lang="sass" scoped>
$w: 15.5rem
$h: 5.5rem

.subsets
  position: relative
  width: $w
  $this: &

  &__active
    #{$this}__toggle
      background: rgba(0, 173, 182, 0.1)
      box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.15)
    #{$this}__list
      overflow: auto
      height: auto
      min-height: $h

  &__toggle
    color: $main-green
    width: $w
    height: $h
    border-left: 1px solid #F4F4F4
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    font-size: 1.4rem

  &__list
    position: absolute
    top: $h
    overflow: hidden
    width: $w
    height: 0
    padding: 0
    border-radius: 0 0 5px 5px
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25)
    transition: all .2s ease-out
    background: #fff
    z-index: 2

  &__item
    height: 3.5rem
    width: 100%
    padding: 0 2.7rem
    display: flex
    align-items: center
    font-size: 1.2rem
    cursor: pointer

    &:hover
      background: rgba(0, 173, 182, 0.05)
      color: $main-green

    svg
      fill: $main-green
      margin: 2px 0 0 -17px
</style>
