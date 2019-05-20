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
  <div class="b-text-controls">
      <div class="b-text-controls__control">
        <base-range-slider v-model="vCount" label="Count" @change="countChange" step="1" min="1" max="4">
            {{ vCount }}
        </base-range-slider>
      </div>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
  &__control
    margin-top: 2.2rem
</style>
