<i18n>
{
  "ru": {
    "days": "Дней",
    "hours": "Часов",
    "minutes": "Минут",
    "seconds": "Секунд"
  },
  "en": {
    "days": "Days",
    "hours": "Hours",
    "minutes": "Minutes",
    "seconds": "Seconds"
  },
  "de": {
    "days": "Tage",
    "hours": "Stunden",
    "minutes": "Minuten",
    "seconds": "Sekunden"
  }
}
</i18n>

<template>
<table
    class="b-timer is-editable js-timer"
    :data-timestamp="timer.timestamp"
    :data-utc-offset="timer.UTC">

  <thead v-show="labels.show && labels.position === 'top'" class="b-timer__labels">
    <tr>
      <td class="label">{{ $t('days') }}</td>
      <td class="label-divider"></td>
      <td class="label">{{ $t('hours') }}</td>
      <td class="label-divider"></td>
      <td class="label">{{ $t('minutes') }}</td>
      <td class="label-divider"></td>
      <td class="label">{{ $t('seconds') }}</td>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td class="number js-timer-days">{{ parse(days) | check }}</td>
      <td class="number-divider"></td>
      <td class="number js-timer-hours">{{ parse(hours, 24) | check }}</td>
      <td class="number-divider"></td>
      <td class="number js-timer-minutes">{{ parse(minutes, 60) | check }}</td>
      <td class="number-divider"></td>
      <td class="number js-timer-seconds">{{ parse(seconds, 60) | check }}</td>
    </tr>
  </tbody>

  <tfoot v-show="labels.show && labels.position === 'bottom'" class="b-timer__labels">
    <tr>
      <td class="label">{{ $t('days') }}</td>
      <td class="label-divider"></td>
      <td class="label">{{ $t('hours') }}</td>
      <td class="label-divider"></td>
      <td class="label">{{ $t('minutes') }}</td>
      <td class="label-divider"></td>
      <td class="label">{{ $t('seconds') }}</td>
    </tr>
  </tfoot>

</table>
</template>

<script>
export default {
  name: 'Timer',

  inject: ['$section'],

  filters: {
    check: value => (value && value > 0) ? value : 0
  },

  props: {
    path: {
      type: String,
      required: true,
      validator: value => typeof value === 'string'
    }
  },

  data () {
    return {
      timeLeft: null,
      interval: null
    }
  },

  computed: {
    timer () {
      return this.$section.get(`$sectionData.${ this.path }.timer`)
    },

    labels () {
      return this.timer.labels
    },

    seconds () {
      return this.timeLeft / 1000
    },

    minutes () {
      return this.seconds / 60
    },

    hours () {
      return this.minutes / 60
    },

    days () {
      return this.hours / 24
    }
  },

  watch: {
    timer: {
      immediate: true,
      deep: true,
      handler ({ labels, UTC, timestamp }) {
        clearInterval(this.interval)

        this.$i18n.locale = labels.language
        this.timeLeft = timestamp - this.getTimestampWithUTCOffset(UTC)

        this.interval = setInterval(() => {
          if (!timestamp || !this.timeLeft || !this.timeLeft < 0) {
            clearInterval(this.interval)
          }
          this.timeLeft = timestamp - this.getTimestampWithUTCOffset(UTC)
        }, 1000)
      }
    }
  },

  methods: {
    getTimestampWithUTCOffset (UTCOffset) {
      let now = new Date()
      let currentTzOffset = -(now.getTimezoneOffset() / 60)
      let deltaTzOffset = UTCOffset - currentTzOffset
      let nowTimestamp = now.getTime()
      let deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60
      let dateWithUTCOffset = new Date(nowTimestamp + deltaTzOffsetMilli)
      return dateWithUTCOffset.getTime()
    },

    parse (value, remainder) {
      value = Math.floor(value)
      return (remainder) ? value % remainder : value
    }
  }
}
</script>

<style lang="sass" scoped>
$main-font-size: 6rem

@mixin tabletFontSize ($property)
  .is-tablet &
    font-size: $property - 1.5
  @media (max-width: 800px)
    font-size: $property - 1.5

@mixin mobileFontSize ($property)
  .is-mobile &
    font-size: $property - 2.5
  @media (max-width: 400px)
    font-size: $property - 2.5

@mixin columnsFontSize ($index, $font_size)
  .b-columns#{$index} &
    font-size: $font_size - .5
    @include tabletFontSize($font_size - .5)
    @include mobileFontSize($font_size + 1.5)

// --- main
.b-timer
  color: #fff
  font-size: $main-font-size
  text-align: center

  &.is-editable
    border: .1rem dashed #18d88b

  @include tabletFontSize($main-font-size)
  @include mobileFontSize($main-font-size)

  @include columnsFontSize(2, $main-font-size - 1.5)
  @include columnsFontSize(3, $main-font-size - 2)

.label
  font-size: .4em

.number
  min-width: 1.5em
  padding: .5rem
  border-radius: .4rem
  background: rgba(51, 51, 51, .5)
  font-size: 1em

  &-divider
    width: .3em
    font-size: 1em

    &::before
      content: ':'
      position: relative
      top: -.1em
</style>
