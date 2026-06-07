# Plan: Petualangan Suku Kata - Educational Web Game

**TL;DR:** Build an interactive educational web game for children 4-7 using **Vue 3 + Phaser 3 + Vite**. Plugin-based architecture supports multiple games (starting with Syllable Safari), all game logic runs on client-side, zero login required, offline support via Service Worker, and mobile-responsive for Android/iOS.

---

## **Tech Stack (Most Efficient & Mobile-Friendly)**

| Layer | Technology | Why |
|-------|-----------|-----|
| **UI Framework** | Vue 3 (Composition API) | Lean, reactive, perfect for UI + menus |
| **Build Tool** | Vite | Fast builds, instant HMR, PWA support |
| **Game Engine** | Phaser 3 | Smallest bundle (200KB), best 2D support, great mobile performance |
| **State Management** | Pinia | Lightweight, built-in localStorage persistence, Vue 3 native |
| **Styling** | Tailwind CSS | Utility-first, child-friendly design system |
| **Audio/Speech** | Web Speech API + Web Audio API | Native browser APIs, no external deps, offline-capable |
| **Offline** | Vite PWA + Service Worker | Automatic caching, works without internet |
| **Deployment** | Static hosting (Apache/Nginx) | Fast, cheap, scales infinitely |

**Bundle Target:** < 500KB gzipped (Phaser + Vue 3 + Pinia combined)

---

## **Project Structure (Extensible for Multiple Games)**

Three-phase approach:
- **Phase 0** (3-4 days): Setup + infrastructure  
- **Phase 1** (8-10 days): Syllable Safari (3 zones)
- **Phase 2** (3-4 days): Polish + deployment  
- **Phase 3+**: Future games use same plugin pattern

Folder structure organized by game (each game is a plugin):
```
src/
├── games/
│   ├── syllable-safari/    # Fase 1 game
│   │   ├── scenes/         # BootScene, MenuScene, Zone1/2/3, ResultScene
│   │   ├── prefabs/        # Reusable sprites (BalloonButton, DragStone, etc)
│   │   ├── assets/         # Images, audio (syllable pronunciations, SFX)
│   │   └── utils/          # syllableData.ts, levelProgression.ts
│   ├── [future-game-2]/    # Fase 2 placeholder
│   ├── base/               # BaseGameScene, shared game logic
│   ├── types.ts            # GameConfig interface (contract for all games)
│   └── index.ts            # Game registry + plugin loader
├── components/             # GameShell.vue, ProgressBoard.vue, etc
├── stores/                 # Pinia: gameState, progressStore (persistent stickers)
└── services/               # speechService.ts, audioService.ts, etc
```

---

## ✅ **Action Items Checklist**

### **PHASE 0: Project Setup (3-4 days)**

**Initialize Project**
- [ ] Create Vite + Vue 3 + TypeScript project
- [ ] Install: Phaser 3, Pinia, Tailwind CSS, Vite PWA plugin
- [ ] Configure `vite.config.ts` (PWA, asset optimization)
- [ ] Setup Tailwind config with child-friendly color palette

**Create Base Architecture**
- [ ] Create game plugin system (game registry, dynamic loader)
- [ ] Define `GameConfig` & `GameState` TypeScript interfaces
- [ ] Create `BaseGameScene` abstract class (reusable Phaser scene)
- [ ] Setup Pinia stores: `gameState`, `progressStore` (persistent), `audioStore`

**Implement Services** (all client-side, no backend)
- [ ] `SpeechService` — Web Speech API wrapper (speak syllables)
- [ ] `AudioService` — Web Audio API wrapper (sound effects)
- [ ] `AssetPreloader` — Preload game assets efficiently
- [ ] `StorageService` — localStorage/IndexedDB wrapper
- [ ] `FeatureDetection` — Check browser capabilities (fallbacks)

**Create UI Shell**
- [ ] `App.vue` — Root component
- [ ] `GameShell.vue` — Phaser game container
- [ ] `GameSelector.vue` — Game menu / level selection
- [ ] `ProgressBoard.vue` — Sticker collection display
- [ ] `AudioToggle.vue` — Volume & speech preferences

