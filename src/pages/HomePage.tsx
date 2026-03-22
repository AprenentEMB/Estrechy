/* eslint-disable react-hooks/set-state-in-effect */
import { motion, AnimatePresence } from 'framer-motion'
import { BodySelector } from '../components/BodySelector'
import { PainSelectorModal } from '../components/PainSelectorModal'
import { RoutineCard } from '../components/RoutineCard'
import { ExercisePlayer } from '../components/ExercisePlayer'
import { AllStretchesView } from '../components/AllStretchesView'
import { useAppStore } from '../store/useAppStore'
import { useTheme } from '../hooks/useTheme'
import { findRoutine } from '../data/mockData'
import type { PainType } from '../types'
import { useState, useEffect } from 'react'

type View = 'selection' | 'routine' | 'player' | 'done'
type Tab = 'home' | 'library'

const VIEW_SUBTITLES: Record<View, string> = {
  selection: 'Tap where it hurts',
  routine: 'Your personalised routine',
  player: 'Follow the movement',
  done: 'Great work today',
}

function IconBody({ active, color, inactiveColor }: { active: boolean; color: string; inactiveColor: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? color : inactiveColor} strokeWidth={active ? '2.2' : '1.8'}
      strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v6m-4 0h8M9 20l3-7 3 7" />
    </svg>
  )
}

