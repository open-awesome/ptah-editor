<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'
import Seeder from '@editor/seeder'
import { mapActions } from 'vuex'

const GALLERY_ITEM = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-preview',
    label: 'preview',
    file: null
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'inline',
    class: 'b-label',
    label: 'label'
  }
]

let thumbs = [
  'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/b5ca75d4-db8f-4804-ba3f-3b8560f0964c.jpg',
  'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/d0ce7a93-a2a9-49ea-83c1-7062928b2bf1.jpg',
  'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/5a746619-af94-443f-809d-3a726f8db1dd.jpg'
]

let prev = [
  'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/709ba068-5d79-4f48-ab37-c70c2e4bdde9.jpg',
  'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/d847d1de-d4f8-4acb-b1af-9461a80100a7.jpg',
  'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/72c431a9-a0ab-47b5-b888-d14ce6d67630.png'
]

const [
  GALLERY_ITEM_CUSTOM0,
  GALLERY_ITEM_CUSTOM1,
  GALLERY_ITEM_CUSTOM2
] = Array.from(new Array(3), (x, i) => {
  return [
    {
      element: {
        removable: false,
        styles: {
          'background-image': `url(${thumbs[i]})`,
          'background-size': 'contain',
          'width': '350px',
          'height': '210px'
        },
        media: {
          'is-mobile': {
            'width': '290px',
            'height': '160px'
          }
        },
        link: {
          imageUrl: prev[i]
        },
        hasLink: true,
        belongsGallery: true
      }
    },
    {
      element: {
        removable: false,
        canCopy: false,
        editor: {
          tags: false,
          link: false
        },
        text: 'You can add text describing each screenshot or concept art'
      }
    }
  ]
})

const HEADER = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<strong>Gallery Header</strong>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4rem',
        'color': '#ffffff'
      },
      media: {
        'is-mobile': {
          'font-size': '3.6rem'
        }
      }
    }
  }
]

const GROUP_NAME = 'Galleries'
const NAME = 'GalleryPopupWestern'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/50116473-7bb7-46f0-904c-066713b47b57.png)',
      'background-color': '#000000',
      'padding-top': '100px',
      'padding-bottom': '190px'
    },
    isTextStyle: true,
    isLabel: true,
    isLabelPreview: true,
    isBottom: true,
    isBottomPopup: true,
    isTop: true
  },
  components: _.merge([], C_CUSTOM),
  components0: _.merge([], GALLERY_ITEM_CUSTOM0),
  components1: _.merge([], GALLERY_ITEM_CUSTOM1),
  components2: _.merge([], GALLERY_ITEM_CUSTOM2),
  components3: _.merge([], GALLERY_ITEM_CUSTOM0),
  components4: _.merge([], GALLERY_ITEM_CUSTOM1),
  components5: _.merge([], GALLERY_ITEM_CUSTOM2),
  components6: _.merge([], GALLERY_ITEM_CUSTOM0),
  components7: _.merge([], GALLERY_ITEM_CUSTOM1),
  components8: _.merge([], GALLERY_ITEM_CUSTOM2),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Gallery fullscreen pop-up picture view',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/gallery-western.jpg',

  $schema: {
    mainStyle: types.Gallery,
    container: types.StyleObject,
    components: _.merge([], HEADER, [{ key: 0 }]),
    components0: _.merge([], GALLERY_ITEM, [{ key: 10 }, { key: 11 }]),
    components1: _.merge([], GALLERY_ITEM, [{ key: 20 }, { key: 21 }]),
    components2: _.merge([], GALLERY_ITEM, [{ key: 30 }, { key: 31 }]),
    components3: _.merge([], GALLERY_ITEM, [{ key: 40 }, { key: 41 }]),
    components4: _.merge([], GALLERY_ITEM, [{ key: 50 }, { key: 51 }]),
    components5: _.merge([], GALLERY_ITEM, [{ key: 60 }, { key: 61 }]),
    components6: _.merge([], GALLERY_ITEM, [{ key: 70 }, { key: 71 }]),
    components7: _.merge([], GALLERY_ITEM, [{ key: 80 }, { key: 81 }]),
    components8: _.merge([], GALLERY_ITEM, [{ key: 90 }, { key: 91 }]),
    index: 0,
    isShowPopup: false,
    popupStyles: { width: 'auto', margin: '0' },
    url: 'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/a07b04e0-45c6-437c-b005-ea9fc9c5b019.png',
    content: '',
    typeContent: 'default'
  },

  mounted () {
    this.$sectionData.isShowPopup = false
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),
    async showSettings (panel) {
      this.setSettingSection(this.$section)

      await this.$nextTick()

      this.setControlPanel(panel)
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<template>
  <section class="b-gallery-popup"
   v-styler:section="$sectionData.mainStyle"
   :class="$sectionData.mainStyle.classes"
   :style="[$sectionData.mainStyle.styles, $sectionData.isShowPopup ? { 'z-index': '10' } : { 'z-index': '2' }, $sectionData.objVarsMedia, $sectionData.objVarsTypo]"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container"
            components-path="$sectionData.components"
          >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :path="`components[${index}].element`"
                  :style="$sectionData.components[index].element.styles"
                  :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                >
                  <div v-html="$sectionData.components[index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
      </div>
      <div class="b-grid__row">
        <div class="b-grid__col-12">
          <div class="b-section-padd">
            <div class="b-section-padd-border">
              <!-- Setting controls -->
              <div class="b-section-menu__controls">
                <div>
                  <a href="#" class="b-section-menu__control" @click.stop="showSettings('SectionGallerySettings')">
                    <icon-base name="cog" width="12" height="15" />
                  </a>
                </div>
                <div>
                  <a href="#" class="b-section-menu__control" @click.stop="showSettings('SectionGalleryStyle')">
                    <icon-base name="style" width="12" height="15" />
                  </a>
                </div>
              </div>
              <!-- .b-gallery-popup__wrap -->
              <div class="b-gallery-popup__wrap">
                <div class="b-gallery-popup">
                  <div class="b-gallery-popup__item b-gallery-item b-draggable-slot"
                   v-for="(components, key) in $sectionData"
                   :key="key"
                   v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
                   :data-index="parseFloat(key.split('components')[1])"
                  >
                    <div class="b-gallery-popup__preview">
                      <component
                        v-styler:for="{ el: $sectionData[key][0].element, path:`$sectionData.${key}[0].element`, type: $sectionData[key][0].type, label: $sectionData[key][0].label }"
                        :is="$sectionData[key][0].name"
                        :href="$sectionData[key][0].element.link.href"
                        :target="$sectionData[key][0].element.link.target"
                        :style="$sectionData[key][0].element.styles"
                        :class="[$sectionData[key][0].element.classes, $sectionData[key][0].class]"
                        :path="`${key}[0].element`"
                        class="b-gallery-popup__preview"
                        gallery-two-popup-link=""
                        :gallery-two-popup-image-url="$sectionData[key][0].element.link.imageUrl"
                        :gallery-two-popup-video-url="$sectionData[key][0].element.link.videoUrl"
                        :gallery-two-popup-type-content="$sectionData[key][0].element.link.type"
                      >
                      </component>
                      <span class="b-gallery-popup__preview-count"
                            v-text="parseFloat(key.split('components')[1]) + 1"
                      />
                    </div>
                    <div v-if="$sectionData.mainStyle.isLabelPreview">
                      <component class="b-gallery-popup__preview-title"
                       v-styler:for="{ el: $sectionData[key][1].element, path: `$sectionData.${key}[1].element`, type: $sectionData[key][1].type, label: $sectionData[key][0].label }"
                       :path="`${key}[1].element`"
                       :is="$sectionData[key][1].name"
                       :style="{
                          'color' : $sectionData.mainStyle.textStyles.text['color'],
                          'font-family' : $sectionData.mainStyle.textStyles.text['font-family'],
                          'font-size' : $sectionData.mainStyle.textStyles.text['font-size'],
                          'font-weight' : $sectionData.mainStyle.textStyles.text['font-weight'],
                          'font-style' : $sectionData.mainStyle.textStyles.text['font-style'],
                          'text-decoration' : $sectionData.mainStyle.textStyles.text['text-decoration'],
                        }"
                       :class="[$sectionData[key][1].element.classes, $sectionData[key][1].class]">
                        <div v-html="$sectionData[key][1].element.text"></div>
                      </component><!--/.b-preview__name -->
                    </div>
                  </div>
                </div>
              </div><!--/.b-gallery-popup__wrap-->
            </div>
          </div><!--/.b-gallery-popup__padd-->
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped="scoped">
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'
@import '../../../assets/sass/section-media.sass'
@import '../../../assets/sass/section-menu.sass'

