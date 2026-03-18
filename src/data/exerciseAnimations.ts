import type { Easing, Transition } from 'framer-motion'

interface PartAnimation {
  animate: Record<string, number | number[] | string | string[]>
  transition: Transition
  style?: { transformOrigin?: string }
}

export interface ExerciseAnimation {
  view: 'front' | 'side'
  /** Maps BodyPartRefs keys to their Framer Motion animation props */
  parts: Record<string, PartAnimation>
}

const loop = (duration: number, ease: Easing = 'easeInOut'): Transition => ({
  duration,
  repeat: Infinity,
  repeatType: 'mirror',
  ease,
})

const loopKeyframes = (duration: number): Transition => ({
  duration,
  repeat: Infinity,
  ease: 'linear',
})

export const EXERCISE_ANIMATIONS: Record<string, ExerciseAnimation> = {
  'neck-side-tilt': {
    view: 'front',
    parts: {
      head: {
        animate: { rotate: [-18, 18] },
        transition: loop(2.5),
        style: { transformOrigin: '100px 60px' },
      },
      neck: {
        animate: { rotate: [-8, 8] },
        transition: loop(2.5),
        style: { transformOrigin: '100px 72px' },
      },
    },
  },

  'neck-chin-tuck': {
    view: 'front',
    parts: {
      head: {
        animate: { y: [0, 5, 0] },
        transition: loopKeyframes(2),
      },
    },
  },

  'neck-rotation': {
    view: 'front',
    parts: {
      head: {
        animate: { rotate: [0, 12, 0, -12, 0], x: [0, 4, 0, -4, 0] },
        transition: loopKeyframes(3),
        style: { transformOrigin: '100px 50px' },
      },
    },
  },

  'shoulder-roll': {
    view: 'front',
    parts: {
      shoulderLeft: {
        animate: { y: [-6, -6, 2, 0], x: [-2, 3, 3, 0] },
        transition: loopKeyframes(2.4),
      },
      shoulderRight: {
        animate: { y: [-6, -6, 2, 0], x: [-2, 3, 3, 0] },
        transition: loopKeyframes(2.4),
      },
    },
  },

  'shoulder-cross-stretch': {
    view: 'front',
    parts: {
      armLeft: {
        animate: { x: [0, 12] },
        transition: loop(2),
      },
      armRight: {
        animate: { x: [0, -12] },
        transition: loop(2),
      },
    },
  },

  'chest-opener': {
    view: 'front',
    parts: {
      shoulderLeft: {
        animate: { x: [0, -5], scaleX: [1, 1.08] },
        transition: loop(2.2),
      },
      shoulderRight: {
        animate: { x: [0, 5], scaleX: [1, 1.08] },
        transition: loop(2.2),
      },
      chest: {
        animate: { scaleX: [1, 1.04] },
        transition: loop(2.2),
        style: { transformOrigin: '100px 100px' },
      },
    },
  },

  'cat-cow': {
    view: 'side',
    parts: {
      upperBack: {
        animate: { scaleY: [0.95, 1.08], y: [4, -4] },
        transition: loop(3),
        style: { transformOrigin: '100px 100px' },
      },
      lowerBack: {
        animate: { scaleY: [0.97, 1.05], y: [3, -3] },
        transition: loop(3),
        style: { transformOrigin: '100px 170px' },
      },
    },
  },

  'child-pose': {
    view: 'side',
    parts: {
      lowerBack: {
        animate: { scaleY: [1, 1.05], y: [0, 3] },
        transition: loop(3.5),
        style: { transformOrigin: '100px 170px' },
      },
      upperBack: {
        animate: { y: [0, 4] },
        transition: loop(3.5),
      },
    },
  },

  'knee-to-chest': {
    view: 'front',
    parts: {
      legLeftUpper: {
        animate: { y: [0, -18], rotate: [0, -8] },
        transition: loop(2.5),
        style: { transformOrigin: '76px 220px' },
      },
      legRightUpper: {
        animate: { y: [0, -18], rotate: [0, 8] },
        transition: loop(2.5),
        style: { transformOrigin: '124px 220px' },
      },
      hips: {
        animate: { y: [0, -4] },
        transition: loop(2.5),
      },
    },
  },

  'hip-flexor-stretch': {
    view: 'side',
    parts: {
      legLeftUpper: {
        animate: { y: [0, -6], x: [0, 4] },
        transition: loop(2.5),
      },
      hips: {
        animate: { x: [0, 4] },
        transition: loop(2.5),
      },
    },
  },

  'figure-four': {
    view: 'front',
    parts: {
      legLeftUpper: {
        animate: { rotate: [0, 25], x: [0, 6] },
        transition: loop(2.8),
        style: { transformOrigin: '76px 220px' },
      },
      legRightUpper: {
        animate: { y: [0, -10] },
        transition: loop(2.8),
      },
    },
  },

  'standing-quad': {
    view: 'front',
    parts: {
      legLeftLower: {
        animate: { rotate: [0, -35], y: [0, -8] },
        transition: loop(2.2),
        style: { transformOrigin: '66px 303px' },
      },
      kneeLeft: {
        animate: { y: [0, -2] },
        transition: loop(2.2),
      },
    },
  },

  'hamstring-stretch': {
    view: 'side',
    parts: {
      legLeftLower: {
        animate: { y: [0, -4] },
        transition: loop(2.5),
      },
      legRightLower: {
        animate: { y: [0, -4] },
        transition: loop(2.5),
      },
      upperBack: {
        animate: { rotate: [0, 8], y: [0, 6] },
        transition: loop(2.5),
        style: { transformOrigin: '100px 80px' },
      },
    },
  },

  'calf-stretch': {
    view: 'front',
    parts: {
      legLeftLower: {
        animate: { y: [0, -3] },
        transition: loop(2),
      },
      legRightLower: {
        animate: { y: [0, -3] },
        transition: loop(2),
      },
    },
  },

  'wrist-circles': {
    view: 'front',
    parts: {
      wristLeft: {
        animate: { rotate: [0, 360] },
        transition: loopKeyframes(2),
        style: { transformOrigin: '50px 172px' },
      },
      wristRight: {
        animate: { rotate: [0, 360] },
        transition: loopKeyframes(2),
        style: { transformOrigin: '150px 172px' },
      },
    },
  },

  'forearm-stretch': {
    view: 'front',
    parts: {
      wristLeft: {
        animate: { y: [0, -5], rotate: [0, -15] },
        transition: loop(1.8),
        style: { transformOrigin: '50px 172px' },
      },
      wristRight: {
        animate: { y: [0, -5], rotate: [0, -15] },
        transition: loop(1.8),
        style: { transformOrigin: '150px 172px' },
      },
    },
  },

  'tricep-overhead': {
    view: 'front',
    parts: {
      armRight: {
        animate: { rotate: [0, -45], y: [0, -12] },
        transition: loop(2.5),
        style: { transformOrigin: '141px 93px' },
      },
      wristRight: {
        animate: { y: [0, -20], x: [0, -10] },
        transition: loop(2.5),
      },
    },
  },

  'doorway-chest': {
    view: 'front',
    parts: {
      armLeft: {
        animate: { rotate: [0, 15], x: [0, -6] },
        transition: loop(2.2),
        style: { transformOrigin: '59px 93px' },
      },
      armRight: {
        animate: { rotate: [0, -15], x: [0, 6] },
        transition: loop(2.2),
        style: { transformOrigin: '141px 93px' },
      },
      chest: {
        animate: { scaleX: [1, 1.05], y: [0, 2] },
        transition: loop(2.2),
        style: { transformOrigin: '100px 100px' },
      },
    },
  },

  'cobra': {
    view: 'side',
    parts: {
      upperBack: {
        animate: { y: [0, -10], rotate: [0, -6] },
        transition: loop(3),
        style: { transformOrigin: '100px 130px' },
      },
      chest: {
        animate: { y: [0, -8] },
        transition: loop(3),
      },
      head: {
        animate: { y: [0, -8] },
        transition: loop(3),
      },
    },
  },

  'side-bend': {
    view: 'front',
    parts: {
      armRight: {
        animate: { rotate: [0, -40], y: [0, -14] },
        transition: loop(2.5),
        style: { transformOrigin: '141px 93px' },
      },
      chest: {
        animate: { rotate: [0, -8] },
        transition: loop(2.5),
        style: { transformOrigin: '100px 127px' },
      },
      abdomen: {
        animate: { rotate: [0, -8] },
        transition: loop(2.5),
        style: { transformOrigin: '100px 150px' },
      },
    },
  },

  'thread-needle': {
    view: 'side',
    parts: {
      armLeft: {
        animate: { rotate: [0, 50], x: [0, 10] },
        transition: loop(3),
        style: { transformOrigin: '65px 95px' },
      },
      upperBack: {
        animate: { rotate: [0, 8] },
        transition: loop(3),
        style: { transformOrigin: '100px 100px' },
      },
    },
  },
}

/** Default breathing animation for exercises without a specific config */
export const DEFAULT_ANIMATION: ExerciseAnimation = {
  view: 'front',
  parts: {
    chest: {
      animate: { scale: [1, 1.03] },
      transition: loop(3.5),
      style: { transformOrigin: '100px 100px' },
    },
  },
}
