<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="btn-chunky btn-gray btn-circle modal-close" @click="$emit('close')">❌</button>
      
      <h2 class="text-headline-lg" style="margin-bottom: 24px;">⚙️ Pengaturan</h2>
      
      <div style="display: flex; flex-direction: column; gap: 32px; text-align: left;">
        <!-- Volume Control -->
        <div>
          <label class="text-label-bold" style="display: block; margin-bottom: 8px;">🔊 Suara SFX & Musik</label>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span>🔇</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              v-model.number="volume"
              style="flex-grow: 1; height: 12px; border-radius: 6px; cursor: pointer; accent-color: var(--primary);"
            />
            <span>🔊</span>
          </div>
        </div>

        <!-- Speech Synthesis Toggle -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <label class="text-label-bold" style="display: block;">🎤 Pembaca Suku Kata</label>
            <span style="font-size: 16px; color: var(--outline);">Suara robot membaca huruf/kata secara otomatis</span>
          </div>
          <button 
            class="btn-chunky" 
            :class="speechEnabled ? 'btn-secondary' : 'btn-gray'"
            @click="toggleSpeech"
            style="min-width: 100px;"
          >
            {{ speechEnabled ? 'HIDUP' : 'MATI' }}
          </button>
        </div>

        <hr style="border: 2px solid var(--text-dark); margin: 8px 0;" />

        <!-- Reset progress -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <label class="text-label-bold" style="display: block; color: #ba1a1a;">Reset Progres</label>
            <span style="font-size: 16px; color: var(--outline);">Hapus semua stiker dan bintang yang telah diperoleh</span>
          </div>
          <button 
            class="btn-chunky" 
            style="background-color: #ffdad6; color: #ba1a1a;"
            @click="confirmReset"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAudioStore } from '../stores/audioStore'
import { useProgressStore } from '../stores/progressStore'

const emit = defineEmits(['close'])

const audioStore = useAudioStore()
const progressStore = useProgressStore()

const volume = computed({
  get: () => audioStore.volume,
  set: (val) => audioStore.setVolume(val)
})

const speechEnabled = computed(() => audioStore.speechEnabled)

function toggleSpeech() {
  audioStore.toggleSpeech()
}

function confirmReset() {
  if (confirm('Apakah kamu yakin ingin menghapus semua stiker dan skor petualanganmu?')) {
    progressStore.resetProgress()
    alert('Progres petualangan telah direset!')
    emit('close')
  }
}
</script>
