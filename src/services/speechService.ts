import { useAudioStore } from '../stores/audioStore'

class SpeechService {
  private synth: SpeechSynthesis | null = null
  private voice: SpeechSynthesisVoice | null = null

  constructor() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      this.synth = window.speechSynthesis
      // Voices are loaded asynchronously in some browsers
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices()
      }
      this.loadVoices()
    }
  }

  private loadVoices() {
    if (!this.synth) return
    const voices = this.synth.getVoices()
    // Look for Indonesian voice
    const idVoice = voices.find(v => v.lang.toLowerCase().includes('id'))
    this.voice = idVoice || null
  }

  public speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      const audioStore = useAudioStore()
      if (!this.synth || !audioStore.speechEnabled) {
        resolve()
        return
      }

      // Stop any current speaking
      this.synth.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      if (this.voice) {
        utterance.voice = this.voice
      }
      utterance.lang = 'id-ID'
      utterance.volume = audioStore.volume
      utterance.rate = 0.85 // Slightly slower for kids to hear clearly

      utterance.onend = () => {
        resolve()
      }

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e)
        resolve()
      }

      this.synth.speak(utterance)
    })
  }

  public cancel() {
    if (this.synth) {
      this.synth.cancel()
    }
  }
}

export const speechService = new SpeechService()
export default speechService
