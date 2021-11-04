class AudioPreloader {
  constructor() {
    this.audio = ['/audio/applause.wav', '/audio/correct.wav', '/audio/failure.wav', '/audio/incorrect.wav']
  }

  preload() {
    this.audio.forEach((audioSrc) => {
      const audio = new Audio()
      audio.src = audioSrc
      audio.load()
    })
  }
}

export default AudioPreloader
