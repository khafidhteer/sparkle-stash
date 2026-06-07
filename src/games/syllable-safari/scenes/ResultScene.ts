import { BaseGameScene } from '../../base/BaseGameScene'
import { useProgressStore } from '../../../stores/progressStore'

export class ResultScene extends BaseGameScene {
  private progressStore = useProgressStore()
  private zoneId = 'zone1'
  private level = 1
  private score = 0
  private stars = 1

  constructor() {
    super('ResultScene')
  }

  init(data: { zoneId: string; level: number; score: number; stars: number }) {
    this.zoneId = data.zoneId || 'zone1'
    this.level = data.level || 1
    this.score = data.score || 0
    this.stars = data.stars || 1

    // Save progress
    this.progressStore.completeLevel(this.zoneId, this.level, this.score, this.stars)
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    this.playSynthSound('fanfare')

    // Display Card Box
    const card = this.add.graphics()
    this.drawTactileCard(card, width / 2 - 220, height / 2 - 200, 440, 360, 0xfffef0, 32)

    // Title
    const titleText = this.stars >= 2 ? 'HEBAT! LEVEL SELESAI' : 'TETAP SEMANGAT!'
    this.add.text(width / 2, height / 2 - 150, titleText, {
      fontFamily: 'Nunito Sans',
      fontSize: '28px',
      fontStyle: '900',
      color: '#0c6780'
    }).setOrigin(0.5)

    // Score
    this.add.text(width / 2, height / 2 - 90, `Skor: +${this.score} Poin`, {
      fontFamily: 'Nunito Sans',
      fontSize: '24px',
      fontStyle: '800',
      color: '#2d3436'
    }).setOrigin(0.5)

    // Stars
    const starText = '⭐'.repeat(this.stars) + '☆'.repeat(3 - this.stars)
    this.add.text(width / 2, height / 2 - 30, starText, {
      fontFamily: 'Nunito Sans',
      fontSize: '56px',
      color: '#705d00'
    }).setOrigin(0.5)

    // Sticker Alert
    if (this.stars === 3) {
      const stickerInfo = this.add.text(width / 2, height / 2 + 50, '🎉 KAMU DAPAT STIKER BARU!', {
        fontFamily: 'Nunito Sans',
        fontSize: '20px',
        fontStyle: '900',
        color: '#0f7427'
      }).setOrigin(0.5)

      this.tweens.add({
        targets: stickerInfo,
        scale: 1.1,
        yoyo: true,
        repeat: -1,
        duration: 400
      })
    } else {
      this.add.text(width / 2, height / 2 + 50, 'Kumpulkan 3 bintang untuk dapat stiker!', {
        fontFamily: 'Nunito Sans',
        fontSize: '16px',
        fontStyle: '700',
        color: '#6f787d'
      }).setOrigin(0.5)
    }

    // Navigation Buttons
    // Left: Menu
    this.createChunkyButton(width / 2 - 110, height / 2 + 110, 160, 52, 'KE MENU', 0xeceef0, '#2d3436', () => {
      this.scene.start('MenuScene')
    })

    // Right: Next Level
    const isLastLevel = this.level >= 5
    const nextBtnText = isLastLevel ? 'SELESAI' : 'LANJUTKAN'
    
    this.createChunkyButton(width / 2 + 110, height / 2 + 110, 160, 52, nextBtnText, 0x99f899, '#0f7427', () => {
      if (isLastLevel) {
        this.scene.start('MenuScene')
      } else {
        // Start next level in same scene type
        this.scene.start(this.scene.key === 'Zone1Scene' ? 'Zone1Scene' : this.scene.key === 'Zone2Scene' ? 'Zone2Scene' : 'Zone3Scene', { level: this.level + 1 })
        this.scene.start(this.getZoneSceneKey(this.zoneId), { level: this.level + 1 })
      }
    })
  }

  private getZoneSceneKey(zoneId: string): string {
    if (zoneId === 'zone2') return 'Zone2Scene'
    if (zoneId === 'zone3') return 'Zone3Scene'
    return 'Zone1Scene'
  }
}
