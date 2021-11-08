/* eslint-disable class-methods-use-this, no-plusplus */

import View from './View'
import getData from '../helpers/getData'
import shuffle from '../helpers/shuffle'
import ImagePreloader from '../helpers/ImagePreloader'
import SliderTransformer from '../helpers/transformSlider'
import PlaySound from '../helpers/playSound'
import Timer from '../components/timer'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - blitz.')
    this.questions = []
    this.currentQuestion = 0
    this.questionTextEl = null
    this.shouldBeCorrect = null
    this.sliderTransformer = null
    this.playSound = null
    this.timerTimeout = false
    this.timerInterval = false
    this.totalTime = 5
    this.timeLeft = 5
  }

  findElements() {
    this.questionTextEl = document.querySelector('#blitzQuestion')
  }

  bind() {
    const answerBtns = document.querySelectorAll('.answer')
    answerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => this.answer(e))
    })
  }

  async getQuestions() {
    const q = await getData('all')
    this.questions = q.splice(0, 10)
    // shuffle(this.questions)
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

    const preloader = new ImagePreloader(srcForPreload)
    await preloader.preloadImages()

    const transitionImage = document.querySelector('.image')
    transitionImage.addEventListener('transitionend', () => {
      const answers = document.querySelectorAll('.answer')
      answers.forEach((btn) => {
        btn.classList.remove('correct')
        btn.classList.remove('incorrect')
      })
    })
  }

  getRandomAuthor(correctAuthor) {
    let randomAuthor = null

    while (randomAuthor === null) {
      const possibleAuthor = this.questions[Math.floor(Math.random() * this.questions.length)].author

      if (possibleAuthor !== correctAuthor) {
        randomAuthor = possibleAuthor
      }
    }

    return randomAuthor
  }

  generateQuestion() {
    this.shouldBeCorrect = Math.random() < 0.5
    let artistName = null
    const correctAuthor = this.questions[this.currentQuestion].author

    if (this.shouldBeCorrect) {
      artistName = correctAuthor
    } else {
      artistName = this.getRandomAuthor(correctAuthor)
    }

    this.questionTextEl.textContent = `is ${artistName} author of this picture?`
  }

  showNextQuestion() {
    this.sliderTransformer.transform(this.currentQuestion)
    this.generateQuestion()
  }

  answer(e) {
    const answerBtn = e.target
    const answer = !!e.target.dataset.answer
    const isCorrect = answer === this.shouldBeCorrect

    if (isCorrect) {
      answerBtn.classList.add('correct')
      this.updateTimer()
    } else {
      answerBtn.classList.add('incorrect')
    }

    this.playSound.play(isCorrect)

    this.currentQuestion++
    this.showNextQuestion()
  }

  showResults() {
    const modalResults = document.querySelector('#modalResult')
    modalResults.classList.remove('hidden')
    clearTimeout(this.timerTimeout)
    clearInterval(this.timerInterval)
  }

  updateTimer() {
    this.timeLeft += 10
    clearTimeout(this.timerTimeout)
    clearInterval(this.timerInterval)
    this.timer.stopTimer()

    this.timer = new Timer(this.timeLeft)
    this.timer.initTimer()
    this.setTimeout(this.timeLeft)
    this.setInterval()
  }

  setTimeout(value) {
    this.timerTimeout = setTimeout(() => {
      this.showResults()
    }, value * 1000)
  }

  setInterval() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--
    }, 1000)
  }

  async mounted() {
    this.findElements()
    this.bind()
    await this.getQuestions()
    await this.generateImages()
    this.generateQuestion()

    this.sliderTransformer = new SliderTransformer('blitz')
    this.playSound = new PlaySound(this.isWithSound, this.soundValue)
    this.timer = new Timer(this.totalTime)
    this.timer.initTimer()
    this.setTimeout(this.totalTime)
    this.setInterval()
  }

  mount() {
    return `
    <header>
      <div class="container">
        <div class="header header-quiz">
          <a href="/" class="header-quiz__nav header__nav header__nav--left btn" id="backBtn" data-link><span class="material-icons-round">home</span></a>
          <div class="timer">
            <div class="timer__added-time" id="addedTime"></div>
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
          <div class="blitz__question" id="blitzQuestion"></div>
          <div class="blitz-slider">
            <div class="blitz__images" id="blitzImages"></div>
          </div>
          <div class="blitz__answers" id="blitzAnswers">
            <button class="answer-btn answer" data-answer="true">yes</button>
            <button class="answer-btn answer" data-answer="">no</button>
          </div>
        </div>
      </div>
    </main>

    <div class="modal-center hidden" id="modalResult">
      <div class="modal-center__content">
        <div class="modal-center__title" id="resultsText"></div>
        <div class="modal-center__info"><span id="correctAnswersCount"></span>/10</div>
        <div class="modal-center__actions">
          <a href="/" class="btn" id="homeBtn" data-link>home</a>
          <a href="/blitz" class="btn" id="nextQuizBtn" data-link>try again?</a>
        </div>
    </div>
    
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
