---
name: Petualangan Suku Kata
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3f484c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6f787d'
  outline-variant: '#bfc8cd'
  surface-tint: '#0c6780'
  primary: '#0c6780'
  on-primary: '#ffffff'
  primary-container: '#87ceeb'
  on-primary-container: '#005870'
  inverse-primary: '#89d0ed'
  secondary: '#016e21'
  on-secondary: '#ffffff'
  secondary-container: '#99f899'
  on-secondary-container: '#0f7427'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#e6c200'
  on-tertiary-container: '#605000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#baeaff'
  primary-fixed-dim: '#89d0ed'
  on-primary-fixed: '#001f29'
  on-primary-fixed-variant: '#004d62'
  secondary-fixed: '#99f899'
  secondary-fixed-dim: '#7edb7f'
  on-secondary-fixed: '#002105'
  on-secondary-fixed-variant: '#005316'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-hero:
    fontFamily: Nunito Sans
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Nunito Sans
    fontSize: 36px
    fontWeight: '900'
    lineHeight: 42px
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  label-bold:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  touch-target-min: 56px
  container-padding: 24px
  gutter: 16px
---

## Brand & Style

The design system is crafted for children aged 4-7, focusing on an adventurous, tactile, and highly encouraging learning environment. The brand personality is that of a "kind explorer"—curious, safe, and celebratory. 

The aesthetic leans into **Soft-Tactile Modernism**. It avoids the flat clinical look of typical SaaS apps in favor of "chunky" UI elements that feel like physical blocks or stickers. By utilizing depth through subtle shadows and saturated colors, the interface provides clear affordances to young users who are still developing fine motor skills. Every interaction should feel like a physical "pop" or "click," reinforcing the educational progress through sensory-inspired visuals.

## Colors

This design system utilizes a high-vibrancy palette designed to stimulate engagement without causing cognitive fatigue. 

- **Sky Blue (Primary):** The foundational color for navigation and the "safe" home environment.
- **Leaf Green (Success):** Used for "Zone 2" content and to indicate correct answers or completion.
- **Sunny Yellow (Reward):** Reserved for highlights, stars, and high-energy moments of celebration.
- **Coral Pink & Lavender:** Secondary accents used to differentiate learning modules (e.g., speed trials or phonetic blending).
- **Off-White (Surface):** Used for content cards to ensure maximum readability and WCAG AA contrast against dark text.

Avoid pure black; use **Text Dark (#2D3436)** for all typography to maintain a soft but legible appearance.

## Typography

We use **Nunito Sans** for its rounded terminals and friendly apertures, which mimic the way children are taught to write letters.

- **Hierarchy:** Typography is intentionally oversized. Visual emphasis is placed on "Display" styles for phonetic sounds and syllable recognition.
- **Readability:** All text must be at least Bold (700) or Black (900) weight to ensure clarity against vibrant backgrounds. 
- **Casing:** Use Sentence case for instructions and UPPERCASE for specific syllable-matching labels to help children distinguish between word shapes.

## Layout & Spacing

The layout follows a **Fluid-Safe Model**. Content should never feel cramped; we use generous margins to prevent accidental taps from small fingers.

- **Grid:** A simple 6-column grid for tablet and a 2-column grid for mobile.
- **Touch Targets:** A strict minimum of 56px for all interactive elements, exceeding standard accessibility guidelines to accommodate developing motor skills.
- **Negative Space:** Use "Island" layouts—grouping related elements onto a single Off-White card centered in the Sky Blue background.

## Elevation & Depth

This design system uses **Physical Stacking**. Instead of realistic blur-based shadows, we use "Block Shadows"—solid-color offsets that make elements look like 3D plastic tiles.

- **Level 1 (Cards):** 4px vertical offset, 0px blur, with a slightly darker version of the background color.
- **Level 2 (Buttons):** 8px vertical offset. When "pressed," the button moves 4px down and the shadow shrinks, providing tactile feedback that the action was successful.
- **Floating Elements:** Modals and high-priority alerts use a soft 12px ambient shadow to separate them from the game board.

## Shapes

The shape language is defined by **Ultra-Rounded Geometry**. 

- **Primary Radius:** 24px (1.5rem) for standard cards and containers.
- **Large Radius:** 32px (2rem) for main game board areas.
- **Interactive Elements:** Buttons and input chips should always use full pill-shaping (rounded-full) or a minimum of 20px radius to eliminate "sharp" corners that feel unfriendly.

## Components

### Chunky Buttons
Buttons are the primary interaction point. They must have a "Bottom Border" style (thick 6-8px offset) that matches a darker shade of the button color. On tap/active state, the button shifts downward visually.

### Progress Stars
Instead of a standard linear bar, use a "Sticker Path." As children complete syllables, star icons "pop" into the path with a bouncy animation. Empty states are represented by dashed-line outlines.

### Syllable Cards
Large, Off-White tiles containing a single syllable. These have a 2px stroke in Primary Blue to define their boundaries. They should look like physical flashcards.

### Feedback Toasts
Success messages appear in Leaf Green "Bubbles" at the top of the screen. These use playful, bouncy transitions.

### Input Fields
Inputs for typing or dragging letters should have a "sunken" appearance (inner shadow) to indicate they are "slots" waiting to be filled.