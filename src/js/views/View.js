/* eslint-disable class-methods-use-this, no-useless-constructor, no-empty-function */

export default class {
  constructor(params) {
    this.params = params

    this.categories = []
    this.soundStatus = null
    this.getCategoriesFromStorage()
    this.getSettings()
  }

  setTitle(title) {
    document.title = title
  }

  getCategoriesFromStorage() {
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
    ]
    const results = JSON.parse(localStorage.getItem(`${type}Results`)) || initialResults
    this.categories = results
  }

  getSettings() {
    this.isWithSound = JSON.parse(localStorage.getItem('isWithSound') || true)
    this.isWithTimer = JSON.parse(localStorage.getItem('isWithTimer') || true)
    this.soundValue = JSON.parse(localStorage.getItem('soundValue') || 50)
    this.timerValue = JSON.parse(localStorage.getItem('timerValue') || 30)
  }

  mount() {
    return ''
  }
}
