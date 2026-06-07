<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content" style="max-width: 650px;">
      <button class="btn-chunky btn-gray btn-circle modal-close" @click="$emit('close')">❌</button>
      
      <h2 class="text-headline-lg" style="margin-bottom: 8px;">🎫 Papan Stiker</h2>
      <p class="text-body-lg" style="color: var(--primary); margin-bottom: 24px;">
        Skor Total: 🌟 {{ progressStore.totalPoints }} Poin
      </p>

      <div style="background-color: var(--surface-container); padding: 16px; border-radius: 20px; border: 3px solid var(--text-dark);">
        <p class="text-label-bold" style="margin-bottom: 16px;">
          Koleksi Stiker Suku Kata ({{ collectedCount }} / {{ stickersList.length }})
        </p>

        <div class="sticker-grid">
          <div 
            v-for="stk in stickersList" 
            :key="stk.id" 
            class="sticker-item"
            :class="{ collected: isCollected(stk.id) }"
            :title="stk.name"
          >
            <template v-if="isCollected(stk.id)">
              <span style="font-size: 36px;">{{ stk.emoji }}</span>
              <span style="font-size: 11px; font-weight: 800; margin-top: 4px; color: var(--text-dark);">{{ stk.name }}</span>
            </template>
            <template v-else>
              <span style="font-size: 24px; color: var(--outline-variant);">❓</span>
              <span style="font-size: 10px; color: var(--outline); margin-top: 4px;">{{ stk.zoneName }} L{{ stk.level }}</span>
            </template>
          </div>
        </div>
      </div>

      <div style="margin-top: 24px; text-align: left;" v-if="achievements.length > 0">
        <h3 class="text-label-bold" style="margin-bottom: 8px;">🏆 Pencapaian:</h3>
        <ul style="padding-left: 20px; margin: 0; font-size: 18px; font-weight: 700; display: flex; flex-direction: column; gap: 8px;">
          <li v-for="ach in achievements" :key="ach" style="color: var(--secondary);">
            ✅ {{ ach }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProgressStore } from '../stores/progressStore'

defineEmits(['close'])

const progressStore = useProgressStore()

const stickersList = [
  { id: 'zone1_level1_sticker', name: 'Beo', emoji: '🦜', zoneName: 'Zona 1', level: 1 },
  { id: 'zone1_level2_sticker', name: 'Monyet', emoji: '🐒', zoneName: 'Zona 1', level: 2 },
  { id: 'zone1_level3_sticker', name: 'Harimau', emoji: '🐯', zoneName: 'Zona 1', level: 3 },
  { id: 'zone1_level4_sticker', name: 'Gajah', emoji: '🐘', zoneName: 'Zona 1', level: 4 },
  { id: 'zone1_level5_sticker', name: 'Singa', emoji: '🦁', zoneName: 'Zona 1', level: 5 },
  { id: 'zone2_level1_sticker', name: 'Ubi', emoji: '🥔', zoneName: 'Zona 2', level: 1 },
  { id: 'zone2_level2_sticker', name: 'Bola', emoji: '⚽', zoneName: 'Zona 2', level: 2 },
  { id: 'zone2_level3_sticker', name: 'Sabun', emoji: '🧼', zoneName: 'Zona 2', level: 3 },
  { id: 'zone2_level4_sticker', name: 'Dadu', emoji: '🎲', zoneName: 'Zona 2', level: 4 },
  { id: 'zone2_level5_sticker', name: 'Madu', emoji: '🍯', zoneName: 'Zona 2', level: 5 },
  { id: 'zone3_level1_sticker', name: 'Roket', emoji: '🚀', zoneName: 'Zona 3', level: 1 },
  { id: 'zone3_level2_sticker', name: 'Kilat', emoji: '⚡', zoneName: 'Zona 3', level: 2 },
  { id: 'zone3_level3_sticker', name: 'Angin', emoji: '💨', zoneName: 'Zona 3', level: 3 },
  { id: 'zone3_level4_sticker', name: 'Balap', emoji: '🏎️', zoneName: 'Zona 3', level: 4 },
  { id: 'zone3_level5_sticker', name: 'Piala', emoji: '🏆', zoneName: 'Zona 3', level: 5 },
]

const collectedCount = computed(() => {
  return progressStore.collectedStickers.filter(id => stickersList.some(s => s.id === id)).length
})

function isCollected(id: string) {
  return progressStore.collectedStickers.includes(id)
}

const achievements = computed(() => {
  const list: string[] = []
  
  // Calculate completed counts per zone
  const z1Count = Object.keys(progressStore.completedLevels).filter(k => k.startsWith('zone1')).length
  const z2Count = Object.keys(progressStore.completedLevels).filter(k => k.startsWith('zone2')).length
  const z3Count = Object.keys(progressStore.completedLevels).filter(k => k.startsWith('zone3')).length

  if (z1Count >= 5) list.push('Penjelajah Hutan Bunyi (Menyelesaikan Zona 1)')
  if (z2Count >= 5) list.push('Pembangun Jembatan Kata (Menyelesaikan Zona 2)')
  if (z3Count >= 5) list.push('Pelari Labirin Cepat (Menyelesaikan Zona 3)')
  if (progressStore.totalPoints >= 1000) list.push('Bintang Emas (Mendapat > 1000 Poin)')

  return list
})
</script>
