/* eslint-disable no-plusplus, no-param-reassign */

const animateButton = (e) => {
  e.preventDefault()
  e.target.classList.remove('animate')

  e.target.classList.add('animate')
  setTimeout(() => {
    e.target.classList.remove('animate')
  }, 700)
}

const setAnimatedBtns = () => {
  const btns = document.querySelectorAll('.btn-anim')
  btns.forEach((btn) => {
    btn.addEventListener('click', animateButton)
  })
}

const transformName = (name) => {
  const transformed = name.split('').map((el, idx) => {
    if (idx === 0 || idx === 1 || idx === name.length - 1) {
      return el
    }
    return '*'
  })
  return transformed.join('')
}

const generateHint = (type, lang = 'en', value) => {
  if (type === 'artists') {
    const hint = lang === 'en' ? `this picture was painted in ${value}` : `эта картина нарисована в ${value}`
    return hint
  } else {
    const splitted = value.split(' ')
    const hint = []
    splitted.forEach((el) => {
      const transformed = transformName(el)
      hint.push(transformed)
    })
    return hint.join(' ')
  }
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const getData = async (type, lang) => {
  const res = await fetch(`/data/${type}-${lang}.json`)
  const data = await res.json()
  return data
}

const getRandomIdx = (min, max) => {
  const idx = min + Math.random() * (max + 1 - min)
  return Math.floor(idx)
}

const setToLocalStorage = (name, value) => {
  localStorage.setItem(name, value)
}

const htmlToElement = (html) => {
  const template = document.createElement('template')
  template.innerHTML = html
  return template.content.firstChild
}

export { setAnimatedBtns, generateHint, shuffle, getData, getRandomIdx, setToLocalStorage, htmlToElement }
