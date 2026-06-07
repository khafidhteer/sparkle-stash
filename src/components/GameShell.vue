<template>
  <div class="card-chunky" style="width: 100%; background: #ffffff; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
    <div id="phaser-game" style="width: 100%; max-width: 800px; aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; border: 4px solid var(--text-dark);"></div>
    <div style="margin-top: 12px; display: flex; justify-content: space-between; width: 100%; max-width: 800px; font-weight: 700; color: var(--outline);">
      <span>💡 Klik 🔊 untuk mendengarkan suara burung beo.</span>
      <span>🌟 Kumpulkan 3 bintang untuk dapat stiker baru!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Phaser from 'phaser'
import { BootScene } from '../games/syllable-safari/scenes/BootScene'
import { MenuScene } from '../games/syllable-safari/scenes/MenuScene'
import { Zone1Scene } from '../games/syllable-safari/scenes/Zone1Scene'
import { Zone2Scene } from '../games/syllable-safari/scenes/Zone2Scene'
import { Zone3Scene } from '../games/syllable-safari/scenes/Zone3Scene'
import { ResultScene } from '../games/syllable-safari/scenes/ResultScene'

let gameInstance: Phaser.Game | null = null

onMounted(() => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    backgroundColor: '#f7f9fc',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false
      }
    },
    scene: [BootScene, MenuScene, Zone1Scene, Zone2Scene, Zone3Scene, ResultScene]
  }

  gameInstance = new Phaser.Game(config)
})

onUnmounted(() => {
  if (gameInstance) {
    gameInstance.destroy(true)
    gameInstance = null
  }
})
</script>
