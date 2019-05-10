<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import section from '../../mixins/section.js'
import { mapActions } from 'vuex'

const GALLERY_ITEM = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-preview',
    label: 'preview'
  },
  {
    name: 'Label',
    element: types.TextInherit,
    type: 'inline',
    class: 'b-label',
    label: 'label'
  }
]

const GALLERY_ITEM_CUSTOM = [
  {
    element: {
      removable: false,
      styles: {
        'background-image': 'url(https://gn854.cdn.stg.gamenet.ru/0/836nk/o_e19nv.png)',
        'background-size': 'cover'
      },
      hasLink: true
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

const TOP_POPUP = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo',
    label: 'logo'
  }
]

const C_CUSTOM_TOP_POPUP = [
  {
    element: {
      styles: {
        'background-image': 'url("https://gn675.cdn.stg.gamenet.ru/0/7K0Jf/o_15rRBx.svg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '110px',
        'height': '64px'
      }
    },
    key: 1
  }
]

const BOTTOM_POPUP = [
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button',
    label: 'button'
  }
]

const C_CUSTOM_BOTTOM_POPUP = [
  {
    element: {
      text: 'Call to Action',
      styles: {
        'background-color': '#FF6D64',
        'color': '#ffffff',
        'font-family': 'Lato',
        'text-align': 'center',
        'width': '352px',
        'height': '64px',
        'border-radius': '2px'
      }
    },
    key: 2
  }
]

const GROUP_NAME = 'Galleries'
const NAME = 'GalleryPopup'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-color': '#8CD2B5'
    },
    isTextStyle: true,
    isLabel: true,
    isLabelPreview: true,
    isBottom: true,
    isBottomPopup: true,
    isTop: true
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
  componentsTopPopup: _.merge([], C_CUSTOM_TOP_POPUP),
  componentsBottomPopup: _.merge([], C_CUSTOM_BOTTOM_POPUP),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  mixins: [section],

  cover: '/img/covers/gallery2.png',

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
    containerTopPopup: types.StyleObject,
    componentsTopPopup: _.merge([], TOP_POPUP, [{ key: 1 }]),
    containerBottomPopup: types.StyleObject,
    componentsBottomPopup: _.merge([], BOTTOM_POPUP, [{ key: 2 }]),
    index: 0,
    isShowPopup: false,
    popupStyles: { width: 'auto', margin: '0' },
    url: 'https://gn652.cdn.gamenet.ru/TY0Xv2riHu/772iV/o_cDot3.png',
    content: ''
  },

  mounted () {
    this.$sectionData.isShowPopup = false
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel', 'setSettingSection']),
    async showSettings (panel) {
      let index = _.findIndex(this.$builder.sections, ['group', GROUP_NAME])

      this.setSettingSection(this.$builder.sections[index])

      await this.$nextTick()

      this.setControlPanel(panel)
    },

    onClick (el, index) {
      let youtubeVideoUrl = false
      let imageUrl = el.link.imageUrl
      let videoUrl = el.link.videoUrl
      let typeContent = el.link.type
      let url = ''
      let contentPopup = ''

      if (imageUrl !== '') {
        url = imageUrl
      } else if (videoUrl !== '') {
        url = videoUrl
      } else {
        url = this.$sectionData.url
      }

      this.$sectionData.content = contentPopup
      youtubeVideoUrl = this.matchYoutubeUrl(videoUrl)

      if (typeContent === 'default') {
        contentPopup = '<img id="content" width="100%" height="100%" src="' + url + '"></img>'
      } else {
        if (youtubeVideoUrl) {
          contentPopup = '<iframe allow="autoplay" id="content" width="100%" height="100%" src="https://www.youtube.com/embed/' + youtubeVideoUrl + '?rel=0&amp;wmode=transparent&amp;autoplay=1&amp;enablejsapi=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
        } else {
          contentPopup = '<video autoplay="autoplay" style="width: 100%; height: 100%;" id="content" controls="controls" src="' + videoUrl + '" loop="loop" type="video/mp4"></video>'
        }
      }

      this.$sectionData.content = contentPopup
      this.openPopup(this.$sectionData.content)
      this.setIndex(index)
    },

    setIndex (index) {
      this.$sectionData.index = index
    },

    openPopup () {
      setTimeout(() => {
        this.setHeight()
      }, 250)
    },

    setHeight () {
      this.$sectionData.isShowPopup = true

      let el = document.getElementById('layoutContent')
      let ab = document.getElementById('artboard')
      let actualWidth = null
      // let calcHeight = null
      let calcMargin = null

      actualWidth = undefined !== ab ? ab.clientWidth : el.clientWidth
      // calcHeight = actualWidth * 0.5625
      calcMargin = (document.body.clientWidth - actualWidth) / 2
      // el.style.height = calcHeight + 'px'
      // el.style.width = actualWidth + 'px'

      this.$sectionData.popupStyles['width'] = actualWidth + 'px'
      this.$sectionData.popupStyles['margin'] = '0 ' + calcMargin + 'px'
      // hide all styler after shop popup
      el.click()

      this.$sectionData.isShowPopup = true
    },

    closePopup () {
      let el = document.getElementById('layoutContent')
      this.$sectionData.isShowPopup = false
      this.$sectionData.content = ''
      el.style.height = ''
      el.style.width = ''
    },

    matchYoutubeUrl (url) {
      let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      let matches = url.match(p)
      if (matches) {
        return matches[1]
      }
      return false
    },

    clickArr (type) {
      let index = this.$sectionData.index
      let num = 0
      let el = null

      if (type === 'prev') {
        num = index - 1
      } else {
        num = index + 1
      }

      el = this.$sectionData[`components${num}`][0].element
      this.onClick(el, num)
    },

    clickEl () {
      if (this.isShowPopup) {
        let bl = document.getElementById('builderLayout')
        bl.style.zIndex = 19
      }
    },

    onClickOutside () {
      this.closePopup()
    }
  },

  created () {
    let groupDataStore = this.$store.state.Landing.groupData[GROUP_NAME]
    let sectionDataStore = this.$store.state.Landing.sectionData[NAME]
    let sectionData = this.canRestore(GROUP_NAME, NAME) ? sectionDataStore : SCHEMA_CUSTOM
    let $sectionData = this.$sectionData

    this.createdSection(groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, NAME, SCHEMA_CUSTOM)
  }
}
</script>

