/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Home')
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
        <div class="home">
          <div class="home-logo"></div>
          <div class="home-types">
            <a class="home-types__type" href="/categories/artists" data-link>
              <div class="home-types__image artist"></div>
              <div class="home-types__text">Artists Quiz</div>
            </a>
            <a class="home-types__type" href="/categories/pictures" data-link>
              <div class="home-types__image pictures"></div>
              <div class="home-types__text">Pictures Quiz</div>
             </a>
          </div>
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
