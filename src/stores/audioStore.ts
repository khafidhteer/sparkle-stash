import { defineStore } from 'pinia'

export interface AudioState {
  volume: number // 0 to 1
  speechEnabled: boolean
}

export const useAudioStore = defineStore('audio', {
  state: (): AudioState => {
    const saved = localStorage.getItem('sparkle_stash_audio')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse audio settings from localStorage', e)
      }
    }
    return {
      volume: 0.8,
      speechEnabled: true,
    }
  },
  actions: {
    setVolume(vol: number) {
      this.volume = Math.max(0, Math.min(1, vol))
      this.save()
    },
    setSpeechEnabled(enabled: boolean) {
      this.speechEnabled = enabled
      this.save()
    },
    toggleSpeech() {
      this.speechEnabled = !this.speechEnabled
      this.save()
    },
    save() {
      localStorage.setItem('sparkle_stash_audio', JSON.stringify(this.$state))
    }
  }
})
