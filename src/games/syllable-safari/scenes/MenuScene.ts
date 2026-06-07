import { BaseGameScene } from '../../base/BaseGameScene'
import { useProgressStore } from '../../../stores/progressStore'

export class MenuScene extends BaseGameScene {
  private progressStore = useProgressStore()
  private activeZone: 'zone1' | 'zone2' | 'zone3' = 'zone1'
  private levelContainer: Phaser.GameObjects.Container | null = null

  constructor() {
    super('MenuScene')
  }

  create() {
    const width = this.cameras.main.width

    // Title
    this.add.text(width / 2, 60, 'PILIH PETUALANGANMU', {
      fontFamily: 'Nunito Sans',
      fontSize: '36px',
      fontStyle: '900',
      color: '#0c6780'
    }).setOrigin(0.5)

    // Render Zone Cards
    this.createZoneCard(width / 2 - 220, 180, 'ZONA 1\nHutan Bunyi', '🔊', 'zone1', 0x87ceeb)
    this.createZoneCard(width / 2, 180, 'ZONA 2\nJembatan Kata', '🪨', 'zone2', 0x99f899)
    this.createZoneCard(width / 2 + 220, 180, 'ZONA 3\nLabirin Cepat', '💨', 'zone3', 0xe6d7ff)

    // Render Level Selection for currently active zone
    this.drawLevels()
  }

  private createZoneCard(
    x: number,
    y: number,
    title: string,
    emoji: string,
    zoneId: 'zone1' | 'zone2' | 'zone3',
    color: number
  ) {
    const isUnlocked = this.progressStore.unlockedZones.includes(zoneId)
    const card = this.add.container(x, y)

    const shadow = this.add.graphics()
    shadow.fillStyle(0x2d3436, 1)
    shadow.fillRoundedRect(-95, -75, 190, 150, 20)

    const face = this.add.graphics()
    face.fillStyle(isUnlocked ? color : 0xd3d3d3, 1)
    face.fillRoundedRect(-95, -75, 190, 150, 20)
    face.lineStyle(4, 0x2d3436, 1)
    face.strokeRoundedRect(-95, -75, 190, 150, 20)

    const textEmoji = this.add.text(0, -20, isUnlocked ? emoji : '🔒', { fontSize: '44px' }).setOrigin(0.5)
    
    const textLabel = this.add.text(0, 35, title, {
      fontFamily: 'Nunito Sans',
      fontSize: '18px',
      fontStyle: '900',
      color: '#2d3436',
      align: 'center'
    }).setOrigin(0.5)

    card.add([shadow, face, textEmoji, textLabel])

    // Highlight active zone card
    if (this.activeZone === zoneId) {
      face.lineStyle(6, 0x705d00, 1) // Golden border
      face.strokeRoundedRect(-98, -78, 196, 156, 22)
    }

    if (isUnlocked) {
      const zoneTrigger = this.add.zone(0, 0, 190, 150).setInteractive({ useHandCursor: true })
      card.add(zoneTrigger)

      zoneTrigger.on('pointerdown', () => {
        this.playSynthSound('pop')
        this.activeZone = zoneId
        this.scene.restart()
      })
    }
  }

  private drawLevels() {
    if (this.levelContainer) {
      this.levelContainer.destroy()
    }

    const width = this.cameras.main.width
    this.levelContainer = this.add.container(width / 2, 420)

    const label = this.add.text(0, -60, `PILIH LEVEL (${this.activeZone === 'zone1' ? 'Zona 1' : this.activeZone === 'zone2' ? 'Zona 2' : 'Zona 3'}):`, {
      fontFamily: 'Nunito Sans',
      fontSize: '22px',
      fontStyle: '800',
      color: '#2d3436'
    }).setOrigin(0.5)
    this.levelContainer.add(label)

    const startX = -200
    const spacingX = 100

    for (let i = 1; i <= 5; i++) {
      const levelX = startX + (i - 1) * spacingX
      const levelId = i

      const btn = this.add.container(levelX, 0)
      
      const shadow = this.add.graphics()
      shadow.fillStyle(0x2d3436, 1)
      shadow.fillRoundedRect(-35, -35, 70, 70, 16)

      const face = this.add.graphics()
      face.fillStyle(0xfffef0, 1)
      face.fillRoundedRect(-35, -35, 70, 70, 16)
      face.lineStyle(3, 0x2d3436, 1)
      face.strokeRoundedRect(-35, -35, 70, 70, 16)

      const textNum = this.add.text(0, -4, String(levelId), {
        fontFamily: 'Nunito Sans',
        fontSize: '28px',
        fontStyle: '900',
        color: '#2d3436'
      }).setOrigin(0.5)

      // Draw star progress
      const key = `${this.activeZone}-level${levelId}`
      const stars = this.progressStore.completedLevels[key] || 0
      const starText = '⭐'.repeat(stars)
      const starLabel = this.add.text(0, 20, starText || '░', {
        fontFamily: 'Nunito Sans',
        fontSize: '11px',
        color: '#705d00'
      }).setOrigin(0.5)

      btn.add([shadow, face, textNum, starLabel])

      const levelTrigger = this.add.zone(0, 0, 70, 70).setInteractive({ useHandCursor: true })
      btn.add(levelTrigger)

      levelTrigger.on('pointerdown', () => {
        face.setY(4)
        textNum.setY(0)
        starLabel.setY(24)
      })

      levelTrigger.on('pointerup', () => {
        this.playSynthSound('ding')
        // Load the specific zone scene
        let sceneKey = 'Zone1Scene'
        if (this.activeZone === 'zone2') sceneKey = 'Zone2Scene'
        if (this.activeZone === 'zone3') sceneKey = 'Zone3Scene'
        
        this.scene.start(sceneKey, { level: levelId })
      })

      levelTrigger.on('pointerout', () => {
        face.setY(0)
        textNum.setY(-4)
        starLabel.setY(20)
      })

      this.levelContainer.add(btn)
    }
  }
}
