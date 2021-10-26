/* eslint-disable class-methods-use-this, no-useless-constructor, no-empty-function */

export default class {
  constructor(params) {
    this.params = params
    this.categories = [
      'baroque',
      'historical',
      'impressionism',
      'landscape',
      'modernism',
      'portrait',
      'realism',
      'renaissance',
      'romanticism',
      'symbolism',
    ]
    this.playedCategories = []
    // console.log(this.params)
  }

  setTitle(title) {
    document.title = title
  }

  mount() {
    return ''
  }
}
