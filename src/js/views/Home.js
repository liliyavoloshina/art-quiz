/* eslint-disable class-methods-use-this */
import View from './View'
import ImagePreloader from '../helpers/ImagePreloader'
import HeaderBtn from '../../components/HeaderBtn'

export default class extends View {
  constructor(params) {
    super(params)
    const title = this.langValue === 'en' ? 'home' : 'главная'
    this.setTitle(`artquiz. - ${title}.`)
  }

  async mounted() {
    const imagesSrc = ['../img/artists.webp', '../img/pictures.webp', '../img/logo.png']
    const preloader = new ImagePreloader(imagesSrc)
    await preloader.preloadImages()
    this.translatePage()
    const btnPlace = document.querySelector('#header')
    const btn = HeaderBtn({
      onClick: () => console.log('btn!!!'),
      title: 'btn',
      className: 'btn',
    })
    btnPlace.append(btn)
  }

  mount() {
    return `
    <header>
      <div class="container">
        <div class="header header-home" id="header"></div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="home">
          <div class="home-logo image-loading"></div>
          <div class="home-types">
            <a class="home-types__type" href="/categories/artists" data-link>
              <div class="home-types__image artist image-loading"></div>
              <div class="home-types__text" data-langkey="artists-quiz">artists quiz</div>
            </a>
            <a class="home-types__type" href="/categories/pictures" data-link>
              <div class="home-types__image pictures image-loading"></div>
              <div class="home-types__text" data-langkey="pictures-quiz">pictures quiz</div>
             </a>
            <a class="home-types__type" href="blitz" data-link>
              <div class="home-types__image blitz-image image-loading"></div>
              <div class="home-types__text" data-langkey="blitz-quiz">blitz quiz</div>
             </a>
          </div>
        </div>
      </div>
    </main>
    
    <footer>
      <div class="container">
        <div class="footer">
            <a class="footer__github" href="https://github.com/liliyavoloshina">liliyavoloshina</a>
            <div class="footer__year">© 2021</div>
            <a class="footer__school" href="https://rs.school/js/" title="Rolling Scopes School"></a>
        </div>
      </div>
    </footer>
    `
  }
}
