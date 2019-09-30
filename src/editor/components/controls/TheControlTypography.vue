<script>
import { mapState, mapActions } from 'vuex'
import { getPseudoTemplate, randomPoneId, FONT_SIZES_LIST, LINES_HEIGHT_LIST, FONTS_LIST } from '../../util'
import * as _ from 'lodash-es'

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
      sizes: FONT_SIZES_LIST,
      linesHeight: LINES_HEIGHT_LIST,
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
      temp: {}
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectSection',
      'settingObjectElement',
      'settingObjectOptions',
      'isMobile'
    ]),

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

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        media: media
      }))

      return media
    },

    pseudo () {
      return this.settingObjectOptions.pseudo
    },

    fonts () {
      const options = FONTS_LIST.map((font) => {
        return { name: font, value: font }
      })
      return {
        options
      }
    },

    fontName: {
      get () {
        let props = 'styles'
        let name = ''

        if (this.isMobile) props = `media['is-mobile']`

        name = _.get(this.settingObjectOptions, `${props}['font-family']`)

        if (name === undefined) name = _.get(this.settingObjectOptions, `styles['font-family']`)

        return { name: name, value: name }
      },
      set (value) {
        this.update('font-family', value.value)
      }
    },

    size: {
      get () {
        let props = 'styles'
        let size = ''

        if (this.isMobile) props = `media['is-mobile']`

        size = _.get(this.settingObjectOptions, `${props}['font-size']`)

        if (size === undefined) size = _.get(this.settingObjectOptions, `styles['font-size']`)

        return _.find(this.sizes, { value: size })
      },
      set (value) {
        this.update('font-size', value.value)
      }
    },

    lineHeight: {
      get () {
        let props = 'styles'
        let s = ''
        let gotLineHeight = ''

        if (this.isMobile) props = `media['is-mobile']`

        s = _.get(this.settingObjectOptions, `${props}['line-height']`)
        gotLineHeight = s

        if (s === undefined) {
          let style = window.getComputedStyle(this.settingObjectElement)
          let lineHeight = parseFloat(style['line-height'])
          let fontSize = parseFloat(style['font-size'])

          gotLineHeight = Math.round((lineHeight / fontSize) * 10) / 10
        }

        return { name: gotLineHeight, value: gotLineHeight }
      },
      set (value) {
        let props = {}
        let styles = {}
        let media = {}

        styles['line-height'] = value.value
        media['is-mobile'] = {}
        media['is-mobile']['line-height'] = styles['line-height']

        this.isMobile ? props = { 'media': media } : props = { 'styles': styles }

        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
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
    },

    changeSize () {
      this.update('font-size', this.size.value)
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
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { pseudo }))

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

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
    }
  },

  created () {
    this.updateProps()
  }
}
</script>

<template>
  <div class="b-typography-controls">
    <div class="b-typography-controls__control">
      <div class="b-typography-controls__control-col b-typography-controls__control-col-font-name">
        <base-select :label="$t('c.font')" :options="fonts.options" v-model="fontName" height="14"></base-select>
      </div>
      <div class="b-typography-controls__control-col">
        <base-select :label="$t('c.size')" :options="sizes" v-model="size" @input="changeSize" height="23"></base-select>
      </div>
      <div class="b-typography-controls__control-col">
        <base-select :label="$t('c.line')" :options="linesHeight" v-model="lineHeight" height="23"></base-select>
      </div>
    </div>
    <div class="b-typography-controls__control" v-if="!isMobile">
      <div class="b-typography-controls__control-col">
        <base-color-picker :label="$t('c.text')" v-model="color" @change="changeColor"></base-color-picker>
      </div>
      <div class="b-typography-controls__control-col b-typography-controls__control-col" v-if="colorTextHover">
        <base-color-picker class="b-picker_color-hover" :label="$t('c.hover')" v-model="colorHover" @change="changeColorHover"></base-color-picker>
      </div>
    </div>
     <div class="b-typography-controls__control">
      <div class="b-typography-controls__control-col" v-if="showTextStyles">
        <BaseButtonTabs :list="style.list" v-model="style.valueMultiple" @change="changeStyle"/>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-typography-controls
  &__control
    display: flex
    justify-content: stretch
    align-items: center

    width: 100%
    margin-top: $size-step/2
    &-col
      flex-basis: 50%
      margin: 0 0 0 $size-step/2
      &-font-name
        flex-basis: 90%
      &:first-child
        margin: 0
</style>
