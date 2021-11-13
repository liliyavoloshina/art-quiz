import { htmlToElement } from '../../js/helpers/utils'
import categoryHTML from './index.html'
import './index.scss'

class Category {
  constructor(isPlayed, type, categoryName, correctNumber, splittedName) {
    this.isPlayed = isPlayed
    this.type = type
    this.categoryName = categoryName
    this.correctNumber = correctNumber
    this.splittedName = splittedName
  }

  mount(parent) {
    const element = htmlToElement(categoryHTML)

    if (this.isPlayed) {
      const categoryScore = document.createElement('a')
      categoryScore.classList.add('category__score', 'btn')
      categoryScore.href = `/score/${this.type}/${this.categoryName}`
      categoryScore.dataset.dataLink
      categoryScore.innerHTML = `<ion-icon name="star"></ion-icon>`

      const categoryResults = document.createElement('div')
      categoryResults.classList.add('category__results')
      categoryResults.textContent = `${this.correctNumber}/10`

      const categoryHeader = document.createElement('div')
      categoryHeader.classList.add('category__header')
      categoryHeader.prepend(categoryScore)
      categoryHeader.append(categoryResults)

      element.append(categoryHeader)
    }

    const categoryName = document.createElement('a')
    if (this.isPlayed) categoryName.classList.add('played')
    categoryName.classList.add('category__name')
    categoryName.href = `/quiz/${this.type}/${this.categoryName}`
    categoryName.dataset.dataLink
    categoryName.dataset.langkey = this.categoryName
    categoryName.textContent = this.splittedName

    const categoryImage = document.createElement('div')
    categoryImage.classList.add('category__image', 'image-loading')
    if (!this.isPlayed) categoryImage.classList.add('inversed')
    categoryImage.href = `/quiz/${this.type}/${this.categoryName}`
    categoryImage.dataset.dataLink

    const image = document.createElement('img')
    image.src = `../img/category/${this.type}/${this.categoryName}.webp`
    image.alt = `${this.categoryName} quiz`

    categoryImage.append(image)

    element.append(categoryName)
    element.append(categoryImage)

    parent.append(element)
  }
}

export default Category
