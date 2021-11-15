/* eslint-disable class-methods-use-this, no-plusplus, no-param-reassign, no-return-assign, no-inner-declarations */

import View from './View'
import Timer from '../components/Timer'
import Confetti from '../components/Confetti'
import ImagePreloader from '../helpers/ImagePreloader'
import SliderTransformer from '../helpers/SliderTransformer'
import PlaySound from '../helpers/PlaySound'
import { setAnimatedBtns, generateHint, shuffle, getData, getRandomIdx } from '../helpers/utils'
import { QUIZ_TYPES, QUIZ_QUESTIONS_COUNT, QUIZ_IMAGES_ALL, QUIZ_ANSWERS_COUNT } from '../helpers/constants'
import QuizImage from '../../components/QuizImage'

export default class extends View {
  constructor(params) {
    super(params)
    const title = this.langValue === 'en' ? 'quiz' : 'игра'
    this.setTitle(`artquiz. - ${title}.`)
    this.type = params.type
    this.category = params.category
    this.allQuestions = []
    this.questions = []
    this.correctAnswers = []
    this.currentQuestion = 0
    this.rightAnswer = ''
    this.isCorrect = false
    this.picturesImages = []
    this.timerTimeout = false
    this.isModalOpened = false
    this.isHintUsed = false
  }

  async filterQuestions() {
    this.questions = this.allQuestions.filter((question) => question.genre === this.category)
  }

  nextQuestion() {
    this.rightAnswer = ''
    this.isCorrect = false
    this.isHintUsed = false
    this.closeModal()

    if (this.currentQuestion !== QUIZ_QUESTIONS_COUNT) {
      this.generateQuestion()
      this.showNextImage()
      this.showNextAnswers()
      this.generateAnswers()
      this.initTimer()
    } else {
      this.showResults()
    }
  }

  showNextImage() {
    this.sliderTransformer.transform(this.currentQuestion)
  }

  showNextAnswers() {
    if (this.type === QUIZ_TYPES.artists) {
      this.questionTextEl.classList.add('hidden')
      this.questionTextEl.addEventListener('animationend', () => {
        this.questionTextEl.classList.remove('hidden')
      })

      this.answersEl.forEach((answer) => {
        answer.classList.add('hidden')
        answer.addEventListener('animationend', () => {
          answer.classList.remove('hidden')
        })
      })
    }
  }

  setResultsToStorage() {
    const results = []

    this.questions.forEach((el) => {
      if (this.correctAnswers.includes(el)) {
        results.push({ ...el, isCorrect: true })
      } else {
        results.push({ ...el, isCorrect: false })
      }
    })

    const updatedCategory = { name: this.category, isPlayed: true, results }
    const categoryToUpdateIdx = this.results.findIndex((el) => el.name === this.category)
    this.results[categoryToUpdateIdx] = updatedCategory

    localStorage.setItem(`${this.type}Results`, JSON.stringify(this.results))
  }

  showResults() {
    const modalResult = document.querySelector('#modalResult')
    const resultsText = document.querySelector('#resultsText')
    const correctAnswersCount = document.querySelector('#correctAnswersCount')
    const correctNum = this.correctAnswers.length

    this.soundResults = new Audio()
    this.soundResults.volume = this.soundValue

    if (correctNum === QUIZ_QUESTIONS_COUNT) {
      resultsText.textContent = this.langValue === 'en' ? 'are you an art expert?!' : 'да ты эксперт!'
      this.soundResults.src = '/audio/applause.wav'
    } else if (correctNum > QUIZ_QUESTIONS_COUNT / 2 && correctNum < QUIZ_QUESTIONS_COUNT) {
      resultsText.textContent = this.langValue === 'en' ? 'wow, you are on fire!' : 'потрясающе!'
      this.soundResults.src = '/audio/applause.wav'
    } else {
      resultsText.textContent = this.langValue === 'en' ? 'you can do better!' : 'ты можешь лучше!'
      this.soundResults.src = '/audio/failure.wav'
    }

    if (this.isWithSound) {
      this.soundResults.play()
    }

    this.setResultsToStorage()

    correctAnswersCount.textContent = correctNum
    modalResult.classList.remove('hidden')

    if (correctNum > QUIZ_QUESTIONS_COUNT / 2) {
      modalResult.addEventListener('transitionend', () => {
        const confetti = new Confetti()
        confetti.init()
      })
    }
  }

  generateQuestion() {
    if (this.type === QUIZ_TYPES.artists) {
      this.questionTextEl.textContent = this.langValue === 'en' ? `who is the author of this picture?` : 'кто автор этой картины?'
    } else {
      const artistName = this.questions[this.currentQuestion].author
      this.questionTextEl.textContent = this.langValue === 'en' ? `which is ${artistName} picture?` : `какую картину написал ${artistName}?`
    }
  }

