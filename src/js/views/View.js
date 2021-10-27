/* eslint-disable class-methods-use-this, no-useless-constructor, no-empty-function */

export default class {
  constructor(params) {
    this.params = params

    this.categories = []
    this.getCategoriesFromStorage()
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

  mount() {
    return ''
  }
}
