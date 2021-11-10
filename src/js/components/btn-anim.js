const animateButton = (e) => {
  e.preventDefault()
  e.target.classList.remove('animate')

  e.target.classList.add('animate')
  setTimeout(() => {
    e.target.classList.remove('animate')
  }, 700)
}

export default () => {
  const btns = document.querySelectorAll('.btn-anim')
  btns.forEach((btn) => {
    btn.addEventListener('click', animateButton)
  })
}
