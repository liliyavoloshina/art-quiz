import htmlToElement from '../htmlToElement'
import HeaderBtnHTML from './index.html'
import './index.scss'

const HeaderBtn = ({ onClick, icon, className }) => {
  const element = htmlToElement(HeaderBtnHTML)
  element.innerHTML = icon
  element.classList.add(className)
  element.addEventListener('click', onClick)

  return element
}

export default HeaderBtn
