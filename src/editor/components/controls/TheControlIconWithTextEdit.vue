<script>
import * as _ from 'lodash-es'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ControlTextWithIcon',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    icon: {
      get: function () {
        return this.settingObjectOptions.icon
      },
      set: function (newValue) {
        this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { icon: newValue }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ])
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__control">
      <base-text-field v-model="icon.text" label="Text here" placeholder="Enter text here"></base-text-field>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
  &__control
    margin-top: 2.2rem

</style>
