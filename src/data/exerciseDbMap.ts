/**
 * Maps each QuickStretch exercise ID to the best ExerciseDB search query.
 * ExerciseDB API: https://exercisedb.dev/api/v1/exercises/search?q=...
 * Each query is tuned to return the most relevant GIF for that exercise.
 */
export const EXERCISE_DB_QUERIES: Record<string, string> = {
  'neck-side-tilt':         'neck stretch side',
  'neck-chin-tuck':         'neck stretch',
  'neck-rotation':          'neck side stretch',
  'shoulder-roll':          'shoulder roll',
  'shoulder-cross-stretch': 'cross body shoulder stretch',
  'chest-opener':           'chest stretch',
  'cat-cow':                'cat cow',
  'child-pose':             'child pose',
  'knee-to-chest':          'knee to chest',
  'hip-flexor-stretch':     'hip flexor lunge',
  'figure-four':            'figure four',
  'standing-quad':          'quad stretch standing',
  'hamstring-stretch':      'seated hamstring stretch',
  'calf-stretch':           'calf stretch',
  'wrist-circles':          'wrist circles',
  'forearm-stretch':        'forearm stretch',
  'tricep-overhead':        'overhead tricep stretch',
  'doorway-chest':          'doorway chest stretch',
  'cobra':                  'cobra stretch',
  'side-bend':              'side bend stretch',
  'thread-needle':          'thread needle stretch',
}

/**
 * Exercise IDs where ExerciseDB reliably returns a GIF that matches the
 * described movement. Only these exercises will trigger an API call.
 */
export const VERIFIED_EXERCISE_IDS = new Set([
  'shoulder-cross-stretch',
  'standing-quad',
  'hamstring-stretch',
  'calf-stretch',
  'forearm-stretch',
  'tricep-overhead',
  'cobra',
])
