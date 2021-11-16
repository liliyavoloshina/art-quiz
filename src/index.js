import './scss/styles.scss'
import './js/router'

import AudioPreloader from './js/helpers/AudioPreloader'
import VhSetter from './js/helpers/VhSetter'

const audioPreloader = new AudioPreloader()
audioPreloader.preload()

const vhSetter = new VhSetter()
vhSetter.set()
