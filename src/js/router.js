import Home from './views/Home'
import Settings from './views/Settings'
import Categories from './views/Categories'
import Quiz from './views/Quiz'

// get query from path
const pathRegex = (path) =>
  new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`)

// get query value
const getParams = (match) => {
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  )

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]))
}

const router = async () => {
  const routes = [
    { path: '/', View: Home },
    { path: '/settings', View: Settings },
    { path: '/categories/:type', View: Categories },
    { path: '/quiz/:type/:category', View: Quiz },
  ]

  const potentialMatches = routes.map((route) => ({
    route,
    result: window.location.pathname.match(pathRegex(route.path)),
  }))

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  )

  if (!match) {
    match = { route: routes[0], result: [window.location.pathname] }
    window.location.pathname = '/'
  }

  const view = new match.route.View(getParams(match))

  document.querySelector('#app').innerHTML = view.mount()
  view.mounted()
}

const navigateTo = (url) => {
  window.history.pushState(null, null, url)
  router()
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      navigateTo(e.target.href)
    }
  })
  router()
})
