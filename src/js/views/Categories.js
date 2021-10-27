/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - categories')
    this.type = this.params.type
    this.categoriesHtml = ''
    this.categoriesToHtml()
  }

  // <a href="/score/${this.type}/${category.name}" data-link>score</a>

  mounted() {}

  categoriesToHtml() {
    const items = []
    this.categories.forEach((category) => {
      const { isPlayed } = category
      items.push(`
      <a href="/score/${this.type}/${category.name}" data-link>score</a>
        <a class="category" href="/quiz/${this.type}/${category.name}" data-link>
          <div class="category__header">
            <div class="category__score ${!isPlayed ? 'hidden' : ''}">${category.results.length}/10</div>
          </div>
           <div class="category__name">${category.name}</div>
              <div class="category__image ${!isPlayed ? 'inversed' : ''}">
                <img src="../img/category/${category.name}.jpg" alt="${category} quiz">
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
