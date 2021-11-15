/* eslint-disable class-methods-use-this */

import View from './View'
import Checkbox from '../../components/Checkbox'
import { setToLocalStorage } from '../helpers/utils'

export default class extends View {
  constructor(params) {
    super(params)
    const title = this.langValue === 'en' ? 'settings' : 'настройки'
    this.setTitle(`artquiz. - ${title}.`)
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

    const transitionEndCallback = () => {
      this.timerInput.removeEventListener('animationend', transitionEndCallback)
      this.timerInput.classList.remove('changed')
    }

    this.timerInput.addEventListener('animationend', transitionEndCallback)

    this.timerInput.value = this.timerValue

    setToLocalStorage('timerValue', this.timerValue)
  }

  bindListeners() {
    this.soundRange.addEventListener('input', (e) => {
      const volumeForAudio = (e.target.value * 0.01).toFixed(2)
      setToLocalStorage('soundValue', volumeForAudio)
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
    const soundCheckboxContainer = document.querySelector('#soundCheckboxContainer')
    const soundCheckbox = new Checkbox('soundCheckbox', 'isWithSound', this.isWithSound)
    soundCheckbox.mount(soundCheckboxContainer)

    const timerCheckboxContainer = document.querySelector('#timerCheckboxContainer')
    const timerCheckbox = new Checkbox('timerCheckbox', 'isWithTimer', this.isWithTimer)
    timerCheckbox.mount(timerCheckboxContainer)

    this.soundRange = document.querySelector('#soundRange')
    this.decrTimerBtn = document.querySelector('#decrTimerBtn')
    this.incrTimerBtn = document.querySelector('#incrTimerBtn')
    this.timerInput = document.querySelector('#timerInput')
    this.swicthLangEn = document.querySelector('#swicthLangEn')
    this.swicthLangRu = document.querySelector('#swicthLangRu')

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
                <a href="/" class="header-settings__nav header__nav header__nav--left btn" title="back" data-link><ion-icon name="chevron-back-outline"></ion-icon></a>
                <h1 class="header__title" data-langkey="header">settings.</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container container-settings">
            <div class="settings">
                <div class="settings-block">
                    <div class="settings-block__input" id="soundCheckboxContainer"></div>
                    <div class="settings-block__input regulation">
                        <input class="range" type="range" min="1" id="soundRange">
                    </div>
                    <div class="settings-block__text" data-langkey="music">music</div>
                </div>
                <div class="settings-block">
                    <div class="settings-block__input" id="timerCheckboxContainer"></div>
                    <div class="settings-block__input regulation">
                        <div class="input-number">
                          <button class="input-number__btn" type="number" id="decrTimerBtn"><ion-icon name="remove-sharp"></ion-icon></button>
                          <input class="input-number__input" type="number" id="timerInput" disabled>
                          <button class="input-number__btn" type="number" id="incrTimerBtn"><ion-icon name="add-sharp"></ion-icon></button>
                        </div>
                    </div>
                    <div class="settings-block__text" data-langkey="timer">timer</div>
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
                    <div class="settings-block__text" data-langkey="language">language</div>
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
