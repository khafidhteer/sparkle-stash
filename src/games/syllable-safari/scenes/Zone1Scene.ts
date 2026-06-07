import { BaseGameScene } from '../../base/BaseGameScene'
import { zone1Levels } from '../utils/syllableData'

export class Zone1Scene extends BaseGameScene {
  private level = 1
  private currentAttempt = 1
  private maxAttempts = 3
  private score = 0
  private errors = 0
  private targetSyllable = ''
  private options: string[] = []
  
  private balloonButtons: Phaser.GameObjects.Container[] = []
  private statusText: Phaser.GameObjects.Text | null = null

  constructor() {
    super('Zone1Scene')
  }

  init(data: { level?: number }) {
    this.level = data.level || 1
    this.currentAttempt = 1
    this.score = 0
    this.errors = 0
    this.balloonButtons = []
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Background decoration
    const bg = this.add.graphics()
    bg.fillStyle(0xe6f7ff, 1) // Soft sky blue background
    bg.fillRect(0, 0, width, height)

    // Forest trees (rectangles & circles)
    bg.fillStyle(0x99f899, 0.4)
    bg.fillCircle(100, 500, 150)
    bg.fillCircle(width - 100, 500, 150)
    bg.fillCircle(width / 2, 530, 120)

    // HUD
    this.add.text(30, 24, `Level: ${this.level}`, {
      fontFamily: 'Nunito Sans',
      fontSize: '22px',
      fontStyle: '900',
      color: '#2d3436'
    })

    this.add.text(180, 24, `Percobaan: ${this.currentAttempt}/${this.maxAttempts}`, {
      fontFamily: 'Nunito Sans',
      fontSize: '22px',
      fontStyle: '900',
      color: '#2d3436'
    })

    this.add.text(width - 150, 24, `Skor: ${this.score}`, {
      fontFamily: 'Nunito Sans',
      fontSize: '22px',
      fontStyle: '900',
      color: '#2d3436'
    })

    // Speaker / Parrot Icon
    this.createParrotButton(width / 2, 200)

    this.statusText = this.add.text(width / 2, 320, 'Tekan Burung Beo untuk mendengarkan! 🔊', {
      fontFamily: 'Nunito Sans',
      fontSize: '22px',
      fontStyle: '800',
      color: '#2d3436'
    }).setOrigin(0.5)

    // Exit Button
    this.createChunkyButton(70, 550, 100, 48, 'MENU', 0xeceef0, '#2d3436', () => {
      this.scene.start('MenuScene')
    })

    // Start round
    this.startRound()
  }

  private createParrotButton(x: number, y: number) {
    const container = this.add.container(x, y)
    
    // Draw chunky speaker box
    const card = this.add.graphics()
    this.drawTactileCard(card, -100, -80, 200, 160, 0xfffef0, 24)
    
    const parrot = this.add.text(0, -20, '🦜', { fontSize: '64px' }).setOrigin(0.5)
    
    const textLabel = this.add.text(0, 40, 'DENGARKAN 🔊', {
      fontFamily: 'Nunito Sans',
      fontSize: '18px',
      fontStyle: '900',
      color: '#0c6780'
    }).setOrigin(0.5)

    container.add([card, parrot, textLabel])

    // Touch trigger
    const zone = this.add.zone(0, 0, 200, 160).setInteractive({ useHandCursor: true })
    container.add(zone)

    zone.on('pointerdown', () => {
      container.setScale(0.95)
    })

    zone.on('pointerup', () => {
      container.setScale(1)
      this.speakSyllable(this.targetSyllable)
    })

    zone.on('pointerout', () => {
      container.setScale(1)
    })

    // this.parrotButton = container
  }

