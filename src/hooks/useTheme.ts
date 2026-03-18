import { useAppStore } from '../store/useAppStore'
import { themes, type ThemeColors } from '../theme'

export function useTheme(): ThemeColors {
  const isDarkMode = useAppStore(s => s.isDarkMode)
  return isDarkMode ? themes.dark : themes.light
}
