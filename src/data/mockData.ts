import type { Exercise, Routine, PainTypeOption, BodyPartMeta } from '../types'

// ── Exercises library ─────────────────────────────────────────────────────────

export const EXERCISES: Exercise[] = [
  // NECK
  {
    id: 'neck-side-tilt',
    name: 'Neck Side Tilt',
    description: 'Gently stretch the side of your neck',
    instruction: 'Slowly tilt your head toward your right shoulder. Hold, then switch sides.',
    duration: 30,
    icon: '↔️',
    videoUrl: '/animated-svg-exercises/neck-side-tilt.svg',
    bodyParts: ['neck'],
  },
  {
    id: 'neck-chin-tuck',
    name: 'Chin Tuck',
    description: 'Reduce forward head posture',
    instruction: 'Sit tall, gently pull your chin straight back (making a "double chin"). Hold 5s, repeat.',
    duration: 30,
    icon: '🎯',
    videoUrl: '/animated-svg-exercises/neck-chin-tuck.svg',
    bodyParts: ['neck'],
  },
  {
    id: 'neck-rotation',
    name: 'Neck Rotation',
    description: 'Improve cervical range of motion',
    instruction: 'Slowly rotate your head to the right, hold 5s, return to center, then left.',
    duration: 40,
    icon: '🔄',
    videoUrl: '/animated-svg-exercises/neck-rotation.svg',
    bodyParts: ['neck'],
  },
  // SHOULDERS
  {
    id: 'shoulder-roll',
    name: 'Shoulder Rolls',
    description: 'Release shoulder tension',
    instruction: 'Roll both shoulders slowly backward in large circles — 5 reps forward, 5 backward.',
    duration: 30,
    icon: '🌀',
    videoUrl: '/animated-svg-exercises/shoulder-roll.svg',
    bodyParts: ['shoulders'],
  },
  {
    id: 'shoulder-cross-stretch',
    name: 'Cross-Body Shoulder Stretch',
    description: 'Open the posterior shoulder',
    instruction: 'Pull one arm across your chest with your other arm. Hold 20s, switch sides.',
    duration: 45,
    icon: '🤝',
    videoUrl: '/animated-svg-exercises/shoulder-cross-stretch.svg',
    bodyParts: ['shoulders'],
  },
  {
    id: 'chest-opener',
    name: 'Chest Opener',
    description: 'Release chest and anterior shoulder tightness',
    instruction: 'Clasp hands behind your back, squeeze shoulder blades, lift slightly. Hold 20s.',
    duration: 30,
    icon: '🦅',
    videoUrl: '/animated-svg-exercises/chest-opener.svg',
    bodyParts: ['chest', 'shoulders'],
  },
  // LOWER BACK
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    description: 'Mobilise the entire spine',
    instruction: 'On all fours, alternate arching (cow) and rounding (cat) your spine. Breathe slowly.',
    duration: 45,
    icon: '🐱',
    videoUrl: '/animated-svg-exercises/cat-cow.svg',
    bodyParts: ['lower-back', 'upper-back'],
  },
  {
    id: 'child-pose',
    name: "Child's Pose",
    description: 'Decompress the lower back',
    instruction: 'Sit back on your heels, extend arms forward on the floor. Rest and breathe deeply.',
    duration: 45,
    icon: '🧘',
    videoUrl: '/animated-svg-exercises/child-pose.svg',
    bodyParts: ['lower-back'],
  },
  {
    id: 'knee-to-chest',
    name: 'Knee-to-Chest Pull',
    description: 'Gently release lumbar compression',
    instruction: 'Lie on your back, draw both knees to chest, hug them gently. Hold 30s.',
    duration: 40,
    icon: '🤗',
    videoUrl: '/animated-svg-exercises/knee-to-chest.svg',
    bodyParts: ['lower-back', 'hips'],
  },
  // HIPS
  {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Lunge',
    description: 'Open tight hip flexors',
    instruction: 'Step one foot forward in a low lunge, drop back knee, push hips forward. Hold 30s each side.',
    duration: 60,
    icon: '🏃',
    videoUrl: '/animated-svg-exercises/hip-flexor-stretch.svg',
    bodyParts: ['hips'],
  },
  {
    id: 'figure-four',
    name: 'Figure-Four Stretch',
    description: 'Release glutes and piriformis',
    instruction: 'Lie on back, cross ankle over opposite knee. Pull the bottom leg toward chest. Hold 30s.',
    duration: 50,
    icon: '4️⃣',
    videoUrl: '/animated-svg-exercises/figure-four.svg',
    bodyParts: ['hips'],
  },
  // LEGS
  {
    id: 'standing-quad',
    name: 'Standing Quad Stretch',
    description: 'Release quadriceps tightness',
    instruction: 'Stand on one foot, pull the other heel to glute. Hold 20s each side. Use a wall if needed.',
    duration: 40,
    icon: '🦵',
    videoUrl: '/animated-svg-exercises/standing-quad.svg',
    bodyParts: ['legs'],
  },
  {
    id: 'hamstring-stretch',
    name: 'Seated Hamstring Stretch',
    description: 'Lengthen the hamstrings',
    instruction: 'Sit on floor, legs straight. Hinge forward from hips reaching for your toes. Hold 30s.',
    duration: 45,
    icon: '🙏',
    videoUrl: '/animated-svg-exercises/hamstring-stretch.svg',
    bodyParts: ['legs'],
  },
  {
    id: 'calf-stretch',
    name: 'Calf Wall Stretch',
    description: 'Stretch the calves and Achilles',
    instruction: 'Step one foot back, heel flat on floor, lean into a wall. Hold 20s each side.',
    duration: 40,
    icon: '👣',
    videoUrl: '/animated-svg-exercises/calf-stretch.svg',
    bodyParts: ['legs'],
  },
  // ARMS / WRISTS
  {
    id: 'wrist-circles',
    name: 'Wrist Circles',
    description: 'Loosen stiff wrists',
    instruction: 'Extend arms, make slow circles with both wrists — 10 rotations each direction.',
    duration: 30,
    icon: '⭕',
    videoUrl: '/animated-svg-exercises/wrist-circles.svg',
    bodyParts: ['wrists'],
  },
  {
    id: 'forearm-stretch',
    name: 'Forearm Stretch',
    description: 'Relieve tension from desk work',
    instruction: 'Extend one arm, palm up. Gently pull fingers back with other hand. Hold 20s each side.',
    duration: 40,
    icon: '✋',
    videoUrl: '/animated-svg-exercises/forearm-stretch.svg',
    bodyParts: ['wrists', 'arms'],
  },
  // ARMS
{
  id: 'tricep-overhead',
  name: 'Overhead Tricep Stretch',
  description: 'Stretch the triceps',
  instruction: 'Raise one arm overhead, bend elbow and gently push.',
  duration: 40,
  icon: '🦾',
  videoUrl: '/animated-svg-exercises/tricep-overhead.svg',
  bodyParts: ['arms'],
},