  private startRound() {
    // Clean up old balloons
    this.balloonButtons.forEach(b => b.destroy())
    this.balloonButtons = []

    const lvConfig = zone1Levels.find(l => l.level === this.level) || zone1Levels[0]
    
    // Get random target syllable
    const targetIdx = Math.floor(Math.random() * lvConfig.targetSyllables.length)
    this.targetSyllable = lvConfig.targetSyllables[targetIdx]

    // Create 3 distractors
    const filteredPool = lvConfig.pool.filter(s => s !== this.targetSyllable)
    const shuffledPool = Phaser.Utils.Array.Shuffle(filteredPool)
    const distractors = shuffledPool.slice(0, 3)

    // Shuffle options
    this.options = Phaser.Utils.Array.Shuffle([this.targetSyllable, ...distractors])

    // Speak target
    this.speakSyllable(this.targetSyllable)

    // Render balloons
    const width = this.cameras.main.width
    const startX = width / 2 - 270
    const spacingX = 180
    const colors = [0xffb6c1, 0x87ceeb, 0x99f899, 0xe6d7ff] // Pastel pink, blue, green, lavender

    this.options.forEach((opt, idx) => {
      const x = startX + idx * spacingX
      const y = 460
      const balloonColor = colors[idx % colors.length]

      const balloon = this.createBalloon(x, y, opt, balloonColor)
      this.balloonButtons.push(balloon)
    })

    if (this.statusText) {
      this.statusText.setText('Klik balon yang benar!')
    }
  }

  private createBalloon(x: number, y: number, text: string, color: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y)

    // Balloon body
    const shadow = this.add.graphics()
    shadow.fillStyle(0x2d3436, 1)
    shadow.fillCircle(0, -20 + 6, 55)

    const face = this.add.graphics()
    face.fillStyle(color, 1)
    face.fillCircle(0, -20, 55)
    face.lineStyle(4, 0x2d3436, 1)
    face.strokeCircle(0, -20, 55)

    // Balloon knot (triangle)
    face.fillStyle(0x2d3436, 1)
    face.fillTriangle(-10, 35, 10, 35, 0, 25)

    // String
    const stringGraphics = this.add.graphics()
    stringGraphics.lineStyle(3, 0x2d3436, 1)
    stringGraphics.lineBetween(0, 35, 0, 75)

    const label = this.add.text(0, -20, text, {
      fontFamily: 'Nunito Sans',
      fontSize: '32px',
      fontStyle: '900',
      color: '#2d3436'
    }).setOrigin(0.5)

    container.add([shadow, stringGraphics, face, label])

    // Float animation
    this.tweens.add({
      targets: container,
      y: y - 15,
      duration: 1500 + Math.random() * 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })

    // Touch trigger
    const zone = this.add.zone(0, -20, 110, 110).setInteractive({ useHandCursor: true })
    container.add(zone)

    zone.on('pointerup', () => {
      this.checkAnswer(text, container)
    })

    return container
  }

  private checkAnswer(selected: string, container: Phaser.GameObjects.Container) {
    // Disable all balloons input
    this.balloonButtons.forEach(b => {
      const zone = b.list[b.list.length - 1] as Phaser.GameObjects.Zone
      if (zone) zone.disableInteractive()
    })

    if (selected === this.targetSyllable) {
      this.playSynthSound('pop')
      this.playSynthSound('ding')
      this.createStarBurst(container.x, container.y - 20)
      
      this.score += 10
      
      // Animate balloon popping (scale to 0)
      this.tweens.add({
        targets: container,
        scaleX: 0,
        scaleY: 0,
        duration: 300,
        ease: 'Back.easeIn',
        onComplete: () => {
          this.time.delayedCall(1000, () => this.nextRound())
        }
      })

      if (this.statusText) {
        this.statusText.setText('🎉 BENAR! Hebat sekali!')
      }
    } else {
      this.playSynthSound('boop')
      this.shakeCamera()
      this.errors++
      
      // Balloon shake animation
      this.tweens.add({
        targets: container,
        x: container.x - 10,
        yoyo: true,
        repeat: 3,
        duration: 50,
        onComplete: () => {
          // Re-enable input for retry
          this.balloonButtons.forEach(b => {
            const zone = b.list[b.list.length - 1] as Phaser.GameObjects.Zone
            if (zone) zone.setInteractive()
          })
        }
      })

      if (this.statusText) {
        this.statusText.setText('❌ Coba lagi ya! Klik Beo untuk mendengar.')
      }
    }
  }

  private nextRound() {
    if (this.currentAttempt < this.maxAttempts) {
      this.currentAttempt++
      this.scene.restart({ level: this.level })
    } else {
      // Calculate stars based on errors
      let stars = 3
      if (this.errors > 2) stars = 1
      else if (this.errors > 0) stars = 2

      this.scene.start('ResultScene', {
        zoneId: 'zone1',
        level: this.level,
        score: this.score,
        stars: stars
      })
    }
  }
}