**Configure Mobile & Responsive**
- [ ] Create responsive utility helpers (Phaser FIT scale mode)
- [ ] Setup CSS for mobile safe-areas, 48px+ touch targets (WCAG)
- [ ] Test on mobile browsers (Android Chrome, iOS Safari)

**Setup PWA & Offline**
- [ ] Configure Vite PWA plugin
- [ ] Create `manifest.webmanifest`
- [ ] Generate service-worker (automatic via Vite PWA)
- [ ] Verify offline gameplay works

---

### **PHASE 1: Syllable Safari Game (8-10 days)**

**A. Game Data & Setup (1-2 days)**
- [ ] Create syllable dataset: ba, bi, bu, be, bo + a, i, u, e, o
- [ ] Define level progression config (difficulty scaling per zone)
- [ ] Create `BootScene` (preload all Syllable Safari assets)
- [ ] Create `MenuScene` (zone selection, level select screen)

**B. Zone 1: Hutan Bunyi — Recognition (3-4 days)**
- [ ] Create forest background + animated sprites
- [ ] Create "Burung Beo" speaker button, speak random syllable via Web Speech API
- [ ] Create 4 balloon/fruit buttons with syllable text
- [ ] Implement click detection + hit/miss logic
- [ ] Positive feedback: pop animation + ding sound
- [ ] Negative feedback: gentle retry prompt
- [ ] Track score, level progression (3 attempts per level)
- [ ] Level-up transition animation to Zone 2

**C. Zone 2: Jembatan Kata — Syllable Blending (3-4 days)**
- [ ] Create river background + character sprite
- [ ] Display target word (image + shape) at bridge end
- [ ] Create draggable syllable stone tiles
- [ ] Implement drag-drop + snap-to-slot detection
- [ ] Hit/miss logic, water splash on error
- [ ] Pronunciate target word via TTS when showing
- [ ] Level progression (increase word difficulty)

**D. Zone 3: Labirin Cepat — Speed/Reflex (3-4 days)**
- [ ] Create arcade-style falling card mechanic
- [ ] Implement falling physics + speed increase per level
- [ ] Click/tap detection for matching target syllable
- [ ] Lives/health system, combo counter
- [ ] Game-over + score screen, star rating

**E. Results & Progress Tracking (1 day)**
- [ ] Create `ResultScene` (score, stars, sticker award)
- [ ] Integrate sticker awards (1-3 stickers per zone completion)
- [ ] Update `progressStore` (persist to localStorage)
- [ ] Show achievements & unlocked content

---

### **PHASE 2: Polish & Deployment (3-4 days)**

**Audio & Visual Polish**
- [ ] Record/source high-quality syllable pronunciations (Indonesian, friendly accent)
- [ ] Create sound effects (pop, ding, level-up, error) or source royalty-free
- [ ] Create/source ambient background music per zone
- [ ] Test audio on mobile (iOS audio restrictions, use user gesture for playback)
- [ ] Add particle effects, screen transitions, character animations
- [ ] Ensure pastel color palette (no eye strain)

**Testing & QA**
- [ ] Browser compatibility (Chrome, Firefox, Safari, mobile browsers)
- [ ] Mobile responsiveness (Android tablet, iPad, portrait + landscape)
- [ ] Touch input testing (click zones, no accidental double-clicks)
- [ ] Offline mode verification (Service Worker caching)
- [ ] Performance profiling (60 FPS target, < 50MB RAM, < 500KB bundle)
- [ ] Accessibility (WCAG 2.1 Level AA: 48px+ touch targets, large fonts, high contrast)

**Build & Deploy**
- [ ] Optimize assets (image compression WebP + fallback, audio bitrate)
- [ ] Production build (`npm run build`)
- [ ] Deploy to Apache/Nginx server
- [ ] Configure cache headers (Cache-Control for assets)
- [ ] Verify all links, assets load, no 404s
- [ ] Lighthouse audit (target > 90 for Performance, Accessibility)

**Documentation**
- [ ] Create README (setup, deployment, game mechanics)
- [ ] Document game architecture for Phase 2 games
- [ ] Setup CI/CD pipeline (optional: GitHub Actions for auto-deploy)

---

### **PHASE 3: Future Games (Fase 2+) — Roadmap**

