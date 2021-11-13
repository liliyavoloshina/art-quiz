import './index.scss'

class ScoreItem {
  constructor(isCorrect, item) {
    this.isCorrect = isCorrect
    this.imageNum = item.imageNum
    this.name = item.name
    this.author = item.author
    this.year = item.year
  }

  generateImage() {
    const scoreImage = document.createElement('div')
    scoreImage.classList.add('score__img', 'image-loading')
    if (!this.isCorrect) scoreImage.classList.add('inversed')

    const image = document.createElement('img')
    image.src = `/img/small/${this.imageNum}full.webp`
    image.alt = ''

    scoreImage.append(image)

    return scoreImage
  }

  generatePopup() {
    return `
      <div class="popup-score__name">"${this.name}"</div>
      <div class="popup-score__author">${this.author}</div>
      <div class="popup-score__year">${this.year}</div>
      `
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('score__item')

    element.append(this.generateImage())

    const popup = document.createElement('div')
    popup.classList.add('popup-score', 'hidden')
    popup.innerHTML = this.generatePopup()

    element.append(popup)
    parent.append(element)
  }
}

export default ScoreItem
