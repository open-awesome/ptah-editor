<script>
import { mapState } from 'vuex'
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
      color: '',
      elWidth: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
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

    sizeIcons () {
      return this.settingObjectOptions.sizeIcons
    },

    colorFill () {
      return this.settingObjectOptions.colorFill
    }
  },

  methods: {
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
    changeColor () {
      const color = this.color.rgba ? `rgba(${Object.values(this.color.rgba).toString()}` : this.color
      this.colorFill['color'] = color
    }
  },

  mounted () {
    this.color = this.colorFill.color
    this.elWidth = this.sizeIcons.width
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div>
      <div class="b-text-controls__control">
        <base-range-slider v-model="sizeIcons.width" label="Icons size" step="8" min="16" max="128">
          {{ sizeIcons.width }} px
        </base-range-slider>
      </div>
      <div class="b-text-controls__control">
        <base-color-picker label="Icons color" v-model="color" @change="changeColor"></base-color-picker>
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
    &-set-link
      &-modal
        width: 40rem
        background: $white
        position: absolute
        right: -39rem
        top: -2rem
        z-index: 1
        box-shadow: 0px 0.4rem 4rem rgba($black, 0.35)
        padding: 0 2.3rem 2.3rem
        &:before
          content: ""
          position: absolute
          width: $size-step/2
          height: $size-step/2
          top: 2.4rem
          left: -.7rem
          background: $white
          transform: rotate(-45deg)
          z-index: 2
        &-buttons
          display: flex
          justify-content: flex-end
          margin: $size-step 0 0
        &-chapter
          font-size: 1.6rem
          letter-spacing: -0.02em
          color: $dark-grey
          margin: 0 0 $size-step/2 0
      &_color *
        fill: $dark-blue-krayola
      &_color *
        fill: #4D7DD8
</style>
