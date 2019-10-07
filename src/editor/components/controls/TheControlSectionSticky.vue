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
      'settingObjectOptions',
      'isMobile'
    ]),

    sticky: {
      get: function () {
        return _.get(this.settingObjectOptions, 'sticky') || false
      },
      set: function (newValue) {
        this.setPosition('sticky', newValue)
      }
    },

    hamPosition: {
      get: function () {
        return _.get(this.settingObjectOptions, 'hamPosition') || 12
      },
      set: function (newValue) {
        this.setPosition('hamPosition', newValue)
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
    <div class="b-control-sticky__control" v-if="!isMobile">
      <base-switcher
        :value="sticky"
        label="Sticky position"
        @change="toggleSticky"/>
    </div>
    <div class="b-control-sticky__control" v-if="isMobile">
      <base-range-slider v-model="hamPosition" :label="`Position menu`" step="1" min="0" max="64">
        {{ hamPosition }} <span class="b-border-radius-control__px">px</span>
      </base-range-slider>
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
