<script>
import { mapState, mapActions } from 'vuex'
import { getPseudoTemplate, randomPoneId } from '../../util'
import { find, merge } from 'lodash-es'
const LIST_FONTS = [
  'Lato',
  'Montserrat',
  'Heebo',
  'PT Serif'
]

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
      fontName: {},
      size: {},
      sizes: [
        { name: '12px', value: '1.2rem' },
        { name: '14px', value: '1.4rem' },
        { name: '16px', value: '1.6rem' },
        { name: '18px', value: '1.8rem' },
        { name: '20px', value: '2rem' },
        { name: '24px', value: '2.4rem' },
        { name: '28px', value: '2.8rem' },
        { name: '32px', value: '3.2rem' },
        { name: '36px', value: '3.6rem' },
        { name: '48px', value: '4.8rem' },
        { name: '56px', value: '5.6rem' },
        { name: '64px', value: '6.4rem' },
        { name: '72px', value: '7.2rem' }
      ],
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

  created () {
    this.fontName = { name: this.styles['font-family'], value: this.styles['font-family'] }
    this.size = find(this.sizes, { value: this.styles['font-size'] })
    this.color = this.styles['color']
    if (this.colorTextHover) this.colorHover = this.pseudo['hover']['color']
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectSection',
      'settingObjectElement',
      'settingObjectOptions'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    pseudo () {
      return this.settingObjectOptions.pseudo
    },

    fonts () {
      const options = LIST_FONTS.map((font) => {
        return { name: font, value: font }
      })
      return {
        options
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeFont () {
      this.styles['font-family'] = this.fontName.value
    },

    changeSize () {
      this.styles['font-size'] = this.size.value
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
          this.styles[style.value.prop] = style.value.value
        } else {
          this.styles[style.value.prop] = style.value.base
        }
      })
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
      if (this.styles[key] !== this.temp[key].base) {
        this.style.valueMultiple.push(this.temp[key])
      }
    }
  }
}
</script>

<template>
  <div class="b-typography-controls">
    <div class="b-typography-controls__control">
      <div class="b-typography-controls__control-col b-typography-controls__control-col-font-name">
        <base-select label="Font" :options="fonts.options" v-model="fontName" @input="changeFont" height="14"></base-select>
      </div>
      <div class="b-typography-controls__control-col">
        <base-select label="Size" :options="sizes" v-model="size" @input="changeSize" height="23"></base-select>
      </div>
    </div>
    <div class="b-typography-controls__control">
      <div class="b-typography-controls__control-col">
        <base-color-picker label="Text" v-model="color" @change="changeColor"></base-color-picker>
      </div>
      <div class="b-typography-controls__control-col b-typography-controls__control-col" v-if="colorTextHover">
        <base-color-picker class="b-picker_color-hover" label="Hover" v-model="colorHover" @change="changeColorHover"></base-color-picker>
      </div>
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
  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
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