- [ ] **Game 2**: Reuse `BaseGameScene`, game registry, services
  - [ ] Choose game type (number recognition, animal sounds, color matching)
  - [ ] Create game-specific assets + scenes
  - [ ] Register in game plugin system
  - [ ] Follow same testing + deployment steps

- [ ] **Game 3+**: Repeat pattern, potentially add:
  - [ ] Achievements/badges system
  - [ ] Leaderboard (localStorage-based, no backend)

---

## **Critical Files to Reference/Modify**

- **vite.config.ts** — Build config, PWA setup, asset optimization
- **src/games/types.ts** — GameConfig interface (contract for all games)
- **src/games/base/BaseGameScene.ts** — Reusable Phaser scene template
- **src/games/syllable-safari/syllableData.ts** — Syllable dataset
- **src/services/speechService.ts** — Web Speech API integration
- **src/stores/progressStore.ts** — Pinia persistent sticker board
- **src/utils/responsive.ts** — Phaser mobile scale config
- **public/manifest.webmanifest** — PWA manifest (app name, icons)

---

## **Verification Steps**

| Phase | Verification | Success Criteria |
|-------|-------------|-----------------|
| **Phase 0** | Plugin system works, Pinia persists | Can register + load game dynamically |
| **Phase 1** | Complete all 3 zones, sticker saves | Sticker persists after page reload |
| **Phase 2** | QA Testing | Lighthouse > 90, 60 FPS on mobile, all browsers pass |
| **Deployment** | Live test | Game playable offline, assets load fast |

---

## **Key Decisions**

✅ **No Login**: Reduces complexity, aligns with education use case  
✅ **Client-Side Only**: No backend needed, works offline, cost-effective  
✅ **Web Speech API**: Free TTS for syllable pronunciation, progressive enhancement  
✅ **Pinia + localStorage**: Simple persistence, scales to multiple games  
✅ **Phaser 3**: Smallest footprint, best 2D support, mobile-optimized  

---

## **Extended Architecture Details**

### **Why Vue 3 + Phaser?**
- **Vue 3**: Lean, reactive, perfect for UI shell + game menu
- **Phaser 3**: Smallest bundle (200KB), best for 2D educational games, great sprite/animation support
- **Combination**: Vue for shell, Phaser for game scenes = clean separation of concerns

### **Why Client-Side Only?**
- No login = no user DB required
- No server game logic = zero latency, works offline
- Cost-effective (static hosting sufficient)
- Keeps data on device (privacy for kids)

### **Why Pinia for State?**
- Lightweight, Vue 3 first-class support
- Automatic localStorage persistence (via plugin)
- Simpler than Vuex, closer to Composition API
- Scales to multiple games without bloat

### **Why Web Speech API?**
- Native browser support, no external libs
- Free TTS for syllable pronunciation
- Progressive enhancement (graceful fallback if unavailable)
- Mobile-friendly

### **Asset Preloading Strategy**
- **Critical assets** (first zone) load before play starts
- **Non-critical** (zones 2-3) load in background
- Goal: < 2 second first interaction time

### **Offline Support Rationale**
- Teachers can download once, use in classroom without WiFi
- Aligns with education use case
- Service Worker + Vite PWA plugin handles automatically

---

## **Full Project Structure**

