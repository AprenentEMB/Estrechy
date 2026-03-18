import { motion, AnimatePresence } from 'framer-motion'
import type { Exercise } from '../types'
import { useTheme } from '../hooks/useTheme'
import { useExerciseGif } from '../hooks/useExerciseGif'
import { useState } from 'react'

interface ExercisePreviewModalProps {
  exercise: Exercise | null
  onClose: () => void
}

function GifPreview({ exercise }: { exercise: Exercise }) {
  const t = useTheme()
  const { gifUrl, loading } = useExerciseGif(exercise.id)
  const [videoError, setVideoError] = useState(false)

  const showVideo = !!exercise.videoUrl && !videoError

  return (
    <div style={{
      width: '100%', aspectRatio: '16/9',
      borderRadius: 16, overflow: 'hidden',
      background: t.previewBg,
      position: 'relative',
    }}>
      {showVideo && exercise.videoUrl!.endsWith('.svg') ? (
        <div style={{
          width: '100%', height: '100%',
          background: t.svgPreviewGrad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 12,
        }}>
          <img
            src={exercise.videoUrl!}
            alt={exercise.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={() => setVideoError(true)}
          />
        </div>
      ) : showVideo ? (
        <video
          src={exercise.videoUrl}
          autoPlay loop muted playsInline
          onError={() => setVideoError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : loading ? (
        <div style={{
          width: '100%', height: '100%',
          background: t.shimmerGrad,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 13, color: t.subtle, fontWeight: 500 }}>Loading preview…</span>
        </div>
      ) : gifUrl ? (
        <img src={gifUrl} alt={exercise.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: t.noPreviewGrad,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={t.subtle} strokeWidth="1.5" strokeLinecap="round">
            <rect x="2" y="2" width="20" height="20" rx="4" /><path d="M8 12h8M12 8v8" />
          </svg>
          <span style={{ fontSize: 12, color: t.muted, fontWeight: 500 }}>No preview available</span>
        </div>
      )}

      {/* Status badge */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '4px 10px', borderRadius: 999,
        background: loading
          ? t.statusLoadingBg
          : gifUrl || showVideo
            ? t.statusReadyBg
            : t.statusErrorBg,
        backdropFilter: 'blur(4px)',
        fontSize: 11, fontWeight: 700,
        color: loading ? t.statusLoadingText : gifUrl || showVideo ? t.statusReadyText : t.statusErrorText,
        boxShadow: t.shadowSm,
      }}>
        {loading ? (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Loading
          </>
        ) : gifUrl || showVideo ? (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Preview
          </>
        ) : (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            No GIF
          </>
        )}
      </div>
    </div>
  )
}

export function ExercisePreviewModal({ exercise, onClose }: ExercisePreviewModalProps) {
  const t = useTheme()

  return (
    <AnimatePresence>
      {exercise && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: t.backdrop,
              zIndex: 40, backdropFilter: 'blur(3px)',
            }}
          />

          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              background: t.modalBg,
              borderRadius: '20px 20px 0 0',
              padding: '14px 20px 40px',
              zIndex: 50, maxWidth: 480, margin: '0 auto',
              boxShadow: t.modalShadow,
            }}
          >
            {/* Handle */}
            <div style={{ width: 36, height: 4, background: t.dragHandle, borderRadius: 999, margin: '0 auto 18px' }} />

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 18, right: 20,
                width: 32, height: 32, borderRadius: '50%',
                background: t.closeBtnBg, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: t.closeBtnColor,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* GIF preview */}
            <GifPreview exercise={exercise} />

            {/* Info */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                  {exercise.name}
                </h2>
                <p style={{ fontSize: 13, color: t.muted, margin: 0, lineHeight: 1.6 }}>
                  {exercise.instruction}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {exercise.bodyParts.map(part => (
                  <span key={part} style={{
                    fontSize: 11, fontWeight: 700,
                    padding: '3px 10px', borderRadius: 999,
                    background: t.bodyPartBg[part] ?? t.chipBg,
                    color: t.bodyPartTextColor[part] ?? t.chipText,
                    textTransform: 'capitalize',
                  }}>
                    {part.replace('-', ' ')}
                  </span>
                ))}
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: '3px 10px', borderRadius: 999,
                  background: t.timeChipBg, color: t.timeChipText,
                  display: 'flex', alignItems: 'center', gap: 4,
                  marginLeft: 'auto',
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  {exercise.duration}s
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
