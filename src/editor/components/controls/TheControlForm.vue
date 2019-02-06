<script>
import { mapState } from 'vuex'

export default {
  name: 'TheControlForm',

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    button () {
      return this.settingObjectOptions.buttonText
    },

    placeholder () {
      return this.settingObjectOptions.placeholder
    }
  }
}
</script>

<template>
  <div class="b-text-controls">
    <div class="b-text-controls__header">
      <span>Form settings</span>
    </div>

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
