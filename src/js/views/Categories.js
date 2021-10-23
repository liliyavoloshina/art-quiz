/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Categories')
    this.type = this.params.type
    this.categories = {
      renaissance: [],
      classicism: [],
      baroque: [],
      expressionism: [],
      impressionism: [],
      postimpressionism: [],
      modernism: [],
    }
    this.setCategories()
  }

  async setCategories() {
    const res = await fetch('/data/images.json')
    // const res = await fetch('/data/artists.json')
    const data = await res.json()
    data.forEach((el) => {
      if (el.year <= 1600) {
        this.categories.renaissance.push(el)
      } else if (el.year > 1600 && el.year <= 1700) {
        this.categories.baroque.push(el)
      } else if (el.year > 1700 && el.year <= 1820) {
        this.categories.classicism.push(el)
      } else if (el.year > 1820 && el.year <= 1860) {
        this.categories.impressionism.push(el)
      } else if (el.year > 1860 && el.year <= 1880) {
        this.categories.expressionism.push(el)
      } else if (el.year > 1880 && el.year <= 1890) {
        this.categories.postimpressionism.push(el)
      } else if (el.year > 1890) {
        this.categories.modernism.push(el)
      }
    })
    console.log(this.categories)
  }

  getHtml() {
    return `
    <header>
      <div class="container">
        <div class="header header-categories">
          <a href="/" class="header-categories__nav btn" data-link><i class="fi fi-rr-angle-small-left"></i></a>
          <h1 class="header__title">Categories of ${this.type}</h1>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="categories">
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
