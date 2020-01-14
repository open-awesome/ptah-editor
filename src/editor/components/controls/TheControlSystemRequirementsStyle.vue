<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import ControlTable from './../controls/TheControlTable.vue'
import ControlTableBody from './../controls/TheControlTableBody.vue'

export default {
  name: 'ControlSystemRequirementsStyle',

  components: {
    ControlTable,
    ControlTableBody
  },

  data () {
    return {
      colorDef: '',
      colorAct: '',
      elWidth: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    requirements () {
      return this.settingObjectOptions.systemRequirements
    },

    rowsRequirements () {
      return this.settingObjectOptions.rowsRequirements
    },

    selectPlatform () {
      return this.settingObjectOptions.selectPlatform
    },

    sizeIcons: {
      get () {
        let props = `sizeIcons`
        let size = ''

        if (this.isMobile) props = `media['is-mobile']['sizeIcons']`

        size = _.get(this.settingObjectOptions, `${props}['width']`)

        if (size === undefined) size = _.get(this.settingObjectOptions, `sizeIcons['width']`)

        return size
      },
      set (value) {
        this.update('width', value)
      }
    },

    colorIcons () {
      return this.settingObjectOptions.colorIcons
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    visible (key) {
      this.requirements[key].visible = !this.requirements[key].visible

      if (this.requirements[key].visible === true) {
        this.selectPlatform.name = key
      } else {
        for (let p in this.requirements) {
          if (this.requirements[p].visible === true) {
            this.selectPlatform.name = p
          }
        }
      }
    },

    visibleRows (key) {
      this.rowsRequirements[key].visible = !this.rowsRequirements[key].visible
    },

    changeColor (prop, color) {
      const c = color ? `rgba(${Object.values(color.rgba).toString()})` : color
      this.colorIcons[prop] = c

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { colorIcons: this.colorIcons }))
    },

    update (prop, value) {
      let props = {}
      let sizeIcons = {}
      let device = 'is-mobile'
      let media = { 'is-mobile': { 'sizeIcons': sizeIcons } }

      sizeIcons[prop] = value
      media[device]['sizeIcons'][prop] = value

      this.isMobile ? props = { 'media': media } : props = { 'sizeIcons': sizeIcons }

      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, props))
    }
  },

  mounted () {
    this.colorIcons.default !== undefined ? this.colorDef = this.colorIcons.default : this.color = 'rgba(0, 0, 0, 1)'
    this.colorIcons.active !== undefined ? this.colorAct = this.colorIcons.active : this.color = 'rgba(255, 255, 255, 1)'
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div>
      <div class="b-text-controls__control">
        <base-range-slider v-model="sizeIcons" label="Icons size" step="8" min="16" max="72">
          {{ sizeIcons }} px
        </base-range-slider>
      </div>
      <div class="b-text-controls__control" v-if="!isMobile">
        <base-color-picker label="Icons color" v-model="colorDef" @change="changeColor('default', colorDef)"></base-color-picker>
      </div>
      <div class="b-text-controls__control" v-if="!isMobile">
        <base-color-picker label="Icons active" v-model="colorAct" @change="changeColor('active', colorAct)"></base-color-picker>
      </div>
    </div>
    <div>
      <div class="b-text-controls__control">
        <control-table/>
      </div>
    </div>
    <div>
      <div class="b-text-controls__control">
        <control-table-body/>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: #272727
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
  &__control
    margin-top: 2.2rem

.b-system-requirements
  width: 100%
  max-width: 100rem
  margin: 1rem auto
  display: inline-block
  min-height: 5rem
  .is-tablet &,
  .is-mobile &
    flex-wrap: wrap
    height: auto !important
  @media only screen and (max-width: 768px)
    &
      flex-wrap: wrap
      height: auto !important
  &__item
    position: relative

    margin: $size-step/2 0
    min-height: $size-step/2

    display: flex
    justify-content: flex-start
    align-items: center

    font-size: 1.6rem
    line-height: 2.4rem
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: $black
      fill: $black
    &-button
      padding: 0 $size-step/2
      border: none
      position: relative
      display: inline-block
      user-select: none
      text-align: left
      width: 20rem
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
    &-check
      width: 2rem
      height: 2rem

      border: 0.2rem solid $grey
      border-radius: 0.3rem
      background: transparent
      text-align: center

      display: inline-block
      & svg
        fill: $dark-grey
        vertical-align: middle

        position: relative
        top: -0.5rem
      &_color
        border: 0.2rem solid rgba($cornflower-blue, 0.5)
</style>