// CHEST
{
  id: 'doorway-chest',
  name: 'Doorway Chest Stretch',
  description: 'Open chest muscles',
  instruction: 'Place arms on doorway and step forward.',
  duration: 40,
  icon: '🚪',
  videoUrl: '/animated-svg-exercises/doorway-chest.svg',
  bodyParts: ['chest', 'shoulders'],
},

// ABDOMEN
{
  id: 'cobra',
  name: 'Cobra Stretch',
  description: 'Stretch abs',
  instruction: 'Push chest up while hips stay down.',
  duration: 40,
  icon: '🐍',
  videoUrl: '/animated-svg-exercises/cobra.svg',
  bodyParts: ['abdomen', 'lower-back'],
},
{
  id: 'side-bend',
  name: 'Side Bend',
  description: 'Stretch obliques',
  instruction: 'Reach overhead and lean sideways.',
  duration: 40,
  icon: '🌙',
  videoUrl: '/animated-svg-exercises/side-bend.svg',
  bodyParts: ['abdomen'],
},

// UPPER BACK (millor qualitat)
{
  id: 'thread-needle',
  name: 'Thread the Needle',
  description: 'Thoracic rotation',
  instruction: 'Rotate arm under body from all fours.',
  duration: 45,
  icon: '🧵',
  videoUrl: '/animated-svg-exercises/thread-needle.svg',
  bodyParts: ['upper-back'],
},
// GLUTES
{
  id: 'glute-bridge',
  name: 'Glute Bridge',
  description: 'Activate glutes and support lower back',
  instruction: 'Lie on your back, feet flat. Lift hips up, squeeze glutes, hold briefly, lower slowly.',
  duration: 40,
  icon: '🍑',
  videoUrl: '/animated-svg-exercises/glute-bridge.svg',
  bodyParts: ['hips', 'lower-back'],
},

