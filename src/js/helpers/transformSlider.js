/* eslint-disable no-param-reassign */
class SliderTransformer {
  constructor(type) {
    this.type = type
    this.slider = document.querySelector('#quizImages') || document.querySelector('#blitzImages')
    this.images = this.slider.querySelectorAll('.image')
    this.transformPictures = -200
    this.bind()
    this.calculateView()
  }

  calculateView() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.transformPictures = -200
    } else {
      this.transformPictures = -400
    }
  }

  transform(questionNumber) {
    if (this.type === 'artists' || this.type === 'blitz') {
      this.images.forEach((image) => {
        image.style.transform = `translateY(${questionNumber * -100}%)`
      })
    } else {
      this.slider.style.transform = `translateY(${questionNumber * -100}%)`
    }
  }

  bind() {
    window.addEventListener('resize', () => this.calculateView())
  }
}

export default SliderTransformer
