/* eslint-disable class-methods-use-this, no-plusplus, no-param-reassign */

import View from './View'
import ImagePreloader from '../helpers/ImagePreloader'
import PlaySound from '../helpers/PlaySound'
import Timer from '../../components/Timer'
import Confetti from '../components/Confetti'
import { shuffle, getData } from '../helpers/utils'
import { IMAGES_ALL_COUNT, TIME_FOR_BLITZ } from '../helpers/constants'

export default class extends View {
  constructor(params) {
    super({ ...params, type: 'blitz' })
    const title = this.langValue === 'en' ? 'blitz' : 'быстрая игра'
    this.setTitle(`artquiz. - ${title}.`)
    this.questions = []
    this.correctAnswers = 0
    this.currentQuestion = 0
    this.timerTimeout = false
    this.timerInterval = false
    this.totalTime = TIME_FOR_BLITZ
    this.timeLeft = this.totalTime
  }

  findElements() {
    this.questionTextEl = document.querySelector('#blitzQuestion')
    this.header = document.querySelector('#header')
  }

  bind() {
    const answerBtns = document.querySelectorAll('.answer')
    answerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => this.answer(e))
    })
  }

  observeLocation() {
    const backBtn = document.querySelector('#backBtn')
    const homeBtn = document.querySelector('#homeBtn')
    const nextQuizBtn = document.querySelector('#nextQuizBtn')

    backBtn.addEventListener('click', () => {
      this.stopTimer()
    })

    homeBtn.addEventListener('click', () => {
      this.soundResults.pause()
    })

    nextQuizBtn.addEventListener('click', () => {
      this.soundResults.pause()
    })

    window.addEventListener('popstate', () => {
      this.stopTimer()

      if (this.soundResults) {
        this.soundResults.pause()
      }
    })
  }

  async getQuestions() {
    const artists = await getData('artists', this.langValue)
    const pictures = await getData('pictures', this.langValue)
    this.questions = [...artists, ...pictures]
    shuffle(this.questions)
  }

  async generateImages() {
    const srcForPreload = []

    this.questions.forEach(async (question) => {
      srcForPreload.push(`/img/full/${question.imageNum}full.webp`)
    })

    const preloader = new ImagePreloader(srcForPreload)
    await preloader.preloadImages('four')

    this.showImage()
  }

  showImage() {
    const image = document.querySelector('#blitzImage')

    if (!image) return

    image.src = `/img/full/${this.questions[this.currentQuestion].imageNum}full.webp`
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

    this.questionTextEl.textContent = this.langValue === 'en' ? `is ${artistName} author of this picture?` : `${artistName} написал эту картину?`
  }

  showNextQuestion() {
    const answers = document.querySelectorAll('.answer')

    setTimeout(() => {
      answers.forEach((btn) => {
        btn.disabled = false
        btn.classList.remove('disabled')
        btn.classList.remove('correct')
        btn.classList.remove('incorrect')
      })
    }, 200)

    this.showImage()
    this.generateQuestion()
  }

  answer(e) {
    const answerBtn = e.target
    const answer = !!e.target.dataset.answer
    const isCorrect = answer === this.shouldBeCorrect

    if (isCorrect) {
      answerBtn.classList.add('correct')
      this.correctAnswers++
      this.updateTimer('correct')
    } else {
      answerBtn.classList.add('incorrect')
      this.updateTimer('wrong')
    }

    answerBtn.classList.add('disabled')
    answerBtn.disabled = true

    this.playSound.play(isCorrect)

    if (this.currentQuestion === IMAGES_ALL_COUNT) {
      this.showResults()
      return
    }

    this.currentQuestion++
    this.showNextQuestion()
  }

  updateResults() {
    this.results.push({ wins: this.correctAnswers })
    localStorage.setItem(`blitzResults`, JSON.stringify(this.results))
  }

  showResults() {
    this.updateResults()
    const modalResults = document.querySelector('#modalResult')
    const resultsText = document.querySelector('#resultsText')
    const correctAnswersCount = document.querySelector('#correctAnswersCount')
    const record = document.querySelector('#record')
    const isNotMax = this.results.some((el) => el.wins > this.correctAnswers)

    this.soundResults = new Audio()
    this.soundResults.volume = this.soundValue

    let recordText
    if (isNotMax) {
      recordText = this.langValue === 'en' ? `you can do better!` : `ты можешь лучше!`
      this.soundResults.src = '/audio/failure.wav'
    } else {
      recordText = this.langValue === 'en' ? `this is your record!` : 'это твой рекорд!'
      this.soundResults.src = '/audio/applause.wav'

      const confetti = new Confetti()
      confetti.init()
    }

    if (this.isWithSound) {
      this.soundResults.play()
    }

    record.textContent = recordText
    resultsText.textContent = this.langValue === 'en' ? `this is your ${this.results.length} time` : `это твоя ${this.results.length} игра`
    correctAnswersCount.textContent = this.langValue === 'en' ? `and you answer ${this.correctAnswers} correct!` : `и ты ответил на ${this.correctAnswers} вопросов правильно!`
    modalResults.classList.remove('hidden')
    this.stopTimer()
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timerTimeout)
      clearInterval(this.timerInterval)
      this.timer.stopTimer()
    }
  }

  updateTimer(type) {
    const addedTime = document.querySelector('#addedTime')
    addedTime.classList.remove('hidden')

    if (type === 'correct') {
      this.timeLeft += 2
      addedTime.classList.remove('incorrect')
      addedTime.textContent = '+2'
    } else {
      this.timeLeft -= 2
      addedTime.textContent = '-2'
      addedTime.classList.add('incorrect')
    }

    this.stopTimer()

    if (this.timeLeft >= TIME_FOR_BLITZ) {
      this.timeLeft = this.totalTime
    }

    this.destroyTimer()
    this.initTimer()
    this.setTimeout(this.timeLeft)
    this.setInterval()

    setTimeout(() => {
      addedTime.classList.add('hidden')
    }, 800)
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

  destroyTimer() {
    const timer = document.querySelector('.timer')
    this.header.removeChild(timer)
  }

  initTimer() {
    this.timer = new Timer(this.timeLeft, 'blitz')
    this.timer.mount(this.header)
    this.timer.initTimer()
  }

  async mounted() {
    this.findElements()
    this.observeLocation()
    this.bind()
    await this.getQuestions()
    await this.generateImages()
    this.generateQuestion()

    this.playSound = new PlaySound(this.isWithSound, this.soundValue)

    this.initTimer()
    this.setTimeout(this.totalTime)
    this.setInterval()
    this.translatePage()
  }

  mount() {
    return `
    <header>
      <div class="container">
        <div class="header header-quiz" id="header">
          <a href="/" class="header-quiz__nav header__nav header__nav--left btn" id="backBtn" data-link><ion-icon name="home"></ion-icon></a>
        </div>
      </div>
    </header>

    <main class="main main-fullheight">
      <div class="container">
        <div class="blitz">
          <div class="blitz__question" id="blitzQuestion"></div>
          <div class="blitz__image image-loading">
            <img
              id="blitzImage"
              src="/img/full/200full.webp"
              alt=""
            />
          </div>
          <div class="blitz__answers" id="blitzAnswers">
            <button class="answer-btn answer" data-answer="true" data-langkey="yes">yes</button>
            <button class="answer-btn answer" data-answer="" data-langkey="no">no</button>
          </div>
        </div>
      </div>
    </main>

    <div class="modal-center hidden" id="modalResult">
      <div class="modal-center__content">
        <div class="modal-center__title" id="record"></div>
        <div class="modal-center__info modal-center__info-blitz">
          <div id="resultsText"></div>
          <div id="correctAnswersCount"></div> 
        </div>
        <div class="modal-center__actions">
          <a href="/" class="btn" id="homeBtn" data-link data-langkey="home">home</a>
          <a href="/blitz" class="btn" id="nextQuizBtn" data-link data-langkey="try-again">try again?</a>
        </div>
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

    <div class="confetti-wrapper hidden" id="quizConfetti"></div>
    `
  }
}
