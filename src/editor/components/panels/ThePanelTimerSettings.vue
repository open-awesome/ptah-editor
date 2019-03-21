<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Timer
    </h6>

    <div class="b-panel__control">
      <base-label v-text="'Set timer'"/>
      <date-picker
        v-model="timer.timestamp"
        :minuteStep="10"
        :editable="false"
        :not-before="notBeforeDate"
        :not-after="notAfterDate"
        :disabled-days="getDisabledDays"
        style="width:100%"
        type="datetime"
        format="DD.MM.YYYY hh:mm a"
        value-type="timestamp"
        placeholder="Select date and time"
        lang="en"
        confirm/>
    </div>

    <div class="b-panel__control">
      <base-select
        :options="languageOptions"
        :value="language"
        @input="language = $event.value"
        label="Labels language"/>
    </div>

    <div class="b-panel__control">
      <base-select
        :options="positionOptions"
        :value="position"
        @input="position = $event.value"
        label="Labels position"/>
    </div>

    <div class="b-panel__control">
      <base-select
        :options="UTCOptions"
        :value="UTC"
        @input="UTC = $event.value"
        label="Time zone"/>
    </div>

    <div class="b-panel__control">
      <base-switcher v-model="labels.show" label="Show labels"/>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapState } from 'vuex'

export default {
  name: 'ThePanelTimerSettings',

  components: { DatePicker },

  data () {
    return {
      maxDays: 999,
      languageOptions: [
        { name: 'Russian', value: 'ru' },
        { name: 'English', value: 'en' },
        { name: 'German', value: 'de' }
      ],
      positionOptions: [
        { name: 'Top', value: 'top' },
        { name: 'Bottom', value: 'bottom' }
      ],
      UTCOptions: [
        { name: 'UTC -11:00', value: -11 },
        { name: 'UTC -10:00', value: -10 },
        { name: 'UTC -9:00', value: -9 },
        { name: 'UTC -8:00', value: -8 },
        { name: 'UTC -7:00', value: -7 },
        { name: 'UTC -6:00', value: -6 },
        { name: 'UTC -5:00', value: -5 },
        { name: 'UTC -4:00', value: -4 },
        { name: 'UTC -3:00', value: -3 },
        { name: 'UTC -2:00', value: -2 },
        { name: 'UTC -1:00', value: -1 },
        { name: 'UTC', value: 0 },
        { name: 'UTC 1:00', value: 1 },
        { name: 'UTC 2:00', value: 2 },
        { name: 'UTC 3:00', value: 3 },
        { name: 'UTC 4:00', value: 4 },
        { name: 'UTC 5:00', value: 5 },
        { name: 'UTC 6:00', value: 6 },
        { name: 'UTC 7:00', value: 7 },
        { name: 'UTC 8:00', value: 8 },
        { name: 'UTC 9:00', value: 9 },
        { name: 'UTC 10:00', value: 10 },
        { name: 'UTC 11:00', value: 11 },
        { name: 'UTC 12:00', value: 12 }
      ]
    }
  },

  computed: {
    ...mapState('Sidebar', ['settingObjectOptions']),

    timer () {
      return this.settingObjectOptions.timer
    },

    notBeforeDate () {
      return new Date()
    },

    notAfterDate () {
      let maxms = new Date().setMilliseconds(this.maxDays * 24 * 60 * 60 * 1000)
      return new Date(maxms)
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
    },

    UTC: {
      get () {
        let value = this.timer.UTC
        let option = this.UTCOptions.find(option => option.value === value)
        return { name: option.name, value }
      },
      set (value) {
        this.timer.UTC = value
      }
    }
  },

  methods: {
    getDisabledDays (date) {
      return new Date() >= date
    },

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