// SPINE ROTATION
{
  id: 'spinal-twist',
  name: 'Supine Spinal Twist',
  description: 'Release spine and lower back tension',
  instruction: 'Lie on your back, drop knees to one side while keeping shoulders grounded. Hold, switch.',
  duration: 45,
  icon: '🌀',
  videoUrl: '/animated-svg-exercises/spinal-twist.svg',
  bodyParts: ['lower-back'],
},

// SHOULDERS ACTIVE
{
  id: 'arm-circles',
  name: 'Arm Circles',
  description: 'Warm up shoulders dynamically',
  instruction: 'Extend arms and make small to big circles forward and backward.',
  duration: 30,
  icon: '🔵',
  videoUrl: '/animated-svg-exercises/arm-circles.svg',
  bodyParts: ['shoulders'],
},

// NECK + UPPER BACK
{
  id: 'upper-trap-stretch',
  name: 'Upper Trap Stretch',
  description: 'Relieve tension in upper traps',
  instruction: 'Gently pull your head to the side with your hand. Keep shoulders relaxed.',
  duration: 30,
  icon: '🧲',
  videoUrl: '/animated-svg-exercises/upper-trap-stretch.svg',
  bodyParts: ['neck', 'shoulders'],
},

// CORE CONTROL
{
  id: 'dead-bug',
  name: 'Dead Bug',
  description: 'Improve core stability',
  instruction: 'On your back, alternate lowering opposite arm and leg while keeping core engaged.',
  duration: 40,
  icon: '🐞',
  videoUrl: '/animated-svg-exercises/dead-bug.svg',
  bodyParts: ['abdomen', 'lower-back'],
},
]

// Helper to get exercises by IDs
const byIds = (...ids: string[]): Exercise[] =>
  ids.map(id => EXERCISES.find(e => e.id === id)!).filter(Boolean)

// ── Routines ──────────────────────────────────────────────────────────────────

export const ROUTINES: Routine[] = [
 {
  id: 'neck-tension',
  title: 'Neck Tension Relief',
  bodyPart: 'neck',
  painType: 'throbbing',
  totalDuration: 3,
  description: 'Melt away neck and upper-trap tension from desk work or stress.',
  exercises: byIds('upper-trap-stretch', 'neck-side-tilt', 'neck-chin-tuck'),
},
  {
    id: 'neck-stiffness',
    title: 'Neck Mobility Flow',
    bodyPart: 'neck',
    painType: 'stiffness',
    totalDuration: 3,
    description: 'Restore full range of motion in your neck with gentle mobilisation.',
    exercises: byIds('neck-rotation', 'neck-chin-tuck', 'neck-side-tilt'),
  },
  {
    id: 'shoulder-tension',
    title: 'Shoulder Release',
    bodyPart: 'shoulders',
    painType: 'throbbing',
    totalDuration: 3,
    description: 'Unwind tight shoulders and chest from hours of screen time.',
    exercises: byIds('shoulder-roll', 'shoulder-cross-stretch', 'chest-opener'),
  },
  {
    id: 'shoulder-stiffness',
    title: 'Shoulder Mobility',
    bodyPart: 'shoulders',
    painType: 'stiffness',
    totalDuration: 3,
    description: 'Improve shoulder range of motion with targeted stretches.',
    exercises: byIds('chest-opener', 'shoulder-cross-stretch', 'shoulder-roll'),
  },
  {
  id: 'lower-back-stiffness',
  title: 'Lower Back Relief',
  bodyPart: 'lower-back',
  painType: 'stiffness',
  totalDuration: 4,
  description: 'Decompress and mobilise the lumbar spine. Best done on a mat.',
  exercises: byIds('cat-cow', 'child-pose', 'spinal-twist', 'glute-bridge'),
},
  {
    id: 'lower-back-tension',
    title: 'Lower Back Unwind',
    bodyPart: 'lower-back',
    painType: 'throbbing',
    totalDuration: 3,
    description: 'Ease chronic lumbar tension and tightness after long periods of sitting.',
    exercises: byIds('knee-to-chest', 'cat-cow', 'child-pose'),
  },
  {
    id: 'hips-stiffness',
    title: 'Hip Flexor Opening',
    bodyPart: 'hips',
    painType: 'stiffness',
    totalDuration: 3,
    description: 'Release tight hips from sitting. Opens hip flexors and glutes.',
    exercises: byIds('hip-flexor-stretch', 'figure-four', 'knee-to-chest'),
  },
  {
    id: 'legs-stiffness',
    title: 'Leg Flexibility Flow',
    bodyPart: 'legs',
    painType: 'stiffness',
    totalDuration: 3,
    description: 'Full-leg stretch for runners, cyclists, or anyone who sits all day.',
    exercises: byIds('standing-quad', 'hamstring-stretch', 'calf-stretch'),
  },
  {
    id: 'wrists-tension',
    title: 'Wrist & Forearm Reset',
    bodyPart: 'wrists',
    painType: 'throbbing',
    totalDuration: 2,
    description: 'Quick relief for wrist and forearm tension from keyboard/mouse use.',
    exercises: [
      ...byIds('wrist-circles', 'forearm-stretch'),
      { ...EXERCISES.find(e => e.id === 'wrist-circles')!, id: 'wrist-circles-2' },
      { ...EXERCISES.find(e => e.id === 'wrist-circles')!, id: 'wrist-circles-3' }
    ],
  },
  {
  id: 'upper-back-stiffness',
  title: 'Upper Back Mobility',
  bodyPart: 'upper-back',
  painType: 'stiffness',
  totalDuration: 3,
  description: 'Release tension between your shoulder blades and improve thoracic mobility.',
  exercises: byIds('thread-needle', 'chest-opener', 'arm-circles'),
},
  {
    id: 'upper-back-tension',
    title: 'Upper Back Release',
    bodyPart: 'upper-back',
    painType: 'throbbing',
    totalDuration: 3,
    description: 'Targeted release for the upper back and trapezius muscles.',
    exercises: byIds('shoulder-cross-stretch', 'chest-opener', 'shoulder-roll'),
  },
  {
  id: 'arms-stiffness',
  title: 'Arm Relief',
  bodyPart: 'arms',
  painType: 'stiffness',
  totalDuration: 3,
  description: 'Release tension in arms and triceps.',
  exercises: byIds('tricep-overhead', 'forearm-stretch', 'wrist-circles'),
},

{
  id: 'chest-stiffness',
  title: 'Chest Opening',
  bodyPart: 'chest',
  painType: 'stiffness',
  totalDuration: 3,
  description: 'Open tight chest from sitting.',
  exercises: byIds('chest-opener', 'doorway-chest', 'shoulder-roll'),
},

{
  id: 'abdomen-stiffness',
  title: 'Core Stretch',
  bodyPart: 'abdomen',
  painType: 'stiffness',
  totalDuration: 3,
  description: 'Stretch abs and core.',
  exercises: byIds('cobra', 'side-bend', 'dead-bug'),
},

]

