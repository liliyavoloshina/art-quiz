/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Settings')
  }

  mounted() {}

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-settings">
                <a href="/" class="header-settings__nav btn" title="Back" data-link><span class="material-icons">home</span></a>
                <h1 class="header__title">settings.</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="settings">
                <div class="settings-block">
                    <div class="settings-block__image music"></div>
                    <div class="settings-block__input">
                        <div class="checkbox">
                            <input id="musicInput" type="checkbox">
                            <label for="musicInput"><i class="fi fi-rr-check"></i></label>
                        </div>
                        <input class="range" type="range" id="musicRange">
                    </div>
                    <div class="settings-block__text">music</div>
                </div>
                <div class="settings-block">
                    <div class="settings-block__image clock"></div>
                    <div class="settings-block__input">
                        <div class="checkbox">
                            <input id="timerInput" type="checkbox">
                            <label for="timerInput"><i class="fi fi-rr-check"></i></label>
                        </div>
                    </div>
                    <div class="settings-block__text">timer</div>
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
