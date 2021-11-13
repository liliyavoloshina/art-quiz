import './index.scss'

class Category {
  constructor(isPlayed, type, categoryName, correctNumber, splittedName) {
    this.isPlayed = isPlayed
    this.type = type
    this.categoryName = categoryName
    this.correctNumber = correctNumber
    this.splittedName = splittedName
  }

  generateHeader() {
    const categoryScore = document.createElement('a')
    categoryScore.classList.add('category__score', 'btn')
    categoryScore.href = `/score/${this.type}/${this.categoryName}`
    categoryScore.dataset.link = ''
    categoryScore.innerHTML = `<ion-icon name="star"></ion-icon>`

    const categoryResults = document.createElement('div')
    categoryResults.classList.add('category__results')
    categoryResults.textContent = `${this.correctNumber}/10`

    const categoryHeader = document.createElement('div')
    categoryHeader.classList.add('category__header')
    categoryHeader.prepend(categoryScore)
    categoryHeader.append(categoryResults)

    return categoryHeader
  }

  generateName() {
    const categoryName = document.createElement('a')
    categoryName.classList.add('category__name')
    if (this.isPlayed) categoryName.classList.add('played')
    categoryName.href = `/quiz/${this.type}/${this.categoryName}`
    categoryName.dataset.link = ''
    categoryName.dataset.langkey = this.categoryName
    categoryName.textContent = this.splittedName

    return categoryName
  }

  generateImage() {
    const categoryImage = document.createElement('a')
    categoryImage.classList.add('category__image', 'image-loading')
    if (!this.isPlayed) categoryImage.classList.add('inversed')
    categoryImage.href = `/quiz/${this.type}/${this.categoryName}`
    categoryImage.dataset.link = ''

    const image = document.createElement('img')
    image.src = `../img/category/${this.type}/${this.categoryName}.webp`
    image.alt = `${this.categoryName} quiz`

    categoryImage.append(image)

    return categoryImage
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('category')

    if (this.isPlayed) {
      element.append(this.generateHeader())
    }

    element.append(this.generateName())
    element.append(this.generateImage())

    parent.append(element)
  }
}

export default Category
