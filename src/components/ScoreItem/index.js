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
    const popup = document.createElement('div')
    popup.classList.add('popup-score', 'hidden')

    const popupName = document.createElement('div')
    popupName.classList.add('popup-score__name')
    popupName.textContent = this.name

    const popupAuthor = document.createElement('div')
    popupAuthor.classList.add('popup-score__author')
    popupAuthor.textContent = this.author

    const popupYear = document.createElement('div')
    popupYear.classList.add('popup-score__year')
    popupYear.textContent = this.year

    popup.append(popupName)
    popup.append(popupAuthor)
    popup.append(popupYear)

    return popup
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('score__item')

    element.append(this.generateImage())
    element.append(this.generatePopup())

    parent.append(element)
  }
}

export default ScoreItem
