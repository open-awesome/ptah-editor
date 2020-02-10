<script>
import { mapState, mapActions } from 'vuex'
import { FONT_SIZES_LIST } from '../../util'
import * as _ from 'lodash-es'

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

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        media: media
      }))

      return this.settingObjectOptions.media
    },

    size: {
      get () {
        let props = `textStyles['chapter']`
        let size = ''

        if (this.isMobile) props = `media['is-mobile']['textStyles']['chapter']`

        size = _.get(this.settingObjectOptions, `${props}['font-size']`)

        if (size === undefined) size = _.get(this.settingObjectOptions, `textStyles['chapter']['font-size']`)

        return _.find(this.sizes, { value: size })
      },
      set (value) {
        this.update('font-size', value.value)
      }
    },

    color: {
      get () {
        let props = `textStyles['chapter']`
        let color = ''

        if (this.isMobile) props = `media['is-mobile']['textStyles']['chapter']`

        color = _.get(this.settingObjectOptions, `${props}['color']`)

        if (color === undefined) color = _.get(this.settingObjectOptions, `textStyles['chapter']['color']`)

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

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
    }
  }
}
</script>

<template>
  <div class="b-table-controls">
    <div class="b-table-controls__chapter">
      Chapter style
    </div>
    <div class="b-table-controls__control">
      <div class="b-table-controls__control-col">
        <base-select :label="$t('c.size')" :options="sizes" v-model="size"></base-select>
      </div>
    </div>
    <div class="b-table-controls__control">
      <div class="b-table-controls__control-col">
        <base-color-picker :label="$t('c.text')" v-model="color"></base-color-picker>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-table-controls
  padding: 0 0 $size-step/2
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
