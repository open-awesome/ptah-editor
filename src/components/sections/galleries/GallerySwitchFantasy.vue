<template>
  <section class="b-gallery-one b-gallery-switch"
   v-styler:section="$sectionData.mainStyle"
   :class="$sectionData.mainStyle.classes"
   :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
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
            direction="column"
            :style="$sectionData.container.styles"
          >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="drag('components')" @change="dragStop">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                  :is="component.name"
                  :href="$sectionData.components[index].element.link.href"
                  :target="$sectionData.components[index].element.link.target"
                  :path="`components0[${index}].element`"
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
          <div class="b-gallery-one">
            <div class="b-gallery-one__padd">
              <div class="b-gallery-one__padd-border">
                <!-- Setting controls -->
                <div class="b-gallery-one__controls">
                  <div>
                    <a href="#" class="b-gallery-one__control"
                       tooltip="Items count"
                       tooltip-position="bottom"
                       @click.stop="showSettings('SectionGallerySettings')">
                      <icon-base name="cog" width="12" height="15" />
                    </a>
                  </div>
                  <div>
                    <a href="#" class="b-gallery-one__control"
                       tooltip="Gallery style"
                       tooltip-position="bottom"
                       @click.stop="showSettings('SectionGalleryStyle')">
                      <icon-base name="style" width="12" height="15" />
                    </a>
                  </div>
                </div>
                <!-- b-gallery-one-list -->
                <div class="b-gallery-one-list flex__item flex flex_center b-draggable-slot">
                  <div class="b-gallery-one-list__tiles b-gallery-one-list__tiles_mobile">
                    <div class="b-preview b-gallery-item"
                     v-for="(components, key) in $sectionData"
                     :key="key"
                     v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
                    >
                      <component class="b-preview__name"
                       v-if="$sectionData.mainStyle.isLabelPreview"
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
                       :class="[$sectionData[key][1].element.classes, $sectionData[key][1].class]"
                      >
                        <div v-html="$sectionData[key][1].element.text"></div>
                      </component><!--/.b-preview__name -->

                      <div class="b-preview__image"
                       @click="current = key"
                       :class="{ 'b-preview_active' : current === key }"
                       :data-index="key.split('components')[1]"
                       :gallery-one-preview="'loader__content_show'"
                      >
                        <component
                          v-styler:for="{ el: $sectionData[key][0].element, path:`$sectionData.${key}[0].element`, type: $sectionData[key][0].type, label: $sectionData[key][0].label }"
                          :is="$sectionData[key][0].name"
                          :href="$sectionData[key][0].element.link.href"
                          :target="$sectionData[key][0].element.link.target"
                          :style="$sectionData[key][0].element.styles"
                          :class="[$sectionData[key][0].element.classes, $sectionData[key][0].class]"
                          :path="`${key}[0].element`"
                        >
                        </component>
                        <span class="b-preview__count">
                          {{ parseFloat(key.split('components')[1]) + 1 }}
                        </span>
                      </div>

                    </div>
                  </div>
                  <div class="b-gallery-one-list__detail flex__item b-gallery-one-stage loader">
                    <div class="loader__content loader__content_mobile"
                     v-for="(components, key) in $sectionData"
                     :key="key"
                     v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
                     :gallery-one-stage="key.split('components')[1]"
                     :class="{'loader__content_show': current === key}"
                    >
                      <component class="b-gallery-one-stage__name"
                       v-styler:for="{ el: $sectionData[key][2].element, path:`$sectionData.${key}[2].element`, type: $sectionData[key][2].type, label: $sectionData[key][2].label }"
                       :path="`${key}[2].element`"
                       :is="$sectionData[key][2].name"
                       :style="{
                         'color' : $sectionData.mainStyle.textStyles.chapter['color'],
                         'font-family' : $sectionData.mainStyle.textStyles.chapter['font-family'],
                         'font-size' : $sectionData.mainStyle.textStyles.chapter['font-size'],
                         'font-weight' : $sectionData.mainStyle.textStyles.chapter['font-weight'],
                         'font-style' : $sectionData.mainStyle.textStyles.chapter['font-style'],
                         'text-decoration' : $sectionData.mainStyle.textStyles.chapter['text-decoration'],
                       }"
                       :class="[$sectionData[key][2].element.classes, $sectionData[key][2].class]"
                      >
                        <div v-html="$sectionData[key][2].element.text"></div>
                      </component>
                      <div class="b-gallery-one-stage__img"
                      >
                        <component
                          v-styler:for="{ el: $sectionData[key][3].element, path:`$sectionData.${key}[3].element`, type: $sectionData[key][3].type, label: $sectionData[key][3].label }"
                          :is="$sectionData[key][3].name"
                          :href="$sectionData[key][3].element.link.href"
                          :target="$sectionData[key][3].element.link.target"
                          :style="$sectionData[key][3].element.styles"
                          :class="[$sectionData[key][3].element.classes, $sectionData[key][3].class]"
                          :path="`${key}[3].element`"
                          class="b-gallery-item"
                        >
                        </component>
                        <span class="b-gallery-one-stage__count">
                          {{ parseFloat(key.split('components')[1]) + 1 }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div><!--/.b-gallery-one-list -->
              </div>
            </div>
          </div>
        </div><!--/.b-grid__col-->
      </div><!--/.b-grid__row-->
    </div><!--/.b-grid-->
  </section>

</template>

<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'
import { mapActions } from 'vuex'
import Uploader from '@editor/plugins/Uploader.vue'

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
    class: 'b-inline',
    label: 'text'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'chapter'
  },
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'image',
    file: null
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'inline',
    class: 'b-inline',
    label: 'description'
  }
]

