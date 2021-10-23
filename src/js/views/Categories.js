/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Categories')
    this.type = this.params.type
    this.categories = [
      { name: 'renaissance', items: [] },
      { name: 'classicism', items: [] },
      { name: 'baroque', items: [] },
      { name: 'expressionism', items: [] },
      { name: 'impressionism', items: [] },
      { name: 'postimpressionism', items: [] },
      { name: 'modernism', items: [] },
    ]
    this.categoriesHtml = ''
    this.setCategories()
    this.categoriesToHtml()
  }

  async setCategories() {
    const res = await fetch('/data/images.json')
    const data = await res.json()
    data.forEach((el) => {
      if (el.year <= 1600) {
        this.categories.find((cat) => cat.name === 'renaissance').items.push(el)
      } else if (el.year > 1600 && el.year <= 1700) {
        this.categories.find((cat) => cat.name === 'classicism').items.push(el)
      } else if (el.year > 1700 && el.year <= 1820) {
        this.categories.find((cat) => cat.name === 'baroque').items.push(el)
      } else if (el.year > 1820 && el.year <= 1860) {
        this.categories
          .find((cat) => cat.name === 'expressionism')
          .items.push(el)
      } else if (el.year > 1860 && el.year <= 1880) {
        this.categories
          .find((cat) => cat.name === 'impressionism')
          .items.push(el)
      } else if (el.year > 1880 && el.year <= 1890) {
        this.categories
          .find((cat) => cat.name === 'postimpressionism')
          .items.push(el)
      } else if (el.year > 1890) {
        this.categories.find((cat) => cat.name === 'modernism').items.push(el)
      }
    })
  }

  categoriesToHtml() {
    const items = []
    this.categories.forEach((category) => {
      items.push(`<a class="category" href="category/artists/renaissance">
          <div class="category__score">
            <span class="score">10</span>/<span class="score-total">10</span>
           </div>
           <div class="category__name">${category.name}</div>
              <div class="category__image">
                <img src="../img/category/renaissance.jpg" alt="Renaissance">
            </div>
        </a>`)
    })

    this.categoriesHtml = items.join('\n')
  }

  getHtml() {
    return `
    <header>
        <div class="container">
            <div class="header header-categories">
                <a href="/" class="header-categories__nav btn" data-link><i class="fi fi-rr-angle-small-left"></i></a>
                <h1 class="header__title">Artists</h1>
            </div>
        </div>
    </header>

    <main class="main">
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
