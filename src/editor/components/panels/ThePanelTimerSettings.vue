<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Timer settings
    </h6>

    <base-scroll-container backgroundBar="#999">
      <div class="b-panel__inner">
        <!-- Settings -->
        <div class="b-panel__control" v-if="!isMobile">
          <base-label v-text="$t('c.setTimer')"/>
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

        <div class="b-panel__control" v-if="!isMobile">
          <base-select
            :options="UTCOptions"
            :value="UTC"
            @input="UTC = $event.value"
            :label="$t('c.timeZone')"/>
        </div>

        <div class="b-panel__control" v-if="!isMobile">
          <base-switcher v-model="labels.show" :label="$t('c.labels')"/>
        </div>

        <div class="b-panel__control" v-if="labels.show && !isMobile">
          <base-select
            :options="positionOptions"
            :value="position"
            @input="position = $event.value"
            label="Position"/>
        </div>

        <div class="b-panel__control" v-if="labels.show && !isMobile">
          <base-select
            :options="languageOptions"
            :value="language"
            @input="language = $event.value"
            label="Labels language"/>
        </div>

        <!-- Typography -->
        <div class="b-panel__control">
          <control-typography/>
        </div>

        <!-- Background -->
        <div class="b-panel__control" v-if="!isMobile">
          <control-background-timer/>
        </div>

        <!-- Padding/Margin -->
        <div class="b-panel__control">
          <control-box></control-box>
        </div>

      </div><!--/.b-panel__inner-->
    </base-scroll-container>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapState } from 'vuex'
import ControlTypography from './../controls/TheControlTypography'
import ControlBackgroundTimer from './../controls/TheControlBackgroundTimer'
import ControlBox from '../controls/TheControlBox'

export default {
  name: 'ThePanelTimerSettings',

  components: {
    DatePicker,
    ControlTypography,
    ControlBackgroundTimer,
    ControlBox
  },

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
      ],
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
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

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

/deep/
  .mx-input
    border: 0.2ren solid $main-green
    border-radius: 0.2rem
    padding: $size-step/2 $size-step $size-step/2 size-step/2
    font-size: 1.4rem
    font-weight: bold
    color: $dark-grey
  .mx-input:hover
    border-color: $main-green
    cursor: pointer
  .mx-calendar-icon
    color: $main-green
  .mx-calendar
    color: $dark-grey
  .mx-calendar-content .cell.cur-month.actived
    color: $white
    background-color: $main-green
    border-radius: 100%
  .mx-icon-next-month,
  .mx-icon-next-year,
  .mx-icon-last-month,
  .mx-icon-last-year
    color: $main-green
  .mx-calendar-content .cell.cur-month:first-child,
  .mx-calendar-content .cell.cur-month:last-child
    color: $orange
  .mx-datepicker-btn-confirm
    color: $white
    background-color: $main-green
    border-radius: 100px
    width: $size-step*3
    margin: 0
  .mx-datepicker-footer
    padding: $size-step/2

</style>
