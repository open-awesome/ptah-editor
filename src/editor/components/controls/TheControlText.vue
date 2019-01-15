<script>
import find from 'lodash-es/find'
import { mapState } from 'vuex'
const LIST_FONTS = [
  'Lato',
  'Montserrat',
  'Heebo',
  'PT Serif'
]

export default {
  props: {
    fontSize: {
      type: [Number, String],
      required: true
    },
    fontFamily: {
      type: String,
      required: true
    },
    fontColor: {
      type: String,
      required: true
    },
    fontStyles: {
      type: Array,
      required: true
    },
    expand: {
      type: Boolean,
      required: true
    },
    isComplexText: {
      type: Boolean
    }
  },

  data () {
    return {
      controlOpen: false,
      fontName: {},
      size: {},
      sizes: [
        { name: '12px', value: 1.2 },
        { name: '14px', value: 1.4 },
        { name: '16px', value: 1.6 },
        { name: '18px', value: 1.8 },
        { name: '20px', value: 2 },
        { name: '24px', value: 2.4 },
        { name: '28px', value: 2.8 },
        { name: '32px', value: 3.2 },
        { name: '36px', value: 3.6 },
        { name: '48px', value: 4.8 },
        { name: '72px', value: 7.2 }
      ],
      color: '',
      style: [
        {
          iconName: 'fontUnderline',
          tooltipText: 'Underline',
          value: { prop: 'text-decoration', value: 'underline', base: 'none' }
        },
        {
          iconName: 'fontItalic',
          tooltipText: 'Italic',
          value: { prop: 'font-style', value: 'italic', base: 'normal' }
        },
        {
          iconName: 'fontBold',
          tooltipText: 'Bold',
          value: { prop: 'font-weight', value: 'bold', base: 'normal' }
        }
      ],
      styles: []
    }
  },

  created () {
    this.fontName = { name: this.fontFamily, value: this.fontFamily }
    this.size = find(this.sizes, { value: parseFloat(this.fontSize) })
    this.color = this.fontColor
    this.styles = this.fontStyles
    this.controlOpen = this.expand
  },

  watch: {
    expand () {
      this.controlOpen = this.expand
    }
  },

  computed: {
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
      this.$emit('change', ['fontFamily', this.fontName.value])

      if (this.isComplexText) {
        this.changeStyleAll('font-family', this.fontName.value)
      }
    },
    changeSize () {
      this.$emit('change', ['font-size', `${this.size.value}rem`])

      if (this.isComplexText) {
        this.changeStyleAll('font-size', `${this.size.value}rem`)
      }
    },
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.$emit('change', ['color', color])

      if (this.isComplexText) {
        this.changeStyleAll('color', color)
      }
    },
    changeStyle () {
      this.style.forEach((style) => {
        if (find(this.styles, style.value)) {
          if (this.isComplexText) {
            this.changeStyleAll(style.value.prop, style.value.value)
          } else {
            this.$emit('change', [style.value.prop, style.value.value])
          }
        } else {
          if (this.isComplexText) {
            this.changeStyleAll(style.value.prop, style.value.base)
          } else {
            this.$emit('change', [style.value.prop, style.value.base])
          }
        }
      })
    },
    onClickTitle () {
      this.$emit('open', ['Font', !this.controlOpen])
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
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header" @click="onClickTitle">
      <span>Text</span> <i :class="{ 'dropped': !controlOpen }"><icon-base name="arrowDropDown" width="8"></icon-base></i>
    </div>
    <base-dropdown :isOpened="controlOpen" :hasOverflow="controlOpen">
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
        <BaseButtonTabs :list="style" v-model="styles" @change="changeStyle"/>
      </div>
    </base-dropdown>
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
