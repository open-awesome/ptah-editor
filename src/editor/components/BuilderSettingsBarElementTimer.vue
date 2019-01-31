<template>
<div class="b-elem-settings--timer">

  <base-label v-text="'Set timer'"/>
  <date-picker
      v-model="timer.timestamp"
      :minuteStep="10"
      :editable="false"
      :disabled-days="getDisabledDays"
      style="width:100%"
      type="datetime"
      format="DD.MM.YYYY hh:mm a"
      value-type="timestamp"
      placeholder="Select date and time"
      lang="en"
      confirm/>

  <base-select
      :options="languageOptions"
      :value="language"
      @input="language = $event.value"
      label="Labels language"/>

  <base-select
      :options="positionOptions"
      :value="position"
      @input="position = $event.value"
      label="Labels position"/>

  <base-select
      :options="UTCOptions"
      :value="UTC"
      @input="UTC = $event.value"
      label="Labels language"/>

  <base-switcher v-model="labels.show" label="Show labels"/>
  <base-switcher v-model="timer.days" label="Show days"/>
  <base-switcher v-model="timer.hours" label="Show hours"/>
  <base-switcher v-model="timer.minutes" label="Show minutes"/>
  <base-switcher v-model="timer.seconds" label="Show seconds"/>

</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'

export default {
  name: 'BuilderSettingsBarElementTimer',

  components: { DatePicker },

  props: {
    timer: {
      type: Object,
      required: true
    }
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
    getLabelsOption (name) {
      let value = this.labels[name]
      let option = this[`${ name }Options`].find(option => option.value === value)
      return { name: option.name, value }
    },

    getDisabledDays (date) {
      return new Date() >= date
    }
  }
}
</script>

<style lang="sass" scoped>
.b-elem-settings--timer
  padding-right: .8rem
  > *
    margin-bottom: .8rem
</style>
