/* eslint-disable class-methods-use-this */

import View from './View'
import ScoreItem from '../../components/ScoreItem'
import ImagePreloader from '../helpers/ImagePreloader'

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
    const imageSrc = []
    const scoreCategory = this.results.find((el) => el.name === this.category && el.isPlayed)

    if (scoreCategory) {
      const { results } = scoreCategory
      results.forEach((item) => {
        const { isCorrect } = item

        if (isCorrect) {
          this.totalScore += 1
        }

        imageSrc.push(`/img/small/${item.imageNum}full.webp`)

        const scoreItem = new ScoreItem(isCorrect, item)
        scoreItem.mount(this.scoreContainer)
      })
    } else {
      this.scoreContainer.innerHTML = `
      <div class="restrictive-message">
        <h2 class="restrictive-message__title" data-langkey="res-mes-title"></h2>
        <p class="restrictive-message__info" data-langkey="res-mes-info"></p>
      </div>
      `
    }

    const preloader = new ImagePreloader(imageSrc)
    await preloader.preloadImages()
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
          <a href="/categories/${this.type}" class="header-score__nav header__nav--left header__nav btn" title="back" data-link><ion-icon name="chevron-back-outline"></ion-icon></a>
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
