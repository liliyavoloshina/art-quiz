import './index.scss'

class Category {
  constructor(isPlayed, type, categoryName, correctNumber, splittedName) {
    this.isPlayed = isPlayed
    this.type = type
    this.categoryName = categoryName
    this.correctNumber = correctNumber
    this.splittedName = splittedName
  }

  generate() {
    return `
    <div class="category__header ${!this.isPlayed ? 'hidden' : ''}">
      <a class="category__score btn" href="score/${this.type}/${this.categoryName}" data-link>
        <ion-icon name="star"></ion-icon>
      </a>
      <div class="category__results">${this.correctNumber}/10</div>
    </div>
    
    <a class="category__name ${this.isPlayed ? 'played' : ''}" href="quiz/${this.type}/${this.categoryName}" data-link
      data-langkey="${this.categoryName}">${this.splittedName}</a>
    <a class="category__image image-loading ${!this.isPlayed ? 'inversed' : ''}" href="/quiz/${this.type}/${this.categoryName}"
      data-link>
      <img src="../img/category/${this.type}/${this.categoryName}.webp" alt="${this.categoryName} quiz">
    </a>
    `
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('category')
    element.innerHTML = this.generate()

    parent.append(element)
  }
}

export default Category
