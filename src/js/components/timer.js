/* eslint-disable class-methods-use-this, no-plusplus, no-param-reassign */

export default class {
  constructor(val) {
    this.timerValue = val
    this.timer = document.querySelector('.timer')
    this.disSeconds = document.querySelector('.seconds')
    this.circleSvg = document.querySelector('circle')

    this.interval = false
    this.totalTime = this.timerValue
    this.yellow = Math.floor(this.totalTime / 2)
    this.red = Math.floor(this.totalTime / 4)
  }

  pauseTimer() {
    clearInterval(this.interval)
    this.circleSvg.style.animationPlayState = 'paused'
    this.disSeconds.style.animationPlayState = 'paused'
    this.circleSvg.style.animation = 'none'
  }

  playTimer() {
    const seconds = this.totalTime % 60

    if (this.totalTime <= this.red) {
      this.circleSvg.style.stroke = 'var(--red)'
      this.disSeconds.style.animation = 'popup 1s infinite ease-in-out'
      this.disSeconds.style.animationPlayState = 'running'
    } else if (this.totalTime <= this.yellow) {
      this.circleSvg.style.stroke = 'var(--timer-circle-yellow)'
      this.disSeconds.style.animation = 'none'
    } else {
      this.circleSvg.style.stroke = 'var(--green)'
      this.disSeconds.style.animation = 'none'
    }
    this.validateTime(this.disSeconds, seconds)

    if (this.totalTime > 0) {
      this.totalTime--
    } else {
      this.circleSvg.style.animation = 'none'
      this.disSeconds.style.animation = 'none'
    }
  }

  setInterval() {
    this.interval = setInterval(() => {
      this.playTimer()
    }, 1000)
  }

  initTimer() {
    this.validateTime(this.disSeconds, this.totalTime)
    this.circleSvg.style.animation = `loop ${this.totalTime}s linear`
    this.circleSvg.style.animationPlayState = 'running'
    this.play()
  }

  play() {
    this.playTimer()
    this.setInterval()

    this.circleSvg.style.animationPlayState = 'running'
    this.disSeconds.style.animationPlayState = 'running'
  }

  validateTime(element, value) {
    element.innerHTML = value < 10 ? `0${value}` : value
  }
}
