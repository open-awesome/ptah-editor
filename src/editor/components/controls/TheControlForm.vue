<script>
import { mapState, mapActions } from 'vuex'
import { merge } from 'lodash-es'

export default {
  name: 'TheControlForm',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    button: {
      get () {
        return this.settingObjectOptions.buttonText
      },
      set (value) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { buttonText: value }))
      }
    },

    placeholder: {
      get () {
        return this.settingObjectOptions.placeholder
      },
      set (value) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, { placeholder: value }))
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
      <base-text-field v-model="button" :label="$t('s.buttonText')"></base-text-field>
    </div>

    <div class="b-text-controls__control">
      <base-text-field v-model="placeholder" :label="$t('s.placeholder')"></base-text-field>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.b-text-controls
  &__header
    font-size: 1.6rem
    height: 3.2rem
    color: #272727
    display: flex
    align-items: center
    cursor: pointer
    i
      margin-left: 5px
      margin-bottom: -5px
      transform: rotate(180deg)
      &.dropped
        transform: rotate(0deg)
  &__control
    margin-top: 2.2rem
</style>
