# UI/UX Plan: Petualangan Suku Kata

---

## **Design Philosophy & Principles**

### **Target Audience: Children 4-7 Years Old**
✅ **Large Touch Targets** — 48px minimum (WCAG 2.1 Level AA)  
✅ **Bold, Playful Visuals** — Rounded shapes, friendly colors  
✅ **Minimal Text** — Icons + illustrations for instructions  
✅ **Instant Feedback** — Animations, sounds, visual rewards  
✅ **Intuitive Navigation** — 1-2 taps max to start playing  
✅ **Zero Cognitive Overload** — One action per screen  

### **Visual Design System**

#### **Color Palette (Pastel, Eye-Friendly)**
- **Primary Sky Blue** — `#87CEEB` (main backgrounds, interactive elements)
- **Leaf Green** — `#90EE90` (success, positive feedback, zone 2)
- **Sunny Yellow** — `#FFD700` (highlights, rewards, star icons)
- **Coral Pink** — `#FFB6C1` (warm, friendly, gentle feedback)
- **Lavender** — `#E6D7FF` (zone 3, speed/reflex theme)
- **White/Off-White** — `#FFFEF0` (text, overlays, contrast)
- **Soft Gray** — `#D3D3D3` (disabled, subtle elements)

**Accessibility Check:** WCAG AA contrast ratio ≥ 4.5:1 for text

#### **Typography**
- **Font:** Rounded sans-serif (Comic Sans, Nunito, Chalkboard, or similar)
- **Headings:** Bold, 44-48px (Zone/Game titles)
- **Body Text:** 32-36px (Instructions, labels)
- **UI Labels:** 28-32px (Buttons, scores)
- **Line Height:** 1.5-1.8 (better readability for children)
- **Letter Spacing:** 0.05em (clarity, reduce crowding)

#### **Iconography**
- **Style:** Simple, chunky, 2-4 colors max per icon
- **Common Icons:**
  - 🔊 Speaker (play syllable pronunciation)
  - ⭐ Star (achievement, level complete)
  - 🎫 Sticker (reward, progress)
  - ⚙️ Gear (settings)
  - ← Arrow (back, navigation)
  - ❤️ Heart (lives, health)
  - 🎵 Music note (audio toggle)

#### **Animations & Motion**
- **Duration:** 300-500ms (not too fast, visible but snappy)
- **Easing:** ease-out (natural, playful feel)
- **Examples:**
  - Pop balloon: scale(1) → scale(0) + fade
  - Sticker unlock: bounce in from bottom
  - Level transition: slide + fade + scale
  - Success feedback: pulse + star burst
  - Error feedback: gentle shake (not scary)

---

## **Navigation Flow & User Journey**

### **Global Navigation Structure**

```
App Root (App.vue)
│
├─── [INITIAL LOAD]
│    └─ Splash/Loader Screen (2 sec) → Preload assets
│
├─── HOME SCREEN
│    ├─ Game Selector (Syllable Safari card)
│    ├─ Progress Board button (top-right)
│    ├─ Settings button (gear icon, top-right)
│    └─ About button (i icon, bottom-left)
│
├─── GAME VIEW (GameShell.vue wraps Phaser)
│    │
│    ├─ MENU SCENE
│    │  ├─ Zone selector (3 cards: Zone 1, 2, 3)
│    │  ├─ Level selector (1-10 per zone)
│    │  └─ Back button → Home Screen
│    │
│    ├─ ZONE 1: HUTAN BUNYI (Recognition)
│    │  ├─ Speaker button (Burung Beo)
│    │  ├─ 4 Balloon buttons (ba, bi, bu, be, bo / a, i, u, e, o)
│    │  ├─ Attempt counter (top-left)
│    │  ├─ Score display (top-right)
│    │  └─ Pause button (top-right)
│    │
│    ├─ ZONE 2: JEMBATAN KATA (Syllable Blending)
│    │  ├─ Target word image + shape (top-center)
│    │  ├─ River background + bridge visualization
│    │  ├─ Draggable syllable stones (bottom)
│    │  ├─ Score display (top-right)
│    │  └─ Pause button (top-right)
│    │
│    ├─ ZONE 3: LABIRIN CEPAT (Arcade/Speed)
│    │  ├─ Falling syllable cards (procedural)
│    │  ├─ Lives counter (top-left)
│    │  ├─ Combo counter (center, large)
│    │  ├─ Score display (top-right)
│    │  └─ Pause button (top-right)
│    │
│    └─ RESULT SCENE
│       ├─ Final score + stars (1-3)
│       ├─ Sticker reward animation
│       ├─ "Next Level" or "Complete!" message
│       ├─ Replay button (bottom-left)
│       └─ Back to Menu button (bottom-right)
│
├─── PROGRESS BOARD (Modal overlay or separate view)
│    ├─ Sticker gallery (grid of collected stickers)
│    ├─ Total points display
│    ├─ Achievements list
│    └─ Close button
│
├─── SETTINGS (Modal overlay)
│    ├─ Volume slider (mute, low, medium, high)
│    ├─ Speech enabled toggle (on/off)
│    ├─ Language selector (placeholder for future)
│    └─ Close button
│
└─── ABOUT/INSTRUCTIONS
     ├─ How to play guide (2-3 screens)
     ├─ Parent info (what skills child learns)
     └─ Close button
```

