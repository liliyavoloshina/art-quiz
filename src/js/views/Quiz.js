/* eslint-disable class-methods-use-this */
import View from './View'
// import Timer from '../components/timer'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Quiz')
    this.type = params.type
    this.category = params.category

    this.allQuestions = []
    this.questions = []
  }

  async getQuestions() {
    const res = await fetch(`/data/${this.type}.json`)
    const data = await res.json()
    this.allQuestions = data
    // this.filterQuestions()
  }

  async filterQuestions() {
    this.questions = this.allQuestions.filter((question) => question.genre === this.category)
  }

  generateImages() {
    const items = []
    if (this.type === 'artists') {
      this.questions.forEach((question) => {
        items.push(`
        <div class="image artists">
            <img
              src="/img/artists.jpg"
              alt=""
            />
          </div>
        `)
      })
    }

    const imagesHtml = items.join('\n')
    const images = document.querySelector('#images')
    images.innerHTML = imagesHtml
  }

  async mounted() {
    // const timer = new Timer()
    // timer.initTimer()

    await this.getQuestions()
    await this.filterQuestions()
    this.generateImages()
  }

  mount() {
    return `
    <header>
    <div class="container">
      <div class="header header-quiz">
        <a href="/" class="header-quiz__nav btn" title="Home" data-link><i class="fi fi-rr-home"></i></a>
        <div class="timer">
          <div class="timer__pauses"><span id="pauses">0</span>/2</div>
          <div class="timer__display">
            <div class="display minute"></div>
            <span class="display colon">:</span>
            <div class="display seconds"></div>
          </div>
          <svg
            class="circle"
            x="0px"
            y="0px"
            width="500px"
            height="500px"
            viewBox="0 0 521.17 521.17"
            style="overflow: visible; enable-background: new 0 0 521.17 521.17"
          >
            <circle class="st0" cx="260.59" cy="260.59" r="253.09" />
          </svg>
        </div>
      </div>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <div class="quiz">
        <div class="quiz__question">Who is the author of this picture?</div>
        <div class="quiz__images" id="images"></div>
        <div class="quiz__pag">
          <div class="success"></div>
          <div class="failure"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="quiz__answers">
          <div class="answer">Pablo Picasso</div>
          <div class="answer">Pieter Bruegel the Elder</div>
          <div class="answer">Pieter Bruegel the Elder</div>
          <div class="answer">Peter Paul Rubens</div>
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

  <div class="modal hidden">
    <div class="modal__status"><i class="fi fi-rr-check"></i></div>
    <div class="modal__main">
      <div class="modal__image">
        <img
          src="https://images.unsplash.com/photo-1496889196885-5ddcec5eef4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
      <div class="modal__text">
        <div class="name">Girl with a Pearl Earring</div>
        <div class="author">Johannes Vermeer</div>
        <div class="year">1665</div>
      </div>
    </div>
    <div class="modal__btn">
      <button class="btn-lg">next</button>
    </div>
  </div>
    `
  }
}