  async generateImages() {
    const srcForPreload = []

    if (this.type === QUIZ_TYPES.artists) {
      this.questions.forEach((question) => {
        const imageNum = question.imageNum
        const year = this.questions[this.currentQuestion].year
        const hint = generateHint(QUIZ_TYPES.artists, this.langValue, year)

        srcForPreload.push(`/img/full/${imageNum}full.webp`)

        const quizImage = new QuizImage(this.type, imageNum, hint)
        quizImage.mount(this.imagesSlider)
      })
    } else {
      const randomImages = []

      while (randomImages.length < QUIZ_IMAGES_ALL - 10) {
        const randomImage = this.allQuestions[Math.floor(Math.random() * this.allQuestions.length)]
        const randomImageAuthor = randomImage.author
        const randomImageImageNum = randomImage.imageNum

        const isWillAddLater = this.questions.some((question) => question.imageNum === randomImageImageNum)
        const isExist = !!randomImages.find((el) => el.author === randomImageAuthor)
        if (isExist === false && isWillAddLater === false) {
          randomImages.push(randomImage)
        }
      }

      const randomIndexes = []

      for (let i = 0; i < QUIZ_IMAGES_ALL; i += QUIZ_ANSWERS_COUNT) {
        const randomIdx = getRandomIdx(i, i + 3)
        randomIndexes.push(randomIdx)
      }

      for (let i = 0; i < this.questions.length; i++) {
        randomImages.splice(randomIndexes[i], 0, this.questions[i])
      }

      this.picturesImages = randomImages

      randomImages.forEach((image) => {
        const imageNum = image.imageNum
        const { author, name } = this.allQuestions.find((el) => el.imageNum === imageNum)
        const hint = generateHint(QUIZ_TYPES.pictures, this.langValue, author)

        srcForPreload.push(`/img/full/${imageNum}full.webp`)

        const quizImage = new QuizImage(this.type, imageNum, hint, name)
        quizImage.mount(this.imagesSlider)
      })
    }

    const preloader = new ImagePreloader(srcForPreload)

    this.imageActions = document.querySelectorAll('.image__actions')

    if (this.type === QUIZ_TYPES.artists) {
      await preloader.preloadImages()
    } else {
      await preloader.preloadImages('four')
    }

    this.imagesEl = document.querySelectorAll('.image__img')

    if (this.type === QUIZ_TYPES.pictures) {
      this.answersEl = document.querySelectorAll('.answer')
    }
  }

  generateAnswers() {
    const answers = []

    if (this.type === QUIZ_TYPES.artists) {
      const rightAnswer = this.questions[this.currentQuestion].author
      this.rightAnswer = rightAnswer
      answers.push(rightAnswer)

      while (answers.length < QUIZ_ANSWERS_COUNT) {
        const randomAnswer = this.allQuestions[Math.floor(Math.random() * this.allQuestions.length)]
        console.log(randomAnswer.author, 'randomAnswer.author')
        if (!answers.includes(randomAnswer.author)) {
          console.log('pushed')
          answers.push(randomAnswer.author)
        }
      }

      shuffle(answers)

      this.answersEl.forEach((el, idx) => (el.textContent = answers[idx]))
    } else {
      const rightAnswer = this.questions[this.currentQuestion].name
      this.rightAnswer = rightAnswer
      let currentAnswers = []

      if (this.picturesImages.length === QUIZ_ANSWERS_COUNT) {
        currentAnswers = this.picturesImages
      } else {
        currentAnswers = this.picturesImages.splice(0, QUIZ_ANSWERS_COUNT)
      }

      currentAnswers.forEach((answer) => {
        answers.push(answer.name)
      })
    }

    this.answersEl.forEach((el) => {
      el.classList.remove('correct')
      el.classList.remove('incorrect')
    })
  }

  disableAnswer() {
    if (this.type === QUIZ_TYPES.artists) {
      this.answersEl.forEach((btn) => (btn.disabled = !btn.disabled))
    }

    this.imagesEl.forEach((image) => image.classList.toggle('disabled'))
    this.imageActions.forEach((btn) => btn.classList.toggle('disabled'))
  }

  closeModal() {
    this.modal.classList.add('hidden')

    this.isModalOpened = false

    setTimeout(() => {
      this.disableAnswer()
    }, 1000)
  }

  openModal() {
    this.modal.classList.remove('hidden')
    this.isModalOpened = true
  }

  fullscreenImage(btn) {
    if (this.isWithTimer && this.timer) {
      clearTimeout(this.timerTimeout)
      this.timer.pauseTimer()
    }

    const image = btn.previousElementSibling
    this.modalFullscreen = document.querySelector('#modalFullscreen')

    this.imageFullscreen = document.querySelector('#imageFullscreen')

    this.modalFullscreen.classList.remove('hidden')
    this.imageFullscreen.src = image.src

    this.modalFullscreen.addEventListener('click', () => {
      this.closeFullscreenImage()
    })
  }

