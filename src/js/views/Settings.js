/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor() {
    super({ name: 'settings' })
    this.setTitle('artquiz. - settings')
    this.soundCheckbox = null
    this.timerCheckbox = null
  }

  updateSettings(name, value) {
    localStorage.setItem(name, value)
  }

  updateLang(value) {
    localStorage.setItem('langValue', value)
    this.langValue = value
    this.translatePage()
  }

  changeTimerValue(type) {
    if (type === 'decr') {
      if (this.timerValue <= 30 && this.timerValue > 5) {
        this.timerValue -= 5
      }
    }

    if (type === 'incr') {
      if (this.timerValue < 30 && this.timerValue >= 5) {
        this.timerValue += 5
      }
    }

    this.timerInput.classList.add('changed')
    this.timerInput.addEventListener('transitionend', () => {
      this.timerInput.classList.remove('changed')
    })

    this.timerInput.value = this.timerValue

    this.updateSettings('timerValue', this.timerValue)
  }

  bindListeners() {
    this.soundCheckbox.addEventListener('change', (e) => {
      this.updateSettings('isWithSound', e.target.checked)
    })

    this.timerCheckbox.addEventListener('change', (e) => {
      this.updateSettings('isWithTimer', e.target.checked)
    })

    this.soundRange.addEventListener('input', (e) => {
      const volumeForAudio = (e.target.value * 0.01).toFixed(2)
      this.updateSettings('soundValue', volumeForAudio)
    })

    this.incrTimerBtn.addEventListener('click', () => {
      this.changeTimerValue('incr')
    })

    this.decrTimerBtn.addEventListener('click', () => {
      this.changeTimerValue('decr')
    })

    this.swicthLangEn.addEventListener('change', () => {
      this.updateLang('en')
    })

    this.swicthLangRu.addEventListener('change', () => {
      this.updateLang('ru')
    })
  }

  mounted() {
    this.soundCheckbox = document.querySelector('#soundCheckbox')
    this.timerCheckbox = document.querySelector('#timerCheckbox')
    this.soundRange = document.querySelector('#soundRange')
    this.decrTimerBtn = document.querySelector('#decrTimerBtn')
    this.incrTimerBtn = document.querySelector('#incrTimerBtn')
    this.timerInput = document.querySelector('#timerInput')
    this.swicthLangEn = document.querySelector('#swicthLangEn')
    this.swicthLangRu = document.querySelector('#swicthLangRu')

    this.soundCheckbox.checked = this.isWithSound
    this.timerCheckbox.checked = this.isWithTimer

    this.soundRange.value = this.soundValue * 100
    this.timerInput.value = this.timerValue

    if (this.langValue === 'en') {
      this.swicthLangEn.checked = true
    } else {
      this.swicthLangRu.checked = true
    }

    this.bindListeners()
    this.translatePage()
  }

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-settings">
                <a href="/" class="header-settings__nav header__nav header__nav--left btn" title="Back" data-link><span class="material-icons-round">chevron_left</span></a>
                <h1 class="header__title" data-langkey="header-settings">settings.</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container container-settings">
            <div class="settings">
                <div class="settings-block">
                    <div class="settings-block__input">
                        <div class="checkbox">
                            <input id="soundCheckbox" type="checkbox">
                            <label for="soundCheckbox"><span class="material-icons-round">done</span></label>
                        </div>
                    </div>
                    <div class="settings-block__input regulation">
                        <input class="range" type="range" min="1" id="soundRange">
                    </div>
                    <div class="settings-block__text">music</div>
                </div>
                <div class="settings-block">
                    <div class="settings-block__input">
                        <div class="checkbox">
                            <input id="timerCheckbox" type="checkbox">
                            <label for="timerCheckbox"><span class="material-icons-round">done</span></label>
                        </div>
                    </div>
                    <div class="settings-block__input regulation">
                        <div class="input-number">
                          <button class="input-number__btn" type="number" id="decrTimerBtn"><span class="material-icons-round">remove</span></button>
                          <input class="input-number__input" type="number" id="timerInput" disabled>
                          <button class="input-number__btn" type="number" id="incrTimerBtn"><span class="material-icons-round">add</span></button>
                        </div>
                    </div>
                    <div class="settings-block__text">timer</div>
                </div>
                <div class="settings-block">
                    <div class="settings-block__input-radios regulation"><span>en</span><span>ru</span></div>
                    <div class="settings-block__input-radios regulation">
                      <div class="radio">
                        <input id="swicthLangEn" type="radio" name="radio" value="en">
                        <label for="swicthLangEn"></label>
                      </div>
                      <div class="radio">
                        <input id="swicthLangRu" type="radio" name="radio" value="ru">
                        <label for="swicthLangRu"></label>
                      </div>
                    </div>
                    <div class="settings-block__text">language</div>
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
