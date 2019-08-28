<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  name: 'ControlSectionColumns',

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
  <base-range-slider v-model="vCount" label="Count" @change="countChange" step="1" min="1" max="4">
    {{ vCount }}
  </base-range-slider>
</template>
