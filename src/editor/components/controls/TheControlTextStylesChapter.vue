<template>
  <div class="b-panel__control">
    <base-caption>
      Chapter style
    </base-caption>
    <div class="b-panel__control">
      <div class="b-panel__col">
        <base-color-picker
          :label="$t('c.textColor')"
          v-model="color"
        />
      </div>
    </div>
    <div class="b-panel__control">
      <div class="b-panel__col">
        <base-range-slider
          position-label="left"
          v-model="size"
          :label="$t('c.size')"
          step="1"
          min="8"
          max="72"
          @change="setSize"
        >
          <base-number-input
            :value="sizeValue"
            :minimum="8"
            :maximum="72"
            unit="px"
            @input="setSizeValue"
          />
        </base-range-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { FONT_SIZES_LIST } from '../../util'
import { merge, get } from 'lodash-es'

export default {

  data () {
    return {
      sizes: FONT_SIZES_LIST,
      td: { prop: 'text-decoration', value: 'underline', base: 'none' },
      fs: { prop: 'font-style', value: 'italic', base: 'normal' },
      fw: { prop: 'font-weight', value: 'bold', base: 'normal' },
      style: {
        list: [
          {
            iconName: 'fontUnderline',
            tooltipText: 'Underline',
            value: {}
          },
          {
            iconName: 'fontItalic',
            tooltipText: 'Italic',
            value: {}
          },
          {
            iconName: 'fontBold',
            tooltipText: 'Bold',
            value: {}
          }
        ],
        valueMultiple: []
      },
      temp: {},
      sizeValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectSection',
      'settingObjectElement',
      'settingObjectOptions',
      'isMobile'
    ]),
    ...mapState(['currentLanding']),

    textStyles () {
      return this.settingObjectOptions.textStyles
    },

    mediaStyles () {
      let device = 'is-mobile'
      let stylesMedia = this.settingObjectOptions.media
      let media = { 'is-mobile': { 'textStyles': { 'chapter': {} } } }

      if (stylesMedia === undefined) {
        stylesMedia = media
      }

      if (stylesMedia[device]['textStyles'] === undefined) {
        stylesMedia[device]['textStyles'] = media[device]['textStyles']
      }

      if (stylesMedia[device]['textStyles']['chapter']) {
        for (let key in this.textStyles) {
          media[device]['textStyles']['chapter'][key] = stylesMedia[device]['textStyles']['chapter'][key] !== undefined
            ? stylesMedia[device]['textStyles']['chapter'][key]
            : this.textStyles[key]
        }
      } else {
        media[device]['textStyles']['chapter'] = this.textStyles.chapter
      }

      this.updateSettingOptions(merge({}, this.settingObjectOptions, {
        media: media
      }))

      return this.settingObjectOptions.media
    },

    size: {
      get () {
        let props = `textStyles['chapter']`
        let size = ''
        let newSize = ''

        if (this.isMobile) props = `media['is-mobile']['textStyles']['chapter']`

        size = get(this.settingObjectOptions, `${props}['font-size']`)

        if (size === undefined) size = get(this.settingObjectOptions, `textStyles['chapter']['font-size']`)

        newSize = size.split('rem')

        return parseFloat(newSize[0]) * 10
      },
      set (value) {
        this.update('font-size', `${value / 10}rem`)
      }
    },

    color: {
      get () {
        let props = `textStyles['chapter']`
        let color = ''

        if (this.isMobile) props = `media['is-mobile']['textStyles']['chapter']`

        color = get(this.settingObjectOptions, `${props}['color']`)

        if (color === undefined) color = get(this.settingObjectOptions, `textStyles['chapter']['color']`)

        return color
      },
      set (value) {
        let color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.update('color', color)
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    update (prop, value) {
      let props = {}
      let textStyles = { 'chapter': {} }
      let device = 'is-mobile'
      let media = { 'is-mobile': { 'textStyles': textStyles } }

      textStyles['chapter'][prop] = value
      media[device]['textStyles']['chapter'][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'textStyles': textStyles }

      this.updateSettingOptions(merge({}, this.settingObjectOptions, props))
    },

    setSize (value) {
      this.sizeValue = value
    },

    setSizeValue (value) {
      this.size = value
    }
  },

  mounted () {
    this.sizeValue = this.size
  }
}
</script>
