<template>
  <div class="b-elem-settings">
    <!-- text align -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.aligned">
      <control-align
        :isBox="settingObjectOptions.box"
        @boxAligned="styleChange"
        @textAligned="styleChange">
      </control-align>
    </div>

    <!-- size -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.resizable">
      <control-size :height="elHeight" :width="elWidth" :expand="expanded.size" @open="onExpand" @change="styleChange"></control-size>
    </div>

    <!-- font -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.typography">
      <control-text
        :fontSize="fontSize"
        :fontFamily="fontFamily"
        :fontColor="fontColor"
        :fontStyles="styles"
        :expand="expanded.font"
        @open="onExpand"
        @change="styleChange"></control-text>
    </div>

    <!-- background -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.background">
      <control-background
        :color="bgColor"
        :image="bgImage"
        :repeat="bgRepeat"
        :size="bgSize"
        :expand="expanded.bg"
        @open="onExpand"
        @change="styleChange"></control-background>
    </div>

    <!-- Link -->
    <div class="b-elem-settings__control" v-if="settingObjectOptions.hasLink">
      <control-link
        :link="elLink"
        :hoverBgColor="bgHover"
        :expand="expanded.link"
        @open="onExpand"
        @setOption="setOption"
        @setPseudo="changePseudoStyle"
        @setClass="selectAnimation"></control-link>
    </div>

    <!-- sort -->
    <div class="b-elem-settings__control temp-sort-buttons" v-if="isArrayEl">
      <base-button color="light-gray" @click="sort('up')" size="middle" v-if="!isFirstInArray">Up</base-button>
      <base-button color="light-gray" @click="sort('down')" size="middle" v-if="!isLastInArray">Down</base-button>
    </div>

    <!-- Title -->
    <template v-if="settingObjectOptions.hasVideo">
      <div class="b-elem-settings__control">
        <BaseTextField
          v-model="title"
          label="Title"
          @input="updateSimpleValue('title', title)"
        />
      </div>

      <!-- VideoUrl -->
      <div class="b-elem-settings__control">
        <BaseUploadInput
          v-model="videoUrl"
          label="Video URL"
          @upload="updateSimpleValue('videoUrl', videoUrl)"
        />
      </div>

      <div class="b-elem-settings__description">
        YouTube video url or any mp4 file url is allowed.<br>
        To play the video please use Preview button.
      </div>
    </template>

    <!-- BOTTOM button -->
    <div class="b-elem-settings__buttons">
      <base-button
        v-if="settingObjectOptions.removable"
        color="light-gray"
        @click="deleteElement"
      >Delete</base-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import { getPseudoTemplate, randomPoneId, correctArray } from '../util'
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
      bgSize: '',
      elHeight: 0,
      elWidth: 0,
      elRadius: 0,
      elLink: '',
      bgHover: '',
      textHover: '',
      title: '',
      videoUrl: '',
      expanded: {
        size: false,
        font: false,
        bg: false,
        link: false
      }
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ]),
    // find path to element
    path () {
      let path = _.split(this.settingObjectOptions.name, '.')[1]
      return _.toPath(path)
    },

    isArrayEl () {
      return this.settingObjectOptions.name.indexOf('[') > 0
    },

    isFirstInArray () {
      return Object.keys(this.settingObjectSection.data[this.path[0]]).indexOf(this.path[1]) === 0
    },

    isLastInArray () {
      const els = Object.keys(this.settingObjectSection.data[this.path[0]])
      return els.indexOf(this.path[1]) === (els.length - 1)
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
    this.bgSize = styles['background-size'] || 'cover'

    /* Get element size */
    this.elHeight = styles['height'] || this.settingObjectOptions.element.offsetWidth
    this.elWidth = styles['width'] || this.settingObjectOptions.element.offsetHeight
    this.elRadius = styles['border-radius'] || 0

    /* Link */
    this.elLink = this.settingObjectOptions.href || ''
    this.elTarget = !!this.settingObjectOptions.target

    /* Hover this.settingObjectOptions.pseudo */
    this.bgHover = this.settingObjectOptions.pseudo['background-color'] || ''
    this.textHover = this.settingObjectOptions.pseudo['color'] || ''

    /* Video */
    this.title = this.settingObjectOptions.title
    this.videoUrl = this.settingObjectOptions.videoUrl
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject'
    ]),

    styleChange (value) {
      this.updateStyle(_.kebabCase(value[0]), value[1])
      this[value[0]] = value[1]
    },

    updateStyle (prop, value) {
      this.updateText()
      let styles = {}
      styles[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { styles }))
    },

    updateSimpleValue (propName, value) {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        [propName]: value
      }))
    },

    setOption (option) {
      this.updateText()
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
      this.updateText()

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
      this.updateText()

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
    },

    sort (direction) {
      this.updateText()

      let container = this.path[0]
      let index = parseInt(this.path[1])
      let newIndex = null

      if (direction === 'up') {
        newIndex = index - 1
      } else {
        newIndex = index + 1
      }

      if (newIndex >= 0 && newIndex < this.settingObjectSection.data[container].length) {
        correctArray(this.settingObjectSection.data[container], [index, newIndex])
        correctArray(this.settingObjectSection.schema[container], [index, newIndex])
      }
    },

    onExpand (value) {
      this.expanded[value[0]] = value[1]

      if (value[1]) {
        for (let key in this.expanded) {
          if (key !== value[0]) {
            this.expanded[key] = false
          }
        }
      }
    },

    updateText () {
      // TODO: Lost 'settingObjectOptions' from the store at the time of execution 'beforeDestroy'.
      // Text also saved at VuseStyler -> hideStyler
      if (this.settingObjectOptions.element) {
        const el = this.settingObjectOptions.element
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { text: el.innerHTML }))
      }
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
    &__description
      font-size: 1.4rem
      line-height: 1.7rem
      color: #747474
      margin-bottom: 1.6rem
    &__buttons
      flex-grow: 2
      align-items: flex-end
      display: flex
  // TODO: временное решение для кнопок сортировки
  .temp-sort-buttons
    button
      width: 8rem
</style>
