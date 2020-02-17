<template>
<div class="b-section-settings">
  <base-scroll-container backgroundBar="#999" v-if="!isGrouping">
    <div class="b-section-settings__inner">
      <div class="b-section-settings__control">
        <control-section-layouts :builder="builder"></control-section-layouts>
      </div>

      <!-- System requirements -->
      <control-system-requirements
        :expand="expandedSystemRequirements"
        v-if="settingObjectOptions.hasSystemRequirements"
      >
      </control-system-requirements>

      <!-- Products Section Controls -->
      <control-section-products
        :expand="expandedProducts"
        v-if="settingObjectOptions.hasProducts"
      >
      </control-section-products>

      <div v-if="!isHeader" class="b-section-settings__control">
        <div class="b-section-settings__header">
          <span>Heights</span>
        </div>
        <base-label>Full screen height</base-label>
        <BaseSwitcher v-model="fullScreen" @change="setHeight" />
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
      </div>

      <!-- Group -->
      <template v-if="!isLastSection()">
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
import ControlSectionProducts from './controls/TheControlSectionProducts.vue'
import ControlSystemRequirements from './controls/TheControlSystemRequirements.vue'
import ControlSectionLayouts from './controls/TheControlSectionLayouts.vue'
import BuilderSettingsBarGroup from './BuilderSettingsBarGroup'

export default {
  components: {
    BuilderSettingsBarGroup,
    ControlSectionProducts,
    ControlSystemRequirements,
    ControlSectionLayouts
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

      galleryImages: [],
      backgroundPickers: [],

      /* vars for control system requirements */
      systemRequirements: {},
      rowsRequirements: {},
      selectPlatform: {},
      expandedSystemRequirements: true,

      /* text styles */
      fontSize: null,
      fontFamily: '',
      fontColor: '',
      expandedFont: true,

      styles: [],
      products: {},
      selectProduct: {},
      expandedProducts: true
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

    sectionId () {
      return this.settingObjectSection.id
    },

    isHeader () {
      return this.settingObjectSection.isHeader
    }
  },

  created () {
    let styles = this.settingObjectOptions.styles

    /* Section is Header */
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
    this.fontSize = styles['font-size'] || 1.6
    this.fontColor = styles['color'] || '#000000'

    if (styles['font-style']) {
      this.styles.push({ prop: 'font-style', value: styles['font-style'] })
    }

    /* Products */
    this.products = this.settingObjectOptions.products || {}
    this.selectProduct = this.settingObjectOptions.selectProduct || {}
  },

  beforeDestroy () {
    //
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions',
      'clearSettingObject',
      'toggleGrouping',
      'setSettingSection',
      'clearSettingObject'
    ]),
    ...mapActions('Landing', [
      'saveState'
    ]),

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

    updateText () {
      // TODO: Lost 'settingObjectOptions' from the store at the time of execution 'beforeDestroy'.
      // Text also saved at VuseStyler -> hideStyler
      if (this.settingObjectElement) {
        const el = this.settingObjectElement
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { text: el.innerHTML }))
      }
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
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-section-settings
  display: flex
  flex-direction: column
  align-items: stretch
  padding-bottom: 4.5rem
  width: 100%
  &-header
    font-size: 1.6rem
    color: #272727
    display: flex
    align-items: center
    cursor: pointer
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
  &__control
    margin-top: $size-step/2
  &__inner
    padding: 0 2.4rem
  &__buttons
    position: absolute
    bottom: 1rem
    left: 1rem
    right: 1rem
    button
      margin: 0 auto
      max-width: 100%
      display: block

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
</style>
