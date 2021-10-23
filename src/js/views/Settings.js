/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Settings')
  }

  getHtml() {
    return `
    <header>
        <div class="container">
            <div class="header header-settings">
                <a href="/" class="header-settings__nav btn" data-link><i class="fi fi-rr-angle-small-left"></i></a>
                <h1 class="header__title">Settings</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="settings">
                <div class="settings-block">
                    <i class="settings-block__icon fi fi-rr-volume"></i>
                    <div class="settings-block__input"><input class="range" type="range" id="volumeRange"></div>
                    <div class="settings-block__text">Volume</div>
                </div>
                <div class="settings-block">
                    <i class="settings-block__icon fi fi-rr-hourglass-end"></i>
                    <div class="settings-block__input">
                        <div class="checkbox">
                            <input id="timerInput" type="checkbox">
                            <label for="timerInput"><i class="fi fi-rr-check"></i></label>
                        </div>
                    </div>
                    <div class="settings-block__text">Timer</div>
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
