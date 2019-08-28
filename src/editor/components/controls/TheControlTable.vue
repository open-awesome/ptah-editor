<script>
import { mapState, mapActions } from 'vuex'
import { find, merge } from 'lodash-es'
import { FONT_SIZES_LIST, LINES_HEIGHT_LIST, FONTS_LIST } from '../../util'

export default {

  data () {
    return {
      fontName: {},
      size: {},
      sizes: FONT_SIZES_LIST,
      linesHeight: LINES_HEIGHT_LIST,
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
      temp: {},
      bgColor: ''
    }
  },

  created () {
    this.fontName = { name: this.table.head['font-family'], value: this.table.head['font-family'] }
    this.size = find(this.sizes, { value: this.table.head['font-size'] })
    this.color = this.table.head['color']
    this.bgColor = this.table.head['background-color']
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectSection',
      'settingObjectOptions'
    ]),

    table () {
      return this.settingObjectOptions.table
    },

    fonts () {
      const options = FONTS_LIST.map((font) => {
        return { name: font, value: font }
      })
      return {
        options
      }
    },

    lineHeight: {
      get () {
        return { name: this.table.head['line-height'] || 1.4, value: this.table.head['line-height'] || 1.4 }
      },
      set (value) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          table: {
            head: { 'line-height': value.value }
          }
        }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeFont () {
      this.table.head['font-family'] = this.fontName.value
    },
    changeSize () {
      this.table.head['font-size'] = this.size.value
    },
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color

      this.table.head['color'] = color
    },
    changeBgColor () {
      const color = this.bgColor.rgba ? `rgba(${Object.values(this.bgColor.rgba).toString()}` : this.color

      this.table.head['background-color'] = color
    },
    changeStyle () {
      this.style.list.forEach((style) => {
        if (find(this.style.valueMultiple, style.value)) {
          this.table.head[style.value.prop] = style.value.value
        } else {
          this.table.head[style.value.prop] = style.value.base
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
      if (this.table.head[key] !== this.temp[key].base) {
        this.style.valueMultiple.push(this.temp[key])
      }
    }
  }
}
</script>

<template>
  <div class="b-table-controls">
    <div class="b-table-controls__chapter">
      Table header style
    </div>
    <div class="b-table-controls__control">
      <div class="b-table-controls__control-col b-table-controls__control-col-font-name">
        <base-select label="Font" :options="fonts.options" v-model="fontName" @input="changeFont"></base-select>
      </div>
      <div class="b-table-controls__control-col">
        <base-select label="Size" :options="sizes" v-model="size" @input="changeSize"></base-select>
      </div>
      <div class="b-table-controls__control-col">
        <base-select label="Line" :options="linesHeight" v-model="lineHeight" height="23"></base-select>
      </div>
    </div>
    <div class="b-table-controls__control">
      <div class="b-table-controls__control-col">
        <base-color-picker label="Text color" v-model="color" @change="changeColor"></base-color-picker>
      </div>
      <div class="b-table-controls__control-col">
        <BaseButtonTabs :list="style.list" v-model="style.valueMultiple" @change="changeStyle"/>
      </div>
    </div>
    <div class="b-table-controls__control">
      <base-color-picker label="Header background color" v-model="bgColor" @change="changeBgColor"></base-color-picker>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-table-controls
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
  &__chapter
    font-size: 1.4rem
    font-weight: bold
    margin-top: $size-step
</style>
