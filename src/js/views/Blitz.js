/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - blitz.')
  }

  mounted() {}

  mount() {
    return `
    <header>
      <div class="container">
        <div class="header header-quiz">
          <a href="/" class="header-quiz__nav header__nav header__nav--left btn" id="backBtn" data-link><span class="material-icons-round">home</span></a>
          <div class="timer">
            <div class="timer__display">
              <div class="display seconds"></div>
            </div>
            <svg
            class="circle"
            x="0px"
            y="0px"
            width="500px"
            height="500px"
            viewBox="0 0 521.17 521.17"
            >
              <circle cx="260.59" cy="260.59" r="253.09" stroke-width="18" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="blitz">
          
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
