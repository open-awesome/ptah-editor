<script>
import { mapState } from 'vuex'
import find from 'lodash-es/find'
const LIST_FONTS = [
  'Lato',
  'Montserrat',
  'Heebo',
  'PT Serif'
]

export default {
  props: {
    isComplexText: Boolean
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
    this.controlOpen = this.expand
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectSection',
      'settingObjectOptions'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    ...mapState('Sidebar', [
      'settingObjectSection'
    ]),
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
    changeFont () {
      this.styles['font-family'] = this.fontName.value

      if (this.isComplexText) {
        this.changeStyleAll('font-family', this.fontName.value)
      }
    },
    changeSize () {
      this.styles['font-size'] = this.size.value

      if (this.isComplexText) {
        this.changeStyleAll('font-size', `${this.size.value}rem`)
      }
    },
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.styles['color'] = color

      if (this.isComplexText) {
        this.changeStyleAll('color', color)
      }
    },
    changeStyle () {
      this.style.list.forEach((style) => {
        if (find(this.style.valueMultiple, style.value)) {
          if (this.isComplexText) {
            this.changeStyleAll(style.value.prop, style.value.value)
          } else {
            this.styles[style.value.prop] = style.value.value
          }
        } else {
          if (this.isComplexText) {
            this.changeStyleAll(style.value.prop, style.value.base)
          } else {
            this.styles[style.value.prop] = style.value.base
          }
        }
      })
    },
    changeStyleAll (style, value) {
      let data = this.settingObjectSection.data

      for (var key in data) {
        if (key.indexOf('components') !== -1) {
          let components = data[key]

          components.forEach((component, index) => {
            for (var keyEl in component.element.styles) {
              if (keyEl.indexOf(style) !== -1 && keyEl.indexOf('back') === -1) {
                this.settingObjectSection.data[key][index].element.styles[keyEl] = value
              }
            }
          })
        }
      }
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
  <div class="b-text-controls">
    <div class="b-text-controls__control">
      <base-select label="Font" :options="fonts.options" v-model="fontName" @input="changeFont"></base-select>
    </div>
    <div class="b-text-controls__control">
      <base-select label="Font Size" :options="sizes" v-model="size" @input="changeSize"></base-select>
    </div>
    <div class="b-text-controls__control">
      <base-color-picker label="Font color" v-model="color" @change="changeColor"></base-color-picker>
    </div>
    <div class="b-text-controls__control">
      <BaseButtonTabs :list="style.list" v-model="style.valueMultiple" @change="changeStyle"/>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .b-text-controls
    &__header
      font-size: 1.6rem
      height: 3.2rem
      color: #272727
      display: flex
      align-items: center
      cursor: pointer
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__control
      margin-top: 2.2rem
</style>