### **Detailed User Flows**

#### **Flow 1: First Time User**
```
[Splash Screen - 2 sec] 
  ↓
[Home Screen]
  ├─ User sees Syllable Safari game card
  └─ Taps game card
    ↓
[Game Menu Scene]
  ├─ User sees 3 zone options
  └─ Taps Zone 1
    ↓
[Zone 1 Level 1]
  ├─ Speaker button auto-highlights (pulsing animation)
  ├─ Gentle instruction: "Dengarkan! Klik balon yang benar!"
  └─ User taps speaker → Hears "BA!"
    ├─ 4 balloon options appear
    └─ User taps "BA" balloon
      ├─ ✅ Pop animation + "Ding!" sound
      ├─ Score +10
      ├─ Next syllable automatically plays after 1 sec
      ├─ User repeats 3 times successfully
      └─ [Result Scene - Level Complete!]
        ├─ Stars: ⭐⭐⭐
        ├─ Score: 100
        ├─ Sticker award animation
        └─ [Ready for Zone 2 or Menu]
```

#### **Flow 2: Returning User - Progress Resume**
```
[Home Screen]
  └─ Progress Board shows 3 stickers collected
    ├─ User sees "Zone 1 Level 5" in progress
    └─ Taps game → [Game Menu]
      └─ Zone 1 highlighted, Level 5 pre-selected
        └─ User taps "Continue" → [Zone 1 Level 5]
```

#### **Flow 3: Game Over / Pause**
```
[Zone 3 - Labirin Cepat] (arcade falling cards)
  ├─ User loses all 3 lives
  └─ [Game Over Overlay]
    ├─ Score: 250
    ├─ Stars: ⭐⭐ (1-2 stars for incomplete)
    ├─ "Try Again?" button
    └─ "Back to Menu" button
```

---

## **ASCII Mockups**

### **1. HOME SCREEN (Desktop & Mobile)**

#### **Desktop Layout (1024x768)**
```
╔════════════════════════════════════════════════════════════════════╗
║                    PETUALANGAN SUKU KATA 🎮                        ║
║                                                                    ║
║     [⚙️ Settings]                          [🎫 Progress] [ℹ️ Info]  ║
║                                                                    ║
║                                                                    ║
║                    ┌─────────────────────┐                        ║
║                    │                     │                        ║
║                    │  SYLLABLE SAFARI    │  ← Tap to Play         ║
║                    │   (Game Card)       │                        ║
║                    │   🌴 🦜 🌴 🌴 🌴   │                        ║
║                    │  Learn Syllables!   │                        ║
║                    │   Locked: Zone 2    │                        ║
║                    └─────────────────────┘                        ║
║                                                                    ║
║                                                                    ║
║              ┌──────────────────────────┐                         ║
║              │  [Future Game 2]         │  (Grayed out)          ║
║              │  Coming Soon! 🚀         │                         ║
║              └──────────────────────────┘                         ║
║                                                                    ║
║                                                                    ║
║                         © 2026 Sparkle Stash                      ║
╚════════════════════════════════════════════════════════════════════╝
```

