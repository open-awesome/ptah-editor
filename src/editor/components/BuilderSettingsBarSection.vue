<template>
  <div class="b-section-settings">
    <div class="b-section-settings__control">
      <base-color-picker v-model="sectionBgColor" @change="updateBgColor" label="Background color"></base-color-picker>
    </div>

    <div class="b-section-settings__control">
      <base-upload-input v-model="sectionBgUrl" @upload="updateBgUrl" label="Background image" placeholder="Image Url"></base-upload-input>
    </div>

    <div class="b-section-settings__buttons">
      <base-button :color="'light-gray'" @click="deleteSection">Delete</base-button>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import * as _ from 'lodash-es'

export default {
  name: 'BuilderSettingsBarSection',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sectionBgColor: '',
      sectionBgUrl: ''
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
    let image = this.settingObjectOptions.styles['background-image']
    this.sectionBgUrl = image.length > 0 ? image.match(/url\(.+(?=\))/g).map(url => url.replace(/url\(/, ''))[0] : ''
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
      const color = Object.values(this.sectionBgColor.rgba).toString()
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-color': `rgba(${color})`
        }
      }))
    },

    updateBgUrl () {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, {
        styles: {
          'background-image': `url(${this.sectionBgUrl})`
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
      position: absolute
      bottom: 1rem
      left: 1rem
      button
        max-width: 100%
    &__control
      margin-bottom: 3rem
</style>