// ── Pain type display metadata ────────────────────────────────────────────────

export const PAIN_TYPES: PainTypeOption[] = [
  {
    type: 'stiffness',
    label: 'Stiffness',
    emoji: '🪨',
    description: 'Hard to move freely',
  },
  {
    type: 'dull',
    label: 'Dull Ache',
    emoji: '😞',
    description: 'Persistent, low-level ache',
  },
  {
    type: 'sharp',
    label: 'Sharp',
    emoji: '⚡',
    description: 'Acute, stinging sensation',
  },
  {
    type: 'throbbing',
    label: 'Throbbing',
    emoji: '💓',
    description: 'Rhythmic pulsing pain',
  },
]

// ── Body part metadata ────────────────────────────────────────────────────────

export const BODY_PARTS: BodyPartMeta[] = [
  { id: 'neck',        label: 'Neck',        regions: ['neck'] },
  { id: 'shoulders',   label: 'Shoulders',   regions: ['shoulder-left', 'shoulder-right'] },
  { id: 'upper-back',  label: 'Upper Back',  regions: ['upper-back'] },
  { id: 'lower-back',  label: 'Lower Back',  regions: ['lower-back'] },
  { id: 'hips',        label: 'Hips',        regions: ['hips'] },
  { id: 'legs',        label: 'Legs',        regions: ['thigh-left', 'thigh-right', 'calf-left', 'calf-right'] },
  { id: 'arms',        label: 'Arms',        regions: ['arm-left', 'arm-right'] },
  { id: 'wrists',      label: 'Wrists',      regions: ['wrist-left', 'wrist-right'] },
  { id: 'chest',       label: 'Chest',       regions: ['chest'] },
  { id: 'abdomen',     label: 'Abdomen',     regions: ['abdomen'] },
]

// ── Lookup helpers ────────────────────────────────────────────────────────────

/** Find the best routine for a given body part and pain type */
export function findRoutine(bodyPart: string, painType: string): Routine | undefined {
  return (
    ROUTINES.find(r => r.bodyPart === bodyPart && r.painType === painType) ||
    // Fallback: same body part, any pain type
    ROUTINES.find(r => r.bodyPart === bodyPart)
  )
}
