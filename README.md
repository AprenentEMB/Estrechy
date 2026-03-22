# QuickStretch

A mobile-first Progressive Web App that delivers personalized guided stretching routines based on where you feel discomfort and what kind of pain you're experiencing.

## What it does

1. **Select a body part** — tap an interactive, rotatable SVG body diagram (front, back, left, right views)
2. **Describe your pain** — choose from stiffness, dull ache, sharp pain, or throbbing
3. **Get a matched routine** — the app returns a curated set of stretches for your specific combination
4. **Follow along** — a step-by-step exercise player guides you through each stretch with a countdown timer and instructions

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build tool | Vite |
| State management | Zustand |
| Animations | Framer Motion |
| Styling | TailwindCSS 4 + PostCSS |
| PWA | vite-plugin-pwa (Workbox) |

## Project Structure

```
quickstretch/
└── frontend/
    ├── src/
    │   ├── components/       # BodySelector, ExercisePlayer, PainSelectorModal, RoutineCard, ...
    │   ├── pages/            # HomePage (main view controller)
    │   ├── store/            # useAppStore.ts (Zustand global state)
    │   ├── data/             # mockData.ts (21 exercises, 11+ routines)
    │   ├── types/            # TypeScript interfaces (BodyPart, PainType, Exercise, Routine)
    │   ├── hooks/            # useTheme, useExerciseGif, useBreakpoint
    │   └── theme.ts          # Light / dark theme definitions
    ├── public/               # PWA manifest and icons
    └── vite.config.ts        # Vite + PWA config
```

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # TypeScript check + production build
npm run lint      # ESLint
npm run preview   # Serve production build locally
```

## Data Model

```typescript
BodyPart: 'neck' | 'shoulders' | 'chest' | 'abdomen' | 'upper-back'
        | 'lower-back' | 'hips' | 'legs' | 'arms' | 'wrists'

PainType: 'stiffness' | 'dull' | 'sharp' | 'throbbing'

Exercise {
  id, name, description, duration (seconds),
  instruction, icon?, videoUrl?, bodyParts[]
}

Routine {
  id, title, bodyPart, painType,
  totalDuration (minutes), exercises[], description
}
```

## App State Flow

```
Body part selected
       ↓
Pain type selected  →  Routine matched from mockData
       ↓
Routine card displayed
       ↓
Exercise player  →  Step-by-step with timer
       ↓
Done screen
```

All state is managed in a single Zustand store (`src/store/useAppStore.ts`).

## Features

- 4-way rotatable SVG body map with drag gesture support
- 10 selectable body parts × 4 pain types = up to 40 matched routines
- 21 exercises across all body parts
- Countdown timer per exercise with play/pause controls
- Light / dark theme toggle
- Installable as a PWA (standalone mode, offline caching via Workbox)
- Smooth page transitions with Framer Motion

## Current Status

The frontend is fully functional using mock data. The following are planned but not yet implemented:

- **Backend** — Bun REST API (`GET /routines?bodyPart=&painType=`, `GET /exercises`)
- **Database** — Supabase (tables: `routines`, `exercises`, `routine_exercises`)
- **Video assets** — Exercise videos expected at `/assets/videos/{exercise-id}.webm`

## PWA

The app is configured as a PWA with:
- Auto-updating service worker
- Standalone display mode (no browser chrome)
- Workbox caching for static assets and future `/api/` routes
- Theme color `#0EA5E9`
