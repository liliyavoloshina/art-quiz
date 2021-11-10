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

const generateHint = (name) => {
  const splitted = name.split(' ')
  const hint = []
  splitted.forEach((el) => {
    const transformed = transformName(el)
    hint.push(transformed)
  })
  return hint.join(' ')
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

export {setAnimatedBtns, generateHint, shuffle, getData}