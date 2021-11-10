/* eslint-disable class-methods-use-this, no-plusplus */

import View from './View'
import getData from '../helpers/getData'
import shuffle from '../helpers/shuffle'
import ImagePreloader from '../helpers/ImagePreloader'
import PlaySound from '../helpers/PlaySound'
import Timer from '../components/Timer'
import Confetti from '../components/Confetti'

export default class extends View {
  constructor(params) {
    super({ ...params, type: 'blitz' })
    const title = this.langValue === 'en' ? 'blitz' : 'быстрая игра'
    this.setTitle(`artquiz. - ${title}.`)
    this.questions = []
    this.correctAnswers = 0
    this.currentQuestion = 0
    this.questionTextEl = null
    this.shouldBeCorrect = null
    this.playSound = null
    this.timerTimeout = false
    this.timerInterval = false
    this.totalTime = 5
    this.timeLeft = this.totalTime
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

  observeLocation() {
    const backBtn = document.querySelector('#backBtn')

    backBtn.addEventListener('click', () => {
      this.stopTimer()
    })

    window.addEventListener('popstate', () => this.stopTimer())
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
    await preloader.preloadImages()

    this.showImage()
  }

  showImage() {
    const image = document.querySelector('#blitzImage')
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
        btn.classList.remove('correct')
        btn.classList.remove('incorrect')
      })
    }, 500)

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

    this.playSound.play(isCorrect)

    if (this.currentQuestion === 239) {
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

    const sound = new Audio()
    sound.volume = this.soundValue

    let recordText
    if (isNotMax) {
      recordText = this.langValue === 'en' ? `you can do better!` : `ты можешь лучше!`
      sound.src = '/audio/failure.wav'
    } else {
      recordText = this.langValue === 'en' ? `this is your record!` : 'это твой рекорд!'
      sound.src = '/audio/applause.wav'

      const confettiWrapper = document.querySelector('.confetti-wrapper')
      confettiWrapper.classList.remove('hidden')
      const confetti = new Confetti(confettiWrapper)
      confetti.init()
    }

    if (this.isWithSound) {
      sound.play()
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

    if (this.timeLeft >= 30) {
      this.timeLeft = this.totalTime
    }

    this.timer = new Timer(this.timeLeft)
    this.timer.initTimer()
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

  async mounted() {
    this.findElements()
    this.observeLocation()
    this.bind()
    await this.getQuestions()
    await this.generateImages()
    this.generateQuestion()

    this.playSound = new PlaySound(this.isWithSound, this.soundValue)
    this.timer = new Timer(this.totalTime)
    this.timer.initTimer()
    this.setTimeout(this.totalTime)
    this.setInterval()
    this.translatePage()
  }

  mount() {
    return `
    <header>
      <div class="container">
        <div class="header header-quiz">
          <a href="/" class="header-quiz__nav header__nav header__nav--left btn" id="backBtn" data-link><span class="material-icons-round">home</span></a>
          <div class="timer">
            <div class="timer__added-time hidden" id="addedTime"></div>
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
