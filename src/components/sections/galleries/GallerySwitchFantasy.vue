    <template>
  <section class="b-gallery-one b-gallery-switch gallery-switch-fantasy"
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
                <!-- Setting controls -->
                <div class="b-section-menu__controls">
                  <div>
                    <a href="#" class="b-section-menu__control"
                       tooltip="Items count"
                       tooltip-position="bottom"
                       @click.stop="showSettings('SectionGallerySettings')">
                      <icon-base name="cog" width="12" height="15" />
                    </a>
                  </div>
                  <div>
                    <a href="#" class="b-section-menu__control"
                       tooltip="Gallery style"
                       tooltip-position="bottom"
                       @click.stop="showSettings('SectionGalleryStyle')">
                      <icon-base name="style" width="12" height="15" />
                    </a>
                  </div>
                </div>
                <!-- b-gallery-one-list -->
                <div class="b-gallery-one-list flex__item flex b-draggable-slot">
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
          'background-position': '50% 100%',
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
          'background-position': '50% 100%',
          'width': '300px',
          'height': '450px'
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
        'font-size': '4.0rem',
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
        'font-size': '1.6rem',
        'line-height': '1.4',
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-decoration': 'none',
        'color': 'rgba(255, 255, 255, 1)'
      },
      text: {
        'font-size': '1.6rem',
        'line-height': '1.4',
        'font-weight': 'normal',
        'font-style': 'normal',
        'text-decoration': 'none',
        'color': 'rgba(255, 255, 255, 1)'
      }
    },
    media: {
      'is-mobile': {
        'textStyles': {
          'chapter': {
            'color': 'rgba(255, 255, 255, 1)',
            'font-size': '1.6rem'
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
</style>