#### **Mobile Layout (375x667 - Portrait)**
```
╔══════════════════════════════╗
║  ⚙️  SUKU KATA  🎫 ℹ️         ║
║══════════════════════════════║
║                              ║
║   ┌──────────────────────┐   ║
║   │                      │   ║
║   │  SYLLABLE SAFARI     │   ║
║   │  (Tall Card)         │   ║
║   │  🌴 🦜 🌴 🌴 🌴    │   ║
║   │  Learn Syllables!    │   ║
║   │                      │   ║
║   │  [TAP TO PLAY]       │   ║
║   │                      │   ║
║   └──────────────────────┘   ║
║                              ║
║   ┌──────────────────────┐   ║
║   │ Game 2 Coming Soon   │   ║
║   └──────────────────────┘   ║
║                              ║
║                              ║
║   [Sticker Badges: 3/20]     ║
║   ⭐ ⭐ 🎫                    ║
╚══════════════════════════════╝
```

---

### **2. GAME MENU SCENE (Zone & Level Selection)**

#### **Desktop Layout**
```
╔════════════════════════════════════════════════════════════════════╗
║                                               [← Back to Home]     ║
║                      PILIH ZONA PEMBELAJARAN                       ║
║                                                                    ║
║     ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
║     │ ZONA 1          │   │ ZONA 2          │   │ ZONA 3          │
║     │ Hutan Bunyi     │   │ Jembatan Kata   │   │ Labirin Cepat   │
║     │ (Recognize)     │   │ (Blend)         │   │ (Speed)         │
║     │                 │   │                 │   │                 │
║     │  🎙️ 🔊 🎵       │   │  🪨 🪨 🪨       │   │  💨 💨 💨       │
║     │                 │   │                 │   │                 │
║     │  [TAP]          │   │  [TAP]          │   │  [TAP]          │
║     └─────────────────┘   └─────────────────┘   └─────────────────┘
║
║              PILIH LEVEL (Zone 1 selected):
║
║  ┌────┬────┬────┬────┬────┐  ┌────┬────┬────┬────┬────┐
║  │ 1✓ │ 2✓ │ 3✓ │ 4✓ │ 5> │  │ 6  │ 7  │ 8  │ 9  │ 10 │
║  └────┴────┴────┴────┴────┘  └────┴────┴────┴────┴────┘
║  
║  ✓ = Complete    > = In Progress    □ = Locked
║                                                                    ║
║                    [CONTINUE TO LEVEL 5]                          ║
╚════════════════════════════════════════════════════════════════════╝
```

#### **Mobile Layout (Vertical Scroll)**
```
╔══════════════════════════════╗
║  [← Home]   PILIH ZONA       ║
║══════════════════════════════║
║                              ║
║   ┌──────────────────────┐   ║
║   │ ZONA 1               │   ║
║   │ Hutan Bunyi 🔊       │   ║
║   │  [TAP]               │   ║
║   └──────────────────────┘   ║
║                              ║
║   ┌──────────────────────┐   ║
║   │ ZONA 2               │   ║
║   │ Jembatan Kata 🪨     │   ║
║   │  [TAP]               │   ║
║   └──────────────────────┘   ║
║                              ║
║   ┌──────────────────────┐   ║
║   │ ZONA 3               │   ║
║   │ Labirin Cepat 💨     │   ║
║   │  [TAP]               │   ║
║   └──────────────────────┘   ║
║                              ║
║   ─────────────────────────  ║
║   LEVEL SELECT (Zone 1):     ║
║   ┌──┬──┬──┬──┬──┬──┬──┐   ║
║   │1 │2 │3 │4 │5 │6 │7 │   ║
║   ├──┼──┼──┼──┼──┼──┼──┤   ║
║   │✓ │✓ │✓ │✓ │> │  │  │   ║
║   └──┴──┴──┴──┴──┴──┴──┘   ║
║                              ║
║   [LANJUTKAN KE LEVEL 5]     ║
╚══════════════════════════════╝
```

---

### **3. ZONE 1: HUTAN BUNYI (Recognition Game)**

