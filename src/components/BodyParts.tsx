import React from 'react'
import type { BodyPart } from '../types'
import { useTheme } from '../hooks/useTheme'

function usePartStyle(selectedPart: BodyPart | null | undefined) {
  const t = useTheme()
  const on = (part: BodyPart) => selectedPart === part
  const base = { strokeWidth: 1.5, strokeLinejoin: 'round' as const }
  return {
    t: (part: BodyPart) => ({
      fill: on(part) ? 'url(#active-grad)' : 'url(#body-fill)',
      stroke: on(part) ? t.activeStroke : t.bodyStroke,
      ...base,
    }),
    l: (part: BodyPart) => ({
      fill: on(part) ? t.activeColor : 'url(#limb-grad)',
      stroke: on(part) ? t.activeStroke : t.bodyStroke,
      ...base,
    }),
    bodyStroke: t.bodyStroke,
    D: { stroke: t.bodyDetail, strokeWidth: 0.75, fill: 'none', strokeLinecap: 'round' as const },
  }
}

export interface BodyPartRefs {
  head?: React.RefObject<SVGEllipseElement | null>
  neck?: React.RefObject<SVGPathElement | null>
  shoulderLeft?: React.RefObject<SVGPathElement | null>
  shoulderRight?: React.RefObject<SVGPathElement | null>
  chest?: React.RefObject<SVGPathElement | null>
  armLeft?: React.RefObject<SVGPathElement | null>
  armRight?: React.RefObject<SVGPathElement | null>
  wristLeft?: React.RefObject<SVGEllipseElement | null>
  wristRight?: React.RefObject<SVGEllipseElement | null>
  abdomen?: React.RefObject<SVGPathElement | null>
  lowerBack?: React.RefObject<SVGPathElement | null>
  upperBack?: React.RefObject<SVGPathElement | null>
  hips?: React.RefObject<SVGPathElement | null>
  legLeftUpper?: React.RefObject<SVGPathElement | null>
  legRightUpper?: React.RefObject<SVGPathElement | null>
  kneeLeft?: React.RefObject<SVGEllipseElement | null>
  kneeRight?: React.RefObject<SVGEllipseElement | null>
  legLeftLower?: React.RefObject<SVGPathElement | null>
  legRightLower?: React.RefObject<SVGPathElement | null>
}

interface BodyProps {
  selectedPart?: BodyPart | null
  partsRef?: BodyPartRefs
  onPartClick?: (part: BodyPart) => void
}

interface RegionProps {
  part: BodyPart
  children: React.ReactNode
  onClick?: (part: BodyPart) => void
}

