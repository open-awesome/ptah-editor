<template>
  <div class="b-elem-settings">

    <!-- Timer -->
    <builder-settings-bar-element-timer
        v-if="settingObjectOptions.timer"
        :timer="settingObjectOptions.timer"/>

    <base-scroll-container
        v-show="!settingObjectOptions.timer"
        backgroundBar="#999">

      <div class="b-elem-settings__inner">

        <!-- Text -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.isTextEdit">
          <control-text/>
        </div>

        <!-- Typography -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.typography">
          <control-typegraphy/>
        </div>

        <!-- Text align -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.aligned">
          <control-align
            :isBox="settingObjectOptions.box"
            :alignText="settingObjectOptions.styles['text-align']"
            :alignFlex="settingObjectOptions.styles['justify-content']"
            @boxAligned="styleChange"
            @textAligned="styleChange">
          </control-align>
        </div>

        <!-- background -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.background">
          <control-background-color/>
        </div>
        <div class="b-elem-settings__control" v-if="settingObjectOptions.background">
          <control-background-image/>
        </div>

        <!-- Size -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.resizable">
          <control-size
            :height="elHeight"
            :width="elWidth"
            @change="styleChange"
            >
          </control-size>
        </div>

        <!-- Border radius -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.shape">
          <control-border-radius/>
        </div>

        <!-- Hover animation -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.isHoverAnim">
          <control-hover-animation/>
        </div>

        <!-- Link -->
        <!--div class="b-elem-settings__control" v-if="settingObjectOptions.hasLink">
          <control-link :builder="builder" :expand="expandedLink" @open="onExpand"/>
        </div-->

        <!-- Available Platforms Control-->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.hasPlatforms">
          <control-available-platforms
            :expand="expandedAvailablePlatforms"
            @open="onExpand"
            >
          </control-available-platforms>
        </div>

        <!-- Age Restrictions Control-->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.hasRestrictions">
          <control-age-restrictions
            :expand="expandedAgeRestrictions"
            @open="onExpand"
            >
          </control-age-restrictions>
        </div>

        <!-- Social Networks Control-->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.hasNetworks">
          <control-social-networks
            :expand="expandedSocialNetworks"
            @open="onExpand"
            >
          </control-social-networks>
        </div>

        <!-- Text With Icon-->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.isIconWithText">
          <control-icon-with-text
            :expand="expandedIconWithText"
            @open="onExpand"
            >
          </control-icon-with-text>
        </div>

        <!-- Video -->
        <div v-if="settingObjectOptions.hasVideo" class="b-elem-settings__control">
          <control-video
              :src="settingObjectOptions.src"
              :expand="expandedVideo"
              @toggle="onExpand"
              @change="changeVideoSrc"/>
        </div>

      </div>
    </base-scroll-container>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

import BuilderSettingsBarElementTimer from './BuilderSettingsBarElementTimer'

import ControlAlign from './controls/TheControlAlign'
import ControlText from './controls/TheControlText'
import ControlTypegraphy from './controls/TheControlTypegraphy'
import ControlBackground from './controls/TheControlBackground'
import ControlBackgroundColor from './controls/TheControlBackgroundColor'
import ControlBackgroundImage from './controls/TheControlBackgroundImage'
import ControlSize from './controls/TheControlSize'
import ControlLink from './controls/TheControlLink'
// control for new elements
import ControlAvailablePlatforms from './controls/TheControlAvailablePlatforms'
import ControlAgeRestrictions from './controls/TheControlAgeRestrictions'
import ControlSocialNetworks from './controls/TheControlSocialNetworks'
import ControlIconWithText from './controls/TheControlIconWithText'
import ControlVideo from './controls/TheControlVideo'
import ControlBorderRadius from './controls/TheControlBorderRadius'
import ControlHoverAnimation from './controls/TheControlHoverAnimation'

