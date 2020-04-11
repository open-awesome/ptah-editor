<template>
  <div class="b-available-platforms b-border"
    :path="path"
    :style="objVarsMedia"
    @mouseleave="mouseleave"
    @mouseover.stop="mouseover"
    :class="[
      { '_hover' : hoverBy === 'element' }
    ]"
  >
    <div class="b-available-platforms__item"
      v-for="(value, key) in platforms" :key="key"
      v-if="platforms[key].visible"
      :style="{
        '--mobile-width': mediaStyles['is-mobile']['sizeIcons']['width'] + 'px'
      }"
      >
      <a class="b-available-platforms__item-button flex flex_center"
        :style="{
          fill: colorFill['color'],
          width: sizeIcons.width + 'px'
        }"
        :title="platforms[key].name"
        >
        <VuseIcon :name="key"></VuseIcon>
      </a>
    </div>
  </div>
</template>

<script>
import VuseIcon from '@editor/components/VuseIcon'
import elementMedia from '../mixins/elementMedia'
import elementHover from '../mixins/elementHover'

export default {
  name: 'AvailablePlatforms',

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
    platforms () {
      return this.$section.get(`$sectionData.${this.path}.availablePlatforms`)
    },
    colorFill () {
      return this.$section.get(`$sectionData.${this.path}.colorFill`)
    },
    sizeIcons () {
      return this.$section.get(`$sectionData.${this.path}.sizeIcons`)
    }
  }
}
</script>

<style lang="sass" scoped="scoped">
</style>
