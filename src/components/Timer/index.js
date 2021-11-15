/* eslint-disable class-methods-use-this, no-plusplus, no-param-reassign */

import './index.scss'

export default class {
  constructor(val, type = '') {
    this.timerValue = val
    this.type = type
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
    this.interval = false
    this.isPaused = false
    this.totalTime = this.timerValue
    this.yellow = Math.floor(this.totalTime / 2)
    this.red = Math.floor(this.totalTime / 4)
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

  generate() {
    return `
    <div class="timer__display">
      <div class="display seconds"></div>
    </div>
    <svg class="circle" x="0px" y="0px" width="500px" height="500px" viewBox="0 0 521.17 521.17">
      <circle cx="260.59" cy="260.59" r="253.09" stroke-width="18" fill="none" />
    </svg>
    `
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('timer')

    element.innerHTML = this.generate()

    parent.append(element)

    if (this.type === 'blitz') {
      const addedTime = document.createElement('div')
      addedTime.classList.add('timer__added-time', 'hidden')
      addedTime.id = 'addedTime'
      parent.prepend(addedTime)
    }

    this.timer = document.querySelector('.timer')
    this.disSeconds = document.querySelector('.seconds')
    this.circleSvg = document.querySelector('circle')
    this.oldValue = getComputedStyle(this.circleSvg).getPropertyValue('stroke-dashoffset')
  }
}
