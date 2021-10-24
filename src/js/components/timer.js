/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this, no-plusplus */

export default class {
  constructor() {
    this.timer = document.querySelector('.timer')
    this.disMinutes = document.querySelector('.minute')
    this.disSeconds = document.querySelector('.seconds')
    this.pausesEl = document.querySelector('#pauses')
    this.circleSvg = document.querySelector('circle')

    this.resume = false
    this.interval = 0
    this.pauses = 2
    this.totalTime = this.timer.addEventListener('click', () => this.pause())
  }

  initTimer() {
    this.disMinutes.innerHTML = '00'
    this.disSeconds.innerHTML = '10'

    this.totalTime = 10
    // totalTime = 239

    this.circleSvg.style.animation = `loop ${this.totalTime}s linear 1s`
    this.circleSvg.style.animationPlayState = 'running'

    this.interval = setInterval(() => {
      const minutes = Math.floor(this.totalTime / 60)
      const seconds = this.totalTime % 60

      if (this.totalTime <= 10) {
        this.circleSvg.style.stroke = 'var(--timer-circle-red)'
        this.disMinutes.style.animation = 'popup 1s infinite ease-in-out'
        this.disMinutes.style.animationPlayState = 'running'

        this.disSeconds.style.animation = 'popup 1s infinite ease-in-out'
        this.disSeconds.style.animationPlayState = 'running'
      } else {
        this.circleSvg.style.stroke = 'var(--timer-circle-yellow)'
        this.disMinutes.style.animation = 'none'
        this.disSeconds.style.animation = 'none'
      }

      this.textCorrection(this.disMinutes, minutes)
      this.textCorrection(this.disSeconds, seconds)

      if (this.totalTime > 0) {
        this.totalTime--
      } else {
        this.circleSvg.style.animation = 'none'
        this.disMinutes.style.animation = 'none'
        this.disSeconds.style.animation = 'none'
      }
    }, 1000)

    return this.totalTime
  }

  pause() {
    if (this.pauses === 0) {
      console.log('pauses Over!!!')
      return
    }

    if (
      this.circleSvg.style.animationPlayState === 'running' ||
      this.disMinutes.style.animationPlayState === 'running' ||
      this.disSeconds.style.animationPlayState === 'running'
    ) {
      this.circleSvg.style.animationPlayState = 'paused'
      this.disMinutes.style.animationPlayState = 'paused'
      this.disSeconds.style.animationPlayState = 'paused'
    } else {
      this.circleSvg.style.animationPlayState = 'running'
      this.disMinutes.style.animationPlayState = 'running'
      this.disSeconds.style.animationPlayState = 'running'
    }

    if (!this.resume) {
      clearInterval(this.interval)
      this.resume = true
      this.interval = false
    } else if (!this.interval) {
      this.interval = setInterval(() => {
        const minutes = Math.floor(this.totalTime / 60)
        const seconds = this.totalTime % 60

        this.textCorrection(this.disMinutes, minutes)
        this.textCorrection(this.disSeconds, seconds)

        if (this.totalTime > 0) {
          this.totalTime--
        }
      }, 1000)
      this.resume = false
      this.pauses--
      this.pausesEl.innerHTML = this.pauses
    }
  }

  textCorrection(element, value) {
    element.innerHTML = value < 10 ? `0${value}` : value
  }
}
