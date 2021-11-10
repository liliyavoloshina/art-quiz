/* eslint-disable no-new, class-methods-use-this */

export default class {
  constructor(arrOfImages) {
    this.arr = arrOfImages
    this.thumbs = document.querySelectorAll('.image-loading')
  }

  async preloadImage(src) {
    return new Promise((resolve) => {
      const image = new Image()
      image.onload = resolve
      image.onerror = resolve
      image.src = src
    })
  }

  async preloadOneImage(src, el) {
    await new Promise((resolve) => {
      const image = new Image()
      image.onload = resolve
      image.onerror = resolve
      image.src = src
    })
    el.classList.remove('one-image-loading')
  }

  async preloadImages(type = 'all') {
    if (type === 'all') {
      await Promise.all(this.arr.map((src) => this.preloadImage(src)))
    } else if (type === 'four') {
      const fourGroup = this.arr.slice(0, 4)
      await Promise.all(fourGroup.map((src) => this.preloadImage(src)))
    }
    this.thumbs.forEach((thumb) => {
      thumb.classList.remove('image-loading')
    })
  }
}
