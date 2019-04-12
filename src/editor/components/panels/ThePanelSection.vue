<template>
  <div class="b-section-settings">
    <h6 class="b-section-settings__title">
      {{ settingObjectSection.name }}
    </h6>
    <base-scroll-container backgroundBar="#999" v-if="!isGrouping">
      <div class="b-section-settings__inner">
        <!-- Products Section Controls -->
        <control-section-products
          :expand="expandedProducts"
          @open="onExpand"
          v-if="settingObjectOptions.hasProducts"
        >
        </control-section-products>

        <!-- Font -->
        <div class="b-elem-settings__control" v-if="settingObjectOptions.typography">
          <control-typography
            :fontSize="fontSize"
            :fontFamily="fontFamily"
            :fontColor="fontColor"
            :fontStyles="styles"
            :expand="expandedFont"
            :isComplexText="isComplexText"
            @open="onExpand"
            @change="styleChange"></control-typography>
        </div>

        <div v-if="!isHeader" class="b-section-settings__control">
          <BaseSwitcher label="Full screen height" v-model="fullScreen" @change="setHeight" />
        </div>

        <!-- Header -->
        <div class="b-section-settings__control" v-if="settingObjectOptions.hasHeader">
          <BaseTextField
            v-model="header"
            label="Header"
            @input="updateSimpleValue('header', header)"
          />
        </div>

        <!-- Images Multiple Upload -->
        <div class="b-section-settings__control" v-if="settingObjectOptions.hasMultipleImages">
          <base-uploader
            :value="galleryImages"
            @change="updateGalleryImages"
            label="Images upload"
            multiple/>
          <br>
          <base-range-slider
            v-if="settingObjectSection.name === 'AutoplayCarousel'"
            :value="settingObjectSection.data.mainStyle.swiper.delay"
            :label="`Autoplay slides delay (${settingObjectSection.data.mainStyle.swiper.delay})`"
            @change="changeSwiperDelay"
            step="1000"
            min="1000"
            max="10000"/>
        </div>

        <!-- Form -->
        <div class="b-section-settings__control mailchimp" v-if="settingObjectSection.group === 'Forms'">
          <div v-if="user.mailchimpIntegration && currentLanding.settings.mailchimpList">
            <div class="mailchimp_complete">
              <img src="https://gn831.cdn.stg.gamenet.ru/0/7m0JQ/o_CaMZ6.png" alt="">
              <icon-base name="checkMark" width="40" height="40"></icon-base>
            </div>
            <p>Now emails from this form will be sent to the list:
              <b>{{currentLanding.settings.mailchimpList}}</b>
            </p>
            <p>Change this in <b><router-link :to="mailchimpLink">Integrations Settings</router-link></b></p>
          </div>

          <div v-if="!user.mailchimpIntegration || !currentLanding.settings.mailchimpList">
            <div class="mailchimp_none">
              <img src="https://gn831.cdn.stg.gamenet.ru/0/7m0JQ/o_CaMZ6.png" alt="">
              <icon-base name="close" width="40" height="40"></icon-base>
            </div>
            <p>Change this in <b><router-link :to="mailchimpLink">Integrations Settings</router-link></b></p>
          </div>
        </div>

        <!-- Group -->
        <template v-if="!isLastSection() && !isHeader">
          <div class="b-section-settings__control" v-if="!isSlaveSection()">
            <BaseButton
              :color="'gray'"
              :transparent="true"
              @click="toggleGrouping(true)"
            >
              Group sections
            </BaseButton>
          </div>

          <div class="b-section-settings__control" v-if="isSlaveSection()">
            <BaseButton
              :color="'gray'"
              :transparent="true"
              @click="openSlaveGrouping()"
            >
              Group sections
            </BaseButton>
          </div>
        </template>

      </div>
    </base-scroll-container>

    <div class="b-section-settings__inner" v-if="isGrouping">
      <h3>Grouping</h3>

      <builder-settings-bar-group
        :builder="builder"
        :master="isMasterSection()"
        :slave="isSlaveSection()"
        v-if="isGrouping"></builder-settings-bar-group>

      <BaseButton
        :color="'gray'"
        :transparent="true"
        @click="toggleGrouping(false)"
      >
        Close
      </BaseButton>
    </div>

    <div class="b-section-settings__buttons">
      <base-button :color="'gray'" :transparent="true" @click="deleteSection">Delete</base-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import ControlSectionProducts from './../controls/TheControlSectionProducts.vue'
