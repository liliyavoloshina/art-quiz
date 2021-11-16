import './scss/critical.scss'
import AudioPreloader from './js/helpers/AudioPreloader'
import VhSetter from './js/helpers/VhSetter'
import './js/helpers/logging'

const audioPreloader = new AudioPreloader()
audioPreloader.preload()

const vhSetter = new VhSetter()
vhSetter.set()
