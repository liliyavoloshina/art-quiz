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

  hideThumbs() {
    this.thumbs.forEach((thumb) => {
      thumb.classList.remove('image-loading')
    })
  }

  async preloadImages(type = 'all') {
    if (type === 'all') {
      await Promise.all(this.arr.map((src) => this.preloadImage(src)))
      this.hideThumbs()
    } else if (type === 'four') {
      console.log(this.arr.length)
      const fourGroup = this.arr.splice(0, 4)
      if (this.arr.length > 0) {
        await Promise.all(fourGroup.map((src) => this.preloadImage(src)))
        this.hideThumbs()
        this.preloadImages('four')
      }
    }
  }
}
