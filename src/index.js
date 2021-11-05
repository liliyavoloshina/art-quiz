import './scss/styles.scss'
import './js/router'
import AudioPreloader from './js/helpers/audioPreloader'
import VhSetter from './js/helpers/vhSetter'

const audioPreloader = new AudioPreloader()
audioPreloader.preload()

const vhSetter = new VhSetter()
vhSetter.set()
