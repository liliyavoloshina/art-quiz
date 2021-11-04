import './scss/styles.scss'
import './js/router'
import AudioPreloader from './js/helpers/audioPreloader'

const audioPreloader = new AudioPreloader()
audioPreloader.preload()
