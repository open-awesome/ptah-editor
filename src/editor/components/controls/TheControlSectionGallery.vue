<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'ControlSectionGallery',

  data () {
    return {
      vCount: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    count: {
      get: function () {
        return this.settingObjectOptions.count
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { count: newValue }))
      }
    },
    isLabelPreview: {
      get: function () {
        return this.settingObjectOptions.isLabelPreview
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { isLabelPreview: newValue }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    countChange () {
      this.count = this.vCount
    }
  },

  created () {
    this.vCount = this.count
  }
}
</script>

<template>
  <div class="b-text-controls">
      <div class="b-text-controls__control">
        <base-range-slider v-model="vCount" label="Count" @change="countChange" step="1" min="1" max="9">
            {{ vCount }}
        </base-range-slider>
      </div>
    <div class="b-text-controls__control" v-if="this.settingObjectOptions.isLabel">
      <BaseSwitcher v-model="isLabelPreview" label="Show label for image" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
  &__header
    font-size: 1.6rem
    height: 3.2rem
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
    margin-top: 2.2rem

.b-products
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
    margin: 0.5rem 0
    display: block
    color: #4D7DD8
    fill: #4D7DD8
    cursor: pointer
    &_opacity
      opacity: 0.2
      color: #000
      fill: #000
    &-button
      padding: 0 1rem
      border: none
      position: relative
      display: inline-block
      user-select: none
      &:hover
        filter: brightness(120%)
      &:active
        filter: brightness(50%)
      .vuse-icon
         width: 100%
    &-eye
      border: none
      background: transparent
      padding: 0 0.5rem
      display: inline-block
</style>
