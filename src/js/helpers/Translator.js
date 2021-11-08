/* eslint-disable no-param-reassign */
export default class Translator {
  constructor(lang, pageName) {
    this.lang = lang || 'en'
    this.pageName = pageName
    this.elements = document.querySelectorAll('[data-langkey]')
  }

  async loadLang() {
    const res = await fetch(`/data/ui-${this.lang}/${this.pageName}.json`)
    this.data = await res.json()
  }

  async translate() {
    await this.loadLang()
    this.elements.forEach((el) => {
      const langKey = el.dataset.langkey
      const val = this.data[langKey]
      el.textContent = val
    })
  }
}
