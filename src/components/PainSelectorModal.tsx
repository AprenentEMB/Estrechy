import { motion, AnimatePresence } from 'framer-motion'
import { PAIN_TYPES } from '../data/mockData'
import type { PainType, BodyPart } from '../types'
import { useAppStore } from '../store/useAppStore'
import { useTheme } from '../hooks/useTheme'

interface PainSelectorModalProps {
  onSelect: (painType: PainType) => void
}

function usePainConfig() {
  const t = useTheme()
  return {
    sharp: {
      bg: t.painSharp.bg,
      iconColor: t.painSharp.iconColor,
      border: t.painSharp.border,
      iconBg: t.painSharp.iconBg,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2C9 2 5 6 5 10a4 4 0 008 0c0-4-4-8-4-8z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="9" cy="10" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    dull: {
      bg: t.painDull.bg,
      iconColor: t.painDull.iconColor,
      border: t.painDull.border,
      iconBg: t.painDull.iconBg,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="1" fill="currentColor" />
        </svg>
      ),
    },
    throbbing: {
      bg: t.painThrobbing.bg,
      iconColor: t.painThrobbing.iconColor,
      border: t.painThrobbing.border,
      iconBg: t.painThrobbing.iconBg,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 9h3l2-4 2 8 2-4 2 3 1-3h2"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    stiffness: {
      bg: t.painStiffness.bg,
      iconColor: t.painStiffness.iconColor,
      border: t.painStiffness.border,
      iconBg: t.painStiffness.iconBg,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 9c0-2.8 2.2-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 9c0 2.8-2.2 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 5l3 2-3 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 11l-3 2 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
    },
  } as Record<string, { bg: string; iconColor: string; border: string; iconBg: string; icon: React.ReactNode }>
}

const BODY_PART_LABELS: Record<BodyPart, string> = {
  neck: 'Neck',
  shoulders: 'Shoulders',
  'upper-back': 'Upper back',
  'lower-back': 'Lower back',
  hips: 'Hips',
  legs: 'Legs',
  arms: 'Arms',
  wrists: 'Wrists',
  chest: 'Chest',
  abdomen: 'Abdomen',
}

export function PainSelectorModal({ onSelect }: PainSelectorModalProps) {
  const { isPainModalOpen, selectedBodyPart, closePainModal } = useAppStore()
  const t = useTheme()
  const painConfig = usePainConfig()

  return (
    <AnimatePresence>
      {isPainModalOpen && selectedBodyPart && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePainModal}
            style={{ position: 'fixed', inset: 0, background: t.backdrop, zIndex: 40, backdropFilter: 'blur(2px)' }}
          />

          {/* Bottom sheet */}
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
              padding: '16px 20px 40px',
              zIndex: 50, maxWidth: 480, margin: '0 auto',
              boxShadow: t.modalShadow,
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: 36, height: 4, background: t.dragHandle,
              borderRadius: 999, margin: '0 auto 20px',
            }} />

            {/* Header */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontSize: 11, color: t.bodyPartLabelText, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  background: t.bodyPartLabelBg, padding: '2px 8px', borderRadius: 999,
                }}>
                  {BODY_PART_LABELS[selectedBodyPart]}
                </span>
              </div>
              <h2 style={{ fontSize: 21, fontWeight: 700, color: t.text, margin: 0, letterSpacing: '-0.02em' }}>
                What does it feel like?
              </h2>
            </div>

            {/* Pain options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {PAIN_TYPES.map((pt, i) => {
                const config = painConfig[pt.type] ?? { bg: t.surface, iconColor: t.muted, border: t.border, iconBg: t.surface, icon: null }
                return (
                  <motion.button
                    key={pt.type}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    onClick={() => onSelect(pt.type)}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 14px', borderRadius: 14,
                      border: `1px solid ${config.border}`,
                      background: config.bg,
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = t.painHoverShadow }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: config.iconBg,
                      border: `1.5px solid ${config.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: config.iconColor,
                      boxShadow: t.painIconShadow,
                    }}>
                      {config.icon ?? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: t.text, marginBottom: 2 }}>
                        {pt.label}
                      </div>
                      <div style={{ fontSize: 12, color: t.muted, lineHeight: 1.4 }}>
                        {pt.description}
                      </div>
                    </div>

                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.painArrowColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.button>
                )
              })}
            </div>

            {/* Cancel */}
            <button
              onClick={closePainModal}
              style={{
                marginTop: 12, width: '100%', padding: '12px',
                borderRadius: 12, border: 'none', background: 'transparent',
                color: t.subtle, fontSize: 14, cursor: 'pointer', fontWeight: 500,
              }}
            >
              Cancel
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
