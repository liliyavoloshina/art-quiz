/* eslint-disable class-methods-use-this, no-plusplus, no-param-reassign, no-return-assign, no-inner-declarations */

import View from './View'
// import Timer from '../components/timer'
import Confetti from '../components/confetti'

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

    console.log(sound.volume)

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
    const answersEl = document.querySelectorAll('.answer')
    answersEl.forEach((answer) => {
      answer.classList.add('hidden')
      answer.addEventListener('animationend', () => {
        answer.classList.remove('hidden')
      })
    })
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

  calcNextCategory() {
    const nextCategory = this.categories.find((cat) => !cat.isPlayed)
    return nextCategory.name
  }

  showResults() {
    const modalResult = document.querySelector('#modalResult')
    const resultsText = document.querySelector('#resultsText')
    const nextQuizLink = document.querySelector('#nextQuizLink')
    const correctAnswersCount = document.querySelector('#correctAnswersCount')
    const correctNum = this.correctAnswers.length

    const sound = new Audio()
    sound.volume = this.soundValue

    if (correctNum === 10) {
      resultsText.textContent = 'are you an art expert?!'
      sound.src = '/audio/applause.wav'
    } else if (correctNum > 8 && correctNum < 10) {
      resultsText.textContent = 'wow, you are on fire!'
      sound.src = '/audio/applause.wav'
    } else if (correctNum < 8 && correctNum > 5) {
      resultsText.textContent = 'you can do better!'
      sound.src = '/audio/failure.wav'
    } else {
      resultsText.textContent = 'maybe another time?'
      sound.src = '/audio/failure.mp3'
    }

    if (this.isWithSound) {
      sound.play()
    }

    this.setResultsToStorage()
    const nextCategoryName = this.calcNextCategory()

    if (nextCategoryName) {
      if (this.type === 'artists') {
        nextQuizLink.href = `/quiz/artists/${nextCategoryName}`
      } else {
        nextQuizLink.href = `/quiz/pictures/${nextCategoryName}`
      }
    } else {
      nextQuizLink.classList.add('disabled')
    }

    correctAnswersCount.textContent = correctNum
    modalResult.classList.remove('hidden')

    if (correctNum === 10 || (correctNum > 8 && correctNum < 10)) {
      modalResult.addEventListener('transitionend', () => {
        const confettiWrapper = document.querySelector('.confetti-wrapper')
        const confetti = new Confetti(confettiWrapper)
        confetti.init()
      })
    }
  }

  generateQuestion() {
    const questionTextEl = document.querySelector('#quizQuestionText')
    if (this.type === 'artists') {
      questionTextEl.textContent = `who is the author of this picture?`
    } else {
      const artistName = this.questions[this.currentQuestion].author
      questionTextEl.textContent = `which is ${artistName} picture?`
    }
  }

  generateImages() {
    const items = []
    if (this.type === 'artists') {
      this.questions.forEach((question) => {
        items.push(`
        <div class="image artists">
            <img
              src="/img/full/${question.imageNum}full.webp"
              alt=""
            />
          </div>
        `)
      })
    } else {
      const randomImages = []

      while (randomImages.length < 30) {
        const randomImage = this.allQuestions[Math.floor(Math.random() * this.allQuestions.length)]
        const randomImageAuthor = randomImage.author
        const isExist = !!randomImages.find((el) => el.author === randomImageAuthor)
        if (isExist === false) {
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
        items.push(`
        <div class="image pictures">
            <img
              src="/img/full/${image.imageNum}full.webp"
              alt=""
            />
            <div class="image__info">${image.name}</div>
          </div>
        `)
      })
    }

    const imagesHtml = items.join('\n')
    const images = document.querySelector('#quizImages')
    images.innerHTML = imagesHtml
  }

  generateAnswers() {
    const answersEl = document.querySelectorAll('.answer')
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

    answersEl.forEach((el, idx) => (el.textContent = answers[idx]))
    answersEl.forEach((el) => {
      el.classList.remove('correct')
      el.classList.remove('incorrect')
    })
  }

  closeModal() {
    const modal = document.querySelector('.modal')
    const answersEl = document.querySelectorAll('.answer')
    modal.classList.add('hidden')
    answersEl.forEach((btn) => (btn.disabled = false))
  }

  openModal() {
    const modal = document.querySelector('.modal')
    modal.classList.remove('hidden')
  }

  generateModal() {
    const modalFirstLineEl = document.querySelector('#modalFirstLine')
    const modalSecondLineEl = document.querySelector('#modalSecondLine')
    const modalYearEl = document.querySelector('#modalYear')
    const modalImage = document.querySelector('#modalImage')
    const modalStatus = document.querySelector('#modalStatus')

    const currentImageNum = this.questions[this.currentQuestion].imageNum
    const currentName = this.questions[this.currentQuestion].name
    const currentAuthor = this.questions[this.currentQuestion].author
    const currentYear = this.questions[this.currentQuestion].year

    modalImage.src = `/img/full/${currentImageNum}full.webp`

    if (this.isCorrect) {
      modalStatus.classList.remove('incorrect')
      modalStatus.classList.add('correct')
      modalStatus.innerHTML = `<i class="fi fi-rr-check"></i>`
    } else {
      modalStatus.classList.remove('correct')
      modalStatus.classList.add('incorrect')
      modalStatus.innerHTML = `<i class="fi fi-rr-cross"></i>`
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

  bindListeners() {
    const answersEl = document.querySelectorAll('.answer')
    const modalBtn = document.querySelector('#modalBtn')
    answersEl.forEach((el) =>
      el.addEventListener('click', (e) => {
        this.answer(e.target)
      })
    )
    modalBtn.addEventListener('click', () => {
      this.nextQuestion()
    })
  }

  answer(answer) {
    const pagination = document.querySelectorAll('.pag-item')
    const answerText = answer.innerHTML

    if (answerText === this.rightAnswer) {
      this.isCorrect = true
      pagination[this.currentQuestion].classList.add('correct')
      this.correctAnswers.push(this.questions[this.currentQuestion])
      answer.classList.add('correct')
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

    const answersEl = document.querySelectorAll('.answer')
    answersEl.forEach((btn) => (btn.disabled = true))
  }

  async mounted() {
    // const timer = new Timer()
    // timer.initTimer()
    this.bindListeners()

    await this.getQuestions()
    await this.filterQuestions()
    this.generateQuestion()
    this.generateImages()
    this.generateAnswers()
  }

  mount() {
    return `
  <header>
    <div class="container">
      <div class="header header-quiz">
        <a href="/" class="header-quiz__nav btn" data-link><span class="material-icons-round">home</span></a>
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
        <div class="quiz__question" id="quizQuestionText"></div>
        <div class="quiz__images" id="quizImages"></div>
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
        <div class="quiz__answers" id="quizAnswers">
          <button class="answer"></button>
          <button class="answer"></button>
          <button class="answer"></button>
          <button class="answer"></button>
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
    <div class="modal__status" id="modalStatus"></div>
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
        <a class="btn" href="/" data-link>home</a>
        <a class="btn" id="nextQuizLink" data-link>next quiz</a>
      </div>
  </div>
</div>
<div class="confetti-wrapper" id="quizConfetti"></div>
    `
  }
}
