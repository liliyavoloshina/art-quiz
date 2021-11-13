import './index.scss'

class ScoreItem {
  constructor(isPlayed) {
    this.isPlayed = isPlayed
  }

  mount(parent) {
    const element = document.createElement('div')
    element.classList.add('score__item')

    parent.append(element)
  }
}

export default ScoreItem
