<script>
import { mapState, mapActions } from 'vuex'
import { getPseudoTemplate, randomPoneId } from '../../util'
import { get, merge } from 'lodash-es'

export default {
  props: {
    showTextStyles: {
      type: Boolean,
      default: false
    },
    colorTextHover: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      color: '',
      colorHover: '',
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
      sizeValue: 0,
      lineHeightValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectSection',
      'settingObjectElement',
      'settingObjectLabel',
      'settingObjectOptions',
      'isMobile'
    ]),
    ...mapState(['currentLanding']),

    styles () {
      return this.settingObjectOptions.styles
    },

    mediaStyles () {
      let device = 'is-mobile'
      let stylesMedia = this.settingObjectOptions.media
      let media = { 'is-mobile': {} }

      if (stylesMedia === undefined) {
        stylesMedia = media
      }

      if (stylesMedia[device]) {
        for (let key in this.styles) {
          media[device][key] = stylesMedia[device][key] !== undefined ? stylesMedia[device][key] : this.styles[key]
        }
      } else {
        media[device] = this.styles
      }

      this.updateSettingOptions(merge({}, this.settingObjectOptions, {
        media: media
      }))

      return media
    },

    pseudo () {
      return this.settingObjectOptions.pseudo
    },

    size: {
      get () {
        let props = 'styles'
        let size = ''
        let newSize = ''

        if (this.isMobile) props = `media['is-mobile']`

        size = get(this.settingObjectOptions, `${props}['font-size']`)

        if (size === undefined) size = get(this.settingObjectOptions, `styles['font-size']`)

        newSize = size.split('rem')

        return parseFloat(newSize[0]) * 10
      },
      set (value) {
        this.update('font-size', `${value / 10}rem`)
      }
    },

    lineHeight: {
      get () {
        let props = 'styles'
        let s = ''
        let gotLineHeight = ''

        if (this.isMobile) props = `media['is-mobile']`

        s = get(this.settingObjectOptions, `${props}['line-height']`)
        gotLineHeight = s

        if (s === undefined) {
          let style = window.getComputedStyle(this.settingObjectElement)
          let lineHeight = parseFloat(style['line-height'])
          let fontSize = parseFloat(style['font-size'])

          gotLineHeight = Math.round((lineHeight / fontSize) * 10) * 100
        }

        return gotLineHeight * 100
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

    updateProps () {
      let props = this.styles
      let color = ''

      if (this.isMobile) props = this.mediaStyles

      color = props['color'] !== undefined ? props['color'] : this.styles['color']
      this.color = color

      if (this.colorTextHover) this.colorHover = this.pseudo['hover']['color']

      /* text styles */
      this.style.list[0].value = this.td
      this.style.list[1].value = this.fs
      this.style.list[2].value = this.fw

      this.temp['text-decoration'] = this.td
      this.temp['font-style'] = this.fs
      this.temp['font-weight'] = this.fw

      for (let key in this.temp) {
        if (props[key] !== this.temp[key].base) {
          this.style.valueMultiple.push(this.temp[key])
        }
      }

      this.sizeValue = this.size
      this.lineHeightValue = this.lineHeight
    },

    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()})` : this.color
      this.styles['color'] = color
    },

    changeColorHover () {
      const color = this.colorHover.rgba ? `rgba(${Object.values(this.colorHover.rgba).toString()})` : this.colorHover

      this.changePseudo('color', color)
    },

    changePseudo (attr, style, pseudoClass = 'hover') {
      let pseudo = {}

      if (style !== '') {
        pseudo[pseudoClass] = {}
        pseudo[pseudoClass][attr] = style + '!important'
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { pseudo }))

        this.changePseudoStyle(attr, style + '!important')
      }
    },

    changePseudoStyle (attr, style, pseudoClass = 'hover') {
      const poneId = randomPoneId()
      this.settingObjectElement.dataset.pone = poneId

      let styleTemplate = getPseudoTemplate(poneId, this.settingObjectOptions.pseudo)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    },

    changeStyle () {
      this.style.list.forEach((style) => {
        if (find(this.style.valueMultiple, style.value)) {
          this.update(style.value.prop, style.value.value)
        } else {
          this.update(style.value.prop, style.value.base)
        }
      })
    },

    update (prop, value) {
      let props = {}
      let styles = {}
      let media = {}
      let device = 'is-mobile'

      styles[prop] = value

      media[device] = {}
      media[device][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

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

  created () {
    this.updateProps()
  }
}
</script>

<template>
  <div class="b-panel__control">
    <div class="b-panel__col" v-if="!isMobile">
      <div class="b-panel__control">
        <base-color-picker
          :label="$t('c.textColor')"
          v-model="color"
          @change="changeColor"
        />
      </div>
      <div class="b-panel__control" v-if="colorTextHover">
        <base-color-picker
          class="b-picker_color-hover"
          :label="$t('c.hoverColor')"
          v-model="colorHover"
          @change="changeColorHover"
        />
      </div>
    </div>

    <div class="b-panel__col" v-if="!isMobile">
      <div class="b-panel__control" v-if="showTextStyles">
        <BaseButtonTabs
          :list="style.list"
          v-model="style.valueMultiple"
          @change="changeStyle"
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
  </div>
</template>
