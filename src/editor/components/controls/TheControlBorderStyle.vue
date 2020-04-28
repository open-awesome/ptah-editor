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
        { name: 'solid', value: 'solid', iconName: 'borderSolid' },
        { name: 'dashed', value: 'dashed', iconName: 'borderDashed' },
        { name: 'dotted', value: 'dotted', iconName: 'borderDotted' },
        { name: 'double', value: 'double', iconName: 'borderDouble' }
      ],
      borderStyleValue: '',
      borderStyleHoverValue: '',
      borderWidthValue: 0,
      borderWidthHoverValue: 0
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

  mounted () {
    let self = this

    this.borderWidth = this.styles['border-width'] ? parseFloat(this.styles['border-width'].split('px')[0]) : 0
    this.borderColor = this.styles['border-color'] ? this.styles['border-color'] : 'rgba(0, 0, 0, 0)'
    this.borderStyle = this.styles['border-style'] ? this.styles['border-style'] : 'solid'

    this.borderWidthHover = this.pseudo['border-width'] ? parseFloat(this.pseudo['border-width'].split('px')[0]) : 0
    this.borderColorHover = this.pseudo['border-color'] ? this.pseudo['border-color'].split('!')[0] : 'rgba(0, 0, 0, 0)'
    this.borderStyleHover = this.pseudo['border-style'] ? this.pseudo['border-style'].split('!')[0] : 'solid'

    this.borderStyleList.forEach(function (item, i) {
      if (self.borderStyle === self.borderStyleList[i].value) {
        self.borderStyleValue = item.value
      }
      if (self.borderStyleHover === self.borderStyleList[i].value) {
        self.borderStyleHoverValue = item.value
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

    changeWidth (value) {
      this.borderWidthValue = value
      this.update('border-width', `${value}px`)
    },

    changeWidthValue (value) {
      this.borderWidth = value
      this.update('border-width', `${value}px`)
    },

    changeWidthHover (value) {
      this.borderWidthHoverValue = value
      this.changePseudo('border-width', `${this.borderWidthHover}px`)
    },

    changeWidthHoverValue (value) {
      this.borderWidthHover = value
      this.update('border-width', `${value}px`)
    },

    update (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    },

    changeStyle () {
      this.update('border-style', this.borderStyleValue)
    },

    changeStyleHover () {
      this.changePseudo('border-style', this.borderStyleHoverValue)
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
<div class="b-panel__control">
  <base-caption>
    Border
  </base-caption>
  <div class="b-panel__col">
    <div class="b-panel__control">
      <div class="b-panel__row">
        <base-label>
          {{ $t('c.style') }}
        </base-label>
        <div class="b-panel__col _m-0">
          <BaseButtonTabs
            type="buttons"
            :list="borderStyleList"
            v-model="borderStyleValue"
            @change="changeStyle"
            color="transparent"
            strokeColor="#A2A5A5"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="b-panel__control">
    <div class="b-panel__col">
      <div class="b-panel__control">
        <base-range-slider
          position-label="left"
          v-model="borderWidth"
          step="1"
          min="0"
          max="16"
          :label="$t('c.width')"
          @change="changeWidth"
        >
          <base-number-input
            :value="borderWidthValue"
            :minimum="0"
            :maximum="16"
            unit="px"
            @input="changeWidthValue"
          />
        </base-range-slider>
      </div>
      <div class="b-panel__control">
        <base-color-picker
          v-model="borderColor"
          @change="changeColor"
          :label="$t('c.color')"
        />
      </div>
    </div>
  </div>
  <base-caption>
    {{ $t('c.borderHover') }}
  </base-caption>
  <div class="b-panel__col">
    <div class="b-panel__control">
      <div class="b-panel__row">
        <base-label>
          {{ $t('c.style') }}
        </base-label>
        <div class="b-panel__col _m-0">
          <BaseButtonTabs
            type="buttons"
            :list="borderStyleList"
            v-model="borderStyleHoverValue"
            @change="changeStyleHover"
            color="transparent"
            strokeColor="#A2A5A5"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="b-panel__control">
    <div class="b-panel__col">
      <div class="b-panel__control">
        <base-range-slider
          position-label="left"
          v-model="borderWidthHover"
          step="1"
          min="0"
          max="16"
          :label="$t('c.width')"
          @change="changeWidthHover"
        >
          <base-number-input
            :value="borderWidthHoverValue"
            :minimum="0"
            :maximum="16"
            unit="px"
            @input="changeWidthHoverValue"
          />
        </base-range-slider>
      </div>
      <div class="b-panel__control">
        <base-color-picker
          v-model="borderColorHover"
          @change="changeColor"
          :label="$t('c.color')"
        />
      </div>
    </div>
  </div>
</div>
</template>