<template>
  <section class="b-gallery-popup"
    @resize="closePopup"
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.isShowPopup ? { 'z-index': '10' } : { 'z-index': '1' }]"
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
                <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles">
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
            <div class="b-gallery-popup__padd">
              <div class="b-gallery-popup__padd-border">
                <!-- Setting controls -->
                  <div class="b-gallery-popup__controls">
                    <div>
                      <a href="#" class="b-gallery-popup__control" @click.stop="showSettings('SectionGallerySettings')">
                        <icon-base name="cog" width="12" height="15" />
                      </a>
                    </div>
                    <div>
                      <a href="#" class="b-gallery-popup__control" @click.stop="showSettings('SectionGalleryStyle')">
                        <icon-base name="style" width="12" height="15" />
                      </a>
                    </div>
                  </div>
                  <!-- .b-gallery-popup__wrap -->
                  <div class="b-gallery-popup__wrap">
                    <div class="b-gallery-popup">
                      <div class="b-gallery-popup__item"
                        v-for="(components, key) in $sectionData"
                        :key="key"
                        v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
                        :data-index="parseFloat(key.split('components')[1])"
                      >
                        <div class="b-gallery-popup__preview"
                          gallery-two-popup-link=""
                          :gallery-two-popup-image-url="$sectionData[key][0].element.link.imageUrl"
                          :gallery-two-popup-video-url="$sectionData[key][0].element.link.videoUrl"
                          :gallery-two-popup-type-content="$sectionData[key][0].element.link.type"
                          v-styler:for="{ el: $sectionData[key][0].element, path:`$sectionData.${key}[0].element`, type: $sectionData[key][0].type, label: $sectionData[key][0].label }"
                          :style="$sectionData[key][0].element.styles"
                          @dblclick="onClick($sectionData[key][0].element, parseFloat(key.split('components')[1]))"
                          >
                          <span class="b-gallery-popup__preview-count"
                            v-text="parseFloat(key.split('components')[1]) + 1"
                          />
                          <span class="b-gallery-popup__preview-video" v-if="$sectionData[key][0].element.link.type === 'video'">
                            <icon-base name="video" color="#fff" width="64" height="64" />
                          </span>
                        </div>
                        <div v-if="$sectionData.mainStyle.isLabelPreview">
                          <span class="b-gallery-popup__preview-title"
                            v-styler:for="{ el: $sectionData[key][1].element, path:`$sectionData.${key}[1].element`, type: $sectionData[key][1].type, label: $sectionData[key][1].label }"
                            v-html="$sectionData[key][1].element.text"
                            :path="`${key}[1].element`"
                            :style="{
                              'color' : $sectionData.mainStyle.textStyles.text['color'],
                              'font-family' : $sectionData.mainStyle.textStyles.text['font-family'],
                              'font-size' : $sectionData.mainStyle.textStyles.text['font-size'],
                              'font-weight' : $sectionData.mainStyle.textStyles.text['font-weight'],
                              'font-style' : $sectionData.mainStyle.textStyles.text['font-style'],
                              'text-decoration' : $sectionData.mainStyle.textStyles.text['text-decoration'],
                            }"
                            >
                          </span>
                        </div>
                      </div>
                    </div>
                  </div><!--/.b-gallery-popup__wrap-->
              </div>
            </div><!--/.b-gallery-popup__padd-->
          </div>
        </div>
      </div>

      <!-- Popup -->
      <div v-show="$sectionData.isShowPopup"
         @click.self="closePopup"
         ref="gallery-container"
         class="l-popup l-popup_flex"
         gallery-two-popup=""
        >
        <div gallery-two-popup-padd="" class="l-popup__padd" :style="$sectionData.popupStyles" @click.self="closePopup">
          <div gallery-two-popup-close="" class="l-popup__close"
            @click="closePopup"
            >
            <icon-base name="close" color="#fff" width="14" height="14" />
          </div>
          <div class="b-grid"
             v-if="$sectionData.mainStyle.isTopPopup"
            >
            <div class="b-grid__row">
                <div class="b-grid__col-12">
                  <sandbox
                    class="b-sandbox"
                    container-path="$sectionData.containerTopPopup"
                    components-path="$sectionData.componentsTopPopup"
                    direction="column"
                    :style="$sectionData.containerTopPopup.styles"
                  >
                    <draggable v-model="$sectionData.componentsTopPopup" class="b-draggable-slot" :style="$sectionData.containerTopPopup.styles">
                      <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.componentsTopPopup" v-if="$sectionData.componentsTopPopup.length !== 0" :key="index">
                        <component
                           v-styler:for="{ el: $sectionData.componentsTopPopup[index].element, path: `$sectionData.componentsTopPopup[${index}].element`, type: $sectionData.componentsTopPopup[index].type, label: $sectionData.componentsTopPopup[index].label }"
                           :is="component.name"
                           :href="$sectionData.componentsTopPopup[index].element.link.href"
                           :target="$sectionData.componentsTopPopup[index].element.link.target"
                           :path="`componentsTopPopup[${index}].element`"
                           :style="$sectionData.componentsTopPopup[index].element.styles"
                           :class="[$sectionData.componentsTopPopup[index].element.classes, $sectionData.componentsTopPopup[index].class]"
                        >
                          <div v-html="$sectionData.componentsTopPopup[index].element.text"></div>
                        </component>
                      </div>
                    </draggable>
                  </sandbox>
              </div>
            </div>
          </div><!--/.b-grid-->
          <div id="layoutContent" class="l-popup__content" v-click-outside="onClickOutside">
            <div id="content"
              class="l-popup__content-block"
              gallery-two-popup-content=""
              v-html="$sectionData.content"
              >
            </div>
            <div gallery-two-popup-prev="" class="l-popup__arr l-popup__arr_prev" @click="clickArr('prev')" v-show="$sectionData.index > 0">
              <icon-base name="arrowRight" color="#fff" width="8" height="14" />
            </div>
            <div gallery-two-popup-next="" class="l-popup__arr l-popup__arr_next" @click="clickArr('next')" v-show="$sectionData.index < $sectionData.mainStyle.count - 1">
              <icon-base name="arrowRight" color="#fff" width="8" height="14" />
            </div>
          </div>
          <div class="b-grid"
            v-if="$sectionData.mainStyle.isBottomPopup"
            >
            <div class="b-grid__row">
                <div class="b-grid__col-12">
                  <sandbox
                    class="b-sandbox"
                    container-path="$sectionData.containerBottomPopup"
                    components-path="$sectionData.componentsBottomPopup"
                    direction="column"
                    :style="$sectionData.containerBottomPopup.styles"
                  >
                    <draggable v-model="$sectionData.componentsBottomPopup" class="b-draggable-slot" :style="$sectionData.containerBottomPopup.styles">
                      <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.componentsBottomPopup" v-if="$sectionData.componentsBottomPopup.length !== 0" :key="index">
                        <component
                           v-styler:for="{ el: $sectionData.componentsBottomPopup[index].element, path: `$sectionData.componentsBottomPopup[${index}].element`, type: $sectionData.componentsBottomPopup[index].type, label: $sectionData.componentsBottomPopup[index].label }"
                           :is="component.name"
                           :href="$sectionData.componentsBottomPopup[index].element.link.href"
                           :target="$sectionData.componentsBottomPopup[index].element.link.target"
                           :path="`componentsBottomPopup[${index}].element`"
                           :style="$sectionData.componentsBottomPopup[index].element.styles"
                           :class="[$sectionData.componentsBottomPopup[index].element.classes, $sectionData.componentsBottomPopup[index].class]"
                        >
                          <div v-html="$sectionData.componentsBottomPopup[index].element.text"></div>
                        </component>
                      </div>
                    </draggable>
                  </sandbox>
              </div>
            </div>
          </div><!--/.b-grid-->
          <span class="l-popup__count"
            v-text="$sectionData.index + 1"
          />
        </div>
      </div><!--/.l-popup-->

  </section>
