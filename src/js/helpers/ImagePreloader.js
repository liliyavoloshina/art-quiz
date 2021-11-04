/* eslint-disable no-new, class-methods-use-this */

class ImagePreloader {
  constructor(arrOfImages, arrOfThumbs) {
    this.arr = arrOfImages
    this.thumbs = arrOfThumbs
  }

  async preloadImage(src) {
    return new Promise((resolve) => {
      const image = new Image()
      image.onload = resolve
      image.onerror = resolve
      image.src = src
    })
  }

  async preloadImages() {
    await Promise.all(this.arr.map((src) => this.preloadImage(src)))

    this.thumbs.forEach((thumb) => {
      thumb.classList.remove('image-loading')
    })
  }
}

export default ImagePreloader
