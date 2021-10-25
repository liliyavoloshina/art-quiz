/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this, no-plusplus */

export default class {
  constructor() {
    this.timer = document.querySelector('.timer')
    this.disMinutes = document.querySelector('.minute')
    this.disSeconds = document.querySelector('.seconds')
    this.pausesEl = document.querySelector('#pauses')
    this.circleSvg = document.querySelector('circle')

    this.paused = false
    this.interval = false
    this.pauses = 0
    this.totalTime = 20
    this.timer.addEventListener('click', () => this.toggleTimer())
  }

  setInterval() {
    this.interval = setInterval(() => {
      const minutes = Math.floor(this.totalTime / 60)
      const seconds = this.totalTime % 60

      if (this.totalTime <= 5) {
        this.circleSvg.style.stroke = 'var(--timer-circle-red)'
        this.disMinutes.style.animation = 'popup 1s infinite ease-in-out'
        this.disMinutes.style.animationPlayState = 'running'
        this.disSeconds.style.animation = 'popup 1s infinite ease-in-out'
        this.disSeconds.style.animationPlayState = 'running'
      } else if (this.totalTime <= 10) {
        this.circleSvg.style.stroke = 'var(--timer-circle-yellow)'
        this.disMinutes.style.animation = 'none'
        this.disSeconds.style.animation = 'none'
      } else {
        this.circleSvg.style.stroke = 'var(--timer-circle-green)'
        this.disMinutes.style.animation = 'none'
        this.disSeconds.style.animation = 'none'
      }

      this.validateTime(this.disMinutes, minutes)
      this.validateTime(this.disSeconds, seconds)

      if (this.totalTime > 0) {
        this.totalTime--
      } else {
        this.circleSvg.style.animation = 'none'
        this.disMinutes.style.animation = 'none'
        this.disSeconds.style.animation = 'none'
      }
    }, 1000)
  }

  initTimer() {
    this.disMinutes.innerHTML = '00'
    this.disSeconds.innerHTML = '20'
    this.circleSvg.style.animation = `loop ${this.totalTime + 1.5}s linear 1s`
    this.circleSvg.style.animationPlayState = 'running'
    this.setInterval()
  }

  play() {
    if (!this.interval) {
      this.setInterval()
      this.paused = false
    }

    this.circleSvg.style.animationPlayState = 'running'
    this.disMinutes.style.animationPlayState = 'running'
    this.disSeconds.style.animationPlayState = 'running'
  }

  pause() {
    clearInterval(this.interval)
    this.paused = true
    this.interval = false

    this.pauses++
    this.pausesEl.innerHTML = this.pauses

    this.circleSvg.style.animationPlayState = 'paused'
    this.disMinutes.style.animationPlayState = 'paused'
    this.disSeconds.style.animationPlayState = 'paused'
  }

  toggleTimer() {
    console.log(this.interval, this.totalTime)
    if (!this.paused) {
      if (this.pauses === 2) {
        console.log('pauses Over!!!')
        return
      }
      this.pause()
    } else {
      this.play()
    }
  }

  validateTime(element, value) {
    element.innerHTML = value < 10 ? `0${value}` : value
  }
}
