<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {
  data () {
    return {

    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    sticky: {
      get: function () {
        return _.get(this.settingObjectOptions, 'sticky') || false
      },
      set: function (newValue) {
        this.setPosition('sticky', newValue)
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    setPosition (path, value) {
      let obj = _.set({}, path, value)
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, obj))
    },

    toggleSticky () {
      this.sticky = !this.sticky
    }

  }
}
</script>

<template>
  <div class="b-control-sticky">
    <div class="b-control-sticky__control">
      <base-switcher
        :value="sticky"
        label="Sticky position"
        @change="toggleSticky"/>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-control-sticky
  &__control
    margin-top: $size-step/2
</style>
