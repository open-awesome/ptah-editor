<template>
  <div class="b-age-restrictions b-border"
    :path="path"
    :style="objVarsMedia"
    @mouseleave="mouseleave"
    @mouseover.stop="mouseover"
    :class="[
      { '_hover' : hoverBy === 'element' }
    ]"
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
import elementHover from '../mixins/elementHover'

export default {
  name: 'AgeRestrictions',

  mixins: [
    elementMedia,
    elementHover
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
</style>
