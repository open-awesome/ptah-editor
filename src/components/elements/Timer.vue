<template>
<div :data-timestamp="timer.timestamp" class="b-timer js-timer">

  <div v-show="timer.days" class="b-timer__days js-timer-days">
    <span class="b-timer__number js-timer-number">{{ parse(days) | check }}</span>
    <span class="b-timer__format">Days</span>
  </div>

  <div v-show="timer.hours" class="b-timer__hours js-timer-hours">
    <span class="b-timer__number js-timer-number">{{ parse(hours, 24) | check }}</span>
    <span class="b-timer__format">Hours</span>
  </div>

  <div v-show="timer.minutes" class="b-timer__minutes js-timer-minutes">
    <span class="b-timer__number js-timer-number">{{ parse(minutes, 60) | check }}</span>
    <span class="b-timer__format">Minutes</span>
  </div>

  <div v-show="timer.seconds" class="b-timer__seconds js-timer-seconds">
    <span class="b-timer__number js-timer-number">{{ parse(seconds, 60) | check }}</span>
    <span class="b-timer__format">Seconds</span>
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
    'timer.timestamp': {
      immediate: true,
      handler (value) {
        clearInterval(this.interval)
        this.timeLeft = value - Date.now()
        this.interval = setInterval(() => {
          this.timeLeft = this.timer.timestamp - Date.now()
          if (!this.timeLeft || this.timeLeft < 0) {
            clearInterval(this.interval)
          }
        }, 1000)
      }
    }
  },

  methods: {
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

  &.is-editable
    border: .1rem dashed $green

  > *:not(:last-child)
    margin-right: 0

  &__days,
  &__minutes,
  &__hours,
  &__seconds
    display: inline-flex
    flex-direction: column
    width: 2em
    margin: .8rem
    font-weight: 300
    opacity: .9

  &__number
    display: inline-flex
    justify-content: center
    width: 100%
    margin-bottom: .8rem
    padding: .2rem .3rem
    border-radius: .4rem
    background: rgba(51, 51, 51, .5)

  &__format
    display: inline-flex
    justify-content: center
    width: 100%
    font-size: .5em
    opacity: .9
</style>
