/* eslint-disable class-methods-use-this */
import getData from '../helpers/getData'
import shuffle from '../helpers/shuffle'
import View from './View'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - blitz.')
    this.questions = []
  }

  async generateImages() {
    const items = []
    const srcForPreload = []

    this.questions.forEach(async (question) => {
      srcForPreload.push(`/img/full/${question.imageNum}full.webp`)
      const item = `
        <div class="image image-loading">
            <img
              class="image__img"
              src="/img/full/${question.imageNum}full.webp"
              alt=""
            />
          </div>
        `
      items.push(item)
    })

    const imagesHtml = items.join('\n')
    const images = document.querySelector('#blitzImages')
    images.innerHTML = imagesHtml

    // const preloader = new ImagePreloader(srcForPreload)

    // await preloader.preloadImages()
  }

  async getQuestions() {
    this.questions = await getData('all')
    shuffle(this.questions)
  }

  async mounted() {
    await this.getQuestions()
    await this.generateImages()
    console.log(this.questions)
  }

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
          <div class="blitz-slider">
            <div class="blitz__images blitz" id="blitzImages"></div>
          </div>
          <div class="blitz__answers" id="blitzAnswers">
            <button class="answer-btn answer"></button>
            <button class="answer-btn answer"></button>
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
