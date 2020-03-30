<script>
import { mapState, mapActions } from 'vuex'
import { get, set, merge } from 'lodash-es'

export default {
  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    sticky: {
      get: function () {
        return get(this.settingObjectOptions, 'sticky') || false
      },
      set: function (newValue) {
        this.setPosition('sticky', newValue)
      }
    },

    hamPosition: {
      get: function () {
        return get(this.settingObjectOptions, 'hamPosition') || 12
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
      let obj = set({}, path, value)
      this.updateSettingOptions(merge({}, this.settingObjectOptions, obj))
    },

    toggleSticky () {
      this.sticky = !this.sticky
    }

  }
}
</script>

<template>
  <div class="b-control-sticky">
    <BaseCaption>
      Header position
    </BaseCaption>
    <div class="b-control-sticky__control" v-if="!isMobile">
      <base-switcher
        :value="sticky"
        label="Sticky position"
        @change="toggleSticky"/>
    </div>
    <div class="b-control-sticky__control" v-if="isMobile">
      <base-range-slider v-model="hamPosition" :label="`Menu icon position`" step="1" min="0" max="64">
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
    margin: 0 0 2.1rem 1rem
</style>
