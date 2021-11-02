const animateButton = (e) => {
  e.preventDefault()
  e.target.classList.remove('animate')

  e.target.classList.add('animate')
  setTimeout(() => {
    e.target.classList.remove('animate')
  }, 700)
}

const findBtnAnims = () => {
  const btns = document.querySelectorAll('.btn-anim')
  btns.forEach((btn) => {
    btn.addEventListener('click', animateButton)
  })
}

export default findBtnAnims
