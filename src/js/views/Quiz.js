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
        <div class="header header-quiz">
            <a href="/" class="header-quiz__nav btn" title="Home" data-link><i class="fi fi-rr-home"></i></a>
            <div class="timer">
            <div class="timer__display">
                <div class="display minute"></div>
                <span class="display colon">:</span>
                <div class="display seconds"></div>
            </div>
            <svg class="circle" x="0px" y="0px" width="500px" height="500px" viewBox="0 0 521.17 521.17"
                style="overflow: visible; enable-background: new 0 0 521.17 521.17">
                <circle class="st0" cx="260.59" cy="260.59" r="253.09" />
            </svg>
        </div>
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