#### **Desktop Layout (Phaser Game Scene 1024x768)**
```
╔════════════════════════════════════════════════════════════════════╗
║  Attempt: 1/3  [⏸️]                    Score: 100  [🏠]           ║
║════════════════════════════════════════════════════════════════════║
║                                                                    ║
║                      🌲 🌲 🌲 🌲 🌲                              ║
║                                                                    ║
║                      DENGARKAN! 🔊                                 ║
║                                                                    ║
║                    ╔══════════════════╗                           ║
║                    ║                  ║                           ║
║                    ║   🦜 BURUNG BEO  ║  ← Click to play syllable ║
║                    ║   [SPEAKER]      ║                           ║
║                    ║                  ║                           ║
║                    ╚══════════════════╝                           ║
║                                                                    ║
║            KLIK BALON YANG SESUAI:                                ║
║                                                                    ║
║      ┌────────────┐          ┌────────────┐                      ║
║      │    BA      │          │    BI      │                      ║
║      │   (Balon)  │          │   (Balon)  │                      ║
║      └────────────┘          └────────────┘                      ║
║                                                                    ║
║      ┌────────────┐          ┌────────────┐                      ║
║      │    BU      │          │    BE      │                      ║
║      │   (Balon)  │          │   (Balon)  │                      ║
║      └────────────┘          └────────────┘                      ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

[FEEDBACK ON CLICK]

✅ BENAR!                              ❌ COBA LAGI!
╔════════════════════════╗            ╔════════════════════════╗
║                        ║            ║                        ║
║   💥 [POP!]            ║            ║   ⚠️ OOPS!             ║
║   ⭐ Score: +10        ║            ║   Dengarkan lagi? 🔊   ║
║   ✨ Next syllable...  ║            ║   [SPEAKER BUTTON]     ║
║                        ║            ║   Coba lagi...         ║
║   [AUTO: Next in 1s]   ║            ║                        ║
║                        ║            ║   [RETRY BALLOONS]     ║
╚════════════════════════╝            ╚════════════════════════╝
```

#### **Mobile Layout (Portrait, Phaser 375x800)**
```
╔══════════════════════════════╗
║ 1/3  [⏸️]  Score: 100  [🏠]  ║
║══════════════════════════════║
║                              ║
║      🌲 🌲 🌲 🌲 🌲        ║
║                              ║
║      DENGARKAN! 🔊           ║
║                              ║
║    ╔══════════════════╗      ║
║    ║                  ║      ║
║    ║ 🦜 BURUNG BEO   ║      ║
║    ║ [SPEAKER]       ║      ║
║    ║                  ║      ║
║    ╚══════════════════╝      ║
║                              ║
║  KLIK BALON YANG SESUAI:     ║
║                              ║
║    ┌──────────────┐          ║
║    │     BA       │          ║
║    │    (Balon)   │          ║
║    └──────────────┘          ║
║    ┌──────────────┐          ║
║    │     BI       │          ║
║    │    (Balon)   │          ║
║    └──────────────┘          ║
║    ┌──────────────┐          ║
║    │     BU       │          ║
║    │    (Balon)   │          ║
║    └──────────────┘          ║
║    ┌──────────────┐          ║
║    │     BE       │          ║
║    │    (Balon)   │          ║
║    └──────────────┘          ║
║                              ║
╚══════════════════════════════╝
```

---

### **4. ZONE 2: JEMBATAN KATA (Drag & Drop)**

