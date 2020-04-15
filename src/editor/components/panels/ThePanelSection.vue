<template>
  <div class="b-panel">
    <h6 class="b-panel__title b-panel__title_name-section">
      <span>
        {{ settingObjectSection.name }}
      </span>
    </h6>
    <base-scroll-container backgroundBar="#999" v-if="!isGrouping">
      <div class="b-panel__inner">

        <div class="b-panel__platform" v-if="isMobile">
          <IconBase name="platformMobile" />
        </div>
        <div class="b-panel__platform" v-if="!isMobile">
          <IconBase name="platformDesktop" />
        </div>

        <div class="b-section-settings__control" v-if="!isHeader && !isMobile">
          <control-section-height />
        </div>

        <div class="b-section-settings__control" v-if="isHeader">
          <control-section-sticky />
        </div>

        <div class="b-section-settings__control">
          <control-box />
        </div>

      </div>
    </base-scroll-container>

    <div class="b-panel__inner" v-if="isGrouping">
      <h3>Grouping</h3>

      <builder-settings-bar-group
        :builder="builder"
        :master="isMasterSection()"
        :slave="isSlaveSection()"
        v-if="isGrouping"
      />

      <BaseButton
        :color="'gray'"
        :transparent="true"
        @click="toggleGrouping(false)"
      >
        Close
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import ControlSectionHeight from './../controls/TheControlSectionHeight'
import BaseUploader from '../../../components/base/BaseUploader'
import BuilderSettingsBarGroup from './../BuilderSettingsBarGroup'
import IconBase from '../../../components/base/icons/IconBase'
import ControlBox from './../controls/TheControlBox'
import { resetIndents } from '@editor/util'
import TheControlCarousel from '../controls/TheControlCarousel'
import ControlSectionSticky from '../controls/TheControlSectionSticky'

export default {
  components: {
    TheControlCarousel,
    IconBase,
    BuilderSettingsBarGroup,
    BaseUploader,
    ControlBox,
    ControlSectionHeight,
    ControlSectionSticky
  },
  name: 'BuilderSettingsBarSection',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection',
      'sectionsGroups',
      'isGrouping',
      'settingObjectElement',
      'isMobile'
    ]),

    ...mapState('User', ['user']),
    ...mapState(['currentLanding']),

    sectionId () {
      return this.settingObjectSection.id
    },

    isHeader () {
      return this.settingObjectSection.isHeader
    }
  },

  created () {
    this.header = this.settingObjectOptions.header || ''

    if (this.settingObjectOptions.classes !== undefined && this.settingObjectOptions.classes.indexOf('full-height') !== -1) {
      this.fullScreen = true
    }
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

    deleteSection () {
      // update group
      if (this.isSlaveSection()) {
        let master = _.find(this.sectionsGroups, o => o.children.indexOf(this.sectionId) > -1).main
        let absorb = master.data.mainStyle.absorb
        master.set('$sectionData.mainStyle', _.merge({}, master.data.mainStyle, { absorb: absorb - 1 }))
      }
      this.builder.remove(this.settingObjectSection)
      this.clearSettingObject()

      if (this.isMasterSection()) {
        resetIndents()
      }
      this.saveState(this.builder.export('JSON'))
    },

    updateSimpleValue (propName, value) {
      this.updateSettingOptions(
        _.merge({}, this.settingObjectOptions, { [propName]: value })
      )
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
  /deep/
    .vb.vb-visible
      padding-right: 0 !important
      width: calc(100% + 17px) !important
  &__group
    border-bottom: 0.2rem dotted rgba($black, 0.15)
    padding-bottom: 2.4rem
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
    margin: 0 0 2.1rem 2.2rem

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
