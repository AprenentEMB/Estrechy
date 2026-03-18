import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Routine } from '../types'
import { useAppStore } from '../store/useAppStore'
import { useTheme } from '../hooks/useTheme'
import { useExerciseGif } from '../hooks/useExerciseGif'

interface ExercisePlayerProps {
  routine: Routine
  onComplete: () => void
  onExit: () => void
}

function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}

function IconPrev() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function IconNext() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function ExercisePlayer({ routine, onComplete, onExit }: ExercisePlayerProps) {
  const { currentExerciseIndex, isPlaying, setPlaying, nextExercise, prevExercise } = useAppStore()
  const t = useTheme()

  const exercise = routine.exercises[currentExerciseIndex]
  const isLast = currentExerciseIndex === routine.exercises.length - 1

  const [timeLeft, setTimeLeft] = useState(exercise.duration)
  const [videoError, setVideoError] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { gifUrl, loading: gifLoading } = useExerciseGif(exercise.id)

  useEffect(() => { setVideoError(false) }, [currentExerciseIndex])

  useEffect(() => { setTimeLeft(exercise.duration) }, [currentExerciseIndex, exercise.duration])

  useEffect(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.play().catch(err => console.log('Video play interrupted', err))
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying, exercise.videoUrl])

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          if (isLast) { setPlaying(false); onComplete() }
          else nextExercise()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPlaying, isLast, nextExercise, onComplete, setPlaying])

  const progress = timeLeft / exercise.duration
  const R = 44
  const CIRC = 2 * Math.PI * R
  const dashOffset = CIRC * (1 - progress)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: '100%', height: '100%',
      background: t.playerBg,
      padding: '16px 20px 20px',
      gap: 14,
    }}>

      {/* Top bar: close + progress segments */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onExit}
          aria-label="Exit routine"
          style={{
            background: t.closeBtnBg, border: 'none', borderRadius: '50%',
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: t.closeBtnColor, flexShrink: 0,
            boxShadow: t.closeBtnShadow,
          }}
        >
          <IconClose />
        </button>

        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {routine.exercises.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1, height: 4, borderRadius: 999,
                background: i < currentExerciseIndex
                  ? t.progressDone
                  : i === currentExerciseIndex
                    ? t.progressCurrent
                    : t.progressPending,
                transition: 'background 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {i === currentExerciseIndex && (
                <motion.div
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 999,
                    background: t.progressDone, transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 1 - progress }}
                  transition={{ duration: 0.9, ease: 'linear' }}
                />
              )}
            </div>
          ))}
        </div>

        <span style={{ fontSize: 12, fontWeight: 700, color: t.subtle, flexShrink: 0, letterSpacing: '0.04em' }}>
          {currentExerciseIndex + 1}/{routine.exercises.length}
        </span>
      </div>

      {/* Main exercise view */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExerciseIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flex: 1 }}
        >
          {/* Media container */}
          <div style={{
            position: 'relative', width: '100%',
            maxWidth: 260, aspectRatio: '9/16',
            overflow: 'hidden', borderRadius: 22,
            boxShadow: t.shadowLg,
            flexShrink: 0,
          }}>
            {exercise.videoUrl && !videoError && exercise.videoUrl.endsWith('.svg') ? (
              <div style={{
                width: '100%', height: '100%',
                background: t.svgPreviewGrad,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 16,
              }}>
                <img
                  src={exercise.videoUrl}
                  alt={exercise.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={() => setVideoError(true)}
                />
              </div>
            ) : exercise.videoUrl && !videoError ? (
              <video
                ref={videoRef}
                src={exercise.videoUrl}
                autoPlay={isPlaying}
                loop muted playsInline
                onError={() => setVideoError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : gifLoading ? (
              <div style={{
                width: '100%', height: '100%',
                background: t.shimmerGrad,
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s infinite',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 36 }}>{exercise.icon}</span>
              </div>
            ) : gifUrl ? (
              <img src={gifUrl} alt={exercise.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: t.videoPlaceholderGrad,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 60 }}>{exercise.icon}</span>
                <span style={{ fontSize: 12, color: t.videoPlaceholderText, fontWeight: 600, textAlign: 'center', padding: '0 16px' }}>
                  Follow the instructions below
                </span>
              </div>
            )}

            {/* Timer ring overlay */}
            <div style={{ position: 'absolute', bottom: 14, right: 14 }}>
              <svg width="58" height="58" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={R} stroke={t.timerRingBg} strokeWidth="7" fill={t.timerRingFill} />
                <motion.circle
                  cx="50" cy="50" r={R}
                  stroke={t.timerStroke} strokeWidth="7"
                  fill="none" strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dashoffset 0.9s linear' }}
                />
                <text x="50" y="57" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">
                  {timeLeft}
                </text>
              </svg>
            </div>

            {/* Pause overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: t.pauseOverlay,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: t.pauseCircleBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: t.pauseCircleColor,
                  }}>
                    <IconPlay />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Exercise info */}
          <div style={{ textAlign: 'center', padding: '0 8px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
              {exercise.name}
            </h2>
            <p style={{ fontSize: 13, color: t.muted, margin: 0, lineHeight: 1.6 }}>
              {exercise.instruction}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Control bar */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setPlaying(!isPlaying)}
          style={{
            background: isPlaying
              ? t.pauseBtnBg
              : t.primaryGradient,
            color: isPlaying ? t.text : '#fff',
            border: 'none', borderRadius: 16,
            padding: '14px', fontSize: 15, fontWeight: 700,
            cursor: 'pointer',
            boxShadow: isPlaying ? 'none' : t.primaryShadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'all 0.2s',
          }}
        >
          {isPlaying ? <><IconPause /><span>Pause</span></> : <><IconPlay /><span>Start</span></>}
        </motion.button>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={prevExercise}
            disabled={currentExerciseIndex === 0}
            style={{
              flex: 1, padding: '12px', borderRadius: 14,
              border: `1.5px solid ${t.prevBtnBorder}`, background: t.prevBtnBg,
              color: currentExerciseIndex === 0 ? t.prevBtnDisabled : t.prevBtnText,
              fontSize: 14, fontWeight: 600,
              cursor: currentExerciseIndex === 0 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
          >
            <IconPrev />
            Prev
          </button>

          <button
            onClick={() => { if (isLast) { setPlaying(false); onComplete() } else nextExercise() }}
            style={{
              flex: 1, padding: '12px', borderRadius: 14,
              border: isLast ? `1.5px solid ${t.finishBtnBorder}` : `1.5px solid ${t.prevBtnBorder}`,
              background: isLast ? t.finishBtnBg : t.prevBtnBg,
              color: isLast ? t.finishBtnText : t.prevBtnText,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
          >
            {isLast ? <><IconCheck /><span>Finish</span></> : <><span>Skip</span><IconNext /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
