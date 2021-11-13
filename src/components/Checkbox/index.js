import htmlToElement from '../htmlToElement'
import checkboxHTML from './index.html'
import './index.scss'
import { setToLocalStorage } from '../../js/helpers/utils'

class Checkbox {
  constructor(id, name, checked) {
    this.id = id
    this.name = name
    this.checked = checked
  }

  mount(parent) {
    const element = htmlToElement(checkboxHTML)
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = this.id
    input.checked = this.checked
    element.prepend(input)
    element.querySelector('label').htmlFor = this.id
    element.addEventListener('change', (e) => setToLocalStorage(this.name, e.target.checked))
    parent.append(element)
  }
}

export default Checkbox
