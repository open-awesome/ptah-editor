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
      'settingObjectOptions',
      'settingObjectElement'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    pseudo () {
      return this.settingObjectOptions.pseudo.hover
    }
  },

  created () {
    let self = this

    this.borderWidth = this.styles['border-width'] ? parseFloat(this.styles['border-width'].split('px')[0]) : 0
    this.borderColor = this.styles['border-color'] ? this.styles['border-color'] : 'rgba(0, 0, 0, 0)'
    this.borderStyle = this.styles['border-style'] ? this.styles['border-style'] : 'solid'

    this.borderWidthHover = this.pseudo['border-width'] ? parseFloat(this.pseudo['border-width'].split('px')[0]) : 0
    this.borderColorHover = this.pseudo['border-color'] ? this.pseudo['border-color'].split('!')[0] : 'rgba(0, 0, 0, 0)'
    this.borderStyleHover = this.pseudo['border-style'] ? this.pseudo['border-style'].split('!')[0] : 'solid'

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

    changeColorHover () {
      const color = this.borderColorHover.rgba ? `rgba(${Object.values(this.borderColorHover.rgba).toString()})` : this.borderColorHover

      this.changePseudo('border-color', color)
    },

    changeWidth () {
      this.update('border-width', `${this.borderWidth}px`)
    },

    changeWidthHover () {
      this.changePseudo('border-width', `${this.borderWidthHover}px`)
    },

    update (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    },

    changeStyle () {
      this.update('border-style', this.borderStyleValue.value)
    },

    changeStyleHover () {
      this.changePseudo('border-style', this.borderStyleHoverValue.value)
    },

    changePseudo (attr, style, pseudoClass = 'hover') {
      const poneId = randomPoneId()

      this.updatePseudo(attr, style + '!important', pseudoClass)
      this.settingObjectElement.dataset.pone = poneId

      let styleTemplate = getPseudoTemplate(poneId, this.settingObjectOptions.pseudo)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    },

    updatePseudo (attr, style, pseudoClass = 'hover') {
      let pseudo = {}
      pseudo[pseudoClass] = {}
      pseudo[pseudoClass][attr] = style
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { pseudo }))
    }
  }
}
</script>

<template>
<div class="b-border-style">
  <div class="b-border-style__control">
    <base-label>{{ $t('c.borderStyle') }}</base-label>
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
  <div class="b-border-style__control b-border-style__control_h">
    <base-label>{{ $t('c.borderHover') }}</base-label>
    <div class="b-border-style__color-style">
      <div class="b-border-style__color-style-col">
        <base-color-picker v-model="borderColorHover" @change="changeColorHover" label=""/>
      </div>
      <div class="b-border-style__color-style-col">
        <base-range-slider v-model="borderWidthHover" label="" step="1" min="0" max="16" @change="changeWidthHover">
          {{ borderWidthHover }} <span class="b-border-radius-control__px">px</span>
        </base-range-slider>
      </div>
      <div class="b-border-style__color-style-col">
        <base-select typeItems="class" label="" :options="borderStyleList" v-model="borderStyleHoverValue" @input="changeStyleHover"/>
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
  max-width: 25.5rem
  &__control
    &_h
      margin-top: 1rem
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
         width: 5rem
       .b-range-slider
         padding-left: 1rem
         .range-slider
           width: $size-step * 2
</style>
