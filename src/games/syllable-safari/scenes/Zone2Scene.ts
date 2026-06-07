import { BaseGameScene } from '../../base/BaseGameScene'
import { zone2Levels, type Zone2Word } from '../utils/syllableData'

export class Zone2Scene extends BaseGameScene {
  private level = 1
  private score = 0
  private currentWordIdx = 0
  private targetWordObj!: Zone2Word
  private targetWord = ''
  private syllablesRequired: string[] = []
  private errors = 0
  
  private stones: Phaser.GameObjects.Container[] = []
  private slots: { x: number; y: number; text: string; filled: boolean; container: Phaser.GameObjects.Container | null }[] = []

  constructor() {
    super('Zone2Scene')
  }

  init(data: { level?: number }) {
    this.level = data.level || 1
    this.score = 0
    this.currentWordIdx = 0
    this.errors = 0
    this.stones = []
    this.slots = []
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Background: River themed
    const bg = this.add.graphics()
    bg.fillStyle(0xe6f7ff, 1) // sky
    bg.fillRect(0, 0, width, height)

    // River in the middle
    bg.fillStyle(0x87ceeb, 0.6)
    bg.fillRect(0, 240, width, 160)

    // Riverbanks (brown/green)
    bg.fillStyle(0x99f899, 1)
    bg.fillRect(0, 0, width, 240)
    bg.fillRect(0, 400, width, 200)
    bg.fillStyle(0xd2b48c, 1) // sandy line
    bg.fillRect(0, 230, width, 10)
    bg.fillRect(0, 400, width, 10)

    // HUD
    this.add.text(30, 24, `Level: ${this.level}`, {
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

    this.add.text(width / 2, 80, 'Susun batu agar anak bisa menyeberang!', {
      fontFamily: 'Nunito Sans',
      fontSize: '20px',
      fontStyle: '800',
      color: '#2d3436'
    }).setOrigin(0.5)

    // Exit Button
    this.createChunkyButton(70, 550, 100, 48, 'MENU', 0xeceef0, '#2d3436', () => {
      this.scene.start('MenuScene')
    })

    // Setup input listeners for dragging
    this.setupDragListeners()

    // Start Word Builder round
    this.loadWord()
  }

  private loadWord() {
    // Clear old elements
    this.stones.forEach(s => s.destroy())
    this.stones = []
    this.slots.forEach(s => {
      if (s.container) s.container.destroy()
    })
    this.slots = []

    const lvConfig = zone2Levels.find(l => l.level === this.level) || zone2Levels[0]
    
    // Select word from level list
    this.targetWordObj = lvConfig.words[this.currentWordIdx]
    this.targetWord = this.targetWordObj.word
    this.syllablesRequired = [...this.targetWordObj.syllables]

    // Pronounce the word
    this.speakSyllable(this.targetWord)

    // Display target image/hint emoji
    const width = this.cameras.main.width
    this.add.text(width / 2, 140, `${this.targetWordObj.hint} (${this.targetWord})`, {
      fontFamily: 'Nunito Sans',
      fontSize: '32px',
      fontStyle: '900',
      color: '#2d3436'
    }).setOrigin(0.5)

    // Render slots on the bridge/river (Target area)
    const slotCount = this.syllablesRequired.length
    const startX = width / 2 - (slotCount - 1) * 90
    
    for (let i = 0; i < slotCount; i++) {
      const sx = startX + i * 180
      const sy = 320
      
      const slotContainer = this.add.container(sx, sy)
      
      // Slot outline dashed/hollow
      const slotBox = this.add.graphics()
      slotBox.lineStyle(4, 0x2d3436, 0.5)
      slotBox.fillStyle(0xfffef0, 0.4)
      slotBox.strokeRoundedRect(-70, -40, 140, 80, 20)
      slotBox.fillRoundedRect(-70, -40, 140, 80, 20)
      
      slotContainer.add(slotBox)

      this.slots.push({
        x: sx,
        y: sy,
        text: this.syllablesRequired[i],
        filled: false,
        container: slotContainer
      })
    }

    // Create stones (Draggable) at the bottom bank
    const levelPool = lvConfig.pool
    const chosenStones = Phaser.Utils.Array.Shuffle([
      ...this.syllablesRequired,
      ...levelPool.filter(s => !this.syllablesRequired.includes(s)).slice(0, 3)
    ]).slice(0, 6)

    const stoneStartX = width / 2 - (chosenStones.length - 1) * 60
    chosenStones.forEach((syl, idx) => {
      const stoneX = stoneStartX + idx * 120
      const stoneY = 480
      
      const stone = this.createDraggableStone(stoneX, stoneY, syl)
      this.stones.push(stone)
    })
  }

  private createDraggableStone(x: number, y: number, text: string): Phaser.GameObjects.Container {
    const container = this.add.container(x, y)
    container.setData('originalX', x)
    container.setData('originalY', y)
    container.setData('syllable', text)

    const shadow = this.add.graphics()
    shadow.fillStyle(0x2d3436, 1)
    shadow.fillRoundedRect(-55, -35, 110, 70, 20)

    const face = this.add.graphics()
    face.fillStyle(0x99f899, 1) // Green stones
    face.fillRoundedRect(-55, -35, 110, 70, 20)
    face.lineStyle(4, 0x2d3436, 1)
    face.strokeRoundedRect(-55, -35, 110, 70, 20)

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Nunito Sans',
      fontSize: '24px',
      fontStyle: '900',
      color: '#2d3436'
    }).setOrigin(0.5)

    container.add([shadow, face, label])

    // Make interactive and draggable
    const zone = this.add.zone(0, 0, 110, 70).setInteractive({ useHandCursor: true })
    this.input.setDraggable(zone)
    container.add(zone)

    // Store references to graphics for drag animation
    container.setData('face', face)
    container.setData('label', label)

    return container
  }

