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
<div
    :class="{
      'b-timer--labels-reverse': (labels.position === 'top'),
      'b-timer--labels-hidden': !labels.show
    }"
    :data-timestamp="timer.timestamp"
    :data-utc-offset="timer.UTC"
    class="b-timer is-editable js-timer">

  <div class="b-timer__days js-timer-days">
    <span class="b-timer__number js-timer-number">{{ parse(days) | check }}</span>
    <span class="b-timer__format">{{ $t('days') }}</span>
  </div>

  <span class="b-timer__divider">:</span>

  <div class="b-timer__hours js-timer-hours">
    <span class="b-timer__number js-timer-number">{{ parse(hours, 24) | check }}</span>
    <span class="b-timer__format">{{ $t('hours') }}</span>
  </div>

  <span class="b-timer__divider">:</span>

  <div class="b-timer__minutes js-timer-minutes">
    <span class="b-timer__number js-timer-number">{{ parse(minutes, 60) | check }}</span>
    <span class="b-timer__format">{{ $t('minutes') }}</span>
  </div>

  <span class="b-timer__divider">:</span>

  <div class="b-timer__seconds js-timer-seconds">
    <span class="b-timer__number js-timer-number">{{ parse(seconds, 60) | check }}</span>
    <span class="b-timer__format">{{ $t('seconds') }}</span>
  </div>

</div>
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
.b-timer
  display: flex
  flex-wrap: wrap
  justify-content: center
  color: $white
  text-align: center
  font-size: 5rem

  &.is-editable
    border: .1rem dashed $green

  &__days,
  &__minutes,
  &__hours,
  &__seconds
    display: inline-flex
    flex-direction: column
    min-width: 2em
    font-weight: 300
    font-size: 1em
    opacity: .9

    + .b-timer__divider
      margin-top: .4rem

    .b-timer--labels-reverse &
      flex-direction: column-reverse
      + .b-timer__divider
        margin-top: 3rem
        .is-mobile &
          margin-top: 1.5rem
        @media only screen and (max-width: 600px)
          margin-top: 2.5rem
        @media only screen and (max-width: 450px)
          margin-top: 1.4rem

  &__divider
    margin: 0 .6rem

  &__number
    display: inline-flex
    justify-content: center
    width: 100%
    margin-bottom: .8rem
    padding: .3rem .6rem
    border-radius: .4rem
    background: rgba(51, 51, 51, .5)
    font-size: 1.3em

    .b-timer--labels-reverse &
      margin-bottom: 0

  &__format
    display: inline-flex
    justify-content: center
    width: 100%
    font-size: .4em
    opacity: .9

    .b-timer--labels-reverse &
      margin-bottom: .8rem
      .is-mobile &
        margin-bottom: .4rem
      @media only screen and (max-width: 450px)
        margin-bottom: .4rem

    .b-timer--labels-hidden &
      display: none
      
  // --- media

  .is-mobile &
    font-size: 2rem

  @media only screen and (max-width: 600px)
    font-size: 3.5rem

  @media only screen and (max-width: 500px)
    font-size: 3rem

  @media only screen and (max-width: 450px)
    font-size: 2.5rem

  @media only screen and (max-width: 450px)
    font-size: 1.5rem
</style>
