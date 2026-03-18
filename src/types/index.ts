// ── Body parts that can be selected on the human body SVG ──
export type BodyPart =
  | 'neck'
  | 'shoulders'
  | 'chest'
  | 'abdomen'
  | 'upper-back'
  | 'lower-back'
  | 'hips'
  | 'legs'
  | 'arms'
  | 'wrists'

// ── User-reported pain type ──
export type PainType = 'stiffness' | 'dull' | 'sharp' | 'throbbing'

// ── Single exercise within a routine ──
export interface Exercise {
  id: string
  name: string
  description: string
  /** Duration in seconds */
  duration: number
  /** Instruction for the user (can be HTML or plain text) */
  instruction: string
  /** Optional emoji icon to represent the exercise */
  icon?: string
  /** URL to the video asset for this exercise */
  videoUrl?: string

  /** Body parts associated with this exercise */
  bodyParts: BodyPart[]
}

// ── A full stretching routine ──
export interface Routine {
  id: string
  title: string
  bodyPart: BodyPart
  painType: PainType
  /** Total duration in minutes */
  totalDuration: number
  exercises: Exercise[]
  /** Short intro text shown on the routine card */
  description: string
}

// ── Pain type display metadata ──
export interface PainTypeOption {
  type: PainType
  label: string
  emoji: string
  description: string
}

// ── Body part display metadata ──
export interface BodyPartMeta {
  id: BodyPart
  label: string
  /** SVG path/region IDs associated with this body part */
  regions: string[]
}