```
sparkle-stash/
├── src/
│   ├── games/
│   │   ├── index.ts                    # Game registry + plugin loader
│   │   ├── types.ts                    # GameConfig, GameState interfaces
│   │   ├── base/
│   │   │   ├── BaseGameScene.ts        # Reusable game scene base
│   │   │   └── gameConstants.ts        # Shared game logic utils
│   │   │
│   │   └── syllable-safari/            # Fase 1: Syllable Safari
│   │       ├── index.ts                # Export GameConfig
│   │       ├── config.ts               # Game-specific Phaser config
│   │       ├── scenes/
│   │       │   ├── BootScene.ts        # Load assets
│   │       │   ├── MenuScene.ts        # Level select
│   │       │   ├── Zone1HutanBunyiScene.ts
│   │       │   ├── Zone2JembatanKataScene.ts
│   │       │   ├── Zone3LabirinCepatScene.ts
│   │       │   └── ResultScene.ts      # Level complete feedback
│   │       │
│   │       ├── prefabs/
│   │       │   ├── BalloonButton.ts    # Reusable sprite with text
│   │       │   ├── SoundButton.ts      # Speaker button for TTS
│   │       │   ├── DragDropStone.ts    # Draggable syllable tiles
│   │       │   └── FallingCard.ts      # Arcade-style falling tiles
│   │       │
│   │       ├── assets/
│   │       │   ├── images/
│   │       │   │   ├── backgrounds/
│   │       │   │   ├── sprites/
│   │       │   │   └── ui/
│   │       │   ├── audio/
│   │       │   │   ├── syllables/      # Pre-recorded syllable pronunciations
│   │       │   │   ├── effects/        # Pop, ding, success, level-up sounds
│   │       │   │   └── music/          # Ambient background music
│   │       │   └── manifest.json       # Asset preload list
│   │       │
│   │       └── utils/
│   │           ├── syllableData.ts     # ba, bi, bu, be, bo + vowels
│   │           └── levelProgression.ts # Level difficulty scaling
│   │
│   │   └── [future-game-2]/            # Fase 2 placeholder
│   │       └── ... (same structure)
│   │
│   ├── components/
│   │   ├── GameShell.vue               # Wrapper that loads Phaser game
│   │   ├── ProgressBoard.vue           # Sticker collection display
│   │   ├── StickerReward.vue           # Sticker unlock animation
│   │   ├── AudioToggle.vue             # Volume + speech preference
│   │   ├── GameSelector.vue            # Game menu
│   │   └── About.vue                   # Game info for parents
│   │
│   ├── stores/
│   │   ├── gameState.ts                # Pinia: current game, score, level
│   │   ├── progressStore.ts            # Pinia: stickers, achievements (persist)
│   │   ├── audioStore.ts               # Pinia: volume, speech enabled, lang
│   │   └── index.ts                    # Store setup
│   │
│   ├── services/
│   │   ├── speechService.ts            # Text-to-speech (Web Speech API)
│   │   ├── audioService.ts             # Sound effects (Web Audio API)
│   │   ├── assetLoader.ts              # Preload game assets
│   │   ├── storageService.ts           # localStorage/IndexedDB wrapper
│   │   └── featureDetection.ts         # Browser capability check
│   │
│   ├── utils/
│   │   ├── responsive.ts               # Phaser scale config + touch zones
│   │   ├── animations.ts               # Reusable Phaser animations
│   │   ├── math.ts                     # Game math helpers
│   │   └── logger.ts                   # Dev-mode console logging
│   │
│   ├── App.vue                         # Root component
│   ├── main.ts                         # Entry point
│   └── style.css                       # Global styles + Tailwind
│
├── public/
│   ├── assets/
│   │   ├── syllable-safari/
│   │   │   ├── images/
│   │   │   ├── audio/
│   │   │   └── manifest.json
│   │   └── shared/                     # Common UI sounds, icons
│   │
│   ├── manifest.webmanifest            # PWA manifest
│   ├── service-worker.ts               # Offline support (Vite PWA)
│   └── favicon.ico
│
├── vite.config.ts                      # Vite config with PWA plugin
├── tsconfig.json
├── package.json
├── tailwind.config.js
└── .env.example                        # API config (if needed later)
```

---

## **Future Considerations**

1. **Parent/Teacher Dashboard (Phase 2 feature?)**
   - Option A: Simple stats page (games played, scores) — localStorage-based, no backend
   - Option B: Cloud sync (Firebase/Supabase) — adds backend complexity
   - **Recommendation**: Phase 1 local-only, add Option A in Phase 2 if requested

2. **Language & Localization (Phase 2+)**
   - Option A: Indonesian only (Fase 1), add English/other languages later
   - Option B: i18n setup now (more setup effort, future-proof)
   - **Recommendation**: Indonesian only Phase 1. Use i18n framework if expanding beyond 3 languages.

3. **Difficulty Scaling & Difficulty Selection**
   - Option A: Automatic scaling (levels auto-increase difficulty)
   - Option B: Manual difficulty selection (Easy, Medium, Hard)
   - **Recommendation**: Automatic scaling Phase 1, add Option B in Phase 2 if data shows kids want choice.