.b-gallery-popup
  $this: &

  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap

  /deep/
  .b-uploader__input
    bottom: auto
    height: 0

.b-gallery-popup__item
  width: 32%
  min-width: 10rem
  height: 26rem
  min-height: 5rem
  margin: $size-step/8

  cursor: pointer
  position: relative

  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

.b-gallery-popup__preview
  $this: &

  display: flex
  justify-content: center
  align-items: center

  width: 100%
  height: 100%

  transition: all 200ms
  position: relative
  &:hover
    #{$this}-video
      transition: all 200ms
      transform: rotate(360deg)
  &-count
    position: absolute
    top: $size-step/3
    left: $size-step/3

    width: $size-step/2
    height: $size-step/2

    background-color: rgba($white, 1)
    border-radius: 100%
    color: $dark-grey
    font-size: 1.2rem

    display: none
  .is-editable &-count
    display: flex
    justify-content: center
    align-items: center
  &-title
    .is-mobile &
      font-family: var(--mobile-section-text-styles-text-font-family) !important
      font-size: var(--mobile-section-text-styles-text-font-size) !important
      color: var(--mobile-section-text-styles-text-color) !important
    @media only screen and (max-width: 768px)
      &
       font-family: var(--mobile-section-text-styles-text-font-family) !important
       font-size: var(--mobile-section-text-styles-text-font-size) !important
       color: var(--mobile-section-text-styles-text-color) !important

.b-gallery-popup__text
  position: absolute
  bottom: 1.5rem

  opacity: 0
  width: 100%
  text-align: center

  transition: 200ms opacity
  color: #000
  z-index: 100

.b-gallery-popup__img
  position: absolute
  top: 0
  left: 0
  width: 100%
  -o-object-fit: cover
  object-fit: cover
  height: 100%
  z-index: 50

.is-tablet,
.is-mobile
  .b-gallery-popup__item
    width: 40%
.is-mobile
  .b-gallery-popup
    margin-right: 0
  .b-gallery-popup__item
    width: 100%
    padding: 0 0 2rem 0

@media only screen and (max-width: 460px)
  .b-gallery-popup
    margin-right: 0
  .b-gallery-popup__item
    width: 100%
    padding: 0 0 2rem 0
</style>
