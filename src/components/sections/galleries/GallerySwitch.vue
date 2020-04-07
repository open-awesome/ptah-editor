<template>
  <section class="b-gallery-one b-gallery-switch"
    v-styler:section="$sectionData.mainStyle"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia, $sectionData.objVarsTypo]"
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
          <div class="b-gallery-one">
            <div class="b-section-padd">
              <div class="b-section-padd-border">
                <!-- b-gallery-one-list -->
                  <div class="b-gallery-one-list flex__item flex flex_center b-draggable-slot">
                    <div class="b-gallery-one-list__tiles b-gallery-one-list__tiles_mobile">
                      <div class="b-preview b-gallery-item"
                          v-for="(components, key) in $sectionData"
                          :key="key"
                          v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) + 1 <= $sectionData.mainStyle.count"
                        >
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
                          <component class="b-preview__name"
                            v-if="$sectionData.mainStyle.isLabelPreview"
                            v-styler:for="{ el: $sectionData[key][1].element, path: `$sectionData.${key}[1].element`, type: $sectionData[key][1].type, label: $sectionData[key][0].label }"
                            :path="`${key}[1].element`"
                            :is="$sectionData[key][1].name"
                            :style="{
                              'color' : $sectionData.mainStyle.textStyles.text['color'],
                              'font-size' : $sectionData.mainStyle.textStyles.text['font-size']
                            }"
                            :class="[$sectionData[key][1].element.classes, $sectionData[key][1].class]"
                            >
                            <div v-html="$sectionData[key][1].element.text"></div>
                          </component><!--/.b-preview__name -->
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
                             'font-size' : $sectionData.mainStyle.textStyles.chapter['font-size']
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
                        <component class="b-gallery-one-stage__bio"
                           v-styler:for="{ el: $sectionData[key][4].element, path:`$sectionData.${key}[4].element`, type: $sectionData[key][4].type, label: $sectionData[key][4].label }"
                           :path="`${key}[4].element`"
                           :is="$sectionData[key][4].name"
                           :style="{
                             'color' : $sectionData.mainStyle.textStyles.text['color'],
                             'font-size' : $sectionData.mainStyle.textStyles.text['font-size']
                           }"
                           :class="[$sectionData[key][4].element.classes, $sectionData[key][4].class]"
                          >
                          <div v-html="$sectionData[key][4].element.text"></div>
                        </component>
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
  'https://s3.protocol.one/src/o_110MxE.png',
  'https://s3.protocol.one/src/o_2CscoP.png',
  'https://s3.protocol.one/src/o_193U4o.png'
]

let prev = [
  'https://s3.protocol.one/src/o_OqWNO.png',
  'https://s3.protocol.one/src/o_1TgrhD.png',
  'https://s3.protocol.one/src/o_1puIZ.png'
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
          'width': '175px',
          'height': '175px'
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
        }
      }
    },
    {
      element: {
        text: '<h2>Chapter for image</h2>',
        removable: false,
        styles: {
          'background-image': `url(${prev[i]})`,
          'background-size': 'contain',
          'width': '400px',
          'height': '400px'
        },
        media: {
          'is-mobile': {
            'width': '300px',
            'height': '300px'
          }
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
        text: '<p>Description for big image</p>'
      }
    }
  ]
})

const HEADER = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'title'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<h1>Gallery Header<h1>',
      styles: {
        'font-size': '3.6rem',
        'color': '#fff'
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
const NAME = 'GallerySwitch'

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://s3.protocol.one/src/o_u02v0.jpg)'
    },
    isChapter: true,
    isChapterStyle: true,
    isTextStyle: true,
    isLabel: true,
    isLabelPreview: true,
    media: {
      'is-mobile': {
        'textStyles': {
          'chapter': {
            'color': 'rgba(255, 255, 255, 1)',
            'font-size': '3.6rem'
          },
          'text': {
            'color': 'rgba(255, 255, 255, 1)',
            'font-size': '1.6rem'
          }
        }
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

  cover: 'https://s3.protocol.one/src/o_Rg7b5.jpg',

  $schema: {
    mainStyle: types.Gallery,
    container: types.StyleObject,
    components: _.merge([], HEADER),
    components0: _.merge([], GALLERY_ITEM),
    components1: _.merge([], GALLERY_ITEM),
    components2: _.merge([], GALLERY_ITEM),
    components3: _.merge([], GALLERY_ITEM),
    components4: _.merge([], GALLERY_ITEM),
    components5: _.merge([], GALLERY_ITEM),
    components6: _.merge([], GALLERY_ITEM),
    components7: _.merge([], GALLERY_ITEM),
    components8: _.merge([], GALLERY_ITEM),
    index: 0
  },

  methods: {
    ...mapActions('Sidebar', ['setControlPanel']),

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

</style>