</template>

<style lang="sass" scoped="scoped">
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-gallery-popup
  $this: &

  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap
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
    top: -$size-step
    left: $size-step/3

    display: flex
    align-items: center
    justify-content: center

    display: none
    .is-editable #{$this}__padd:hover &
      display: flex !important
  &__control
    width: 3.2rem
    height: 3.2rem
    display: flex
    align-items: center
    justify-content: center

    border-radius: 50%
    background: $white
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

.b-gallery-popup__item
  width: 25%
  min-width: 10rem
  height: 22rem
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
    // transform: scale(1.1)
    #{$this}-video
      transition: all 200ms
      transform: rotate(360deg)
  .is-editable &:hover
    border: 0.2rem dotted #fff
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.6)
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

.l-popup
  position: fixed

  display: none
  justify-content: center
  align-items: center

  top: 0
  right: 0
  left: 0
  bottom: 0

  background-color: rgba(0, 0, 0, 0.9)
  padding: $size-step
  z-index: 99999
  .is-expanded &
    top: 8rem
    left: $size-step * 9
  &_flex
    display: flex
    jusitify-content: center
    align-items: center
  &__padd
    position: relative
    width: 100%
    height: 100%

    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
  &__content

    width: 80%
    max-height: 80%

    cursor: auto
    transition: all 200ms

    position: relative
    height: auto

    display: flex
    justify-content: center
    &-block
      overflow: hidden
      height: 100%

      transition: all 200ms
      & iframe,
      & video,
      & img
        display: block
        width: 100%
        height: 100%
  &__content_video
    width: 70%
  &__close
    position: absolute
    top: 0.5rem
    right: 1rem
    z-index: 10

    transition: all 200ms
    &:hover
      transform: rotate(90deg)
      cursor: pointer
    & svg
      width: 2.8rem
      height: 2.8rem
  &__arr
    position: absolute
    top: 0
    bottom: 0
    z-index: 0

    display: flex
    justify-content: center
    align-items: center

    transition: all 200ms
    cursor: pointer
    & svg
      width: 2.8rem
      height: 2.8rem

      transition: all 200ms
    &:hover svg
      fill: $grey
    &_prev
      left: -15%
      right: 100%
      & svg
        transform: rotate(-180deg)
    &_next
      right: -15%
      left: 100%
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
</style>