function IconLibrary({ active, color, inactiveColor }: { active: boolean; color: string; inactiveColor: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? color : inactiveColor} strokeWidth={active ? '2.2' : '1.8'}
      strokeLinecap="round" strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export function HomePage() {
  const {
    currentRoutine,
    startRoutine,
    clearRoutine,
    closePainModal,
    resetPlayer,
    setPlaying,
    selectedBodyPart,
    isDarkMode,
    toggleTheme,
  } = useAppStore()

  const t = useTheme()
  const [view, setView] = useState<View>('selection')
  const [tab, setTab] = useState<Tab>('home')

  useEffect(() => {
    if (!currentRoutine) {
      setView('selection')
    }
  }, [currentRoutine])

  const handlePainSelect = (painType: PainType) => {
    if (!selectedBodyPart) return
    const routine = findRoutine(selectedBodyPart, painType)
    if (routine) {
      startRoutine(routine)
      closePainModal()
      setView('routine')
    } else {
      closePainModal()
      alert(`No routine found for ${selectedBodyPart} + ${painType} yet. More coming soon!`)
    }
  }

  const handleStartPlayer = () => {
    resetPlayer()
    setView('player')
  }

  const handleBackToSelection = () => {
    clearRoutine()
    setView('selection')
  }

  const handleComplete = () => {
    setPlaying(false)
    setView('done')
  }

  const handleExitPlayer = () => {
    setPlaying(false)
    setView('routine')
  }

  const showTabBar = view !== 'player'

  const handleTabChange = (next: Tab) => {
    if (next === 'library' && view === 'player') {
      setPlaying(false)
      setView('routine')
    }
    setTab(next)
  }

  const subtitle = tab === 'library' ? 'Browse all exercises' : VIEW_SUBTITLES[view]
  const headerTitle = tab === 'library' ? 'All Stretches' : (
    <>Quick<span style={{ color: t.primary }}>Stretch</span></>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: t.bg, overflow: 'hidden' }}>

      {/* Header */}
      <AnimatePresence mode="wait">
        {view !== 'player' && (
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ padding: '20px 20px 10px', flexShrink: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: t.primaryGradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px ${t.primaryGlow}`,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.03em', flex: 1 }}>
                {headerTitle}
              </h1>
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  width: 34, height: 34, borderRadius: 10,
                  border: `1.5px solid ${t.border}`,
                  background: t.surface,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: t.shadowSm,
                  flexShrink: 0,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                {isDarkMode ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`${tab}-${view}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: 13, color: t.muted, margin: 0, fontWeight: 500 }}
              >
                {subtitle}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">

          {/* Library Tab */}
          {tab === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <AllStretchesView />
            </motion.div>
          )}

          {/* Home Tab */}
          {tab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                flex: 1, overflowY: 'auto',
                padding: view === 'player' ? '0' : '8px 20px 24px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: view === 'selection' ? 'flex-start' : 'center',
              }}
            >
              <AnimatePresence mode="wait">

                {/* Selection */}
                {view === 'selection' && (
                  <motion.div
                    key="selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <BodySelector />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      style={{ fontSize: 12, color: t.subtle, textAlign: 'center', marginTop: 14, fontWeight: 400 }}
                    >
                      Select a body region to get your personalised stretch routine
                    </motion.p>
                  </motion.div>
                )}

                {/* Routine */}
                {view === 'routine' && currentRoutine && (
                  <motion.div
                    key="routine"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', maxWidth: 500 }}
                  >
                    <RoutineCard routine={currentRoutine} onStart={handleStartPlayer} onBack={handleBackToSelection} />
                  </motion.div>
                )}

                {/* Player */}
                {view === 'player' && currentRoutine && (
                  <motion.div
                    key="player"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <ExercisePlayer routine={currentRoutine} onComplete={handleComplete} onExit={handleExitPlayer} />
                  </motion.div>
                )}

                {/* Done */}
                {view === 'done' && currentRoutine && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35, type: 'spring', damping: 20 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', padding: '24px', gap: 18,
                      textAlign: 'center', width: '100%', maxWidth: 380,
                    }}
                  >
                    <div style={{ position: 'relative', marginBottom: 4 }}>
                      <div style={{
                        position: 'absolute', inset: -8, borderRadius: '50%',
                        background: t.donePulseRing,
                        animation: 'pulse-ring 2s ease-out infinite',
                      }} />
                      <div style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: t.doneGradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: t.doneShadow,
                      }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <h2 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                        All done!
                      </h2>
                      <p style={{ fontSize: 14, color: t.muted, margin: 0, lineHeight: 1.6 }}>
                        Great work! You completed<br />
                        <strong style={{ color: t.text }}>{currentRoutine.title}</strong>
                      </p>
                    </div>

                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: t.doneTimeBg, borderRadius: 12,
                      padding: '10px 20px', border: `1px solid ${t.doneTimeBorder}`,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.doneTimeText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span style={{ fontSize: 13, color: t.doneTimeText, fontWeight: 600 }}>
                        ~{currentRoutine.totalDuration} minutes completed
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 4 }}>
                      <button
                        onClick={handleStartPlayer}
                        style={{
                          padding: '13px', borderRadius: 14,
                          border: `1.5px solid ${t.repeatBtnBorder}`, background: t.repeatBtnBg,
                          color: t.repeatBtnText, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        Repeat routine
                      </button>
                      <button
                        onClick={handleBackToSelection}
                        style={{
                          padding: '13px', borderRadius: 14, border: 'none',
                          background: t.primaryGradient,
                          color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                          boxShadow: t.primaryShadow,
                        }}
                      >
                        Back to body map
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tab Bar */}
      {showTabBar && (
        <div style={{
          flexShrink: 0,
          background: t.tabBarBg,
          borderTop: `1px solid ${t.tabBarBorder}`,
          display: 'flex',
          boxShadow: t.tabBarShadow,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
          {([
            { id: 'home' as Tab, label: 'Body Map', Icon: IconBody },
            { id: 'library' as Tab, label: 'All Stretches', Icon: IconLibrary },
          ]).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              style={{
                flex: 1, padding: '10px 8px 12px',
                border: 'none', background: 'transparent',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4,
                transition: 'opacity 0.15s',
                position: 'relative',
              }}
            >
              {tab === id && (
                <motion.div
                  layoutId="tab-indicator"
                  style={{
                    position: 'absolute', top: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 32, height: 2,
                    borderRadius: '0 0 2px 2px',
                    background: t.tabActiveColor,
                  }}
                />
              )}
              <Icon active={tab === id} color={t.tabActiveColor} inactiveColor={t.tabInactiveColor} />
              <span style={{
                fontSize: 10, fontWeight: tab === id ? 700 : 500,
                color: tab === id ? t.tabActiveColor : t.tabInactiveColor,
                letterSpacing: '0.02em',
              }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      )}

      <PainSelectorModal onSelect={handlePainSelect} />
    </div>
  )
}
