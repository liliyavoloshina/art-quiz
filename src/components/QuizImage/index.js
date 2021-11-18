import './index.scss'

class QuizImage {
  constructor(type, imageNum, hint, correctAnswer = '') {
    this.type = type
    this.imageNum = imageNum
    this.hint = hint
    this.correctAnswer = correctAnswer
  }

  generate() {
    return `
    <img class="image__img" src="/img/full/${this.imageNum}full.webp" />
    <div class="image__fullscreen image__actions" title="zoom image">
      <ion-icon name="search-outline"></ion-icon>
    </div>
    <div class="image__hint image__actions" title="hint">
      <div class="tooltip btn-anim">
        <ion-icon name="help-circle-outline"></ion-icon>
        <div class="tooltip__content">${this.hint}</div>
      </div>
    </div>
    `
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('image', 'image-loading')

    if (this.type === 'artists') {
      element.classList.add('artists')
    } else {
      element.classList.add('pictures')
    }

    element.innerHTML = this.generate()

    if (this.type === 'pictures') {
      const image = element.querySelector('.image__img')
      image.dataset.name = this.correctAnswer
      image.classList.add('answer')
    }

    parent.append(element)
  }
}

export default QuizImage
