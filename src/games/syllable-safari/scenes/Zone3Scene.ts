import { BaseGameScene } from '../../base/BaseGameScene'
import { zone3Levels } from '../utils/syllableData'

export class Zone3Scene extends BaseGameScene {
  private level = 1
  private score = 0
  private lives = 3
  private maxLives = 3
  private targetSyllable = ''
  private caughtCount = 0
  private winRequirement = 10
  private speedMultiplier = 1
  
  private spawnTimer: Phaser.Time.TimerEvent | null = null
  private fallingCardsGroup: Phaser.GameObjects.Group | null = null
  private hudLivesText: Phaser.GameObjects.Text | null = null
  private hudScoreText: Phaser.GameObjects.Text | null = null

  constructor() {
    super('Zone3Scene')
  }

  init(data: { level?: number }) {
    this.level = data.level || 1
    this.score = 0
    this.lives = 3
    this.caughtCount = 0
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Background decoration (Pastel lavender grid)
    const bg = this.add.graphics()
    bg.fillStyle(0xf7f9fc, 1)
    bg.fillRect(0, 0, width, height)
    
    // Draw lavender accent grid lines
    bg.lineStyle(2, 0xe6d7ff, 0.4)
    for (let x = 0; x < width; x += 80) {
      bg.lineBetween(x, 0, x, height)
    }
    for (let y = 0; y < height; y += 80) {
      bg.lineBetween(0, y, width, y)
    }

    const lvConfig = zone3Levels.find(l => l.level === this.level) || zone3Levels[0]
    this.targetSyllable = lvConfig.targetSyllable
    this.speedMultiplier = lvConfig.speed

    // Pronounce target syllable initially
    this.speakSyllable(this.targetSyllable)

    // HUD
    this.add.text(30, 24, `🎯 SASARAN: ${this.targetSyllable}`, {
      fontFamily: 'Nunito Sans',
      fontSize: '26px',
      fontStyle: '900',
      color: '#0c6780'
    })

    this.hudLivesText = this.add.text(width / 2 - 80, 24, `Nyawa: ❤️❤️❤️`, {
      fontFamily: 'Nunito Sans',
      fontSize: '22px',
      fontStyle: '900',
      color: '#ba1a1a'
    })

    this.hudScoreText = this.add.text(width - 180, 24, `Skor: ${this.score}`, {
      fontFamily: 'Nunito Sans',
      fontSize: '22px',
      fontStyle: '900',
      color: '#2d3436'
    })

    // Progress bar for catches
    const progressLabel = this.add.text(30, 70, `Kumpulkan: ${this.caughtCount}/${this.winRequirement}`, {
      fontFamily: 'Nunito Sans',
      fontSize: '18px',
      fontStyle: '700',
      color: '#2d3436'
    })

    this.events.on('update', () => {
      progressLabel.setText(`Kumpulkan: ${this.caughtCount}/${this.winRequirement}`)
      this.hudScoreText?.setText(`Skor: ${this.score}`)
      this.hudLivesText?.setText(`Nyawa: ${'❤️'.repeat(this.lives)}`)
    })

    // Exit Button
    this.createChunkyButton(70, 550, 100, 48, 'MENU', 0xeceef0, '#2d3436', () => {
      this.cleanup()
      this.scene.start('MenuScene')
    })

    // Physics Group for falling cards
    this.fallingCardsGroup = this.add.group()

    // Timer to spawn cards
    this.spawnTimer = this.time.addEvent({
      delay: 1800,
      callback: () => this.spawnFallingCard(),
      callbackScope: this,
      loop: true
    })
  }

  private spawnFallingCard() {
    if (!this.fallingCardsGroup) return

    const width = this.cameras.main.width
    const lvConfig = zone3Levels.find(l => l.level === this.level) || zone3Levels[0]
    
    // 40% chance of spawning the target syllable, 60% chance of distractor
    const isTarget = Math.random() < 0.4
    const syllableText = isTarget 
      ? this.targetSyllable 
      : Phaser.Utils.Array.GetRandom(lvConfig.pool.filter(s => s !== this.targetSyllable))

    const cardX = 100 + Math.random() * (width - 200)
    const cardY = -50

    const card = this.add.container(cardX, cardY)
    card.setData('syllable', syllableText)
    card.setData('isTarget', isTarget)

    const shadow = this.add.graphics()
    shadow.fillStyle(0x2d3436, 1)
    shadow.fillRoundedRect(-50, -35, 100, 70, 18)

    const face = this.add.graphics()
    // Different color for cards
    face.fillStyle(isTarget ? 0x87ceeb : 0xffb6c1, 1)
    face.fillRoundedRect(-50, -35, 100, 70, 18)
    face.lineStyle(3, 0x2d3436, 1)
    face.strokeRoundedRect(-50, -35, 100, 70, 18)

    const label = this.add.text(0, 0, syllableText, {
      fontFamily: 'Nunito Sans',
      fontSize: '24px',
      fontStyle: '900',
      color: '#2d3436'
    }).setOrigin(0.5)

    card.add([shadow, face, label])

    // Enable physics
    this.physics.add.existing(card)
    const body = card.body as Phaser.Physics.Arcade.Body
    body.setVelocityY(100 * this.speedMultiplier)

    // Touch interactive
    const zone = this.add.zone(0, 0, 100, 70).setInteractive({ useHandCursor: true })
    card.add(zone)

    zone.on('pointerdown', () => {
      this.handleCardClick(card, isTarget, syllableText)
    })

    this.fallingCardsGroup.add(card)
  }

  private handleCardClick(card: Phaser.GameObjects.Container, isTarget: boolean, syllable: string) {
    if (isTarget) {
      this.playSynthSound('pop')
      this.playSynthSound('ding')
      this.speakSyllable(syllable)
      this.createStarBurst(card.x, card.y)
      
      this.score += 15
      this.caughtCount++
      
      card.destroy()

      if (this.caughtCount >= this.winRequirement) {
        this.winLevel()
      }
    } else {
      this.playSynthSound('boop')
      this.shakeCamera()
      this.lives--
      card.destroy()

      if (this.lives <= 0) {
        this.gameOver()
      }
    }
  }

  update() {
    if (!this.fallingCardsGroup) return

    const height = this.cameras.main.height

    this.fallingCardsGroup.getChildren().forEach((child: any) => {
      // Check if target reached bottom (missed it)
      if (child.y > height + 50) {
        const isTarget = child.getData('isTarget') as boolean
        if (isTarget) {
          // Missed target: lose life
          this.playSynthSound('boop')
          this.shakeCamera()
          this.lives--
          
          if (this.lives <= 0) {
            this.gameOver()
          }
        }
        child.destroy()
      }
    })
  }

  private winLevel() {
    this.cleanup()
    this.playSynthSound('fanfare')

    const stars = this.lives === this.maxLives ? 3 : this.lives === 2 ? 2 : 1

    this.time.delayedCall(1200, () => {
      this.scene.start('ResultScene', {
        zoneId: 'zone3',
        level: this.level,
        score: this.score,
        stars: stars
      })
    })
  }

  private gameOver() {
    this.cleanup()
    this.time.delayedCall(500, () => {
      this.scene.start('ResultScene', {
        zoneId: 'zone3',
        level: this.level,
        score: this.score,
        stars: 1
      })
    })
  }

  private cleanup() {
    if (this.spawnTimer) {
      this.spawnTimer.destroy()
    }
    if (this.fallingCardsGroup) {
      this.fallingCardsGroup.clear(true, true)
    }
  }
}
