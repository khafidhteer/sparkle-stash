import { defineStore } from 'pinia'

export interface ProgressState {
  totalPoints: number
  completedLevels: Record<string, number> // key: 'zoneX-levelY', value: stars (1-3)
  collectedStickers: string[]
  unlockedZones: string[]
}

export const useProgressStore = defineStore('progress', {
  state: (): ProgressState => {
    // Load from localStorage if exists
    const saved = localStorage.getItem('sparkle_stash_progress')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse progress from localStorage', e)
      }
    }
    return {
      totalPoints: 0,
      completedLevels: {},
      collectedStickers: [],
      unlockedZones: ['zone1'],
    }
  },
  actions: {
    completeLevel(zoneId: string, levelId: number, score: number, stars: number) {
      const key = `${zoneId}-level${levelId}`
      const existingStars = this.completedLevels[key] || 0
      
      // Update stars if performance is better
      if (stars > existingStars) {
        this.completedLevels[key] = stars
      }

      // Add points
      this.totalPoints += score

      // Check for unlock conditions
      // e.g. completing level 5 of Zone 1 unlocks Zone 2
      if (zoneId === 'zone1' && levelId >= 5 && !this.unlockedZones.includes('zone2')) {
        this.unlockedZones.push('zone2')
      }
      // e.g. completing level 5 of Zone 2 unlocks Zone 3
      if (zoneId === 'zone2' && levelId >= 5 && !this.unlockedZones.includes('zone3')) {
        this.unlockedZones.push('zone3')
      }

      // Automatically award a sticker on first completion of a level with 3 stars, or zone completion
      const stickerName = `${zoneId}_level${levelId}_sticker`
      if (stars === 3 && !this.collectedStickers.includes(stickerName)) {
        this.collectedStickers.push(stickerName)
      }

      this.save()
    },
    awardSticker(stickerId: string) {
      if (!this.collectedStickers.includes(stickerId)) {
        this.collectedStickers.push(stickerId)
        this.save()
      }
    },
    resetProgress() {
      this.totalPoints = 0
      this.completedLevels = {}
      this.collectedStickers = []
      this.unlockedZones = ['zone1']
      this.save()
    },
    save() {
      localStorage.setItem('sparkle_stash_progress', JSON.stringify(this.$state))
    }
  }
})
