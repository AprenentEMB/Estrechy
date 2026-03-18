import { create } from 'zustand'
import type { BodyPart, Routine } from '../types'

// ── App State ─────────────────────────────────────────────────────────────────

interface AppState {
  // Theme
  isDarkMode: boolean

  // Body selector
  selectedBodyPart: BodyPart | null
  bodyView: 'front' | 'right' | 'back' | 'left'

  // Pain modal
  isPainModalOpen: boolean

  // Routine
  currentRoutine: Routine | null

  // Exercise player
  isPlaying: boolean
  currentExerciseIndex: number

  // Actions
  toggleTheme: () => void
  selectBodyPart: (part: BodyPart) => void
  clearBodyPart: () => void
  setBodyView: (view: 'front' | 'right' | 'back' | 'left') => void
  openPainModal: () => void
  closePainModal: () => void
  startRoutine: (routine: Routine) => void
  clearRoutine: () => void
  setPlaying: (playing: boolean) => void
  nextExercise: () => void
  prevExercise: () => void
  resetPlayer: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // ── Initial state ──────────────────────────────────────────────────────────
  isDarkMode: true,
  selectedBodyPart: null,
  bodyView: 'front',
  isPainModalOpen: false,
  currentRoutine: null,
  isPlaying: false,
  currentExerciseIndex: 0,

  // ── Actions ────────────────────────────────────────────────────────────────

  toggleTheme: () =>
    set((s) => ({ isDarkMode: !s.isDarkMode })),

  selectBodyPart: (part) =>
    set({ selectedBodyPart: part, isPainModalOpen: true }),

  clearBodyPart: () =>
    set({ selectedBodyPart: null, isPainModalOpen: false }),

  setBodyView: (view) =>
    set({ bodyView: view }),

  openPainModal: () =>
    set({ isPainModalOpen: true }),

  closePainModal: () =>
    set({ isPainModalOpen: false }),

  startRoutine: (routine) =>
    set({ currentRoutine: routine, currentExerciseIndex: 0, isPlaying: false }),

  clearRoutine: () =>
    set({ currentRoutine: null, isPlaying: false, currentExerciseIndex: 0 }),

  setPlaying: (playing) =>
    set({ isPlaying: playing }),

  nextExercise: () => {
    const { currentRoutine, currentExerciseIndex } = get()
    if (!currentRoutine) return
    const next = currentExerciseIndex + 1
    if (next < currentRoutine.exercises.length) {
      set({ currentExerciseIndex: next })
    } else {
      // All exercises done — stop playback
      set({ isPlaying: false })
    }
  },

  prevExercise: () => {
    const { currentExerciseIndex } = get()
    if (currentExerciseIndex > 0) {
      set({ currentExerciseIndex: currentExerciseIndex - 1 })
    }
  },

  resetPlayer: () =>
    set({ currentExerciseIndex: 0, isPlaying: false }),
}))
