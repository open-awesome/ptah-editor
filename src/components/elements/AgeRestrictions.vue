<template>
  <div class="b-age-restrictions b-border"
      :path="path"
      :style="objVarsMedia"
    >
    <div class="b-age-restrictions__item"
      v-for="(value, key) in restrictions" :key="key"
      v-if="restrictions[key].visible"
      :style="{
        '--mobile-width': mediaStyles['is-mobile']['sizeIcons']['width'] + 'px'
      }"
      >
      <div class="b-age-restrictions__item-img"
        :style="{ width: sizeIcons.width + 'px'  }">
        <img
          :src="restrictions[key].selected.img"
          :alt="restrictions[key].selected.value"
          :title="restrictions[key].selected.value"
          />
      </div>
    </div>
  </div>
</template>

<script>
import VuseIcon from '@editor/components/VuseIcon'
import elementMedia from '../mixins/elementMedia'

export default {
  name: 'AgeRestrictions',

  mixins: [
    elementMedia
  ],

  components: {
    VuseIcon
  },

  props: {
    path: {
      type: String
    }
  },

  computed: {
    restrictions () {
      return this.$section.get(`$sectionData.${this.path}.ageRestrictions`)
    },
    sizeIcons () {
      return this.$section.get(`$sectionData.${this.path}.sizeIcons`)
    }
  }
}
</script>

<style lang="sass" scoped="scoped">
@import '../../assets/sass/element.sass'

.b-age-restrictions
  margin: 0 auto
  min-height: 5rem
  min-width: 5rem
  display: flex
  justify-content: center
  align-items: center
  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative
    margin: 1.6rem
    text-align: center
    &-img
      display: inline-block
      .is-mobile &
        width: var(--mobile-width) !important
      @media only screen and (max-width: 768px)
        &
          width: var(--mobile-width) !important
      & img
        width: 100%
        height: auto
</style>
