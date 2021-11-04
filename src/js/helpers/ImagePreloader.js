/* eslint-disable no-new, class-methods-use-this */

class ImagePreloader {
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
    console.log(el)
    el.classList.remove('image-loading')
  }

  async preloadImages() {
    await Promise.all(this.arr.map((src) => this.preloadImage(src)))
    // console.log(this.thumbs)
    this.thumbs.forEach((thumb) => {
      thumb.classList.remove('image-loading')
    })
  }
}

export default ImagePreloader
