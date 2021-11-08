/* eslint-disable class-methods-use-this, no-plusplus, no-param-reassign */

export default class {
  constructor(val) {
    this.timerValue = val
    this.timer = document.querySelector('.timer')
    this.disSeconds = document.querySelector('.seconds')
    this.circleSvg = document.querySelector('circle')

    this.interval = false
    this.isPaused = false
    this.totalTime = this.timerValue
    this.yellow = Math.floor(this.totalTime / 2)
    this.red = Math.floor(this.totalTime / 4)
    this.oldValue = getComputedStyle(this.circleSvg).getPropertyValue('stroke-dashoffset')
  }

  pauseTimer() {
    if (!this.isPaused) {
      this.isPaused = true
      clearInterval(this.interval)

      this.circleSvg.style.animationPlayState = 'paused'
      this.disSeconds.style.animationPlayState = 'paused'
    }
  }

  stopTimer() {
    clearInterval(this.interval)

    this.oldValue = getComputedStyle(this.circleSvg).getPropertyValue('stroke-dashoffset')
    this.circleSvg.style.strokeDashoffset = this.oldValue

    this.circleSvg.style.animation = 'none'
  }

  playTimer() {
    if (this.isPaused) return
    const seconds = this.totalTime === 60 ? 60 : this.totalTime % 60

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
    if (this.totalTime > 0) {
      this.totalTime--
    } else {
      clearTimeout(this.interval)
      this.circleSvg.style.strokeDashoffset = '0'
      this.circleSvg.style.animation = 'none'
      this.disSeconds.style.animation = 'none'
    }
    this.validateTime(this.disSeconds, seconds)
  }

  setInterval() {
    this.interval = setInterval(() => {
      this.playTimer()
      this.disSeconds.style.animationPlayState = 'running'
      this.circleSvg.style.animationPlayState = 'running'
    }, 1000)
  }

  initTimer() {
    clearTimeout(this.interval)
    this.validateTime(this.disSeconds, this.totalTime)
    this.circleSvg.style.animation = `loop ${this.totalTime}s linear`
    this.circleSvg.style.strokeDashoffset = '1590'
    this.play()
  }

  resumeTimer() {
    if (this.isPaused) {
      this.play()
      this.isPaused = false
    }
  }

  play() {
    this.playTimer()
    this.setInterval()
  }

  validateTime(element, value) {
    element.innerHTML = value < 10 ? `0${value}` : value
  }
}
