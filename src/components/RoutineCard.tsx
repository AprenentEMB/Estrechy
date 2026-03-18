import { motion } from 'framer-motion'
import type { Routine } from '../types'
import { useTheme } from '../hooks/useTheme'

interface RoutineCardProps {
  routine: Routine
  onStart: () => void
  onBack: () => void
}

export function RoutineCard({ routine, onStart, onBack }: RoutineCardProps) {
  const t = useTheme()
  const painColor = t.routinePain[routine.painType] ?? { bg: t.surface, text: t.muted, accent: t.muted }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: t.surface, borderRadius: 20,
        overflow: 'hidden',
        boxShadow: t.cardShadow,
      }}
    >
      {/* Accent top stripe */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${painColor.accent}, transparent)` }} />

      <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              padding: '3px 10px', borderRadius: 999,
              background: painColor.bg, color: painColor.text,
              textTransform: 'capitalize', letterSpacing: '0.03em',
            }}>
              {routine.painType}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 600,
              padding: '3px 10px', borderRadius: 999,
              background: t.timeChipBg, color: t.timeChipText,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              ~{routine.totalDuration} min
            </span>
          </div>
          <h1 style={{ fontSize: 21, fontWeight: 800, color: t.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            {routine.title}
          </h1>
          <p style={{ fontSize: 13, color: t.muted, margin: 0, lineHeight: 1.6 }}>
            {routine.description}
          </p>
        </div>

        {/* Exercise list */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: t.subtle, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Exercises
            </span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: t.muted,
              background: t.badgeBg, borderRadius: 999, padding: '2px 8px',
            }}>
              {routine.exercises.length} steps
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {routine.exercises.map((ex, i) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px',
                  background: t.exerciseItemBg,
                  borderRadius: 12,
                  border: `1px solid ${t.exerciseItemBorder}`,
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${painColor.accent}dd, ${painColor.accent})`,
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                  boxShadow: `0 2px 6px ${painColor.accent}44`,
                }}>
                  {i + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: t.text, marginBottom: 1 }}>
                    {ex.name}
                  </div>
                  <div style={{ fontSize: 11, color: t.subtle, lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ex.description}
                  </div>
                </div>

                <span style={{
                  fontSize: 11, fontWeight: 700, color: t.durationChipText,
                  background: t.durationChipBg, borderRadius: 999,
                  padding: '3px 8px', flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}>
                  {ex.duration}s
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            style={{
              background: t.primaryGradient,
              color: '#fff', border: 'none', borderRadius: 14,
              padding: '15px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              letterSpacing: '-0.01em',
              boxShadow: t.primaryShadow,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            Start Routine
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />
            </svg>
          </motion.button>

          <button
            onClick={onBack}
            style={{
              background: 'transparent', color: t.subtle,
              border: 'none', padding: '10px',
              fontSize: 13, cursor: 'pointer', fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to body map
          </button>
        </div>
      </div>
    </motion.div>
  )
}
