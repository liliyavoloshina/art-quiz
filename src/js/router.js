import Home from './views/Home'
import Settings from './views/Settings'
import Categories from './views/Categories'
import Quiz from './views/Quiz'
import Score from './views/Score'
import Blitz from './views/Blitz'

// get query from path
const pathRegex = (path) => new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`)

// get query value
const getParams = (match) => {
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1])

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]))
}

// const projectName = 'weird-spa'
// const devPath = 'http://localhost:8080'
// const prodPath = `/liliyavoloshina-JSFE2021Q3/${projectName}`
// const prodOrigin = 'https://rolling-scopes-school.github.io'

// const isDev = window.location.origin === devPath ? true : false

const router = async () => {
  // const pathWithoutHost = isDev ? window.location.pathname : window.location.pathname.replace(prodPath, '')

  const routes = [
    { path: '/', View: Home },
    { path: '/settings', View: Settings },
    { path: '/categories/:type', View: Categories },
    { path: '/quiz/:type/:category', View: Quiz },
    { path: '/score/:type/:category', View: Score },
    { path: '/blitz', View: Blitz },
  ]

  const potentialMatches = routes.map((route) => ({
    route,
    result: window.location.pathname.match(pathRegex(route.path)),
    // result: pathWithoutHost.match(pathRegex(route.path)),
  }))

  let match = potentialMatches.find((potentialMatch) => {
    console.log(potentialMatch)
    return potentialMatch.result !== null
  })

  if (!match) {
    match = { route: routes[0], result: [window.location.pathname] }
    window.location.pathname = '/'
    // window.location.pathname = isDev ? '/' : prodPath
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
      // const isToHome = e.target.href === prodOrigin ? true : false
      // const navLink = isToHome ? `${prodOrigin}${prodPath}` : e.target.href
      // console.log(navLink, 'navLink')
      // console.log(e.target.href, 'e.target.href')
      // navigateTo(navLink)
      navigateTo(e.target.href)
    }
  })
  router()
})
