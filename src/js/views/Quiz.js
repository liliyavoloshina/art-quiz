/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Quiz')
  }

  getHtml() {
    return `
    <header>
      <div class="container">
        <div class="header header-home">
            <a href="/settings" class="header-home__nav btn" data-link><i class="fi fi-rr-settings"></i></a>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="quiz">
          <h1>quiz!!!</h1>
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
