<template>
  <div class="b-social-networks b-border"
    :path="path"
    :style="objVarsMedia"
    @mouseleave="mouseleave"
    @mouseover.stop="mouseover"
    :class="[
      { '_hover' : hoverBy === 'element' }
    ]"
  >
    <div class="b-social-networks__item"
      v-for="(value, key) in networks" :key="key"
      v-if="networks[key].visible"
      :style="{
        margin: sizeIcons.width/4 + 'px ' + sizeIcons.width/2 + 'px',
        '--mobile-margin': mediaStyles['is-mobile']['sizeIcons']['width']/4 + 'px ' + mediaStyles['is-mobile']['sizeIcons']['width']/2 + 'px'
      }"
      >
      <a class="b-social-networks__item-button flex flex_center"
        :style="{
          fill: colorFill['color'],
          width: sizeIcons.width + 'px',
          '--mobile-width': mediaStyles['is-mobile']['sizeIcons']['width'] + 'px',
        }"
        :target="target"
        :href="networks[key].url"
        :title="networks[key].name"
        @click.prevent="clickStop"
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
  name: 'SocialNetworks',

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
    networks () {
      return this.$section.get(`$sectionData.${this.path}.socialNetworks`)
    },
    colorFill () {
      return this.$section.get(`$sectionData.${this.path}.colorFill`)
    },
    sizeIcons () {
      return this.$section.get(`$sectionData.${this.path}.sizeIcons`)
    },
    target () {
      return this.$section.get(`$sectionData.${this.path}.settings.target`)
    }
  },

  methods: {
    clickStop (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
</script>

<style lang="sass" scoped="scoped">
</style>
