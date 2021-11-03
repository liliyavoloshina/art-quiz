/* eslint-disable class-methods-use-this, no-plusplus, no-param-reassign, no-return-assign, no-inner-declarations */

import View from './View'
import Timer from '../components/timer'
import Confetti from '../components/confetti'
import generateHint from '../helpers/generateHint'
import findBtnAnims from '../components/btn-anim'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('artquiz. - quiz')
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

    this.crossmarkCheck = null
    this.checkmarkCheck = null
    this.imagesEl = null
    this.questionTextEl = null
    this.answersEl = null
  }

  async getQuestions() {
    const res = await fetch(`/data/${this.type}.json`)
    const data = await res.json()
    this.allQuestions = data
  }

  async filterQuestions() {
    this.questions = this.allQuestions.filter((question) => question.genre === this.category)
  }

  playSound() {
    const sound = new Audio()
    sound.volume = this.soundValue

    if (this.isCorrect) {
      sound.src = '/audio/correct.wav'
    } else {
      sound.src = '/audio/incorrect.wav'
    }

    sound.play()
  }

  nextQuestion() {
    this.rightAnswer = ''
    this.isCorrect = false
    this.closeModal()

    if (this.currentQuestion !== 10) {
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
    const slider = document.querySelector('#quizImages')
    const images = slider.querySelectorAll('.image')

    if (this.type === 'artists') {
      images.forEach((image) => {
        image.style.transform = `translateY(${this.currentQuestion * -100}%)`
      })
    } else {
      images.forEach((image) => {
        image.style.transform = `translateY(${this.currentQuestion * -200}%)`
      })
    }
  }

  showNextAnswers() {
    if (this.type === 'artists') {
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
    const categoryToUpdateIdx = this.categories.findIndex((el) => el.name === this.category)
    this.categories[categoryToUpdateIdx] = updatedCategory

    localStorage.setItem(`${this.type}Results`, JSON.stringify(this.categories))
  }

  showResults() {
    const modalResult = document.querySelector('#modalResult')
    const resultsText = document.querySelector('#resultsText')
    const correctAnswersCount = document.querySelector('#correctAnswersCount')
    const correctNum = this.correctAnswers.length

    const sound = new Audio()
    sound.volume = this.soundValue

    if (correctNum === 10) {
      resultsText.textContent = 'are you an art expert?!'
      sound.src = '/audio/applause.wav'
    } else if (correctNum >= 6 && correctNum < 10) {
      resultsText.textContent = 'wow, you are on fire!'
      sound.src = '/audio/applause.wav'
    } else if (correctNum < 6 && correctNum >= 3) {
      resultsText.textContent = 'you can do better!'
      sound.src = '/audio/failure.wav'
    } else {
      resultsText.textContent = 'maybe another time?'
      sound.src = '/audio/failure.wav'
    }

    if (this.isWithSound) {
      sound.play()
    }

    this.setResultsToStorage()

    correctAnswersCount.textContent = correctNum
    modalResult.classList.remove('hidden')

    const nextQuizBtn = document.querySelector('#nextQuizBtn')
    const homeBtn = document.querySelector('#homeBtn')
    nextQuizBtn.addEventListener('click', () => {
      sound.pause()
    })
    homeBtn.addEventListener('click', () => {
      sound.pause()
    })

    if (correctNum >= 6) {
      modalResult.addEventListener('transitionend', () => {
        const confettiWrapper = document.querySelector('.confetti-wrapper')
        confettiWrapper.classList.remove('hidden')
        const confetti = new Confetti(confettiWrapper)
        confetti.init()
      })
    }
  }

  generateQuestion() {
    if (this.type === 'artists') {
      this.questionTextEl.textContent = `who is the author of this picture?`
    } else {
      const artistName = this.questions[this.currentQuestion].author
      this.questionTextEl.textContent = `which is ${artistName} picture?`
    }
  }

  generateImages() {
    const items = []
    if (this.type === 'artists') {
      const { year } = this.questions[this.currentQuestion]
      this.questions.forEach((question) => {
        items.push(`
        <div class="image artists">
            <img
              class="image__img"
              src="/img/full/${question.imageNum}full.webp"
              alt=""
            />
            <div class="image__hint">
              <div class="tooltip btn-anim">
                <span class="material-icons-round">help_outline</span>
                <div class="tooltip__content">this picture was painted in ${year}</div>
              </div>
            </div>
          </div>
        `)
      })
    } else {
      const randomImages = []

      while (randomImages.length < 30) {
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

      function getRandomIdx(min, max) {
        const rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
      }

      for (let i = 0; i < 40; i += 4) {
        const randomIdx = getRandomIdx(i, i + 3)
        randomIndexes.push(randomIdx)
      }

      for (let i = 0; i < this.questions.length; i++) {
        randomImages.splice(randomIndexes[i], 0, this.questions[i])
      }

      this.picturesImages = randomImages

      randomImages.forEach((image) => {
        const { author, name } = this.allQuestions.find((el) => el.imageNum === image.imageNum)
        const hint = generateHint(author)
        items.push(`
        <div class="image pictures">
            <img
              class="image__img answer"
              src="/img/full/${image.imageNum}full.webp"
              alt="${name}"
              data-name="${name}"
            />
            <div class="image__hint">
              <div class="tooltip btn-anim">
                <span class="material-icons-round">help_outline</span>
                <div class="tooltip__content">${hint}</div>
              </div>
            </div>
          </div>
        `)
      })
    }

    const imagesHtml = items.join('\n')
    const images = document.querySelector('#quizImages')
    images.innerHTML = imagesHtml

    this.imagesEl = document.querySelectorAll('.image__img')

    if (this.type === 'pictures') {
      this.answersEl = document.querySelectorAll('.answer')
    }
  }

  generateAnswers() {
    const answers = []

    if (this.type === 'artists') {
      const rightAnswer = this.questions[this.currentQuestion].author
      this.rightAnswer = rightAnswer
      answers.push(rightAnswer)

      while (answers.length < 4) {
        const randomAnswer = this.allQuestions[Math.floor(Math.random() * this.allQuestions.length)]
        if (!answers.includes(randomAnswer.author)) {
          answers.push(randomAnswer.author)
        }
      }

      const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
      }

      shuffle(answers)

      this.answersEl.forEach((el, idx) => (el.textContent = answers[idx]))
    } else {
      const rightAnswer = this.questions[this.currentQuestion].name
      this.rightAnswer = rightAnswer
      let currentAnswers = []

      if (this.picturesImages.length === 4) {
        currentAnswers = this.picturesImages
      } else {
        currentAnswers = this.picturesImages.splice(0, 4)
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

  closeModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('hidden')

    if (this.type === 'artists') {
      this.answersEl.forEach((btn) => (btn.disabled = false))
    }

    this.imagesEl.forEach((image) => image.classList.remove('disabled'))

    setTimeout(() => {
      this.crossmarkCheck.classList.remove('animated')
      this.checkmarkCheck.classList.remove('animated')
    }, 1000)
  }

  openModal() {
    const modal = document.querySelector('.modal')
    modal.classList.remove('hidden')
  }

  fullscreenImage(e) {
    if (this.isWithTimer) {
      clearTimeout(this.timerTimeout)
      this.timer.pauseTimer()
    }

    const image = e.target
    const modalFullscreen = document.querySelector('#modalFullscreen')

    const imageFullscreen = document.querySelector('#imageFullscreen')

    modalFullscreen.style.display = 'block'
    imageFullscreen.src = image.src

    modalFullscreen.addEventListener('click', () => {
      imageFullscreen.classList.add('out')
      setTimeout(() => {
        if (this.isWithTimer) {
          this.timer.resumeTimer()
          clearTimeout(this.timerTimeout)
          this.setTimeout(this.timer.totalTime + 1)
        }

        modalFullscreen.style.display = 'none'
        imageFullscreen.className = 'modal-image__image'
      }, 400)
    })
  }

  generateModal() {
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

    modalImage.src = `/img/full/${currentImageNum}full.webp`

    if (this.isCorrect) {
      crossmarkStatus.classList.add('hidden')
      checkmarkStatus.classList.remove('hidden')
      this.checkmarkCheck.classList.add('animated')
    } else {
      checkmarkStatus.classList.add('hidden')
      crossmarkStatus.classList.remove('hidden')
      this.crossmarkCheck.classList.add('animated')
    }

    if (this.type === 'artists') {
      modalFirstLineEl.textContent = `"${currentName}" was created`
      modalSecondLineEl.textContent = `by ${currentAuthor}`
      modalYearEl.textContent = `in ${currentYear}`
    } else {
      modalFirstLineEl.textContent = `${currentAuthor} created`
      modalSecondLineEl.textContent = `"${currentName}"`
      modalYearEl.textContent = `in ${currentYear}`
    }
  }

  findElements() {
    this.answersEl = document.querySelectorAll('.answer')
    this.crossmarkCheck = document.querySelector('.crossmark')
    this.checkmarkCheck = document.querySelector('.checkmark')
    this.questionTextEl = document.querySelector('#quizQuestionText')
  }

  stopTimer() {
    if (this.isWithTimer) {
      clearTimeout(this.timerTimeout)
      this.timer.pauseTimer()
    }
  }

  observeHref() {
    const backBtn = document.querySelector('#backBtn')

    backBtn.addEventListener('click', () => {
      this.stopTimer()
    })
  }

  showHint() {
    this.classList.toggle('opened')
  }

  bindListeners() {
    const hintBtns = document.querySelectorAll('.tooltip')

    hintBtns.forEach((btn) => {
      btn.addEventListener('click', this.showHint)
    })

    // this.imagesEl.forEach((image) => {
    //   image.addEventListener('click', (e) => this.fullscreenImage(e))
    // })

    const modalBtn = document.querySelector('#modalBtn')
    this.answersEl.forEach((el) =>
      el.addEventListener('click', (e) => {
        this.answer(e.target)
      })
    )

    modalBtn.addEventListener('click', () => {
      this.nextQuestion()
    })

    findBtnAnims()
  }

  answer(answer) {
    if (this.isWithTimer) {
      this.timer.pauseTimer()
      clearTimeout(this.timerTimeout)
    }

    const pagination = document.querySelectorAll('.pag-item')
    let answerText
    if (this.type === 'artists') {
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

    if (this.isWithSound) {
      this.playSound()
    }

    if (this.currentQuestion !== 10) {
      this.generateModal()
      this.openModal()
    }

    this.currentQuestion++

    if (this.type === 'artists') {
      this.answersEl.forEach((btn) => (btn.disabled = true))
    }

    this.imagesEl.forEach((image) => image.classList.add('disabled'))
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
    this.initTimer()
    this.observeHref()

    await this.getQuestions()
    await this.filterQuestions()
    this.generateQuestion()
    this.generateImages()

    this.generateAnswers()

    this.bindListeners()
  }

  mount() {
    return `
    <header>
    <div class="container">
      <div class="header header-quiz">
        <a href="/" class="header-quiz__nav header__nav header__nav--left btn" id="backBtn" data-link><span class="material-icons-round">home</span></a>
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

  <main class="main">
    <div class="container">
      <div class="quiz">
        <div class="quiz__question" id="quizQuestionText"></div>
        <div class="quiz__images ${this.type === 'pictures' ? 'pictures' : ''}" id="quizImages"></div>
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
      <div class="modal__image">
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
      <button class="btn-lg" id="modalBtn">next</button>
    </div>
  </div>

  <div class="modal-center hidden" id="modalResult">
    <div class="modal-center__content">
      <div class="modal-center__title" id="resultsText"></div>
      <div class="modal-center__info"><span id="correctAnswersCount"></span>/10</div>
      <div class="modal-center__actions">
        <a href="/" class="btn" id="homeBtn" data-link>home</a>
        <a href="/categories/${this.type}" class="btn" id="nextQuizBtn" data-link>next quiz</a>
      </div>
  </div>
</div>

<div class="modal-image" id="modalFullscreen">
    <img class="modal-image__image" id="imageFullscreen">
</div>

<div class="confetti-wrapper hidden" id="quizConfetti"></div>
    `
  }
}