#### **Desktop Layout (Phaser 1024x768)**
```
╔════════════════════════════════════════════════════════════════════╗
║  Level: 2/10  [⏸️]                     Score: 250  [🏠]           ║
║════════════════════════════════════════════════════════════════════║
║                                                                    ║
║        TARGET: UBI (Gambar Ubi) 🥔                               ║
║        🔊 DENGARKAN: "UBI"  [SPEAKER]                            ║
║                                                                    ║
║    ┌─────────────────────────────────────────────────┐           ║
║    │           SUNGAI                                │           ║
║    │  ┌─────┐  ┌─────┐  ┌─────┐                    │           ║
║    │  │ U  │  │ B  │  │ I  │  ← Drag stones here  │           ║
║    │  └──┬──┘  └──┬──┘  └──┬──┘                    │           ║
║    │     │        │        │  _____                │           ║
║    │     │        │        │ /     \               │           ║
║    │     │        │        │ ║ UBI ║ ← Bridge   │           ║
║    │     │        └────────┼─╨─────╨──────────────│           ║
║    │ 🧔ANAK                │          🥔 TUJUAN   │           ║
║    │    ▲                  │       (Target area)  │           ║
║    │    │ (crossing)       │                      │           ║
║    │                                              │           ║
║    └─────────────────────────────────────────────────┘           ║
║                                                                    ║
║    AVAILABLE STONES (Drag to bridge):                            ║
║                                                                    ║
║      ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   ║
║      │    U     │  │    B     │  │    I     │  │    O     │   ║
║      │  (Stone) │  │  (Stone) │  │  (Stone) │  │  (Stone) │   ║
║      └──────────┘  └──────────┘  └──────────┘  └──────────┘   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

#### **Mobile Layout (Portrait)**
```
╔══════════════════════════════╗
║ L2/10 [⏸️]  Score: 250 [🏠]  ║
║══════════════════════════════║
║  TARGET: UBI 🥔              ║
║  🔊 [SPEAKER]                ║
║                              ║
║  ┌──────────────────────┐   ║
║  │    SUNGAI            │   ║
║  │                      │   ║
║  │  ┌─────┐ ┌─────┐    │   ║
║  │  │U   │ │B   │    │   ║
║  │  └─────┘ └─────┘    │   ║
║  │     │      │        │   ║
║  │     └──┬───┘        │   ║
║  │  ┌──────────┐       │   ║
║  │  │   UBI    │       │   ║
║  │  │   (Slot) │       │   ║
║  │  └──────────┘       │   ║
║  │        🥔 TGN       │   ║
║  └──────────────────────┘   ║
║                              ║
║ BATU (Drag):                 ║
║ ┌─────┐ ┌─────┐ ┌─────┐    ║
║ │  U  │ │  B  │ │  I  │    ║
║ └─────┘ └─────┘ └─────┘    ║
║                              ║
╚══════════════════════════════╝
```

---

### **5. ZONE 3: LABIRIN CEPAT (Arcade/Falling)**

#### **Desktop Layout (Phaser 1024x768)**
```
╔════════════════════════════════════════════════════════════════════╗
║  Lives: ❤️ ❤️ ❤️  [⏸️]      Combo: 5x   Score: 500  [🏠]        ║
║════════════════════════════════════════════════════════════════════║
║                                                                    ║
║                      🎯 TARGET: BA                                ║
║                                                                    ║
║  ╔════════════════════════════════════════════════════════════╗  ║
║  ║                                                            ║  ║
║  ║       ┌─────┐                                             ║  ║
║  ║       │  BI │                                             ║  ║
║  ║       └─────┘                                             ║  ║
║  ║                                 ┌─────┐                  ║  ║
║  ║                                 │  BA │  ← CLICK THIS!  ║  ║
║  ║                                 └─────┘                  ║  ║
║  ║            ┌─────┐                                        ║  ║
║  ║            │  BU │                                        ║  ║
║  ║            └─────┘                                        ║  ║
║  ║                                              ┌─────┐     ║  ║
║  ║                                              │  BE │     ║  ║
║  ║                                              └─────┘     ║  ║
║  ║                  ┌─────┐                                  ║  ║
║  ║                  │  BO │                                  ║  ║
║  ║                  └─────┘                                  ║  ║
║  ║                                                            ║  ║
║  ║   ✓✓✓ Correct catches:                                    ║  ║
║  ║   ✗✗ Mistakes                                             ║  ║
║  ║                                                            ║  ║
║  ║                    ◄─────────────────────────────────────┤  ║
║  ║                                           Cards move left   ║  ║
║  ║                   [CLICK HERE TO CATCH!]                  ║  ║
║  ║                                                            ║  ║
║  ║                   *** SAFE ZONE ***                       ║  ║
║  ╚════════════════════════════════════════════════════════════╝  ║
║                                                                    ║
║                  HURRY! Cards move FASTER each round!            ║
╚════════════════════════════════════════════════════════════════════╝
```

#### **Mobile Layout (Portrait)**
```
╔══════════════════════════════╗
║❤️❤️❤️ [⏸️] 5x [🏠]         ║
║ Score: 500                   ║
║══════════════════════════════║
║                              ║
║    🎯 TARGET: BA             ║
║                              ║
║ ┌──────────────────────────┐ ║
║ │                          │ ║
║ │      ┌─────┐             │ ║
║ │      │ BI  │             │ ║
║ │      └─────┘             │ ║
║ │                          │ ║
║ │            ┌─────┐       │ ║
║ │            │ BA  │ ← ME! │ ║
║ │            └─────┘       │ ║
║ │   ┌─────┐                │ ║
║ │   │ BU  │                │ ║
║ │   └─────┘                │ ║
║ │                          │ ║
║ │         ┌─────┐          │ ║
║ │         │ BE  │          │ ║
║ │         └─────┘          │ ║
║ │                          │ ║
║ │   ┌──────────────────┐   │ ║
║ │   │    TAP ZONE      │   │ ║
║ │   │   [CATCH HERE]   │   │ ║
║ │   └──────────────────┘   │ ║
║ │                          │ ║
║ └──────────────────────────┘ ║
║                              ║
║ Lives: ❤️❤️ (1 down)        ║
║ Combo: 5✓ ✗                 ║
║                              ║
╚══════════════════════════════╝
```

---

### **6. RESULT SCENE (Level Complete)**

#### **Desktop Layout (Modal Overlay)**
```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║                                                                    ║
║                  ╔════════════════════════════╗                   ║
║                  ║                            ║                   ║
║                  ║   ✨ LEVEL SELESAI! ✨   ║                   ║
║                  ║                            ║                   ║
║                  ║     SKOR: 320 POIN        ║                   ║
║                  ║                            ║                   ║
║                  ║     ⭐ ⭐ ⭐              ║                   ║
║                  ║    (SEMPURNA!)             ║                   ║
║                  ║                            ║                   ║
║                  │                            │                   ║
║                  │  🎫 STICKER DIPEROLEH!    │                   ║
║                  │     [STICKER ANIMATION]    │                   ║
║                  │     🎉 Burst + Bounce      │                   ║
║                  │                            │                   ║
║                  ║                            ║                   ║
║                  ║   Lanjut ke Level 2?      ║                   ║
║                  ║                            ║                   ║
║                  ║  ┌─────────────┐  ┌─────────────┐             ║
║                  ║  │ [LANJUTKAN] │  │ [KE MENU]   │             ║
║                  ║  └─────────────┘  └─────────────┘             ║
║                  ║                            ║                   ║
║                  ╚════════════════════════════╝                   ║
║                                                                    ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