  private setupDragListeners() {
    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: any, _dragX: number, _dragY: number) => {
      const container = gameObject.parentContainer as Phaser.GameObjects.Container
      if (!container) return

      // Update position (account for local offset of interactive zone)
      container.x = pointer.x
      container.y = pointer.y

      // Shift graphics face down to look "picked up"
      const face = container.getData('face') as Phaser.GameObjects.Graphics
      const label = container.getData('label') as Phaser.GameObjects.Text
      face.setY(-4)
      label.setY(-4)
    })

    this.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: any) => {
      const container = gameObject.parentContainer as Phaser.GameObjects.Container
      if (!container) return

      const face = container.getData('face') as Phaser.GameObjects.Graphics
      const label = container.getData('label') as Phaser.GameObjects.Text
      face.setY(0)
      label.setY(0)

      const syl = container.getData('syllable') as string
      let snapped = false

      // Check distance to slots
      for (const slot of this.slots) {
        const dist = Phaser.Math.Distance.Between(container.x, container.y, slot.x, slot.y)
        if (dist < 80 && !slot.filled && slot.text === syl) {
          // Snap in place!
          container.x = slot.x
          container.y = slot.y
          container.disableInteractive()
          gameObject.disableInteractive() // disable drag zone
          
          slot.filled = true
          snapped = true

          this.playSynthSound('pop')
          this.playSynthSound('ding')
          this.speakSyllable(syl)
          this.score += 10
          break
        }
      }

      if (!snapped) {
        this.playSynthSound('boop')
        this.errors++
        // Return to origin
        this.tweens.add({
          targets: container,
          x: container.getData('originalX'),
          y: container.getData('originalY'),
          duration: 300,
          ease: 'Back.easeOut'
        })
      }

      this.checkWordComplete()
    })
  }

  private checkWordComplete() {
    const allFilled = this.slots.every(s => s.filled)
    if (allFilled) {
      this.playSynthSound('fanfare')
      
      this.time.delayedCall(1500, () => {
        const lvConfig = zone2Levels.find(l => l.level === this.level) || zone2Levels[0]
        if (this.currentWordIdx < lvConfig.words.length - 1) {
          this.currentWordIdx++
          this.loadWord()
        } else {
          // Finished all words in level
          let stars = 3
          if (this.errors > 3) stars = 1
          else if (this.errors > 0) stars = 2

          this.scene.start('ResultScene', {
            zoneId: 'zone2',
            level: this.level,
            score: this.score,
            stars: stars
          })
        }
      })
    }
  }
}
