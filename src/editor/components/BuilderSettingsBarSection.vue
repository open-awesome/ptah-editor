<template>
  <div>
    <base-color-picker v-model="sectionBgColor" @change="updateBgColor"></base-color-picker>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ControlColorPicker from './controls/ControlColorPicker.vue'

import * as _ from 'lodash-es'

export default {
  name: 'BuilderSettingsBarSection',

  components: {
    ControlColorPicker
  },

  data () {
    return {
      sectionBgColor: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ])
  },

  created () {
    this.sectionBgColor = this.settingObjectOptions.styles['background-color']
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    updateBgColor () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-color': this.sectionBgColor.hex
        }
      }))

      console.log(this.settingObjectOptions)
    }
  }
}
</script>
