/* eslint-disable class-methods-use-this */
import View from './View'

export default class extends View {
  constructor(params) {
    super({ ...params, name: 'score' })
    this.setTitle('artquiz. - score')
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
                    <div class="popup-score__name">${item.name}</div>
                    <div class="popup-score__author">${item.author}</div>
                    <div class="popup-score__year">${item.year}</div>
                </div>
            </div>
                `
        )
      })
    } else {
      await this.getFullCategory()
      this.scoreCategory.forEach((item) => {
        items.push(
          `<div class="score__item">
                <div class="score__img inversed">
                    <img src="/img/small/${item.imageNum}full.webp" alt="${item.name}" />
                </div>
                <div class="popup-score hidden">
                    <div class="popup-score__name">${item.name}</div>
                    <div class="popup-score__author">${item.author}</div>
                    <div class="popup-score__year">${item.year}</div>
                </div>
            </div>
                `
        )
      })
    }

    this.scoreHtml.innerHTML = items.join('\n')
  }

  bindListeners() {
    const items = document.querySelectorAll('.score__item')
    items.forEach((item) => {
      const popup = item.querySelector('.popup-score')
      item.addEventListener('click', () => {
        popup.classList.toggle('hidden')
      })
    })
  }

  async getFullCategory() {
    const res = await fetch(`/data/${this.type}.json`)
    const data = await res.json()
    this.scoreCategory = data.filter((el) => el.genre === this.category)
  }

  async mounted() {
    this.scoreHtml = document.querySelector('#scoreHtml')
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
        <div class="score" id="scoreHtml"></div>
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
