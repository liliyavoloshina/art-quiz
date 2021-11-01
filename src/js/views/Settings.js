/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - settings')
    this.soundCheckbox = null
    this.timerCheckbox = null
  }

  updateSettings(name, value) {
    localStorage.setItem(name, value)
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
  }

  mounted() {
    this.soundCheckbox = document.querySelector('#soundCheckbox')
    this.timerCheckbox = document.querySelector('#timerCheckbox')
    this.soundRange = document.querySelector('#soundRange')
    this.decrTimerBtn = document.querySelector('#decrTimerBtn')
    this.incrTimerBtn = document.querySelector('#incrTimerBtn')
    this.timerInput = document.querySelector('#timerInput')

    this.soundCheckbox.checked = this.isWithSound
    this.timerCheckbox.checked = this.isWithTimer

    this.soundRange.value = this.soundValue * 100
    this.timerInput.value = this.timerValue
    this.bindListeners()
  }

  mount() {
    return `
    <header>
        <div class="container">
            <div class="header header-settings">
                <a href="/" class="header-settings__nav header__nav header__nav--left btn" title="Back" data-link><span class="material-icons-round">chevron_left</span></a>
                <h1 class="header__title">settings.</h1>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="settings">
                <div class="settings-block">
                    <div class="settings-block__input">
                        <div class="checkbox">
                            <input id="soundCheckbox" type="checkbox">
                            <label for="soundCheckbox"><span class="material-icons-round">done</span></label>
                        </div>
                    </div>
                    <div class="settings-block__input">
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
                    <div class="settings-block__input">
                        <div class="input-number">
                          <button class="input-number__btn" type="number" id="decrTimerBtn"><span class="material-icons-round">remove</span></button>
                          <input class="input-number__input" type="number" id="timerInput" disabled>
                          <button class="input-number__btn" type="number" id="incrTimerBtn"><span class="material-icons-round">add</span></button>
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
