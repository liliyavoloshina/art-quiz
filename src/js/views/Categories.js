/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import View from './View'
import ImagePreloader from '../helpers/ImagePreloader'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - categories')
    this.type = this.params.type
    this.categoriesHtml = ''
    this.categoriesToHtml()
    this.correctResults = this.categories
  }

  getCorrectNumber(results) {
    const correctResults = results.filter((item) => item.isCorrect)
    return correctResults.length
  }

  categoriesToHtml() {
    const items = []
    this.categories.forEach((category) => {
      const { isPlayed } = category
      const splittedName = category.name.split('-').join(' ')
      items.push(`
        <div class="category">
          <div class="category__header">
          <a class="category__score btn ${!isPlayed ? 'hidden' : ''}" href="/score/${this.type}/${category.name}" data-link>
            <span class="material-icons-round">star</span>
          </a>
            <div class="category__results ${!isPlayed ? 'hidden' : ''}">${category.isPlayed ? this.getCorrectNumber(category.results) : ''}/10</div>
          </div>
          <a class="category__name ${isPlayed ? 'played' : ''}" href="/quiz/${this.type}/${category.name}" data-link>${splittedName}</a>
          <a class="category__image image-loading ${!isPlayed ? 'inversed' : ''}"  href="/quiz/${this.type}/${category.name}" data-link>
              <img src="../img/category/${this.type}/${category.name}.webp" alt="${category.name} quiz">
          </a>
        </div>`)
    })

    this.categoriesHtml = items.join('\n')
  }

  async loadImages() {
    const images = []
    for (let i = 0; i < 12; i++) {
      const imageName = this.categories[i].name
      const url = `../img/category/${this.type}/${imageName}.webp`
      images.push(url)
    }

    const preloader = new ImagePreloader(images)
    await preloader.preloadImages()
  }

  async mounted() {
    const categoryBoxes = document.querySelectorAll('.category')
    categoryBoxes.forEach((box) => {
      box.classList.add('hidden')
      box.addEventListener('animationend', () => {
        box.classList.remove('hidden')
      })
    })

    await this.loadImages()
  }

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-categories">
                <a href="/" class="header-categories__nav header__nav--left header__nav btn" title="Back" data-link><span class="material-icons-round">chevron_left</span></a>
                <h1 class="header__title">${this.type}.</h1>
            </div>
        </div>
    </header>

    <main class="main loading">
        <div class="container">
            <div class="categories">
                ${this.categoriesHtml}
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="footer">
                <a class="footer__github" href="https://github.com/liliyavoloshina">liliyavoloshina</a>
                <div class="footer__year">© 2021</div>
                <a class="footer__school" href="https://rs.school/js/" title="Rolling Scopes School"></a>
            </div>
        </div>
    </footer>
    `
  }
}
