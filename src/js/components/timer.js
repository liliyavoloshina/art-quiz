/* eslint-disable class-methods-use-this, no-plusplus */

class Timer {
  constructor() {
    this.timer = document.querySelector('.timer')
    this.disMinutes = document.querySelector('.minute')
    this.disSeconds = document.querySelector('.seconds')
    this.circleSvg = document.querySelector('circle')

    this.resume = false
    this.interval = 0
    this.totalTime = 0

    this.initTimer()
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

  textCorrection(element, value) {
    element.innerHTML = value < 10 ? `0${value}` : value
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // const timer = new Timer()
})

// init()

// pause timer
// timer.addEventListener('click', () => {
//   if (
//     circleSvg.style.animationPlayState === 'running' ||
//     disMinutes.style.animationPlayState === 'running' ||
//     disSeconds.style.animationPlayState === 'running'
//   ) {
//     circleSvg.style.animationPlayState = 'paused'
//     disMinutes.style.animationPlayState = 'paused'
//     disSeconds.style.animationPlayState = 'paused'
//   } else {
//     circleSvg.style.animationPlayState = 'running'
//     disMinutes.style.animationPlayState = 'running'
//     disSeconds.style.animationPlayState = 'running'
//   }

//   if (!resume) {
//     // pauseResume.innerHTML = 'Resume'
//     clearInterval(interval)
//     resume = true
//     interval = false
//   } else {
//     console.log('paues')
//     // pauseResume.innerHTML = 'Pause'
//     if (!interval) {
//       interval = setInterval(() => {
//         const minutes = Math.floor(totalTime / 60)
//         const seconds = totalTime % 60

//         textCorrection(disMinutes, minutes)
//         textCorrection(disSeconds, seconds)

//         if (totalTime > 0) {
//           totalTime--
//         }
//       }, 1000)
//       resume = false
//     }
//   }
// })