import ControlText from './../controls/TheControlText'
import ControlTypography from './../controls/TheControlTypography'
import BaseUploader from '../../../components/base/BaseUploader'
import BuilderSettingsBarGroup from './../BuilderSettingsBarGroup'
import IconBase from '../../../components/base/icons/IconBase'

const DEFAULT_COLOR = 'rgba(0,0,0,1)'

function getPickerColor (color) {
  if (typeof color === 'object' && color.hasOwnProperty('rgba')) {
    return `rgba(${Object.values(color.rgba).toString()})`
  }
  return color
}

export default {
  components: {
    IconBase,
    BuilderSettingsBarGroup,
    BaseUploader,
    ControlSectionProducts,
    ControlText,
    ControlTypography
  },
  name: 'BuilderSettingsBarSection',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      fullScreen: false,

      sectionBgColor: '',
      sectionBgUrl: '',
      bgRepeat: '',
      bgSize: '',
      bgAttachment: '',
      list: [
        { text: 'No-repeat', value: 'no-repeat' },
        { text: 'Repeat', value: 'repeat' }
      ],
      sizeList: [
        { text: 'Tile', value: 'cover' },
        { text: 'Fill', value: 'contain' }
      ],

      galleryImages: [],
      backgroundPickers: [],

      /* text styles */
      fontSize: null,
      fontFamily: '',
      fontColor: '',
      expandedFont: false,

      styles: [],
      products: {},
      selectProduct: {},
      expandedProducts: false,

      isComplexText: false
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'sectionsGroups',
      'isGrouping',
      'settingObjectElement'
    ]),

    ...mapState('User', ['user']),
    ...mapState(['currentLanding']),

    bgAttachmentCheckbox: {
      set (value) {
        this.bgAttachment = value ? 'fixed' : 'scroll'
      },
      get () {
        return this.bgAttachment === 'fixed'
      }
    },

    backgroundType () {
      return this.settingObjectOptions.backgroundType
    },

    sectionId () {
      return this.settingObjectSection.id
    },

    isHeader () {
      return this.settingObjectSection.isHeader
    },

    mailchimpLink () {
      return `/editor/${this.$route.params.slug}/settings/integrations/mailchimp`
    }
  },

  created () {
    let styles = this.settingObjectOptions.styles
    let image = (typeof styles['background-image'] === 'string') ? styles['background-image'] : ''
    let bgimage = image.match(/url\((.*?)\)/)

    if (bgimage) {
      bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
    }

    this.sectionBgColor = styles['background-color']
    this.sectionBgUrl = bgimage || ''
    this.bgRepeat = styles['background-repeat'] || 'no-repeat'
    this.bgSize = styles['background-size'] || 'cover'
    this.bgAttachment = styles['background-attachment'] === 'fixed'

    this.header = this.settingObjectOptions.header || ''

    /* Gallery */
    this.galleryImages = this.settingObjectOptions.galleryImages || []

    if (this.settingObjectOptions.classes !== undefined && this.settingObjectOptions.classes.indexOf('full-height') !== -1) {
      this.fullScreen = true
    }

    /* System Requirements */
    this.systemRequirements = this.settingObjectOptions.systemRequirements || {}
    this.rowsRequirements = this.settingObjectOptions.rowsRequirements || {}
    this.selectPlatform = this.settingObjectOptions.selectPlatform || {}

    /* Get font settings */
    this.fontFamily = styles['font-family'] || ''
    this.fontSize = styles['font-size'] || 1.6
    this.fontColor = styles['color'] || '#000000'

    if (styles['font-style']) {
      this.styles.push({ prop: 'font-style', value: styles['font-style'] })
    }

    /* Products */
    this.products = this.settingObjectOptions.products || {}
    this.selectProduct = this.settingObjectOptions.selectProduct || {}
    this.isComplexText = this.settingObjectOptions.hasProducts || false
  },

  watch: {
    'settingObjectOptions.styles': {
      immediate: true,
      handler (value) {
        if (value) {
          let image = (!!value['background-image'] && typeof value['background-image'] === 'string')
            ? value['background-image'] : ''
          let bggradient = image.match(/linear-gradient(\(.*\))/g)
          if (bggradient) {
            this.backgroundPickers = bggradient[0]
              .replace(/^linear-gradient[(]/, '')
              .replace(/[)]$/, '')
              .split(', ')
          } else {
            this.backgroundPickers = [value['background-color']]
          }
        }
      }
    }
  },

  beforeDestroy () {
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject',
      'toggleGrouping',
      'setSettingSection'
    ]),
    ...mapActions('Landing', [
      'saveState'
    ]),

    updateBgColor (value) {
      let settings = this.settingObjectOptions
      let pickers = this.backgroundPickers
      let image = (typeof settings.styles['background-image'] === 'string') ? settings.styles['background-image'] : ''
      let bgimage = image.match(/url\((.*?)\)/)
      let styles = { 'background-color': '' }

      switch (pickers.length) {
        case 0:
          break
        case 1:
          styles['background-color'] = getPickerColor(value)
          styles['background-image'] = (bgimage) ? bgimage[0] : ''
          break
        default:
          let colors = pickers.filter(Boolean).map(getPickerColor)
          if (colors.length) {
            let mappedColor = [...colors.splice(0, 1), ...(colors || []).map(c => ` ${c}`)]
            let gradient = `linear-gradient(${mappedColor})`
            if (bgimage) {
              bgimage = bgimage[0].replace(/^url[(]/, '').replace(/[)]$/, '')
            }
            styles['background-image'] = (bgimage) ? (bgimage + `, ${gradient}`) : gradient
          }
          break
      }

      this.updateSettingOptions(_.merge({}, settings, { styles }))
    },

    updateBgUrl (value) {
      this.sectionBgUrl = value || ''
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-image': `url(${this.sectionBgUrl})`
        }
      }))
    },

    changeRepeat () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-repeat': this.bgRepeat
        }
      }))
    },

    changeSize () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-size': this.bgSize
        }
      }))
    },

    changeAttachment () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-attachment': this.bgAttachment ? 'fixed' : 'scroll'
        }
      }))
    },

    deleteSection () {
      // update group
      if (this.isSlaveSection()) {
        let master = _.find(this.sectionsGroups, o => o.children.indexOf(this.sectionId) > -1).main
        let absorb = master.data.mainStyle.absorb
        master.set('$sectionData.mainStyle', _.merge({}, master.data.mainStyle, { absorb: absorb - 1 }))
      }

      this.builder.remove(this.settingObjectSection)
      this.saveState(this.builder.export('JSON'))
      this.clearSettingObject()
    },

    setHeight () {
      if (this.fullScreen) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { classes: ['full-height'] }))
      } else {
        let classesObj = this.settingObjectOptions.classes
        classesObj.splice(classesObj.indexOf('full-height'), 1)
      }
    },

    updateSimpleValue (propName, value) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { [propName]: value })
      )
    },

    updateGalleryImages (galleryImages) {
      this.updateSettingOptions({
        ..._.cloneDeep(this.settingObjectOptions),
        galleryImages
      })
    },

    changeSwiperDelay (delay) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, {
          swiper: { delay }
        })
      )
    },

    addBackgroundPicker () {
      this.backgroundPickers.push(DEFAULT_COLOR)
      this.updateBgColor()
    },

    removeBackgroundPicker (index) {
      this.backgroundPickers.splice(index, 1)
      this.updateBgColor()
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

    onExpand (value) {
      const accordeon = ['Font', 'SystemRequirements', 'Products']
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
    },

    toggleBackgroundType (value) {
      let backgroundType = (value) ? 'video' : 'default'
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { backgroundType })
      )
    },

    uploadVideo (url) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { backgroundVideo: url || null })
      )
      // --- update video player
      document.querySelectorAll('video[id^="bg-video"]').forEach(video => {
        video.pause()
        video.load()
        video.play()
      })
    },

    isMasterSection () {
      return !!_.find(this.sectionsGroups, o => o.main.id === this.sectionId)
    },

    isSlaveSection () {
      return !!_.find(this.sectionsGroups, o => o.children.indexOf(this.sectionId) > -1)
    },

    isLastSection () {
      return _.last(this.builder.sections) === this.settingObjectSection
    },

    /*
     * Show master section grouping settings
     */
    openSlaveGrouping () {
      let masterId = _.find(this.sectionsGroups, o => o.children.indexOf(this.sectionId) > -1).main.id
      let masterSection = _.find(this.builder.sections, o => o.id === masterId)

      this.clearSettingObject()
      this.setSettingSection(masterSection)
      this.toggleGrouping(true)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-section-settings
  display: flex
  flex-direction: column
  align-items: stretch
  padding-bottom: 4.5rem
  width: 100%
  &__title
    min-width: 28rem
    margin: 0 0 2.8rem 0
    padding: 0
    color: #272727
    font-size: 1.8rem
    font-weight: bold
    &:first-letter
      text-transform: uppercase
    &.subtitle
      color: rgba(39, 39, 39, 0.5)
      font-size: 1.4rem
      font-weight: normal
      margin: 0 0 1rem
  &__control
    margin-top: 2.2rem
  &__group
    border-bottom: 0.2rem dotted rgba($black, 0.15)
    padding-bottom: 2.4rem
  &__inner
    padding-right: 2.5rem
    padding-bottom: 10rem
  &__buttons
    position: absolute
    bottom: 1rem
    left: 1rem
    right: 1rem
    button
      margin: 0 auto
      max-width: 100%
      display: block
  &__control
    margin-bottom: 2rem

  &__description
    font-size: 1.4rem
    line-height: 1.7rem
    color: #747474
    margin-bottom: 2rem
    margin-top: -1rem
  .vue-scrollbar__wrapper
    margin: 0
  .picker
    &__label
      display: flex
      align-items: center
      cursor: pointer
      margin: 1.6rem 0
      i
        margin-left: 5px
        margin-bottom: -5px
        transform: rotate(180deg)
        &.dropped
          transform: rotate(0deg)
    &__buttons
      position: absolute
      bottom: 1rem
      left: 1rem
      right: 1
      button
        max-width: 100%
    &__control
      margin-bottom: 2rem
      &--video
        display: flex
        align-items: center
        justify-content: space-between
        line-height: 1.5
        .b-base-label
          display: inline-block
          max-width: 18rem
          padding: .6rem .2rem .4rem 0
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
    &__description
      font-size: 1.4rem
      line-height: 1.7rem
      color: #747474
      margin-bottom: 2rem
      margin-top: -1rem
      justify-content: space-between

    &__button
      width: 3rem
      padding: .4rem
      line-height: 1

    &__item
      display: flex
      align-items: baseline
      justify-content: space-between
      .b-picker + .picker__button
        margin-left: 1rem
      ~ .picker__item
        margin-top: .4rem

.mailchimp
  p
    padding: 1rem 0
  &_complete
    display: flex
    align-items: center
    img
      margin-right: 2rem
    svg
      fill: $emerald-green
  &_none
    display: flex
    align-items: center
    img
      margin-right: 2rem
    svg
      fill: red
</style>
