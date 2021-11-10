export default class {
  constructor() {
    this.vh = window.innerHeight * 0.01
    this.bind()
  }

  set() {
    document.documentElement.style.setProperty('--vh', `${this.vh}px`)
  }

  bind() {
    window.addEventListener('resize', () => {
      this.vh = window.innerHeight * 0.01
      this.set()
    })
  }
}
