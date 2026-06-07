<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column;">
    <!-- Header -->
    <header style="background-color: var(--primary-container); border-bottom: 4px solid var(--text-dark); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;" @click="goHome">
        <span style="font-size: 32px;">🎮</span>
        <h1 class="text-headline-lg" style="color: var(--on-primary-container); margin: 0; font-family: 'Nunito Sans'; font-weight: 900;">
          Suku Kata
        </h1>
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn-chunky btn-secondary" @click="showProgress = true">
          🎫 Papan Stiker
        </button>
        <button class="btn-chunky btn-gray btn-circle" @click="showSettings = true" style="font-size: 20px;">
          ⚙️
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <main style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; padding: 32px 16px;">
      <!-- Home View -->
      <div v-if="view === 'home'" style="max-width: 800px; width: 100%; text-align: center;">
        <div style="margin-bottom: 32px;">
          <h2 class="text-display-hero" style="color: var(--primary); margin-bottom: 8px;">Petualangan Suku Kata</h2>
          <p class="text-body-lg" style="color: var(--outline); font-weight: 600;">Game edukasi belajar membaca suku kata untuk anak usia 4-7 tahun</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; justify-content: center; margin-top: 16px;">
          <!-- Syllable Safari Card -->
          <div class="card-chunky" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; background-color: #e6f7ff;">
            <div style="font-size: 64px;">🌴🦜🐆</div>
            <h3 class="text-headline-lg" style="font-size: 24px; color: var(--primary);">Safari Suku Kata</h3>
            <p style="font-size: 16px; font-weight: 700; color: var(--text-dark); margin: 0;">
              Jelajahi hutan bunyi, susun jembatan kata, dan uji kecepatan refleksmu!
            </p>
            <button class="btn-chunky btn-secondary" @click="startGame" style="width: 100%; margin-top: auto;">
              MULAI BERMAIN!
            </button>
          </div>

          <!-- Future Game 2 Card -->
          <div class="card-chunky" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; background-color: var(--surface-container); border-color: var(--outline-variant); opacity: 0.8; box-shadow: none;">
            <div style="font-size: 64px; filter: grayscale(1);">🚀</div>
            <h3 class="text-headline-lg" style="font-size: 24px; color: var(--outline);">Game Berikutnya</h3>
            <p style="font-size: 16px; font-weight: 700; color: var(--outline); margin: 0;">
              Nantikan petualangan membaca kalimat yang seru segera hadir!
            </p>
            <button class="btn-chunky btn-gray" disabled style="width: 100%; cursor: not-allowed; margin-top: auto; box-shadow: none; border-color: var(--outline-variant);">
              SEGERA HADIR
            </button>
          </div>
        </div>
      </div>

      <!-- Game View -->
      <div v-else-if="view === 'game'" style="width: 100%; max-width: 1024px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <div style="width: 100%; display: flex; justify-content: flex-start;">
          <button class="btn-chunky btn-gray" @click="goHome">
            ⬅️ Kembali ke Menu Utama
          </button>
        </div>
        
        <GameShell />
      </div>
    </main>

    <!-- Footer -->
    <footer style="background-color: var(--surface-container); border-top: 4px solid var(--text-dark); padding: 16px; text-align: center; font-weight: 700; font-size: 14px;">
      Sparkle Stash &copy; 2026. Made with ❤️ for kids.
    </footer>

    <!-- Modals -->
    <ProgressBoard v-if="showProgress" @close="showProgress = false" />
    <SettingsModal v-if="showSettings" @close="showSettings = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SettingsModal from './components/SettingsModal.vue'
import ProgressBoard from './components/ProgressBoard.vue'
import GameShell from './components/GameShell.vue'

const view = ref<'home' | 'game'>('home')
const showSettings = ref(false)
const showProgress = ref(false)

function startGame() {
  view.value = 'game'
}

function goHome() {
  view.value = 'home'
}
</script>
