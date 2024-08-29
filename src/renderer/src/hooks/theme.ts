import { useTheme } from 'next-themes'
import { useCallback } from 'react'

export type AppTheme = 'cmyk' | 'dark'
export const useSetTheme = () => {
  const { setTheme } = useTheme()

  const toggleMode = useCallback((themes: AppTheme) => {
    setTheme(themes)
  }, [setTheme])

  return toggleMode
}
