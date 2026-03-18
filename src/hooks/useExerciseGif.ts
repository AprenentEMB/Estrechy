import { useState, useEffect } from 'react'
import { EXERCISE_DB_QUERIES, VERIFIED_EXERCISE_IDS } from '../data/exerciseDbMap'

const BASE_URL = 'https://exercisedb.dev/api/v1/exercises/search'

// Module-level cache so GIFs persist across renders and component unmounts
const gifCache = new Map<string, string | null>()

interface UseExerciseGifResult {
  gifUrl: string | null
  loading: boolean
}

/**
 * Fetches the best-matching GIF from ExerciseDB for a given QuickStretch exercise ID.
 * Results are cached in memory for the lifetime of the app session.
 */
export function useExerciseGif(exerciseId: string): UseExerciseGifResult {
  const [gifUrl, setGifUrl] = useState<string | null>(
    gifCache.has(exerciseId) ? gifCache.get(exerciseId)! : null
  )
  const [loading, setLoading] = useState(!gifCache.has(exerciseId))

  useEffect(() => {
    if (gifCache.has(exerciseId)) {
      setGifUrl(gifCache.get(exerciseId) ?? null)
      setLoading(false)
      return
    }

    const query = VERIFIED_EXERCISE_IDS.has(exerciseId) ? EXERCISE_DB_QUERIES[exerciseId] : undefined
    if (!query) {
      gifCache.set(exerciseId, null)
      setGifUrl(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&limit=1`)
      .then(r => r.json())
      .then(json => {
        if (cancelled) return
        const url = json?.data?.[0]?.gifUrl ?? null
        gifCache.set(exerciseId, url)
        setGifUrl(url)
      })
      .catch(() => {
        if (!cancelled) {
          gifCache.set(exerciseId, null)
          setGifUrl(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [exerciseId])

  return { gifUrl, loading }
}
