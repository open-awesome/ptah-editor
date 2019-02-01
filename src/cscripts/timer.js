const timers = document.querySelectorAll('.js-timer')

export function initTimer (timers) {
  timers.forEach((timer, index) => {
    // --- hide timer once before calculate time values
    timer.hidden = true
    // --- init calculate time interval
    initTimer[index] = setInterval(calculateTime, 1000, timer, initTimer[index])
    // --- calculate time and show timer
    calculateTime(timer, initTimer[index])
    // --- show timer after calculate time
    timer.hidden = false
  })
}

function calculateTime (timer, interval) {
  let timestamp = Number(timer.dataset.timestamp)
  let UTCOffset = Number(timer.dataset.utcOffset)

  let days = timer.querySelector('.js-timer-days > .js-timer-number')
  let hours = timer.querySelector('.js-timer-hours > .js-timer-number')
  let minutes = timer.querySelector('.js-timer-minutes > .js-timer-number')
  let seconds = timer.querySelector('.js-timer-seconds > .js-timer-number')

  let timeLeft = getTimeLeft(timestamp, UTCOffset)

  seconds.innerText = checkTime(getSeconds(timeLeft))
  minutes.innerText = checkTime(getMinutes(timeLeft))
  hours.innerText = checkTime(getHours(timeLeft))
  days.innerText = checkTime(getDays(timeLeft))

  if (!timeLeft || timeLeft < 0) {
    clearInterval(interval)
  }
}

function getTimeLeft (timestamp, UTCOffset) {
  let now = new Date()
  let currentTzOffset = -(now.getTimezoneOffset() / 60)
  let deltaTzOffset = UTCOffset - currentTzOffset
  let nowTimestamp = now.getTime() 
  let deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60
  let dateWithUTCOffset = new Date(nowTimestamp + deltaTzOffsetMilli)
  return timestamp - dateWithUTCOffset.getTime()
}

function getSeconds (timestamp) {
  let value = timestamp / 1000
  return parseTime(value, 60)
}

function getMinutes (timestamp) {
  let value = timestamp / 1000 / 60
  return parseTime(value, 60)
}

function getHours (timestamp) {
  let value = timestamp / 1000 / 60 / 60
  return parseTime(value, 24)
}

function getDays (timestamp) {
  let value = timestamp / 1000 / 60 / 60 / 24
  return parseTime(value)
}

function parseTime (value, remainder) {
  value = Math.floor(value)
  return (remainder) ? value % remainder : value
}

function checkTime(value) {
  return (value && value > 0) ? value : 0
}

void initTimer(timers)
