export default class {
  constructor(el) {
    this.el = el
    this.containerEl = null

    this.confettiFrequency = 3
    this.confettiSize = 15
    this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d']
    this.confettiAnimations = ['slow', 'medium', 'fast']
  }

  init() {
    const containerEl = document.createElement('div')
    const elPosition = this.el.style.position

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
      this.el.style.position = 'fixed'
    }

    containerEl.classList.add('confetti-container')

    this.el.appendChild(containerEl)

    this.containerEl = containerEl

    this.render()
  }

  render() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div')
      const confettiSize = `${Math.floor(Math.random() * 3) + this.confettiSize}px`
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)]
      const confettiLeft = `${Math.floor(Math.random() * this.el.offsetWidth)}px`
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)]

      confettiEl.classList.add('confetti', `confetti--animation-${confettiAnimation}`)
      confettiEl.style.left = confettiLeft
      confettiEl.style.width = confettiSize
      confettiEl.style.height = confettiSize
      confettiEl.style.backgroundColor = confettiBackground

      confettiEl.removeTimeout = setTimeout(() => {
        confettiEl.parentNode.removeChild(confettiEl)
      }, 1000)

      this.containerEl.appendChild(confettiEl)
    }, 25)
  }
}
