<template>
  <section class="b-gallery-one"
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="$sectionData.mainStyle.styles"
    >
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
              <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @change="dragStop">
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
                  <div class="b-gallery-one-list flex__item flex flex_center">
                    <div class="b-gallery-one-list__tiles b-gallery-one-list__tiles_mobile">
                      <div class="b-preview"
                          v-for="(components, key) in $sectionData"
                          :key="key"
                          v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
                        >
                          <div class="b-preview__image"
                            v-styler:for="{ el: $sectionData[key][0].element, path: `$sectionData.${key}[0].element`, type: $sectionData[key][0].type, label: $sectionData[key][0].label }"
                            :style="$sectionData[key][0].element.styles"
                            :path="`${key}[0].element`"
                            :data-index="key.split('components')[1]"
                            :gallery-one-preview="'loader__content_show'"
                            >
                            <span class="b-preview__count">
                              {{ parseFloat(key.split('components')[1]) + 1 }}
                            </span>
                            <uploader
                              :path="`${key}[0].element`"
                              :file="$sectionData[key][0].file"
                              @change="changeSrc"
                            />
                          </div>
                          <div class="b-preview__name"
                            v-if="$sectionData.mainStyle.isLabelPreview"
                            v-styler:for="{ el: $sectionData[key][1].element, path: `$sectionData.${key}[1].element`, type: $sectionData[key][1].type, label: $sectionData[key][0].label }"
                            :path="`${key}[1].element`"
                            v-html="$sectionData[key][1].element.text"
                            :style="{
                              'color' : $sectionData.mainStyle.textStyles.text['color'],
                              'font-family' : $sectionData.mainStyle.textStyles.text['font-family'],
                              'font-size' : $sectionData.mainStyle.textStyles.text['font-size'],
                              'font-weight' : $sectionData.mainStyle.textStyles.text['font-weight'],
                              'font-style' : $sectionData.mainStyle.textStyles.text['font-style'],
                              'text-decoration' : $sectionData.mainStyle.textStyles.text['text-decoration'],
                            }"
                            >
                          </div>
                      </div>
                    </div>
                    <div class="b-gallery-one-list__detail flex__item b-gallery-one-stage loader">
                      <div class="loader__content loader__content_mobile"
                         v-for="(components, key) in $sectionData"
                         :key="key"
                         v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
                         :gallery-one-stage="key.split('components')[1]"
                        >
                        <div class="b-gallery-one-stage__name"
                           v-html="$sectionData[key][2].element.text"
                           v-styler:for="{ el: $sectionData[key][2].element, path:`$sectionData.${key}[2].element`, type: $sectionData[key][2].type, label: $sectionData[key][2].label }"
                           :style="{
                             'color' : $sectionData.mainStyle.textStyles.chapter['color'],
                             'font-family' : $sectionData.mainStyle.textStyles.chapter['font-family'],
                             'font-size' : $sectionData.mainStyle.textStyles.chapter['font-size'],
                             'font-weight' : $sectionData.mainStyle.textStyles.chapter['font-weight'],
                             'font-style' : $sectionData.mainStyle.textStyles.chapter['font-style'],
                             'text-decoration' : $sectionData.mainStyle.textStyles.chapter['text-decoration'],
                         }"
                          >
                        </div>
                        <div class="b-gallery-one-stage__img"
                          :style="$sectionData[key][3].element.styles"
                          v-styler:for="{ el: $sectionData[key][3].element, path:`$sectionData.${key}[3].element`, type: $sectionData[key][3].type, label: $sectionData[key][3].label }"
                          >
                          <uploader
                              :path="`${key}[3].element`"
                              :file="$sectionData[key][3].file"
                              @change="changeSrc"
                            />
                          <span class="b-gallery-one-stage__count">
                            {{ parseFloat(key.split('components')[1]) + 1 }}
                          </span>
                        </div>
                        <div class="b-gallery-one-stage__bio"
                         v-styler:for="{ el: $sectionData[key][4].element, path: `$sectionData.${key}[4].element`, type: $sectionData[key][4].type, label: $sectionData[key][4].label }"
                         v-html="$sectionData[key][4].element.text"
                         :style="{
                           'color' : $sectionData.mainStyle.textStyles.text['color'],
                           'font-family' : $sectionData.mainStyle.textStyles.text['font-family'],
                           'font-size' : $sectionData.mainStyle.textStyles.text['font-size'],
                           'font-weight' : $sectionData.mainStyle.textStyles.text['font-weight'],
                           'font-style' : $sectionData.mainStyle.textStyles.text['font-style'],
                           'text-decoration' : $sectionData.mainStyle.textStyles.text['text-decoration'],
                         }"
                         >
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
import { galleryPreviewClick } from '@cscripts/gallery1'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
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
    name: 'Label',
    element: types.TextInherit,
    type: 'inline',
    class: 'b-label',
    label: 'label'
  },
  {
    name: 'Chapter',
    element: types.TextInherit,
    type: 'inline',
    class: 'b-chapter',
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
    name: 'Text',
    element: types.TextInherit,
    type: 'inline',
    class: 'b-text',
    label: 'description'
  }
]

