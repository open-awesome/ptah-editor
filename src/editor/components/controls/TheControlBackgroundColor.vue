<script>
import { mapState } from 'vuex'
import { getPseudoTemplate, randomPoneId } from '../../util'

export default {
  data () {
    return {
      bgColor: '',
      bgColorHover: '',
      label: '',
      labelHover: ''
    }
  },

  created () {
    this.bgColor = this.styles['background-color']

    if (this.settingObjectType !== 'button') {
      this.label = this.$t('c.background')
    } else {
      this.label = this.$t('c.buttonColor')
      this.labelHover = this.$t('c.bgHover')
    }

    if (this.settingObjectType === 'button') {
      const pBackgroundColor = this.pseudo['hover']['background-color'].split('!')[0]
      this.bgColorHover = pBackgroundColor || this.styles['background-color']
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    pseudo () {
      return this.settingObjectOptions.pseudo
    }

  },

  methods: {
    changeColor () {
      const color = this.bgColor.rgba ? `rgba(${Object.values(this.bgColor.rgba).toString()})` : this.bgColor

      this.styles['background-color'] = color
    },

    changeHoverBgColor () {
      const color = this.bgColorHover.rgba ? `rgba(${Object.values(this.bgColorHover.rgba).toString()})` : this.bgColorHover
      this.changePseudo('background-color', color)
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
  <div class="b-bg-controls">
    <div class="b-bg-controls__control">
      <base-color-picker :label="label" v-model="bgColor" @change="changeColor"></base-color-picker>
    </div>
    <div class="b-bg-controls__control" v-if="settingObjectType === 'button'">
      <base-color-picker :label="labelHover" v-model="bgColorHover" @change="changeHoverBgColor"></base-color-picker>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-bg-controls
  margin-top: 2.2rem
  padding: 0 0 $size-step/2
  border-bottom: 0.2rem dotted rgba($black, 0.15)
  &__control
    &:first-child
      margin-bottom: $size-step/2
</style>