export default {
  name: 'BuilderSettingsBarElement',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    BuilderSettingsBarElementTimer,
    ControlAlign,
    ControlText,
    ControlTypegraphy,
    ControlBackground,
    ControlBackgroundColor,
    ControlBackgroundImage,
    ControlSize,
    ControlLink,
    ControlAvailablePlatforms,
    ControlAgeRestrictions,
    ControlSocialNetworks,
    ControlIconWithText,
    ControlVideo,
    ControlBorderRadius,
    ControlHoverAnimation
  },

  data () {
    return {
      index: null,
      fontSize: null,
      animation: '',
      classes: [],
      fontFamily: '',
      fontColor: '',
      elStyles: [],
      styles: {},
      bgColor: '',
      bgImage: '',
      bgRepeat: '',
      bgSize: '',
      elHeight: 0,
      elWidth: 0,
      elRadius: 0,
      elVideoLink: '',
      elLink: {},
      bgHover: '',
      textHover: '',
      expandedSize: false,
      expandedFont: false,
      expandedBg: false,
      expandedLink: false,
      expandedAvailablePlatforms: true,
      expandedAgeRestrictions: true,
      expandedSocialNetworks: true,
      expandedIconWithText: true,
      expandedVideo: true,
      colorFill: {},
      sizeIcons: {},
      availablePlatforms: {},
      ageRestrictions: {},
      socialNetworks: {},
      settings: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'settingObjectType',
      'settingObjectElement'
    ]),
    // find path to element
    path () {
      let path = _.split(this.settingObjectOptions.name, '.')[1]
      return _.toPath(path)
    }
  },

  created () {
    const styles = this.settingObjectOptions.styles

    /* Get font settings */
    this.fontFamily = styles['font-family'] || 'lato'
    this.fontSize = styles['font-size'] || '1.6rem'
    this.fontColor = styles['color'] || '#000'

    if (styles['font-style']) {
      this.elStyles.push({ prop: 'font-style', value: styles['font-style'], base: 'normal' })
    }

    if (styles['text-decoration']) {
      this.elStyles.push({ prop: 'text-decoration', value: styles['text-decoration'], base: 'none' })
    }

    if (styles['font-weight']) {
      this.elStyles.push({ prop: 'font-weight', value: styles['font-weight'], base: 'normal' })
    }

    /* Get align */
    if (styles['text-align']) {
      this.elStyles.push({ prop: 'text-align', value: styles['text-align'] })
    }
    if (styles['justify-content']) {
      this.elStyles.push({ prop: 'justify-content', value: styles['justify-content'] })
    }

    /* Get background */
    if (styles['background-color']) {
      this.bgColor = styles['background-color']
    }
    this.bgImage = styles['background-image'] || ''
    this.bgRepeat = styles['background-repeat'] || ''
    this.bgSize = styles['background-size'] || ''

    /* Get element size */
    this.elHeight = styles['height'] || this.settingObjectElement.offsetHeight
    this.elWidth = styles['width'] || this.settingObjectElement.offsetWidth
    this.elRadius = styles['border-radius'] || 0

    /* Link */
    this.elLink = this.settingObjectOptions.link || {}

    /* Animation */
    this.animation = this.settingObjectOptions.animation || {}

    /* Animation */
    this.classes = this.settingObjectOptions.classes || []

    /* Video */
    this.elVideoLink = this.settingObjectOptions.video || '' // YuoTube video ID

    /* Hover this.settingObjectOptions.pseudo */
    this.pseudo = this.settingObjectOptions.pseudo || {}

    /* Available platforms */
    this.availablePlatforms = this.settingObjectOptions.availablePlatforms || {}

    /* Social networks */
    this.socialNetworks = this.settingObjectOptions.socialNetworks || {}
    this.settings = this.settingObjectOptions.settings || {}

    /* Color for svg icons */
    this.colorFill = this.settingObjectOptions.colorFill || {}

    /* Size icons */
    this.sizeIcons = this.settingObjectOptions.sizeIcons || {}

    /* Age restrictions */
    this.ageRestrictions = this.settingObjectOptions.ageRestrictions || {}

    /* Styles */
    this.styles = this.settingObjectOptions.styles || {}

    // --- expand dropdown dep. by type
    this.expandDropdown(this.settingObjectType)
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject'
    ]),

    expandDropdown (type) {
      this.expandedSize = (type === 'delimiter')
      this.expandedFont = ['text', 'title'].includes(type)
      this.expandedBg = ['image', 'galleryItem', 'product'].includes(type)
      this.expandedLink = (type === 'button')
      this.expandedAvailablePlatforms = (type === 'available')
      this.expandedAgeRestrictions = (type === 'restrictions')
      this.expandedSocialNetworks = ['networks', 'socials'].includes(type)
    },

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

    changeVideoSrc (value) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { src: value })
      )
    },

    setOption (option) {
      this.updateText()
      let obj = {}
      obj[option[0]] = option[1]
      let merge = _.merge({}, this.settingObjectOptions, obj)
      delete merge.element
      this.updateSettingOptions(merge)
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

    onExpand (value) {
      const accordeon = ['Size', 'Font', 'Bg', 'Link', 'AvailablePlatforms', 'AgeRestrictioins', 'SocialNetworks', 'IconWithText']
      const prop = `expanded${value[0]}`
      this[prop] = value[1]

      if (value[1]) {
        accordeon.forEach((item) => {
          if (item !== value[0]) {
            this[`expanded${item}`] = false
          }
        })
      }
    },

    updateText () {
      // TODO: Lost 'settingObjectOptions' from the store at the time of execution 'beforeDestroy'.
      // Text also saved at VuseStyler -> hideStyler
      if (this.settingObjectElement) {
        const el = this.settingObjectElement
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { text: el.innerHTML }))
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-elem-settings
  padding-bottom: 4.5rem
  display: flex
  flex-direction: column
  height: auto
  width: 100%
  align-items: stretch

  &__inner
    min-width: 24rem
    padding: 0 2.4rem

  &__control
    margin-bottom: 1.6rem

// TODO: временное решение для кнопок сортировки
.temp-sort-buttons
  button
    width: 8rem
</style>
