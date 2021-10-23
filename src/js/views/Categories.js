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
      { name: 'modern', items: [] },
      { name: 'surrealism', items: [] },
    ]
    this.categoriesHtml = ''
  }

  async mount() {
    await this.splitCategories()
    this.categoriesToHtml()
    this.test()
  }

  async test() {
    const res = await fetch('/data/images.json')
    const data = await res.json()
    data.sort((a, b) => a.year - b.year)
    const newM = data.map((el) => {
      if (el.year <= 1500) {
        return { ...el, category: 'renaissance' }
      }
      if (el.year > 1600 && el.year <= 1700) {
        return { ...el, category: 'classicism' }
      }
      if (el.year > 1700 && el.year <= 1820) {
        return { ...el, category: 'baroque' }
      }
      if (el.year > 1820 && el.year <= 1860) {
        return { ...el, category: 'expressionism' }
      }
      if (el.year > 1860 && el.year <= 1880) {
        return { ...el, category: 'impressionism' }
      }
      if (el.year > 1880 && el.year <= 1890) {
        return { ...el, category: 'modern' }
      }
      return { ...el, category: 'surrealism' }
    })

    console.log(newM)
  }

  async splitCategories() {
    // const res = await fetch('/data/artists.json')
    const res = await fetch('/data/images.json')
    const data = await res.json()

    data.forEach((el) => {
      if (el.year <= 1540) {
        this.categories.find((cat) => cat.name === 'renaissance').items.push(el)
      } else if (el.year > 1550 && el.year <= 1650) {
        this.categories.find((cat) => cat.name === 'classicism').items.push(el)
      } else if (el.year > 1650 && el.year <= 1800) {
        this.categories.find((cat) => cat.name === 'baroque').items.push(el)
      } else if (el.year > 1800 && el.year <= 1860) {
        this.categories
          .find((cat) => cat.name === 'expressionism')
          .items.push(el)
      } else if (el.year > 1860 && el.year <= 1880) {
        this.categories
          .find((cat) => cat.name === 'impressionism')
          .items.push(el)
      } else if (el.year > 1880 && el.year <= 1890) {
        this.categories.find((cat) => cat.name === 'modern').items.push(el)
      } else if (el.year > 1890) {
        this.categories.find((cat) => cat.name === 'surrealism').items.push(el)
      }
    })
  }

  categoriesToHtml() {
    const items = []
    this.categories.forEach((category) => {
      items.push(`<a class="category" href="category/artists/renaissance">
          <div class="category__score">
            <span class="score">10</span>/<span class="score-total">${category.items.length}</span>
           </div>
           <div class="category__name">${category.name}</div>
              <div class="category__image">
                <img src="../img/category/${category.name}.jpg" alt="${category.name}">
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
                <h1 class="header__title">artists.</h1>
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
