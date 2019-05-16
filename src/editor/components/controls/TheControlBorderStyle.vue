<script>
import { mapState, mapActions } from 'vuex'
import { getPseudoTemplate, randomPoneId } from '../../util'
import * as _ from 'lodash-es'

export default {
  data () {
    return {
      borderWidth: 0,
      borderColor: '',
      borderStyle: '',
      borderWidthHover: 0,
      borderColorHover: '',
      borderStyleHover: '',
      borderStyleList: [
        { name: 'solid', value: 'solid' },
        { name: 'dashed', value: 'dashed' },
        { name: 'dotted', value: 'dotted' },
        { name: 'double', value: 'double' }
      ],
      borderStyleValue: {},
      borderStyleHoverValue: {}
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    pseudo () {
      return this.settingObjectOptions.pseudo
    }
  },

  created () {
    let self = this

    this.borderWidth = this.styles['border-width'] ? this.styles['border-width'].split('px')[0] : 0
    this.borderColor = this.styles['border-color'] ? this.styles['border-color'] : 'rgba(0, 0, 0, 0)'
    this.borderStyle = this.styles['border-style'] ? this.styles['border-style'] : 'solid'

    this.borderWidthHover = this.pseudo['border-width'] ? this.pseudo['border-width'] : 0
    this.borderColorHover = this.pseudo['border-color'] ? this.pseudo['border-color'] : 'rgba(0, 0, 0, 0)'
    this.borderStyleHover = this.pseudo['border-style'] ? this.pseudo['border-style'] : 'solid'

    this.borderStyleList.forEach(function (item, i, arr) {
      if (self.borderStyle === self.borderStyleList[i].value) {
        self.borderStyleValue = item
      }
      if (self.borderStyleHover === self.borderStyleList[i].value) {
        self.borderStyleHoverValue = item
      }
    })
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    changeColor () {
      const color = this.borderColor.rgba ? `rgba(${Object.values(this.borderColor.rgba).toString()})` : this.borderColor

      this.update('border-color', color)
    },

    changeWidth () {
      this.update('border-width', `${this.borderWidth}px`)
    },

    update (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    },

    changeStyle () {
      this.update('border-style', this.borderStyleValue.value)
    },

    changeHoverColor () {
      const color = this.borderColorHover.rgba ? `rgba(${Object.values(this.borderColorHover.rgba).toString()})` : this.borderColorHover
      this.changePseudo('border-color', color)
    },

    changePseudo (attr, style, pseudoClass = 'hover') {
      if (style !== '') {
        this.changePseudoStyle(attr, style + '!important')
        this.pseudo[pseudoClass][attr] = style + '!important'
      }
    },

    changePseudoStyle (attr, style, pseudoClass = 'hover') {
      const poneId = randomPoneId()
      this.pseudo[pseudoClass][attr] = style
      this.settingObjectElement.dataset.pone = poneId

      let styleTemplate = getPseudoTemplate(poneId, this.settingObjectOptions.pseudo)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    }
  }
}
</script>

<template>
<div class="b-border-style">
  <div class="b-border-style__control">
    <base-label>Border style</base-label>
    <div class="b-border-style__color-style">
      <div class="b-border-style__color-style-col">
        <base-color-picker v-model="borderColor" @change="changeColor" label=""/>
      </div>
      <div class="b-border-style__color-style-col">
        <base-range-slider v-model="borderWidth" label="" step="1" min="0" max="16" @change="changeWidth">
          {{ borderWidth }} <span class="b-border-radius-control__px">px</span>
        </base-range-slider>
      </div>
      <div class="b-border-style__color-style-col">
        <base-select typeItems="class" label="" :options="borderStyleList" v-model="borderStyleValue" @input="changeStyle"/>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-border-style
  margin-top: 2.2rem
  &__control
  &__px
    color: $grey-middle
  &__color-style
    display: flex
    &-col
      /deep/
       .b-pth-base-select
         width: $size-step * 2
         margin-top: 5px
       .b-pth-base-select__name,
       .b-pth-base-select__options-item
         display: flex
         align-items: center
         white-space: nowrap
       .b-pth-base-select__name-icon
         width: 100%
         height: 10px
       .b-pth-base-select__name-icon-solid
         border: 2px solid #6D6D6D
       .b-pth-base-select__name-icon-dotted
         border: 2px dotted #6D6D6D
       .b-pth-base-select__name-icon-dashed
         border: 2px dashed #6D6D6D
       .b-pth-base-select__name-icon-double
         border: 3px double #6D6D6D
       .b-pth-base-select__name
         width: $size-step * 1.5
         padding: 0

       .b-range-slider__row
         flex-direction: row-reverse
       .b-range-slider__text
         padding-left: 0.5rem
       .b-range-slider
         padding-left: 1rem
         .range-slider
           width: $size-step * 2
</style>
