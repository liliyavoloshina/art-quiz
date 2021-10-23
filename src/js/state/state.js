class State {
  constructor() {
    this.images = []
    // this.getImagesByType()
  }

  async getImagesByType() {
    // let images = []
    const res = await fetch('/data/images.json')
    const data = await res.json()
    this.images = data
  }

  returnImages() {
    return this.images
  }
}

const state = new State()
// state.getImagesByType()

export default state