  closeFullscreenImage() {
    this.imageFullscreen.classList.add('out')
    setTimeout(() => {
      if (this.isWithTimer) {
        this.timer.resumeTimer()
        clearTimeout(this.timerTimeout)
        this.setTimeout(this.timer.totalTime + 1)
      }

      this.modalFullscreen.classList.add('hidden')
      this.imageFullscreen.classList.remove('out')
    }, 400)
  }

  async generateModal() {
    const modalFirstLineEl = document.querySelector('#modalFirstLine')
    const modalSecondLineEl = document.querySelector('#modalSecondLine')
    const modalYearEl = document.querySelector('#modalYear')
    const modalImage = document.querySelector('#modalImage')
    const checkmarkStatus = document.querySelector('#checkmark')
    const crossmarkStatus = document.querySelector('#crossmark')

    const currentImageNum = this.questions[this.currentQuestion].imageNum
    const currentName = this.questions[this.currentQuestion].name
    const currentAuthor = this.questions[this.currentQuestion].author
    const currentYear = this.questions[this.currentQuestion].year

    const imageSrc = `/img/full/${currentImageNum}full.webp`
    const oneImagePreload = document.querySelector('.modal__image')

    modalImage.src = imageSrc

    if (this.isCorrect) {
      crossmarkStatus.classList.add('hidden')
      checkmarkStatus.classList.remove('hidden')
      this.checkmarkCheck.classList.add('animated')
    } else {
      checkmarkStatus.classList.add('hidden')
      crossmarkStatus.classList.remove('hidden')
      this.crossmarkCheck.classList.add('animated')
    }

    if (this.type === QUIZ_TYPES.artists) {
      modalFirstLineEl.textContent = this.langValue === 'en' ? `"${currentName}" was created` : `"${currentName}" написал`
      modalSecondLineEl.textContent = this.langValue === 'en' ? `by ${currentAuthor}` : `${currentAuthor}`
      modalYearEl.textContent = this.langValue === 'en' ? `in ${currentYear}` : `в ${currentYear} году`
    } else {
      modalFirstLineEl.textContent = this.langValue === 'en' ? `${currentAuthor} created` : `${currentAuthor} написал`
      modalSecondLineEl.textContent = `"${currentName}"`
      modalYearEl.textContent = this.langValue === 'en' ? `in ${currentYear}` : `в ${currentYear} году`
    }

    const preloader = new ImagePreloader()
    preloader.preloadOneImage(imageSrc, oneImagePreload)
  }

  findElements() {
    this.answersEl = document.querySelectorAll('.answer')
    this.crossmarkCheck = document.querySelector('.crossmark')
    this.checkmarkCheck = document.querySelector('.checkmark')
    this.questionTextEl = document.querySelector('#quizQuestionText')

    this.modal = document.querySelector('.modal')
    this.imagesSlider = document.querySelector('#quizImages')
  }

  stopTimer() {
    if (this.isWithTimer && this.timer) {
      clearTimeout(this.timerTimeout)
      this.timer.stopTimer()
    }
  }

  observeLocation() {
    const backBtn = document.querySelector('#backBtn')
    const nextQuizBtn = document.querySelector('#nextQuizBtn')
    const homeBtn = document.querySelector('#homeBtn')

    nextQuizBtn.addEventListener('click', () => {
      this.soundResults.pause()
    })

    homeBtn.addEventListener('click', () => {
      this.soundResults.pause()
    })

    backBtn.addEventListener('click', () => {
      this.stopTimer()
    })

    window.addEventListener('popstate', () => {
      this.stopTimer()

      if (this.soundResults) {
        this.soundResults.pause()
      }
    })
  }

  showHint(hintBtn) {
    if (this.type === QUIZ_TYPES.pictures && this.isHintUsed) return

    this.isHintUsed = true
    hintBtn.classList.toggle('opened')
  }

  bindListeners() {
    const quizContainer = document.querySelector('#quizContainer')

    quizContainer.addEventListener('click', (e) => {
      const { target } = e
      const isAnswer = target.classList.contains('answer')
      const isTooltip = target.classList.contains('tooltip')
      const isFullscreen = target.classList.contains('image__fullscreen')

      if (isAnswer) {
        this.answer(target)
      }

      if (isTooltip) {
        this.showHint(target)
      }

      if (isFullscreen) {
        this.fullscreenImage(target)
      }
    })

    const modalBtn = document.querySelector('#modalBtn')
    modalBtn.addEventListener('click', () => {
      this.nextQuestion()
    })

    this.modal.addEventListener('transitionend', () => {
      if (this.isModalOpened === false) {
        this.crossmarkCheck.classList.remove('animated')
        this.checkmarkCheck.classList.remove('animated')
      }
    })

    setAnimatedBtns()
  }

