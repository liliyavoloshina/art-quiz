import Translator from '../helpers/Translator'

export default class {
  constructor(params) {
    this.params = params
    this.results = []
    this.getResultsFromStorage()
    this.getSettings()
  }

  setTitle(title) {
    document.title = title
  }

  getResultsFromStorage() {
    const { type } = this.params
    const initialResults = [
      { name: 'baroque', isPlayed: false, results: 0 },
      { name: 'historical', isPlayed: false, results: 0 },
      { name: 'impressionism', isPlayed: false, results: 0 },
      { name: 'landscape', isPlayed: false, results: 0 },
      { name: 'modernism', isPlayed: false, results: 0 },
      { name: 'portrait', isPlayed: false, results: 0 },
      { name: 'realism', isPlayed: false, results: 0 },
      { name: 'renaissance', isPlayed: false, results: 0 },
      { name: 'romanticism', isPlayed: false, results: 0 },
      { name: 'symbolism', isPlayed: false, results: 0 },
      { name: 'avant-garde', isPlayed: false, results: 0 },
      { name: 'still-life', isPlayed: false, results: 0 },
    ]

    let results = []

    if (type === 'blitz') {
      results = JSON.parse(localStorage.getItem(`blitzResults`)) || []
    } else {
      results = JSON.parse(localStorage.getItem(`${type}Results`)) || initialResults
    }

    this.results = results
  }

  getSettings() {
    this.isWithSound = JSON.parse(localStorage.getItem('isWithSound') || true)
    this.isWithTimer = JSON.parse(localStorage.getItem('isWithTimer') || true)
    this.soundValue = JSON.parse(localStorage.getItem('soundValue') || 0.5)
    this.timerValue = JSON.parse(localStorage.getItem('timerValue') || 30)
    this.langValue = localStorage.getItem('langValue') || 'en'
  }

  async translatePage() {
    this.translator = new Translator(this.langValue)
    await this.translator.translate()
  }

  mount() {
    return ''
  }
}
