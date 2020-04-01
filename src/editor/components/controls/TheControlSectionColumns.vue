<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'ControlSectionColumns',

  data () {
    return {
      vCount: 0,
      vCountValue: 0,
      min: 1,
      max: 4
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
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    countChange () {
      this.count = this.vCount
      this.vCountValue = this.vCount
    },

    setCountValue () {
      this.vCount = this.vCountValue
    }
  },

  created () {
    this.vCount = this.count
    this.vCountValue = this.vCount
  }
}
</script>

<template>
  <base-range-slider
    v-model="vCount"
    label="Number of slides"
    @change="countChange"
    step="1"
    :min="min"
    :max="max"
  >
    <base-number-input
      class="b-control-height__number-input"
      :value="vCountValue"
      :maximum="max"
      @input="setCountValue"
    />
  </base-range-slider>
</template>
