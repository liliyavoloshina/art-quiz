/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Categories')
    this.type = this.params.type
    this.categories = [
      'baroque',
      'historical',
      'impressionism',
      'landscape',
      'modernism',
      'portrait',
      'realism',
      'renaissance',
      'romanticism',
      'symbolism',
    ]
    this.categoriesHtml = ''
    this.categoriesToHtml()
  }

  mounted() {}

  categoriesToHtml() {
    const items = []
    this.categories.forEach((category) => {
      items.push(`
        <a class="category" href="/quiz/${this.type}/${category}" data-link>
          <div class="category__score">
            <span class="score">10</span>/<span class="score-total">20</span>
           </div>
           <div class="category__name">${category}</div>
              <div class="category__image">
                <img src="../img/category/${category}.jpg" alt="${category} quiz">
            </div>
        </a>`)
    })

    this.categoriesHtml = items.join('\n')
  }

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-categories">
                <a href="/" class="header-categories__nav btn" data-link><i class="fi fi-rr-angle-small-left"></i></a>
                <h1 class="header__title">${this.type}.</h1>
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