function Region({ part, children, onClick }: RegionProps) {
  return (
    <g data-body-part={part} onClick={() => onClick?.(part)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {children}
    </g>
  )
}

export const FrontBody = ({ selectedPart, partsRef, onPartClick }: BodyProps) => {
  const { t, l, bodyStroke, D } = usePartStyle(selectedPart)

  return (
    <g>
      {/* Head */}
      <ellipse ref={partsRef?.head} cx="100" cy="30" rx="21" ry="25"
        fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" filter="url(#soft-shadow)" />
      <circle cx="92" cy="25" r="2.4" fill={bodyStroke} opacity="0.7" />
      <circle cx="108" cy="25" r="2.4" fill={bodyStroke} opacity="0.7" />
      <path d="M98,33 Q100,38 102,33" fill="none" stroke={bodyStroke} strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />

      <Region part="neck" onClick={onPartClick}>
        <path ref={partsRef?.neck}
          d="M93,53 Q100,57 107,53 L109,72 Q100,75 91,72 Z"
          {...t('neck')} />
      </Region>

      <Region part="shoulders" onClick={onPartClick}>
        <path ref={partsRef?.shoulderLeft}
          d="M88,70 Q74,64 57,73 Q46,82 43,95 Q50,93 62,94 Q72,79 88,76 Z"
          {...t('shoulders')} />
        <path ref={partsRef?.shoulderRight}
          d="M112,70 Q126,64 143,73 Q154,82 157,95 Q150,93 138,94 Q128,79 112,76 Z"
          {...t('shoulders')} />
      </Region>

      <Region part="chest" onClick={onPartClick}>
        <path ref={partsRef?.chest}
          d="M88,76 Q100,80 112,76 Q118,94 116,120 Q108,126 100,127 Q92,126 84,120 Q82,94 88,76 Z"
          {...t('chest')} />
      </Region>

      <g style={{ pointerEvents: 'none' }}>
        <path d="M96,79 Q84,76 70,81" {...D} />
        <path d="M104,79 Q116,76 130,81" {...D} />
        <path d="M100,80 L100,125" {...D} />
        <path d="M91,92 Q96,98 100,95 Q104,98 109,92" {...D} strokeWidth={0.6} />
      </g>

      <Region part="arms" onClick={onPartClick}>
        <path ref={partsRef?.armLeft}
          d="M59,93 Q50,96 42,107 Q34,125 36,137 Q38,150 43,163 Q47,169 53,167 Q56,152 55,135 Q53,117 61,97 Z"
          {...l('arms')} />
        <path ref={partsRef?.armRight}
          d="M141,93 Q150,96 158,107 Q166,125 164,137 Q162,150 157,163 Q153,169 147,167 Q144,152 145,135 Q147,117 139,97 Z"
          {...l('arms')} />
      </Region>

      <Region part="wrists" onClick={onPartClick}>
        <ellipse ref={partsRef?.wristLeft} cx="50" cy="172" rx="10" ry="6" {...l('wrists')} />
        <ellipse ref={partsRef?.wristRight} cx="150" cy="172" rx="10" ry="6" {...l('wrists')} />
      </Region>

      <Region part="abdomen" onClick={onPartClick}>
        <path ref={partsRef?.abdomen}
          d="M84,127 Q100,131 116,127 Q114,155 114,172 Q100,176 86,172 Q86,155 84,127 Z"
          {...t('abdomen')} />
      </Region>

      <g style={{ pointerEvents: 'none' }}>
        <path d="M100,131 L100,172" {...D} />
        <path d="M87,142 Q100,145 113,142" {...D} strokeWidth={0.55} />
        <path d="M86,157 Q100,160 114,157" {...D} strokeWidth={0.55} />
        <ellipse cx="100" cy="152" rx="2.2" ry="1.8" fill="none" stroke={bodyStroke} strokeWidth="0.8" opacity="0.3" />
      </g>

      <Region part="lower-back" onClick={onPartClick}>
        <path ref={partsRef?.lowerBack}
          d="M86,172 Q100,176 114,172 L112,198 Q100,202 88,198 Z"
          {...t('lower-back')} />
      </Region>

      <Region part="hips" onClick={onPartClick}>
        <path ref={partsRef?.hips}
          d="M88,198 Q100,202 112,198 Q121,205 124,220 Q100,226 76,220 Q79,205 88,198 Z"
          {...t('hips')} />
      </Region>

      <Region part="legs" onClick={onPartClick}>
        <path ref={partsRef?.legLeftUpper}
          d="M76,220 Q89,226 87,230 Q81,250 79,275 Q71,286 68,295 Q61,285 63,262 Q63,234 76,220 Z"
          {...l('legs')} />
        <path ref={partsRef?.legRightUpper}
          d="M124,220 Q111,226 113,230 Q119,250 121,275 Q129,286 132,295 Q139,285 137,262 Q137,234 124,220 Z"
          {...l('legs')} />
        <ellipse ref={partsRef?.kneeLeft} cx="68" cy="295" rx="11" ry="8" {...l('legs')} />
        <ellipse ref={partsRef?.kneeRight} cx="132" cy="295" rx="11" ry="8" {...l('legs')} />
        <path ref={partsRef?.legLeftLower}
          d="M64,303 Q57,316 60,336 Q61,360 60,377 Q68,381 72,378 Q71,358 72,334 Q70,312 67,303 Z"
          {...l('legs')} />
        <path ref={partsRef?.legRightLower}
          d="M136,303 Q143,316 140,336 Q139,360 140,377 Q132,381 128,378 Q129,358 128,334 Q130,312 133,303 Z"
          {...l('legs')} />
      </Region>

      <ellipse cx="66" cy="386" rx="16" ry="7" fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" />
      <ellipse cx="134" cy="386" rx="16" ry="7" fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" />
    </g>
  )
}

export const BackBody = ({ selectedPart, partsRef, onPartClick }: BodyProps) => {
  const { t, l, bodyStroke, D } = usePartStyle(selectedPart)

  return (
    <g>
      <ellipse ref={partsRef?.head} cx="100" cy="30" rx="21" ry="25"
        fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" filter="url(#soft-shadow)" />
      <path d="M79,26 Q75,30 79,36" fill="none" stroke={bodyStroke} strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
      <path d="M121,26 Q125,30 121,36" fill="none" stroke={bodyStroke} strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />

      <Region part="neck" onClick={onPartClick}>
        <path ref={partsRef?.neck}
          d="M93,53 Q100,57 107,53 L109,72 Q100,75 91,72 Z"
          {...t('neck')} />
      </Region>

      <Region part="shoulders" onClick={onPartClick}>
        <path ref={partsRef?.shoulderLeft}
          d="M88,70 Q74,64 57,73 Q46,82 43,95 Q50,93 62,94 Q72,79 88,76 Z"
          {...t('shoulders')} />
        <path ref={partsRef?.shoulderRight}
          d="M112,70 Q126,64 143,73 Q154,82 157,95 Q150,93 138,94 Q128,79 112,76 Z"
          {...t('shoulders')} />
      </Region>

      <Region part="upper-back" onClick={onPartClick}>
        <path ref={partsRef?.upperBack}
          d="M88,76 Q100,80 112,76 Q118,94 116,120 Q108,126 100,127 Q92,126 84,120 Q82,94 88,76 Z"
          {...t('upper-back')} />
      </Region>

      <g style={{ pointerEvents: 'none' }}>
        <path d="M100,78 L100,196" {...D} />
        <path d="M88,92 Q83,106 87,122 Q92,122 93,106 Q93,92 88,92 Z" {...D} strokeWidth={0.6} />
        <path d="M112,92 Q117,106 113,122 Q108,122 107,106 Q107,92 112,92 Z" {...D} strokeWidth={0.6} />
      </g>

      <Region part="arms" onClick={onPartClick}>
        <path ref={partsRef?.armLeft}
          d="M59,93 Q50,96 42,107 Q34,125 36,137 Q38,150 43,163 Q47,169 53,167 Q56,152 55,135 Q53,117 61,97 Z"
          {...l('arms')} />
        <path ref={partsRef?.armRight}
          d="M141,93 Q150,96 158,107 Q166,125 164,137 Q162,150 157,163 Q153,169 147,167 Q144,152 145,135 Q147,117 139,97 Z"
          {...l('arms')} />
      </Region>

      <Region part="wrists" onClick={onPartClick}>
        <ellipse ref={partsRef?.wristLeft} cx="50" cy="172" rx="10" ry="6" {...l('wrists')} />
        <ellipse ref={partsRef?.wristRight} cx="150" cy="172" rx="10" ry="6" {...l('wrists')} />
      </Region>

      <Region part="lower-back" onClick={onPartClick}>
        <path ref={partsRef?.lowerBack}
          d="M84,127 Q100,131 116,127 Q114,155 114,172 Q100,176 86,172 Q86,155 84,127 Z"
          {...t('lower-back')} />
        <path ref={partsRef?.lowerBack}
          d="M86,172 Q100,176 114,172 L112,198 Q100,202 88,198 Z"
          {...t('lower-back')} />
      </Region>

      <Region part="hips" onClick={onPartClick}>
        <path ref={partsRef?.hips}
          d="M88,198 Q100,202 112,198 Q121,205 124,220 Q100,226 76,220 Q79,205 88,198 Z"
          {...t('hips')} />
      </Region>

      <g style={{ pointerEvents: 'none' }}>
        <path d="M100,202 L100,222" {...D} />
      </g>

      <Region part="legs" onClick={onPartClick}>
        <path ref={partsRef?.legLeftUpper}
          d="M76,220 Q89,226 87,230 Q81,250 79,275 Q71,286 68,295 Q61,285 63,262 Q63,234 76,220 Z"
          {...l('legs')} />
        <path ref={partsRef?.legRightUpper}
          d="M124,220 Q111,226 113,230 Q119,250 121,275 Q129,286 132,295 Q139,285 137,262 Q137,234 124,220 Z"
          {...l('legs')} />
        <ellipse ref={partsRef?.kneeLeft} cx="68" cy="295" rx="11" ry="8" {...l('legs')} />
        <ellipse ref={partsRef?.kneeRight} cx="132" cy="295" rx="11" ry="8" {...l('legs')} />
        <path ref={partsRef?.legLeftLower}
          d="M65,303 Q72,316 74,338 Q74,362 72,378 Q64,380 62,378 Q60,342 61,318 Q62,308 65,303 Z"
          {...l('legs')} />
        <path ref={partsRef?.legRightLower}
          d="M135,303 Q128,316 126,338 Q126,362 128,378 Q136,380 138,378 Q140,342 139,318 Q138,308 135,303 Z"
          {...l('legs')} />
      </Region>

      <ellipse cx="66" cy="386" rx="16" ry="7" fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" />
      <ellipse cx="134" cy="386" rx="16" ry="7" fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" />
    </g>
  )
}

interface SideBodyProps extends BodyProps {
  mirrored?: boolean
}

export const SideBody = ({ selectedPart, partsRef, onPartClick, mirrored }: SideBodyProps) => {
  const { t, l, bodyStroke, D } = usePartStyle(selectedPart)
  const transform = mirrored ? 'scale(-1,1) translate(-200,0)' : undefined

  return (
    <g transform={transform}>
      <ellipse ref={partsRef?.head} cx="108" cy="30" rx="18" ry="24"
        fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" filter="url(#soft-shadow)" />
      <circle cx="118" cy="25" r="2.1" fill={bodyStroke} opacity="0.65" />
      <path d="M124,30 Q127,33 124,37" fill="none" stroke={bodyStroke} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <path d="M102,27 Q98,31 102,37" fill="none" stroke={bodyStroke} strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />

      <Region part="neck" onClick={onPartClick}>
        <path ref={partsRef?.neck}
          d="M94,52 Q102,56 110,52 L112,70 Q102,73 92,70 Z"
          {...t('neck')} />
      </Region>

      <Region part="shoulders" onClick={onPartClick}>
        <path ref={partsRef?.shoulderLeft}
          d="M90,66 Q78,66 62,74 Q53,81 51,93 Q57,91 67,95 Q76,80 90,74 Z"
          {...t('shoulders')} />
      </Region>

      <Region part="upper-back" onClick={onPartClick}>
        <path ref={partsRef?.upperBack}
          d="M90,74 Q104,78 113,70 Q120,94 118,132 Q109,137 88,130 Z"
          {...t('upper-back')} />
      </Region>

      <g style={{ pointerEvents: 'none' }}>
        <path d="M110,78 Q114,100 112,130" {...D} />
      </g>

      <Region part="arms" onClick={onPartClick}>
        <path ref={partsRef?.armLeft}
          d="M65,95 Q56,97 49,106 Q44,124 46,136 Q48,148 52,163 Q56,169 61,167 Q63,150 63,134 Q62,116 68,100 Z"
          {...l('arms')} />
      </Region>

      <Region part="wrists" onClick={onPartClick}>
        <ellipse ref={partsRef?.wristLeft} cx="53" cy="172" rx="9" ry="6" {...l('wrists')} />
      </Region>

      <Region part="lower-back" onClick={onPartClick}>
        <path ref={partsRef?.lowerBack}
          d="M88,130 Q109,137 118,132 Q120,158 118,172 Q106,178 86,173 Z"
          {...t('lower-back')} />
        <path ref={partsRef?.lowerBack}
          d="M86,173 Q106,178 118,172 L116,200 Q100,204 86,200 Z"
          {...t('lower-back')} />
      </Region>

      <Region part="hips" onClick={onPartClick}>
        <path ref={partsRef?.hips}
          d="M86,200 Q100,204 116,200 Q122,210 120,222 Q100,228 82,222 Q82,210 86,200 Z"
          {...t('hips')} />
      </Region>

      <Region part="legs" onClick={onPartClick}>
        <path ref={partsRef?.legLeftUpper}
          d="M82,222 Q94,228 94,234 Q90,260 88,282 Q84,291 80,297 Q75,283 77,262 Q77,236 82,222 Z"
          {...l('legs')} />
        <ellipse ref={partsRef?.kneeLeft} cx="82" cy="297" rx="11" ry="8" {...l('legs')} />
        <path ref={partsRef?.legLeftLower}
          d="M76,305 Q84,322 86,350 Q87,368 86,382 Q78,383 75,381 Q73,366 73,345 Q71,319 75,305 Z"
          {...l('legs')} />
        <path ref={partsRef?.legRightLower}
          d="M81,305 Q88,322 90,350 Q91,368 90,382 Q84,384 81,382 Q79,367 79,350 Q77,322 81,305 Z"
          {...l('legs')} />
      </Region>

      <ellipse cx="88" cy="388" rx="20" ry="7" fill="url(#head-grad)" stroke={bodyStroke} strokeWidth="1.5" />
    </g>
  )
}
