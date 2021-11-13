/* eslint-disable class-methods-use-this */

import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    const title = this.langValue === 'en' ? 'score' : 'результаты'
    this.setTitle(`artquiz. - ${title}.`)
    this.type = this.params.type
    this.category = this.params.category
    this.totalScore = 0
  }

  async setHeader() {
    const scoreHeader = document.querySelector('#scoreHeader')
    let categoryHeader
    let typeHeader

    if (this.langValue === 'en') {
      categoryHeader = this.category
      typeHeader = this.type
      scoreHeader.textContent = `${categoryHeader} ${typeHeader}`
    } else {
      categoryHeader = this.translator.data[this.category]
      typeHeader = this.type === 'pictures' ? 'картины' : 'художники'
      scoreHeader.textContent = `${typeHeader} ${categoryHeader}`
    }
  }

  async scoreToHtml() {
    const items = []
    const scoreCategory = this.results.find((el) => el.name === this.category)
    const { results } = scoreCategory

    if (scoreCategory.isPlayed) {
      results.forEach((item) => {
        const { isCorrect } = item
        if (isCorrect) {
          this.totalScore += 1
        }
        items.push(
          `<div class="score__item">
                <div class="score__img ${!isCorrect ? 'inversed' : ''}">
                  <img src="/img/small/${item.imageNum}full.webp" alt="${item.name}" />
                </div>
                <div class="popup-score hidden">
                    <div class="popup-score__name">"${item.name}"</div>
                    <div class="popup-score__author">${item.author}</div>
                    <div class="popup-score__year">${item.year}</div>
                </div>
            </div>
                `
        )
      })
    } else {
      items.push(`
      <div class="restrictive-message">
        <h2 class="restrictive-message__title">You have no access to this page</h2>
        <p class="restrictive-message__info">You should play this category first :)</p>
      </div>
      `)
    }

    this.scoreContainer.innerHTML = items.join('\n')
  }

  bindListeners() {
    this.scoreContainer.addEventListener('click', (e) => {
      const { target } = e
      const isScoreItem = target.classList.contains('score__item')

      if (isScoreItem) {
        const popup = target.querySelector('.popup-score')
        popup.classList.toggle('hidden')
      }
    })
  }

  async mounted() {
    this.scoreContainer = document.querySelector('#scoreContainer')
    await this.scoreToHtml()
    await this.translatePage()
    this.setHeader()

    const totalScore = document.querySelector('#totalScore')
    totalScore.textContent = this.totalScore
    this.bindListeners()
  }

  mount() {
    return `
    <header>
      <div class="container">
        <div class="header header-score">
          <a href="/" class="header-score__nav header__nav--left header__nav btn" data-link><span class="material-icons-round">home</span></a>
          <h1 class="header__title" data-langkey="score">score.</h1>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="score-header"><span id="scoreHeader"></span>: <span id="totalScore"></span>/10</div>
        <div class="score" id="scoreContainer"></div>
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
