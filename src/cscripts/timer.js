const timers = document.querySelectorAll('.js-timer')

export function initTimer (timers) {
  timers.forEach((timer, index) => {
    let timestamp = timer.dataset.timestamp
    let days = timer.querySelector('.js-timer-days > .js-timer-number')
    let hours = timer.querySelector('.js-timer-hours > .js-timer-number')
    let minutes = timer.querySelector('.js-timer-minutes > .js-timer-number')
    let seconds = timer.querySelector('.js-timer-seconds > .js-timer-number')

    initTimer[index] = setInterval(() => {
      let timeLeft = getTimeLeft(timestamp)

      seconds.innerText = checkTime(getSeconds(timeLeft))
      minutes.innerText = checkTime(getMinutes(timeLeft))
      hours.innerText = checkTime(getHours(timeLeft))
      days.innerText = checkTime(getDays(timeLeft))

      if (!timeLeft || timeLeft < 0) {
        clearInterval(initTimer[index])
      }
    }, 1000)
  })
}

function getTimeLeft (timestamp) {
  return timestamp - Date.now()
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
