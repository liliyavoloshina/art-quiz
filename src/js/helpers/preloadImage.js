// function preloadImages(url, callback) {
//   const img = new Image()
//   img.src = url
//   img.onload = callback
// }

const preloadImage = (src) =>
  new Promise((r) => {
    const image = new Image()
    image.onload = r
    image.onerror = r
    image.src = src
  })

export default preloadImage
