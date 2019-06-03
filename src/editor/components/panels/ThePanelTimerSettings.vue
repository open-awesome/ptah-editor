<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Timer settings
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
        :options="UTCOptions"
        :value="UTC"
        @input="UTC = $event.value"
        label="Time zone"/>
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

/deep/
  .mx-input
    border: 0.2ren solid $dark-blue-krayola
    border-radius: 0.2rem
    padding: $size-step/2 $size-step $size-step/2 size-step/2
    font-size: 1.4rem
    font-weight: bold
    color: $dark-grey
  .mx-input:hover
    border-color: $dark-blue-krayola
  .mx-calendar-icon
    color: $dark-blue-krayola
  .mx-calendar
    color: $dark-grey
  .mx-calendar-content .cell.cur-month.actived
    color: $white
    background-color: $dark-blue-krayola
    border-radius: 100%
  .mx-icon-next-month,
  .mx-icon-next-year,
  .mx-icon-last-month,
  .mx-icon-last-year
    color: $dark-blue-krayola
  .mx-calendar-content .cell.cur-month:first-child,
  .mx-calendar-content .cell.cur-month:last-child
    color: $orange
  .mx-datepicker-btn-confirm
    color: $white
    background-color: $dark-blue-krayola
    border-radius: 100px
    width: $size-step*3
    margin: 0
  .mx-datepicker-footer
    padding: $size-step/2

</style>
