<template>
  <div class="subsets">
    <ul class="subsets__list">
      <li class="subsets__item"
          v-for="subset in subsets"
          :key="subset"
          @click="$emit('', subset)"
      >
        <span
          class="subsets__check"
          v-if="containsFontSubset(subset)"
        >
          <icon-base name="checkMark" width="12" height="15" />
        </span>
        {{ subset }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FontSubsets',

  props: {
    subsets: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.subsets
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
</style>
