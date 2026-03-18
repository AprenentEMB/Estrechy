import { useRef, useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BodyPart } from '../types'
import { useAppStore } from '../store/useAppStore'
import { useTheme } from '../hooks/useTheme'
import { FrontBody, BackBody, SideBody } from './BodyParts'

type BodyView = 'front' | 'right' | 'back' | 'left'
const VIEWS: BodyView[] = ['front', 'right', 'back', 'left']
const VIEW_LABELS: Record<BodyView, string> = {
  front: 'Front', right: 'Right', back: 'Back', left: 'Left',
}

const DRAG_THRESHOLD = 10

const REGION_LABELS: Record<string, string> = {
  neck: 'Neck', shoulders: 'Shoulders', chest: 'Chest',
  'upper-back': 'Upper Back', 'lower-back': 'Lower Back',
  abdomen: 'Abdomen', hips: 'Hips', arms: 'Arms',
  wrists: 'Wrists', legs: 'Legs',
}

export function BodySelector() {
  const { selectedBodyPart, bodyView, setBodyView, selectBodyPart } = useAppStore()
  const t = useTheme()

  const dragStart    = useRef<{ x: number; y: number } | null>(null)
  const dragDeltaRef = useRef(0)
  const isDragging   = useRef(false)
  const [liveOffset, setLiveOffset] = useState(0)
  const bodyViewRef  = useRef(bodyView)

  useEffect(() => { bodyViewRef.current = bodyView }, [bodyView])

  const handleRegionClick = useCallback((part: BodyPart) => {
    selectBodyPart(part)
  }, [selectBodyPart])

  const startDrag = useCallback((clientX: number, clientY: number) => {
    dragStart.current = { x: clientX, y: clientY }
    dragDeltaRef.current = 0
    isDragging.current = false
    setLiveOffset(0)
  }, [])

  const moveDrag = useCallback((clientX: number) => {
    if (!dragStart.current) return
    const delta = clientX - dragStart.current.x
    dragDeltaRef.current = delta
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      isDragging.current = true
      setLiveOffset(Math.max(-60, Math.min(60, delta * 0.45)))
    }
  }, [])

  const endDrag = useCallback((targetEl: Element | null) => {
    if (!dragStart.current) return
    const delta   = dragDeltaRef.current
    const wasDrag = isDragging.current
    dragStart.current  = null
    isDragging.current = false
    setLiveOffset(0)

    if (!wasDrag && targetEl) {
      const svgEl = targetEl.closest('[data-body-part]') as HTMLElement | null
      if (svgEl?.dataset.bodyPart) handleRegionClick(svgEl.dataset.bodyPart as BodyPart)
      return
    }

    const cur = VIEWS.indexOf(bodyViewRef.current), n = VIEWS.length
    if (delta < -DRAG_THRESHOLD)      setBodyView(VIEWS[(cur + 1) % n])
    else if (delta > DRAG_THRESHOLD)  setBodyView(VIEWS[(cur - 1 + n) % n])
  }, [setBodyView, handleRegionClick])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX)
    const onMouseUp   = (e: MouseEvent) => endDrag(e.target instanceof Element ? e.target : null)
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) moveDrag(e.touches[0].clientX) }
    const onTouchEnd  = (e: TouchEvent) => {
      const tc = e.changedTouches[0]
      endDrag(tc ? document.elementFromPoint(tc.clientX, tc.clientY) : null)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [moveDrag, endDrag])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', userSelect: 'none' }}>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.4, delay: 0.6, ease: "easeInOut" }}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 11, color: t.subtle, letterSpacing: '0.04em',
          pointerEvents: 'none', fontWeight: 500,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        drag to rotate
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          position: 'relative'
        }}
      >
        {/* Left Arrow */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: t.arrowHoverBg }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const cur = VIEWS.indexOf(bodyView), n = VIEWS.length
            setBodyView(VIEWS[(cur - 1 + n) % n])
          }}
          style={{
            zIndex: 10,
            background: t.arrowBg,
            border: 'none',
            borderRadius: '50%',
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: t.arrowShadow,
            cursor: 'pointer',
            color: t.arrowColor,
            transition: 'box-shadow 0.2s ease'
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>

        <div
          onMouseDown={(e) => { if (e.button === 0) startDrag(e.clientX, e.clientY) }}
          onTouchStart={(e) => { if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY) }}
          style={{ width: '100%', maxWidth: 220, cursor: 'grab', touchAction: 'pan-y', userSelect: 'none' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={bodyView}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{
                opacity: 1,
                x: liveOffset,
                scale: 1
              }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                width: '100%',
                userSelect: 'none'
              }}
            >
              <svg
                viewBox="0 0 200 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                aria-label={`Human body ${VIEW_LABELS[bodyView]} view`}
              >
                <defs>
                  <linearGradient id="head-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.headGrad[0]} />
                    <stop offset="100%" stopColor={t.headGrad[1]} />
                  </linearGradient>
                  <linearGradient id="body-fill" x1="0.1" y1="0" x2="0.8" y2="1">
                    <stop offset="0%" stopColor={t.bodyFill[0]} />
                    <stop offset="100%" stopColor={t.bodyFill[1]} />
                  </linearGradient>
                  <linearGradient id="limb-grad" x1="0" y1="0.5" x2="1" y2="0.5">
                    <stop offset="0%" stopColor={t.limbGrad[0]} />
                    <stop offset="30%" stopColor={t.limbGrad[1]} />
                    <stop offset="62%" stopColor={t.limbGrad[2]} />
                    <stop offset="100%" stopColor={t.limbGrad[3]} />
                  </linearGradient>
                  <linearGradient id="active-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={t.activeGrad[0]} />
                    <stop offset="100%" stopColor={t.activeGrad[1]} />
                  </linearGradient>
                  <filter id="soft-shadow" x="-20%" y="-5%" width="140%" height="120%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={t.softShadowColor} floodOpacity={t.softShadowOpacity} />
                  </filter>
                </defs>

                {bodyView === 'front' && <FrontBody selectedPart={selectedBodyPart} onPartClick={handleRegionClick} />}
                {bodyView === 'back'  && <BackBody  selectedPart={selectedBodyPart} onPartClick={handleRegionClick} />}
                {bodyView === 'right' && <SideBody  selectedPart={selectedBodyPart} onPartClick={handleRegionClick} mirrored={false} />}
                {bodyView === 'left'  && <SideBody  selectedPart={selectedBodyPart} onPartClick={handleRegionClick} mirrored={true}  />}
              </svg>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: t.arrowHoverBg }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const cur = VIEWS.indexOf(bodyView), n = VIEWS.length
            setBodyView(VIEWS[(cur + 1) % n])
          }}
          style={{
            zIndex: 10,
            background: t.arrowBg,
            border: 'none',
            borderRadius: '50%',
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: t.arrowShadow,
            cursor: 'pointer',
            color: t.arrowColor,
            transition: 'box-shadow 0.2s ease'
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>
      </div>

      {/* View dots */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setBodyView(v)}
            title={VIEW_LABELS[v]}
            style={{
              width: bodyView === v ? 20 : 7, height: 7,
              borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer',
              background: bodyView === v ? t.primary : t.dotInactive,
              transition: 'all 0.25s ease',
            }}
          />
        ))}
      </div>

      <div style={{
        fontSize: 10, color: t.subtle, fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        background: t.badgeBg, borderRadius: 999,
        padding: '3px 10px',
      }}>
        {VIEW_LABELS[bodyView]}
      </div>

      <AnimatePresence>
        {selectedBodyPart && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, type: 'spring', damping: 20 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: t.primaryGradient,
              color: '#fff', borderRadius: 999,
              padding: '6px 16px 6px 10px',
              fontSize: 13, fontWeight: 600,
              boxShadow: `0 4px 12px ${t.primaryGlow}`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {REGION_LABELS[selectedBodyPart] ?? selectedBodyPart}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
