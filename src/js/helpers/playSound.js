export default class PlaySound {
  constructor(isWithSound, volume) {
    this.isWithSound = isWithSound
    this.volume = volume
  }

  play(isCorrect) {
    if (!this.isWithSound) return
    const sound = new Audio()
    sound.volume = this.volume

    if (isCorrect) {
      sound.src = '/audio/correct.wav'
    } else {
      sound.src = '/audio/incorrect.wav'
    }

    sound.play()
  }
}
