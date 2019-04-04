<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Timer style
    </h6>

    <!-- Typography -->
    <div class="b-panel__control">
      <control-typography/>
    </div>

    <!-- background -->
    <div class="b-panel__control">
      <control-background-timer/>
    </div>

    <div class="b-panel__control">
      <base-switcher v-model="labels.show" label="Labels"/>
    </div>

    <div class="b-panel__control" v-if="labels.show">
      <base-select
        :options="positionOptions"
        :value="position"
        @input="position = $event.value"
        label="Position"/>
    </div>

    <div class="b-panel__control" v-if="labels.show">
      <base-select
        :options="languageOptions"
        :value="language"
        @input="language = $event.value"
        label="Labels language"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlTypography from './../controls/TheControlTypography'
import ControlBackgroundTimer from './../controls/TheControlBackgroundTimer'

export default {
  name: 'ThePanelTimerSettings',

  components: {
    ControlTypography,
    ControlBackgroundTimer
  },

  data () {
    return {
      languageOptions: [
        { name: 'Russian', value: 'ru' },
        { name: 'English', value: 'en' },
        { name: 'German', value: 'de' }
      ],
      positionOptions: [
        { name: 'Top', value: 'top' },
        { name: 'Bottom', value: 'bottom' }
      ]
    }
  },

  computed: {
    ...mapState('Sidebar', ['settingObjectOptions']),

    timer () {
      return this.settingObjectOptions.timer
    },

    labels () {
      return this.timer.labels
    },

    position: {
      get () {
        return this.getLabelsOption('position')
      },
      set (value) {
        this.labels.position = value
      }
    },

    language: {
      get () {
        return this.getLabelsOption('language')
      },
      set (value) {
        this.labels.language = value
      }
    }
  },

  methods: {
    getLabelsOption (name) {
      let value = this.labels[name]
      let option = this[`${ name }Options`].find(option => option.value === value)
      return { name: option.name, value }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-panel
  padding-bottom: 4.5rem
  display: flex
  flex-direction: column
  height: auto
  width: 100%
  align-items: stretch

  &__title
    color: $black
    font-size: 2rem
    font-weight: bold

    min-width: 28rem
    margin: 0 0 2.8rem 0
    padding: 0
    &:first-letter
      text-transform: uppercase

  &__control
    margin-bottom: 1.6rem
</style>
