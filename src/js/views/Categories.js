/* eslint-disable class-methods-use-this, no-plusplus */

import View from './View'
import ImagePreloader from '../helpers/ImagePreloader'
import Category from '../../components/Category'

export default class extends View {
  constructor(params) {
    super(params)
    const title = this.langValue === 'en' ? 'categories' : 'категории'
    this.setTitle(`artquiz. - ${title}.`)
    this.type = this.params.type
    this.correctResults = this.results
  }

  getCorrectNumber(results) {
    if (!results) return null
    const correctResults = results.filter((item) => item.isCorrect)
    return correctResults.length
  }

  categoriesToHtml() {
    const categoriesContainer = document.querySelector('#categoriesContainer')

    this.results.forEach((category) => {
      const { isPlayed } = category
      const splittedName = category.name.split('-').join(' ')
      const correctNumber = this.getCorrectNumber(category.results)

      const categoryCard = new Category(isPlayed, this.type, category.name, correctNumber, splittedName)
      categoryCard.mount(categoriesContainer)
    })
  }

  async loadImages() {
    const images = []
    for (let i = 0; i < 12; i++) {
      const imageName = this.results[i].name
      const url = `../img/category/${this.type}/${imageName}.webp`
      images.push(url)
    }

    const preloader = new ImagePreloader(images)
    await preloader.preloadImages()
  }

  async mounted() {
    this.categoriesToHtml()
    this.translatePage()
    await this.loadImages()
  }

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-categories">
                <a href="/" class="header-categories__nav header__nav--left header__nav btn" title="Back" data-link><ion-icon name="chevron-back-outline"></ion-icon></a>
                <h1 class="header__title"><span data-langkey="${this.type}"></span>.</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="categories" id="categoriesContainer"></div>
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