const GALLERY_ITEM_CUSTOM = [
  {
    element: {
      removable: false,
      styles: {
        'background-image': 'url(https://gn854.cdn.stg.gamenet.ru/0/836nk/o_e19nv.png)',
        'background-size': 'cover',
        'width': '128px',
        'height': '160px'
      }
    }
  },
  {
    element: {
      removable: false
    }
  }
]

const HEADER = [
  {
    name: 'TextElement',
    element: types.Title,
    type: 'text',
    class: 'b-title',
    label: 'title'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: 'Your beautiful header should be here!',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '3.2rem',
        'color': '#000'
      }
    },
    key: 0
  }
]

const GROUP_NAME = 'Galleries'
const NAME = 'GallerySwitch'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#8CD2B5'
    },
    isChapter: true,
    isChapterStyle: true,
    isTextStyle: true,
    isLabel: true,
    isLabelPreview: true
  },
  components: _.merge([], C_CUSTOM),
  components0: _.merge([], GALLERY_ITEM_CUSTOM),
  components1: _.merge([], GALLERY_ITEM_CUSTOM),
  components2: _.merge([], GALLERY_ITEM_CUSTOM),
  components3: _.merge([], GALLERY_ITEM_CUSTOM),
  components4: _.merge([], GALLERY_ITEM_CUSTOM),
  components5: _.merge([], GALLERY_ITEM_CUSTOM),
  components6: _.merge([], GALLERY_ITEM_CUSTOM),
  components7: _.merge([], GALLERY_ITEM_CUSTOM),
  components8: _.merge([], GALLERY_ITEM_CUSTOM),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  components: {
    Uploader
  },

  mixins: [defaults],

  cover: '/img/covers/gallery1.png',

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

  watch: {
    '$sectionData.mainStyle.count': {
      handler: function (val, old) {
        setTimeout(val > old ? this.bindingClickPreview(old) : this.bindingClickPreview(val - 1), 250)
      },
      deep: true
    }
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),

    bindingClickPreview (index) {
      galleryPreviewClick(index)
    },

    async showSettings (panel) {
      let index = _.findIndex(this.$builder.sections, ['group', GROUP_NAME])

      this.setSettingSection(this.$builder.sections[index])

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
  },

  mounted: function () {
    this.bindingClickPreview(0)
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'
@import '../../../assets/sass/_flex.sass'

.b-gallery-one
  $this: &
  &__padd
    padding: $size-step/4

    transition: border 0.25s
    border: 0.2rem dotted transparent

    position: relative
    .is-mobile &
      padding: 0
    @media only screen and (max-width: 540px)
      &
        padding: 0
    &-border
      padding: $size-step/4 $size-step/4 $size-step/2
      transition: border 0.25s
      border: 0.2rem dotted transparent
      .is-editable #{$this}__padd:hover &
        border: 0.2rem dotted #fff

  &__controls
    position: absolute
    top: -$size-step/1.5
    left: $size-step/3.4

    display: flex
    align-items: center
    justify-content: center

    display: none
    .is-editable #{$this}__padd:hover &
      display: flex !important
  &__control
    width: $size-step/1.5
    height: $size-step/1.5

    display: flex
    align-items: center
    justify-content: center

    background: $white
    border-radius: 0.2rem
    box-shadow: 0 6px 16px rgba(26, 70, 122, 0.39)
    margin-right: .4rem
    svg
      fill: $dark-blue-krayola
      margin-bottom: 0
    &:hover, .active
      background: $dark-blue-krayola
      svg
        fill: $white
        margin-bottom: 0

.b-preview
  text-align: center
  display: inline-block
  vertical-align: top

  width: $size-step*4
  min-height: $size-step*5

  margin: $size-step/3
  padding: 0
  border: 0.2rem dotted transparent

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
    height: 100%

    position: relative
    z-index: 0
    opacity: 0.6

  &__name
    border-radius: 0rem
    padding: 1rem 0.5rem
    transition: all 200ms
    width: 100%
    height: auto
    min-height: 2rem
    position: relative
    z-index: 10
    overflow: hidden

  &_active
    transform: scale(1.1)
    box-shadow: 0 0 2rem 0 rgba($black, 0.6)
    opacity: 1

.b-gallery-one-list
 width: 100%
 max-width: 98rem
 margin: 0 auto

.b-gallery-one-list__tiles
  text-align: center
  width: 60%
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
        opacity: 0
        width: 0
        height: 0

.b-gallery-one-list__tiles
  text-align: center

.b-gallery-one-list__detail
  text-align: center
  width: 40%
  height: 50rem
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
  transition: opacity 200ms
  position: absolute
  top: 0
  left: 0
  width: 100%
  padding: 0
  opacity: 0
  visibility: hidden

  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
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

  width: 40rem
  height: 40rem
  margin: 0 auto

  & .b-uploader
    opacity: 0
    z-index: 1
  &:hover .b-uploader
    opacity: 0.2
    display: block

  .is-tablet &,
  .is-mobile &
    width: 30rem
    height: 30rem
  @media only screen and (max-width: 768px)
    &
      width: 30rem
      height: 30rem

</style>