#### **Mobile Layout**
```
╔══════════════════════════════╗
║                              ║
║ ╔──────────────────────────┐ ║
║ ║   ✨ LEVEL SELESAI! ✨  ║ ║
║ ║                          ║ ║
║ ║   SKOR: 320              ║ ║
║ ║                          ║ ║
║ ║   ⭐ ⭐ ⭐             ║ ║
║ ║                          ║ ║
║ ║ 🎫 STICKER DIPEROLEH!   ║ ║
║ ║   [ANIMATION]            ║ ║
║ ║   🎉 Bounce!             ║ ║
║ ║                          ║ ║
║ ║ Lanjut Level 2?          ║ ║
║ ║                          ║ ║
║ ║  ┌──────────────┐        ║ ║
║ ║  │ [LANJUTKAN]  │        ║ ║
║ ║  └──────────────┘        ║ ║
║ ║  ┌──────────────┐        ║ ║
║ ║  │  [KE MENU]   │        ║ ║
║ ║  └──────────────┘        ║ ║
║ ║                          ║ ║
║ └──────────────────────────┘ ║
║                              ║
╚══════════════════════════════╝
```

---

### **7. PROGRESS BOARD (Sticker Collection)**

#### **Desktop Modal**
```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║                    🎫 PAPAN STIKER MU                             ║
║                                                                    ║
║              Total Poin: 1250 | Stiker Terkumpul: 8/20            ║
║                                                                    ║
║    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐                ║
║    │  ⭐   │  │  ⭐   │  │  ⭐   │  │  🎫   │                ║
║    │ Zone1 │  │ Zone1 │  │ Zone2 │  │ Zone3 │                ║
║    │Lv1:OK │  │Lv2:OK │  │Lv1:OK │  │Lv1:OK │                ║
║    └────────┘  └────────┘  └────────┘  └────────┘                ║
║                                                                    ║
║    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐                ║
║    │  🎫   │  │  🎫   │  │  ❓   │  │  ❓   │                ║
║    │ Zone2 │  │ Zone3 │  │ LOCKED │  │ LOCKED │                ║
║    │Lv2:OK │  │Lv2:OK │  │        │  │        │                ║
║    └────────┘  └────────┘  └────────┘  └────────┘                ║
║                                                                    ║
║    ACHIEVEMENT UNLOCK:                                           ║
║    ✅ Zona 1 Selesai (All Levels 1-5)                           ║
║    ✅ Sempurna! (3 stars on 5 consecutive levels)               ║
║    🔓 Zona 2 Unlocked!                                           ║
║                                                                    ║
║                          [TUTUP PAPAN]                            ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

#### **Mobile Layout**
```
╔══════════════════════════════╗
║   🎫 PAPAN STIKER MU   [X]   ║
║══════════════════════════════║
║                              ║
║ Poin: 1250                   ║
║ Stiker: 8/20                 ║
║                              ║
║ ┌─────────┐  ┌─────────┐   ║
║ │    ⭐   │  │    ⭐   │   ║
║ │  Z1:L1  │  │  Z1:L2  │   ║
║ └─────────┘  └─────────┘   ║
║                              ║
║ ┌─────────┐  ┌─────────┐   ║
║ │    ⭐   │  │   🎫    │   ║
║ │  Z2:L1  │  │  Z3:L1  │   ║
║ └─────────┘  └─────────┘   ║
║                              ║
║ ┌─────────┐  ┌─────────┐   ║
║ │   🎫    │  │    ❓   │   ║
║ │  Z2:L2  │  │  LOCKED │   ║
║ └─────────┘  └─────────┘   ║
║                              ║
║ ┌─────────┐  ┌─────────┐   ║
║ │    ❓   │  │    ❓   │   ║
║ │  LOCKED │  │  LOCKED │   ║
║ └─────────┘  └─────────┘   ║
║                              ║
║ ACHIEVEMENT:                 ║
║ ✅ Zona 1 Selesai            ║
║ 🔓 Zona 2 Buka               ║
║                              ║
║            [TUTUP]           ║
╚══════════════════════════════╝
```

---

### **8. SETTINGS MODAL**

#### **Desktop/Mobile**
```
╔════════════════════════════════════════════╗
║                                            ║
║            ⚙️ PENGATURAN                  ║
║                                            ║
║  ───────────────────────────────────────  ║
║  🔊 VOLUME                                ║
║  [───●──────] 50%  (Slider)              ║
║  🔇 Mute     🔊 Max                      ║
║                                            ║
║  ───────────────────────────────────────  ║
║  🎤 SPEECH/PRONUNCIATION                 ║
║  [●] Hidup (On)                          ║
║  [ ] Mati (Off)                          ║
║                                            ║
║  ───────────────────────────────────────  ║
║  🌍 BAHASA (Future)                      ║
║  [Bahasa Indonesia ▼]                    ║
║     - Bahasa Indonesia                    ║
║     - English (Coming Soon)               ║
║                                            ║
║  ───────────────────────────────────────  ║
║                                            ║
║              [TUTUP]                       ║
║                                            ║
╚════════════════════════════════════════════╝
```

---

## **Responsive Breakpoints & Layout Strategy**

### **Breakpoint Definitions**
```
- **Mobile Portrait:** 320px - 480px (phones)
- **Mobile Landscape:** 480px - 768px (tablets, phones rotated)
- **Tablet Portrait:** 768px - 1024px (iPad, Android tablets)
- **Desktop:** 1024px+ (desktops, large screens)
```

### **Responsive Behavior**
- **Touch Size Scaling:** All buttons min 48px on mobile, 56px on desktop
- **Font Scaling:** Base 14px → 16px (mobile) → 18px (desktop)
- **Game Canvas:** Always FIT mode (Phaser scale: 100% viewport)
- **UI Overlay:** Positioned absolutely, 100% viewport width/height
- **Safe Area:** Respect notches/rounded corners on iOS (env safe-area-inset)

---

## **Component Hierarchy & Vue Structure**

```
App.vue (Root)
│
├─ Home Screen (HomeScreen.vue)
│  ├─ Header [Settings, Progress, About buttons]
│  ├─ Game Card Grid
│  │  ├─ GameCard.vue (Syllable Safari, Future Game 2, etc)
│  │  ├─ State: isLocked, progress (3/5 stars)
│  │  └─ Click → Routes to Game View
│  └─ Modals (managed via Pinia)
│     ├─ ProgressBoard.vue (modal overlay)
│     ├─ SettingsModal.vue (modal overlay)
│     └─ AboutModal.vue (modal overlay)
│
└─ Game View (GameShell.vue)
   ├─ Phaser Container (div#game)
   │  └─ Phaser Game Instance
   │     ├─ BootScene
   │     ├─ MenuScene
   │     ├─ Zone1Scene (Hutan Bunyi)
   │     ├─ Zone2Scene (Jembatan Kata)
   │     ├─ Zone3Scene (Labirin Cepat)
   │     └─ ResultScene
   │
   ├─ Pause Overlay (absolutely positioned)
   │  ├─ Resume button
   │  └─ Back to Menu button
   │
   └─ Audio Control
      ├─ Volume indicator
      └─ Mute toggle

Pinia Stores:
├─ gameState
│  └─ currentScene, isPaused, score, level
├─ progressStore (persistent)
│  └─ collectedStickers[], achievements[], totalPoints
├─ audioStore (persistent)
│  └─ volumeLevel, speechEnabled
```

---

## **Interaction Design Patterns**

### **Positive Feedback Loop (Success)**
1. **Visual:** Bright flash + scale animation (pop)
2. **Audio:** "Ding!" sound effect (100-200ms duration)
3. **Particle:** Star burst around clicked element
4. **Text:** "+10 Points" float upward, fade out
5. **Haptic:** Vibration (if available, 50ms)
6. **Timing:** All 300-500ms total

### **Negative Feedback Loop (Error)**
1. **Visual:** Gentle shake animation (20px left/right)
2. **Audio:** Soft "boop" sound (not scary)
3. **Text:** "Try Again!" message, gentle tone
4. **No Penalty:** Attempts don't decrease immediately
5. **Encouragement:** Highlight speaker button to replay

### **Sticker Reward Animation**
1. **Trigger:** Level complete with 3 stars
2. **Scale:** Sticker grows from 0 → 120% size
3. **Bounce:** ease-out for natural fall
4. **Particle:** Confetti burst around sticker
5. **Sound:** "Sticker awarded!" sound + fanfare
6. **Duration:** 1.5 seconds total
7. **Follow-up:** "Next Level?" prompt after 1.5s

### **Level Transition**
1. **Fade out:** Current level scene (500ms)
2. **Scale down:** Game UI (300ms parallel)
3. **Load:** Next level assets in background
4. **Slide in:** New scene from right side (500ms)
5. **Fade in:** Ready state + new UI (300ms)
6. **Total:** ~1.3 seconds smooth transition

---

## **Accessibility Features (WCAG 2.1 AA)**

### **Touch Targets**
- Minimum 48x48px (mobile), 56x56px (desktop)
- Minimum 8px spacing between targets
- Avoid overlapping interactive elements

### **Color Contrast**
- Text on background: ≥4.5:1 ratio (AAA)
- Interactive elements: ≥3:1 ratio (AA)
- Test with WCAG Contrast Checker

### **Motion & Animation**
- Respect `prefers-reduced-motion` CSS media query
- Animations toggle-able in settings
- No auto-playing video/sound (user gesture required on iOS)

### **Font & Readability**
- Minimum 14px font size (body text)
- Sans-serif rounded font (easier for dyslexia)
- Line-height ≥1.5 (spacing)
- Letter-spacing +0.05em (clarity)

### **Alternative Text**
- All images have `alt` text or `aria-label`
- Icons have descriptive `title` attributes
- Buttons have clear labels (not just icons)

---

## **State Management & Data Flow**

```
[User Action]
    ↓
[Click Balloon / Drag Stone / Tap Card]
    ↓
[GameScene Event Emit]
    ↓
[Pinia Action: gameState.updateScore()]
    ↓
[Update UI: Score display re-renders]
    ↓
[Persist: progressStore.saveProgress() → localStorage]
    ↓
[Feedback: Play sound + animation]
```

### **Key Pinia Stores**
- **gameState:** Temporary (cleared on scene exit)
- **progressStore:** Persistent (survives page reload)
- **audioStore:** Persistent (user preferences)

---

## **Performance Optimization for Kids' UX**

1. **Preload Critical Assets:** Use BootScene to load all Zone 1 images before play
2. **Lazy Load Non-Critical:** Zone 2/3 assets load in background during play
3. **Minimal Bundle:** Phaser 3 (200KB) + Vue 3 (33KB) + Pinia (12KB) = ~245KB min gzip
4. **Smooth Animations:** Use GPU-accelerated transforms (translate, scale, opacity)
5. **No Layout Thrashing:** Batch DOM updates, avoid repeated reflows
6. **Touch Response:** <100ms from tap to visual feedback (target: 50ms)

---

## **Dark Mode & Light Mode (Optional Phase 2)**

Currently: **Light mode only** (pastel colors optimized for children)

Future considerations:
- Toggle dark mode (parent preference)
- Adjust color palette for eye comfort (dusk mode)
- Maintain WCAG AA contrast in both modes

