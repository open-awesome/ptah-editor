<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'

export default {

  data () {
    return {
      vText: {}
    }
  },
  watch: {
    vText: {
      handler (value) {
        _.throttle(this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { text: value })), 1000)
      },
      deep: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    text () {
      return this.settingObjectOptions.text
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ])
  },

  mounted () {
    this.vText = this.text
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__control">
      <base-text-field v-model="vText" label="Text"></base-text-field>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-text-controls
  &__control
    display: flex
    justify-content: stretch
    align-items: center

    width: 100%
    margin-top: $size-step/2
    &-col
      flex-basis: 50%
      margin: 0 0 0 $size-step/2
      &-font-name
        flex-basis: 90%
      &:first-child
        margin: 0
</style>
