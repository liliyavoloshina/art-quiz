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

  categoriesToHtml() {
    const items = []
    this.categories.forEach((category) => {
      const { isPlayed } = category
      items.push(`
        <div class="category">
          <div class="category__header">
          <a class="category__score btn ${!isPlayed ? 'hidden' : ''}" href="/score/${this.type}/${category.name}" data-link>
            <span class="material-icons-round">star</span>
          </a>
            <div class="category__results ${!isPlayed ? 'hidden' : ''}">${category.results.length}/10</div>
          </div>
          <a class="category__name" href="/quiz/${this.type}/${category.name}" data-link>${category.name}</a>
          <a class="category__image ${!isPlayed ? 'inversed' : ''}"  href="/quiz/${this.type}/${category.name}" data-link>
              <img src="../img/category/${category.name}.jpg" alt="${category} quiz">
          </a>
        </div>`)
    })

    this.categoriesHtml = items.join('\n')
  }

  mounted() {
    const categoryBoxes = document.querySelectorAll('.category')
    categoryBoxes.forEach((box) => {
      box.classList.add('hidden')
      box.addEventListener('animationend', () => {
        box.classList.remove('hidden')
      })
    })
  }

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-categories">
                <a href="/" class="header-categories__nav btn" title="Back" data-link><span class="material-icons-round">chevron_left</span></a>
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
