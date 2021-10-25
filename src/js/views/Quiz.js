/* eslint-disable class-methods-use-this */
import View from './View'
// import Timer from '../components/timer'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle('Art Quiz - Quiz')
    this.type = params.type
    this.category = params.category
  }

  mounted() {
    // const timer = new Timer()
    // timer.initTimer()
  }

  mount() {
    return `
   
    `
  }
}
