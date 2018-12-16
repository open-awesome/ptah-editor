<script>
import * as types from '@editor/types'
import _ from 'lodash'

export default {
  name: 'GalleryCarousel',
  group: 'galleries',
  $schema: {
    mainStyle: types.GallerySlider
  },

  props: {
    id: {
      type: Number, required: true
    }
  },

  data () {
    return {
      galleryImages: []
    }
  },

  watch: {
    '$sectionData.mainStyle.galleryImages' (value) {
      this.updateGalleryImages()
    }
  },

  created () {
    this.updateGalleryImages()
  },

  methods: {
    updateGalleryImages () {
      const items = this.$sectionData.mainStyle.galleryImages.slice()
      if (items.length <= 1) {
        this.galleryImages = this.$sectionData.mainStyle.galleryImages
      } else {
        const lastItemArray = items.splice(_.size(items) - 1, 1)
        this.galleryImages = [
          ...lastItemArray,
          ...items
        ]
      }
    }
  }
}
</script>

<template>
  <section
    class="b-gallery-carousel"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    v-styler:section="$sectionData.mainStyle"
    >
      <div class="b-header">{{$sectionData.mainStyle.header}}</div>
      <div class="b-gallery-carousel-body">
        <template v-if="galleryImages.length > 1">
          <span class="b-gallery-carousel-body__arrow-prev">
            <IconBase name="slidePrev" width="24" height="47" color="white" />
          </span>
          <span class="b-gallery-carousel-body__arrow-next">
            <IconBase name="slidePrev" width="24" height="47" color="white" />
          </span>
        </template>
        <div class="b-gallery-carousel-body__inner" :style="{transform: 'translateX(0%)'}">
          <div class="b-gallery-carousel-body__items">
            <div
              class="b-gallery-carousel-body-item"
              v-for="(item, index) in galleryImages"
              :key="index"
              :class="{
                'b-gallery-carousel-body-item_active': index === 1,
                'b-gallery-carousel-body-item_transparent': galleryImages.length > 1
              }"
            >
              <div class="b-gallery-carousel-body-item__img" :style="{backgroundImage: `url(${item.path})`}">
              </div>
            </div>
          </div>
        </div>
      </div>

  </section>

</template>

<style lang="sass" scoped>
.b-gallery-carousel
  padding: 5rem 0 11.6rem

.b-header
  margin-bottom: 3.5rem
  font-family: Montserrat;
  font-style: normal
  font-weight: bold
  line-height: 4.8rem
  font-size: 3.2rem
  text-align: center
  letter-spacing: 0.3rem
  color: #fff
  text-transform: uppercase
  text-shadow: 1px 1px 5px black

.b-gallery-carousel-body
  overflow: hidden
  position: relative

  &__inner
    width: 200%
    margin-left: -50%
    padding-bottom: 44.8%
    position: relative

  &__items
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    display: flex

  &__arrow-prev,
  &__arrow-next
    position: absolute
    top: 0
    bottom: 0
    margin: auto
    height: 150px
    width: 80px
    display: flex
    justify-content: center
    align-items: center
    z-index: 10
    cursor: pointer

  &__arrow-prev
    left: 6%
    @media (max-width: 800px)
      left: 0

  &__arrow-next
    right: 6%
    transform: rotate(180deg)
    @media (max-width: 800px)
      right: 0

.b-gallery-carousel-body-item
  height: 100%
  width: 33%
  min-width: 33%
  padding: 1.6rem 0 1.6rem 1.6rem
  flex-grow: 1

  &_transparent
    opacity: .3

  &_active
    opacity: 1

  &__img
    height: 100%
    background-color: rgba(0,0,0,0.1)
    background-size: contain
    background-repeat: no-repeat
    background-position: center
</style>
