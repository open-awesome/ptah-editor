<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import { FONT_SIZES_LIST, LINES_HEIGHT_LIST } from '../../util'

export default {

  data () {
    return {
      sizes: FONT_SIZES_LIST,
      linesHeight: LINES_HEIGHT_LIST,
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

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        media: media
      }))

      return this.settingObjectOptions.media
    },

    size: {
      get () {
        let props = `table['body']`
        let size = ''

        if (this.isMobile) props = `media['is-mobile']['table']['body']`

        size = _.get(this.settingObjectOptions, `${props}['font-size']`)

        if (size === undefined) size = _.get(this.settingObjectOptions, `table['body']['font-size']`)

        return _.find(this.sizes, { value: size })
      },
      set (value) {
        this.update('font-size', value.value)
      }
    },

    color: {
      get () {
        let props = `table['body']`
        let color = ''

        if (this.isMobile) props = `media['is-mobile']['table']['body']`

        color = _.get(this.settingObjectOptions, `${props}['color']`)

        if (color === undefined) color = _.get(this.settingObjectOptions, `table['body']['color']`)

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

        s = _.get(this.settingObjectOptions, `${props}['line-height']`)

        if (s === undefined) s = _.get(this.settingObjectOptions, `table['body']['line-height']`)

        return { name: s, value: s }
      },
      set (value) {
        this.update('line-height', value.value)
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
        if (_.find(this.style.valueMultiple, style.value)) {
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

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
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
  }
}
</script>

<template>
  <div class="b-table-controls">
    <div class="b-table-controls__head">
      Table body style
    </div>
    <div class="b-table-controls__control">
      <div class="b-table-controls__control-col">
        <base-select :label="$t('c.size')" :options="sizes" v-model="size"></base-select>
      </div>
      <div class="b-table-controls__control-col" >
        <base-select :label="$t('c.line')" :options="linesHeight" v-model="lineHeight" height="23"></base-select>
      </div>
    </div>
    <div class="b-table-controls__control">
      <div class="b-table-controls__control-col">
        <base-color-picker :label="$t('c.text')" v-model="color"></base-color-picker>
      </div>
      <div class="b-table-controls__control-col" v-if="!isMobile">
        <BaseButtonTabs :list="style.list" v-model="style.valueMultiple" @change="changeStyle"/>
      </div>
    </div>
    <div class="b-table-controls__control" v-if="!isMobile">
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
  &__head
    font-size: 1.4rem
    font-weight: bold
    margin-top: $size-step
</style>
