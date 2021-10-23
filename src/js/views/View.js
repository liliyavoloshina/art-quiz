/* eslint-disable class-methods-use-this, no-useless-constructor, no-empty-function */

export default class {
  constructor(params) {
    this.params = params
    // console.log(this.params)
  }

  setTitle(title) {
    document.title = title
  }

  getHtml() {
    return ''
  }
}
