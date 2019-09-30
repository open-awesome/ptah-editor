<template>
  <div class="b-social-networks b-border"
    :path="path"
    :style="objVarsMedia"
    >
    <div class="b-social-networks__item"
      v-for="(value, key) in networks" :key="key"
      v-if="networks[key].visible"
      :style="{
        margin:  isMobile ? mediaSizeIcons['width']/4 + 'px ' + mediaSizeIcons['width']/2 + 'px': sizeIcons.width/4 + 'px ' + sizeIcons.width/2 + 'px',
        '--mobile-width': mediaSizeIcons['width'] + 'px'
      }"
      >
      <a class="b-social-networks__item-button flex flex_center"
        :style="{ fill: colorFill['color'], width: sizeIcons.width + 'px' }"
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

export default {
  name: 'SocialNetworks',

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
    },
    mediaSizeIcons () {
      let media = this.$section.get(`$sectionData.${this.path}.media['is-mobile']['sizeIcons']`)

      if (media === undefined) {
        media = {
          'is-mobile': {
            sizeIcons: this.sizeIcons
          }
        }
        this.$section.set(`$sectionData.${this.path}.media`, media)
      }

      return media
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
@import '../../assets/sass/element.sass'

.b-social-networks
  width: auto
  max-width: 100%
  min-height: 5rem
  min-width: 5rem

  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
  &.styler-active
    border: 0.2rem $white dotted
    border-radius: 0.5rem
  .is-tablet &, .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative
    cursor: pointer

    margin: 1.6rem
    &-button
      border: none
      position: relative
      .is-mobile &
        width: var(--mobile-width) !important
      @media only screen and (max-width: 768px)
        &
          width: var(--mobile-width) !important
      .vuse-icon
         width: inherit
         height: auto
         fill: inherit

</style>
