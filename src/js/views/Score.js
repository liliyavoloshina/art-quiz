/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - score')
    this.type = this.params.type
    this.category = this.params.category
    this.scoreHtml = ''
    this.scoreToHtml()
  }

  mounted() {}

  scoreToHtml() {
    const items = []
    const scoreCategories = this.categories.filter((el) => el.name === this.category)
    console.log(scoreCategories)

    this.scoreHtml = items.join('\n')
  }

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-score">
                <a href="/" class="header-score__nav btn" data-link><i class="fi fi-rr-angle-small-left"></i></a>
                <h1 class="header__title">${this.type}.</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="score">
                ${this.scoreHtml}
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
