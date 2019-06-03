<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ControlToggleElementTextsEdit',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    description: {
      get: function () {
        return this.settingObjectOptions.element.description
      },
      set: function (newValue) {
        this.update('description', newValue)
      }
    },

    text: {
      get: function () {
        return this.settingObjectOptions.element.text
      },
      set: function (newValue) {
        this.update('text', newValue)
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    update (prop, value) {
      let element = {}

      element[prop] = value
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { element }))
    }
  },

  mounted () {
    this.$refs.editDescription.$refs.inputText.focus()
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__control">
      <base-text-field ref="editDescription" v-model="description" label="Description here" placeholder="Enter description here"></base-text-field>
    </div>
    <div class="b-text-controls__control">
      <base-text-field ref="editText" v-model="text" label="Text here" placeholder="Enter text here"></base-text-field>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
  &__control
    margin-top: 2.2rem

</style>
