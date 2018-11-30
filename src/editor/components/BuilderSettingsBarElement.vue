<template>
  <div class="b-elem-settings">

    <!-- text align -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.aligned">
      <ControlAlign
        :isBox="settingObjectOptions.box"
        @boxAligned="styleChange"
        @textAligned="styleChange">
      </ControlAlign>
    </div>

    <!-- size -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.resizable">
      <control-size :height="elHeight" :width="elWidth" @change="styleChange"></control-size>
    </div>

    <!-- font -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.typography">
      <control-text
        :fontSize="fontSize"
        :fontFamily="fontFamily"
        :fontColor="fontColor"
        :fontStyles="styles"
        @change="styleChange"></control-text>
    </div>

    <!-- background -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.background">
      <control-background :color="bgColor" :image="bgImage" :repeat="bgRepeat" @change="styleChange"></control-background>
    </div>

    <!-- Link -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.hasLink">
      <control-link
        :link="elLink"
        :hoverBgColor="bgHover"
        @setOption="setOption"
        @setPseudo="changePseudoStyle"
        @setClass="selectAnimation"></control-link>
    </div>

    <!-- BOTTOM button -->
    <div class="b-elem-settings__buttons">
      <base-button :color="'light-gray'" @click="deleteElement">Delete</base-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import { getPseudoTemplate, randomPoneId } from '../util'
import ControlAlign from './controls/TheControlAlign'
import ControlText from './controls/TheControlText'
import ControlBackground from './controls/TheControlBackground'
import ControlSize from './controls/TheControlSize'
import ControlLink from './controls/TheControlLink'

export default {
  name: 'BuilderSettingsBarElement',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    ControlAlign,
    ControlText,
    ControlBackground,
    ControlSize,
    ControlLink
  },

  data () {
    return {
      fontSize: null,
      fontFamily: '',
      fontColor: '',
      styles: [],
      bgColor: '',
      bgImage: '',
      bgRepeat: '',
      elHeight: 0,
      elWidth: 0,
      elRadius: 0,
      elLink: '',
      bgHover: '',
      textHover: ''
    }
  },

  created () {
    const styles = this.settingObjectOptions.styles

    /* Get font settings */
    this.fontFamily = styles['font-family'] || ''
    this.fontSize = styles['font-size'] || 1.6
    this.fontColor = styles['color'] || '#000000'

    if (styles['font-style']) {
      this.styles.push({ prop: 'font-style', value: styles['font-style'] })
    }

    if (styles['text-decoration']) {
      this.styles.push({ prop: 'text-decoration', value: styles['text-decoration'] })
    }

    if (styles['font-weight']) {
      this.styles.push({ prop: 'font-weight', value: styles['font-weight'] })
    }

    /* get background */
    if (styles['background-color']) {
      this.bgColor = styles['background-color']
    }
    this.bgImage = styles['background-image'] || ''
    this.bgRepeat = styles['background-repeat'] || 'no-repeat'

    /* Get element size */
    this.elHeight = styles['height'] || 0 // TODO: get el offsetHeight
    this.elWidth = styles['width'] || 0
    this.elRadius = styles['border-radius'] || 0

    /* Link */
    this.elLink = this.settingObjectOptions.href
    this.elTarget = !!this.settingObjectOptions.target

    /* Hover this.settingObjectOptions.pseudo */
    this.bgHover = this.settingObjectOptions.pseudo['background-color'] || ''
    this.textHover = this.settingObjectOptions.pseudo['color'] || ''
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ])
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject'
    ]),

    styleChange (value) {
      this.updateStyle(value[0], value[1])
      if (value[2]) {
        this[value[2]] = value[1]
      }
    },

    updateStyle (prop, value) {
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    },

    setOption (option) {
      let obj = {}
      obj[option[0]] = option[1]
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, obj))
    },

    /**
     * Add style to pseudocalss
     * @param style {object}
     * @param pseudoClass {string}
     */
    changePseudoStyle (style, pseudoClass = 'hover') {
      const poneId = randomPoneId()
      let pseudoClassValue = {}
      pseudoClassValue[pseudoClass] = style
      this.settingObjectOptions.element.dataset.pone = poneId
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { pseudo: pseudoClassValue }))

      let styleTemplate = getPseudoTemplate(poneId, this.settingObjectOptions.pseudo)

      document.head.insertAdjacentHTML('beforeend', styleTemplate)
    },

    /**
     * Add animation to element
     */
    selectAnimation (className) {
      let animations = this.settingObjectOptions.classes.slice(0)

      animations.forEach((name, index) => {
        // remove other animation classes
        if (name.indexOf('ptah-a') > -1) {
          animations.splice(index, 1)
        }
      })
      animations.push(className)

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { classes: animations }))
    },

    deleteElement () {
      let setting = this.settingObjectOptions

      let path = _.split(setting.name, '.')[1] // find path to element
      if (setting.name.indexOf('[') > 0) { // if array element
        path = _.toPath(path)
        this.settingObjectSection.data[path[0]].splice(parseInt(path[1]), 1)
      } else {
        this.settingObjectSection.data[path].text = ''
        this.settingObjectSection.data[path].url = ''
        Object.assign(this.settingObjectSection.data[path].styles, { 'display': 'none' })
        this.setting.element.remove()
      }

      this.clearSettingObject()
    }
  }
}
</script>

<style lang="sass" scoped>
  .b-elem-settings
    height: 100%
    display: flex
    flex-direction: column
    &__control
      margin-bottom: 1.6rem
    &__buttons
      flex-grow: 2
      align-items: flex-end
      display: flex
    /deep/
      .b-base-dropdown
        &.open
          overflow: visible !important
          > div
            overflow: visible !important
</style>