  async answer(answer) {
    if (this.isWithTimer && this.timer) {
      clearTimeout(this.timerTimeout)
      this.timer.stopTimer()
    }

    const pagination = document.querySelectorAll('.pag-item')
    let answerText
    if (this.type === QUIZ_TYPES.artists) {
      answerText = answer === 'timeout' ? 'timeout' : answer.innerHTML
    } else {
      answerText = answer.dataset ? answer.dataset.name : 'timeout'
    }

    if (answerText === this.rightAnswer) {
      this.isCorrect = true
      pagination[this.currentQuestion].classList.add('correct')
      this.correctAnswers.push(this.questions[this.currentQuestion])
      answer.classList.add('correct')
    } else if (answerText === 'timeout') {
      this.isCorrect = false
      pagination[this.currentQuestion].classList.add('incorrect')
    } else {
      this.isCorrect = false
      pagination[this.currentQuestion].classList.add('incorrect')
      answer.classList.add('incorrect')
    }

    this.playSound.play(this.isCorrect)

    if (this.currentQuestion !== QUIZ_QUESTIONS_COUNT) {
      await this.generateModal()
      this.openModal()
    }

    this.currentQuestion++

    this.disableAnswer()
  }

  setTimeout(value) {
    this.timerTimeout = setTimeout(() => {
      this.answer('timeout')
    }, value * 1000)
  }

  initTimer() {
    if (this.isWithTimer) {
      this.timer = new Timer(this.timerValue)
      this.timer.initTimer()
      this.setTimeout(this.timerValue)
    }
  }

  async mounted() {
    this.findElements()
    this.observeLocation()
    this.allQuestions = await getData(this.type, this.langValue)
    await this.filterQuestions()
    this.generateQuestion()
    await this.generateImages()
    this.generateAnswers()

    this.initTimer()
    this.sliderTransformer = new SliderTransformer(this.type)
    this.playSound = new PlaySound(this.isWithSound, this.soundValue)
    this.bindListeners()

    this.translatePage()
  }

  mount() {
    return `
    <header>
    <div class="container">
      <div class="header header-quiz">
        <a href="/" class="header-quiz__nav header__nav header__nav--left btn" id="backBtn" data-link><ion-icon name="home"></ion-icon></a>
        <div class="timer ${this.isWithTimer ? '' : 'hidden'}">
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
      <div class="quiz" id="quizContainer">
        <div class="quiz__question" id="quizQuestionText"></div>
        <div class="quiz-slider">
          <div class="quiz__images ${this.type === 'pictures' ? 'pictures' : 'artists'}" id="quizImages"></div>
        </div>
        <div class="quiz__pag">
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
          <div class="pag-item"></div>
        </div>
        ${
          this.type === 'pictures'
            ? ''
            : `<div class="quiz__answers " id="quizAnswers">
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
      </div>`
        }
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
    <div class="modal__status" id="modalStatus">
    <div id="checkmark"><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>
    <div id="crossmark">
      <svg class="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="crossmark__circle" cx="26" cy="26" r="25" fill="none"/>
        <path class="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
        <path class="cross__path cross__path--left" fill="none" d="M16,36 l20,-20" />
      </svg>
    </div>
    </div>
    <div class="modal__main">
      <div class="modal__image one-image-loading">
        <img
          src=""
          alt=""
          id="modalImage"
        />
      </div>
      <div class="modal__text">
        <div class="name" id="modalFirstLine"></div>
        <div class="author" id="modalSecondLine"></div>
        <div class="year" id="modalYear"></div>
      </div>
    </div>
    <div class="modal__btn">
      <button class="btn-lg" id="modalBtn" data-langkey="next">next</button>
    </div>
  </div>

  <div class="modal-center hidden" id="modalResult">
    <div class="modal-center__content">
      <div class="modal-center__title" id="resultsText"></div>
      <div class="modal-center__info"><span id="correctAnswersCount"></span>/10</div>
      <div class="modal-center__actions">
        <a href="/" class="btn" id="homeBtn" data-langkey="home" data-link>home</a>
        <a href="/categories/${this.type}" class="btn" id="nextQuizBtn" data-langkey="next-quiz" data-link>next quiz</a>
      </div>
  </div>
</div>

<div class="modal-image hidden" id="modalFullscreen">
    <div class="modal-image__wrapper">
      <img class="modal-image__image" id="imageFullscreen">
    </div>
</div>

<div class="confetti-wrapper hidden" id="quizConfetti"></div>
    `
  }
}
