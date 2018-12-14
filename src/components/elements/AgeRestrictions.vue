<template>
  <div class="b-age-restrictions">
    <div class="b-age-restrictions__item"
      v-for="(value, key) in restrictions" :key="key"
      v-if="restrictions[key].visible"
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

export default {
  name: 'AgeRestrictions',
  inject: ['$section'],
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
  },

  mounted () {
    console.log(this.path)
  }
}
</script>

<style lang="sass" scoped="scoped">
.b-age-restrictions
  max-width: 100rem
  margin: 0 auto
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
    &-select
      background: $white
      color: $dark
      border: 0
      outline: 0
      width: auto
      height: 3rem
      border-radius: 3rem
      font-size: 1.4rem
      margin: 1rem auto
      padding: 0.5rem
      width: 6rem
      display: block
      & option:checked
        background-color: #333
        color: #fff
    &-img
      display: inline-block
      & img
        width: 100%
        height: auto
</style>
