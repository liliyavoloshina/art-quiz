import './index.scss'

class ScoreItem {
  constructor(isCorrect, item) {
    this.isCorrect = isCorrect
    this.imageNum = item.imageNum
    this.name = item.name
    this.author = item.author
    this.year = item.year
  }

  generate() {
    return `
    <div class="score__img ${!this.isCorrect ? 'inversed' : ''}">
      <img src="/img/small/${this.imageNum}full.webp" alt="${this.name}" />
    </div>
    <div class="popup-score hidden">
      <div class="popup-score__name">"${this.name}"</div>
      <div class="popup-score__author">${this.author}</div>
      <div class="popup-score__year">${this.year}</div>
    </div>
    `
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('score__item')

    element.innerHTML = this.generate()

    parent.append(element)
  }
}

export default ScoreItem
