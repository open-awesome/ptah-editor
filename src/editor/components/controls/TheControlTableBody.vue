<script>
import { mapState, mapActions } from 'vuex'
import { merge, get, find } from 'lodash-es'

export default {

  data () {
    return {
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
      sizeValue: 0,
      lineHeightValue: 0,
      temp: {}
    }
  },

  created () {
    this.bgColor = this.table.body['background-color']
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectSection',
      'settingObjectElement',
      'settingObjectOptions',
      'isMobile'
    ]),
    ...mapState(['currentLanding']),

    table () {
      return this.settingObjectOptions.table
    },

    mediaStyles () {
      let device = 'is-mobile'
      let stylesMedia = this.settingObjectOptions.media
      let media = { 'is-mobile': { 'table': { 'body': {} } } }

      if (stylesMedia === undefined) {
        stylesMedia = media
      }

      if (stylesMedia[device]['table'] === undefined) {
        stylesMedia[device]['table'] = media[device]['table']
      }

      if (stylesMedia[device]['table']['body']) {
        for (let key in this.table) {
          media[device]['table']['body'][key] = stylesMedia[device]['table']['body'][key] !== undefined
            ? stylesMedia[device]['table']['body'][key]
            : this.table[key]
        }
      } else {
        media[device]['table']['body'] = this.table.body
      }

      this.updateSettingOptions(merge({}, this.settingObjectOptions, {
        media: media
      }))

      return this.settingObjectOptions.media
    },

    size: {
      get () {
        let props = `table['body']`
        let size = ''
        let newSize = ''

        if (this.isMobile) props = `media['is-mobile']['table']['body']`

        size = get(this.settingObjectOptions, `${props}['font-size']`)

        if (size === undefined) size = get(this.settingObjectOptions, `table['body']['font-size']`)

        newSize = size.split('rem')

        return parseFloat(newSize[0]) * 10
      },
      set (value) {
        this.update('font-size', `${value / 10}rem`)
      }
    },

    color: {
      get () {
        let props = `table['body']`
        let color = ''

        if (this.isMobile) props = `media['is-mobile']['table']['body']`

        color = get(this.settingObjectOptions, `${props}['color']`)

        if (color === undefined) color = get(this.settingObjectOptions, `table['body']['color']`)

        return color
      },
      set (value) {
        let color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.update('color', color)
      }
    },

    lineHeight: {
      get () {
        let props = `table['body']`
        let s = ''

        if (this.isMobile) props = `media['is-mobile']['table']['body']`

        s = get(this.settingObjectOptions, `${props}['line-height']`)

        if (s === undefined) s = get(this.settingObjectOptions, `table['body']['line-height']`)

        return s * 100
      },
      set (value) {
        this.update('line-height', value / 100)
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeBgColor () {
      const color = this.bgColor.rgba ? `rgba(${Object.values(this.bgColor.rgba).toString()}` : this.color

      this.table.body['background-color'] = color
    },

    changeStyle () {
      this.style.list.forEach((style) => {
        if (find(this.style.valueMultiple, style.value)) {
          this.table.body[style.value.prop] = style.value.value
        } else {
          this.table.body[style.value.prop] = style.value.base
        }
      })
    },

    update (prop, value) {
      let props = {}
      let table = { 'body': {} }
      let device = 'is-mobile'
      let media = { 'is-mobile': { 'table': table } }

      table['body'][prop] = value
      media[device]['table']['body'][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'table': table }

      this.updateSettingOptions(merge({}, this.settingObjectOptions, props))
    },

    setSize (value) {
      this.sizeValue = value
    },

    setSizeValue (value) {
      this.size = value
    },

    setLineHeight (value) {
      this.lineHeightValue = value
    },

    setLineHeightValue (value) {
      this.lineHeight = value
    }
  },

  mounted () {
    this.style.list[0].value = this.td
    this.style.list[1].value = this.fs
    this.style.list[2].value = this.fw

    this.temp['text-decoration'] = this.td
    this.temp['font-style'] = this.fs
    this.temp['font-weight'] = this.fw

    for (let key in this.temp) {
      if (this.table.body[key] !== this.temp[key].base) {
        this.style.valueMultiple.push(this.temp[key])
      }
    }

    this.sizeValue = this.size
    this.lineHeightValue = this.lineHeight
  }
}
</script>

<template>
  <div>
    <base-caption>
      Content style
    </base-caption>
    <div class="b-panel__control">
      <div class="b-panel__col">
        <base-color-picker
          label="Text color"
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
    <div class="b-panel__control">
      <div class="b-panel__col" >
        <base-range-slider
          position-label="left"
          v-model="lineHeight"
          :label="$t('c.line')"
          step="1"
          min="100"
          max="130"
          @change="setLineHeight"
        >
          <base-number-input
            :value="lineHeightValue"
            :minimum="100"
            :maximum="130"
            unit="%"
            @input="setLineHeightValue"
          />
        </base-range-slider>
      </div>
    </div>
    <div class="b-panel__control">
      <div class="b-panel__col" v-if="!isMobile">
        <div class="b-panel__row" v-if="!isMobile">
          <base-label>
            Text format
          </base-label>
          <div class="b-panel__col _m-0">
            <BaseButtonTabs
              type="buttons"
              :list="style.list"
              v-model="style.valueMultiple"
              @change="changeStyle"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="b-panel__control" v-if="!isMobile">
      <div class="b-panel__col">
        <base-color-picker
          label="Content background color"
          v-model="bgColor"
          @change="changeBgColor"
        />
      </div>
    </div>
  </div>
</template>
