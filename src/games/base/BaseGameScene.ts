import Phaser from 'phaser'
import { speechService } from '../../services/speechService'
import { useAudioStore } from '../../stores/audioStore'

export class BaseGameScene extends Phaser.Scene {
  protected audioStore = useAudioStore()

  constructor(key: string) {
    super(key)
  }

  // Web Speech API Integration
  protected async speakSyllable(text: string): Promise<void> {
    if (this.audioStore.speechEnabled) {
      await speechService.speak(text)
    }
  }

  // Synthetic Sound Effects via Web Audio API (Zero external assets needed!)
  protected playSynthSound(type: 'pop' | 'ding' | 'boop' | 'fanfare') {
    const vol = this.audioStore.volume
    if (vol <= 0) return

    // Create audio context fallback
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(vol * 0.3, ctx.currentTime)
    gainNode.connect(ctx.destination)

    if (type === 'pop') {
      // Balloon pop: high frequency pitch slide down fast
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
      
      osc.connect(gainNode)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } else if (type === 'ding') {
      // Success ding: pleasant chime (double note)
      const osc1 = ctx.createOscillator()
      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08) // E5
      gainNode.gain.setValueAtTime(vol * 0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

      osc1.connect(gainNode)
      osc1.start()
      osc1.stop(ctx.currentTime + 0.3)
    } else if (type === 'boop') {
      // Error boop: low warning buzz
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)

      osc.connect(gainNode)
      osc.start()
      osc.stop(ctx.currentTime + 0.25)
    } else if (type === 'fanfare') {
      // Complete: ascending arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25] // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const noteGain = ctx.createGain()
        noteGain.gain.setValueAtTime(vol * 0.25, ctx.currentTime + idx * 0.1)
        noteGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.3)
        noteGain.connect(ctx.destination)

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1)
        osc.connect(noteGain)
        osc.start(ctx.currentTime + idx * 0.1)
        osc.stop(ctx.currentTime + idx * 0.1 + 0.3)
      })
    }
  }

  // Draw card with solid offset block shadow (DESIGN.md specification)
  protected drawTactileCard(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    width: number,
    height: number,
    bgColor: number,
    radius: number = 24
  ) {
    graphics.clear()
    
    // Draw Block Shadow
    graphics.fillStyle(0x2d3436, 1) // Dark shadow color
    graphics.fillRoundedRect(x, y + 8, width, height, radius)
    
    // Draw Card Background
    graphics.fillStyle(bgColor, 1)
    graphics.fillRoundedRect(x, y, width, height, radius)
    
    // Draw Stroke Outline
    graphics.lineStyle(4, 0x2d3436, 1)
    graphics.strokeRoundedRect(x, y, width, height, radius)
  }

  // Interactive Chunky Button (visual push feedback)
  protected createChunkyButton(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    bgColor: number,
    textColor: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y)
    
    const shadow = this.add.graphics()
    shadow.fillStyle(0x2d3436, 1)
    shadow.fillRoundedRect(-width/2, -height/2 + 6, width, height, 28)
    
    const face = this.add.graphics()
    face.fillStyle(bgColor, 1)
    face.fillRoundedRect(-width/2, -height/2, width, height, 28)
    face.lineStyle(4, 0x2d3436, 1)
    face.strokeRoundedRect(-width/2, -height/2, width, height, 28)

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Nunito Sans',
      fontSize: '24px',
      fontStyle: '800',
      color: textColor
    }).setOrigin(0.5)

    container.add([shadow, face, label])

    // Interactive events
    const zone = this.add.zone(0, 0, width, height).setInteractive({ useHandCursor: true })
    container.add(zone)

    zone.on('pointerdown', () => {
      face.setY(4)
      label.setY(4)
    })

    zone.on('pointerup', () => {
      face.setY(0)
      label.setY(0)
      onClick()
    })

    zone.on('pointerout', () => {
      face.setY(0)
      label.setY(0)
    })

    return container
  }

  // Simple floating particle star burst
  protected createStarBurst(x: number, y: number) {
    for (let i = 0; i < 15; i++) {
      const star = this.add.text(x, y, '⭐', { fontSize: '20px' }).setOrigin(0.5)
      const angle = Math.random() * Math.PI * 2
      const speed = 100 + Math.random() * 200
      this.physics.add.existing(star)
      const body = star.body as Phaser.Physics.Arcade.Body
      body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
      
      this.tweens.add({
        targets: star,
        alpha: 0,
        scale: 0.1,
        duration: 800,
        onComplete: () => star.destroy()
      })
    }
  }

  // Error shake effect
  protected shakeCamera() {
    this.cameras.main.shake(150, 0.01)
  }
}