let thumbs = [
  'https://s3.protocol.one/images/Blance_350.png',
  'https://s3.protocol.one/images/Bret_350.png',
  'https://s3.protocol.one/images/Mat_350.png'
]

let prev = [
  'https://s3.protocol.one/images/Blance_550.png',
  'https://s3.protocol.one/images/Bret_550.png',
  'https://s3.protocol.one/images/Mat_550.png'
]

const [
  GALLERY_ITEM_CUSTOM0,
  GALLERY_ITEM_CUSTOM1,
  GALLERY_ITEM_CUSTOM2
] = Array.from(new Array(3), (x, i) => {
  return [
    {
      element: {
        belongsGallery: true,
        removable: false,
        styles: {
          'background-image': `url(${thumbs[i]})`,
          'background-size': 'contain',
          'background-position': 'bottom center',
          'width': '190px',
          'height': '285px'
        }
      }
    },
    {
      element: {
        removable: false,
        canCopy: false,
        belongsGallery: true,
        editor: {
          tags: false,
          link: false
        }
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
    },
    {
      element: {
        removable: false,
        styles: {
          'background-image': `url(${prev[i]})`,
          'background-size': 'contain',
          'background-position': 'bottom center',
          'width': '300px',
          'height': '450px'
        }
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
        text: 'Description for big image'
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
        'font-family': 'Cinzel',
        'font-size': '4.0rem',
        'color': '#fff'
      }
    },
    key: 0
  }
]

const GROUP_NAME = 'Galleries'
const NAME = 'GallerySwitchFantasy'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3.protocol.one/images/travel_map.jpg)'
    },
    isChapter: true,
    isChapterStyle: true,
    isTextStyle: true,
    isLabel: true,
    isLabelPreview: true,
    maxCount: 3,
    textStyles: {
      chapter: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'line-height': '1.4',
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-decoration': 'none',
        'color': 'rgba(255, 255, 255, 1)'
      },
      text: {
        'font-family': 'Lato',
        'font-size': '1.6rem',
        'line-height': '1.4',
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-decoration': 'none',
        'color': 'rgba(255, 255, 255, 1)'
      }
    }
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

  description: 'Gallery side expanded picture view',

  components: {
    Uploader
  },

  data () {
    return {
      current: 'components0'
    }
  },

  mixins: [defaults, sectionMedia],

  cover: 'https://s3.protocol.one/images/gswitch_f_cover.jpg',

  $schema: {
    mainStyle: types.Gallery,
    container: types.StyleObject,
    components: _.merge([], HEADER, [{ key: 0 }]),
    components0: _.merge([], GALLERY_ITEM, [{ key: 10 }, { key: 11 }, { key: 12 }, { key: 13 }, { key: 14 }]),
    components1: _.merge([], GALLERY_ITEM, [{ key: 20 }, { key: 21 }, { key: 22 }, { key: 23 }, { key: 24 }]),
    components2: _.merge([], GALLERY_ITEM, [{ key: 30 }, { key: 31 }, { key: 32 }, { key: 33 }, { key: 34 }]),
    components3: _.merge([], GALLERY_ITEM, [{ key: 40 }, { key: 41 }, { key: 42 }, { key: 43 }, { key: 44 }]),
    components4: _.merge([], GALLERY_ITEM, [{ key: 50 }, { key: 51 }, { key: 52 }, { key: 53 }, { key: 54 }]),
    components5: _.merge([], GALLERY_ITEM, [{ key: 60 }, { key: 61 }, { key: 62 }, { key: 63 }, { key: 64 }]),
    components6: _.merge([], GALLERY_ITEM, [{ key: 70 }, { key: 71 }, { key: 72 }, { key: 73 }, { key: 74 }]),
    components7: _.merge([], GALLERY_ITEM, [{ key: 80 }, { key: 81 }, { key: 82 }, { key: 83 }, { key: 84 }]),
    components8: _.merge([], GALLERY_ITEM, [{ key: 90 }, { key: 91 }, { key: 92 }, { key: 93 }, { key: 94 }]),
    index: 0
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),

    async showSettings (panel) {
      this.setSettingSection(this.$section)

      await this.$nextTick()

      this.setControlPanel(panel)
    },

    changeSrc (data) {
      this.$section.set(`$sectionData.${data.path}.styles['background-image']`, `url(${data.url})`)
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/sectionMedia.sass'
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'
@import '../../../assets/sass/_flex.sass'

.b-gallery-one
  margin-bottom: -20px
  $this: &
  &__padd
    padding: 0

    transition: border 0.25s
    border: 0.2rem dotted transparent

    position: relative
    .is-mobile &
      padding: 0
    @media only screen and (max-width: 540px)
      &
        padding: 0
    &-border
      padding: 0
      transition: border 0.25s
      border: 1px dotted transparent
      .is-editable #{$this}__padd:hover &
        border: 1px dashed $dark-blue-krayola

  &__controls
    position: absolute
    top: -21px
    left: 0
    align-items: flex-end
    justify-content: flex-start

    display: none
    .is-editable #{$this}__padd:hover &
      display: flex !important
  &__control
    display: flex
    align-items: center
    justify-content: center

    width: $size-step/1.5
    height: $size-step/1.5

    background: $dark-blue-krayola
    box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)

    cursor: pointer
    & svg
      fill:  $white
      width: 14px
      height: 14px

    &:hover, .active
      background: $white
      svg
        fill: $dark-blue-krayola

  /deep/
  .b-uploader__input
    bottom: auto
    height: 0

