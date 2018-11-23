<template>
  <div class="b-section-settings">
    <div>
      <base-color-picker v-model="sectionBgColor" @change="updateBgColor"></base-color-picker>
    </div>

    <div class="b-section-settings__buttons">
      <base-button :color="'light-gray'" @click="deleteSection">Delete</base-button>
    </div>
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

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sectionBgColor: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectSection'
    ])
  },

  created () {
    this.sectionBgColor = this.settingObjectOptions.styles['background-color']
  },

  watch: {
    settingObjectOptions (newValue, oldValue) {
      this.sectionBgColor = newValue.styles['background-color']
    }
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
    },

    deleteSection () {
      this.builder.remove(this.settingObjectSection)
    }
  }
}
</script>

<style lang="sass" scoped>
  .b-section-settings
    display: flex
    flex-direction: column
    align-items: stretch
    &__buttons
      margin: 10rem 0 0 0
      button
        max-width: 100%
</style>