.b-preview
  text-align: center
  display: inline-block
  vertical-align: top

  margin: 0 $size-step/3
  padding: 0
  border: 0

  position: relative
  cursor: pointer
  & .b-uploader
    opacity: 0
    z-index: 1
  &:hover .b-uploader
    opacity: 0.2
    display: block
  &__count
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
  .is-editable &__count
    display: flex
    justify-content: center
    align-items: center

  &__image
    width: 100%

    position: relative
    z-index: 0
    opacity: 0.8
    filter: grayscale(.75)
    transition: all .2s ease-out
    &:hover
      filter: none

  &__name
    width: 100%
    height: auto
    min-height: 2rem
    padding: 1rem 0.5rem

    border-radius: 0

    position: relative
    z-index: 10
    transition: all 200ms
  &_active
    filter: none
    opacity: 1

.b-gallery-one-list
  width: 100%
  margin: 0 auto
  align-items: flex-end

.b-gallery-one-list__tiles
  text-align: center
  width: 70%
  opacity: 1
  height: auto
  &_mobile
  .is-tablet &,
  .is-mobile &
    opacity: 0
    width: 0
    height: 0
  @media only screen and (max-width: 768px)
    &
      display: none

.b-gallery-one-list__tiles
  text-align: center

.b-gallery-one-list__detail
  text-align: center
  width: 30%
  height: 54.7rem
  .is-tablet &,
  .is-mobile &
    width: 100%
    height: auto
  @media only screen and (max-width: 768px)
    &
      width: 100%
      height: auto
.is-tablet,
.is-mobile
  .b-gallery-one-list
    -webkit-box-orient: vertical
    -webkit-box-direction: normal
    -ms-flex-direction: column
    flex-direction: column
    .flex__item_size-2, .flex__item_size-1
      -webkit-box-flex: 0
      -ms-flex: 0 0 auto
      flex: 0 0 auto

@media only screen and (max-width: 768px)
  .b-gallery-one-list
    -webkit-box-orient: vertical
    -webkit-box-direction: normal
    -ms-flex-direction: column
    flex-direction: column
    .flex__item_size-2, .flex__item_size-1
      -webkit-box-flex: 0
      -ms-flex: 0 0 auto
      flex: 0 0 auto

.loader__content
  position: absolute
  top: 0
  left: 0
  bottom: 0
  width: 100%
  padding: 0
  opacity: 0
  visibility: hidden

  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  transition: all .2s ease-out
  &_show
    opacity: 1
    visibility: visible
  &_mobile
  .is-tablet &,
  .is-mobile &
    opacity: 1
    visibility: visible
    margin: $size-step 0
    position: relative
  @media only screen and (max-width: 768px)
    &
      opacity: 1
      visibility: visible
      margin: $size-step 0
      position: relative
.b-gallery-one-stage
  position: relative
  &__count
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
  .is-editable &__count
    display: flex
    justify-content: center
    align-items: center
  .is-tablet &,
  .is-mobile &
    .b-gallery-one-stage
      margin-bottom: 1rem
  @media only screen and (max-width: 768px)
    &
      margin-bottom: 1rem

.b-gallery-one-stage__name,
.b-gallery-one-stage__bio
  max-width: 50rem
  margin: $size-step/2 auto

.b-gallery-one-stage__img
  position: relative
  margin: 0 auto

  display: flex
  align-items: center
  justify-content: center

  .is-tablet &,
  .is-mobile &
    width: 30rem
    height: 30rem
  @media only screen and (max-width: 768px)
    &
      width: 30rem
      height: 30rem

</style>
