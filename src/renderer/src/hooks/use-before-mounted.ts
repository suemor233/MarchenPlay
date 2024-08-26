import { useRef } from 'react'

export const useBeforeMounted = (fn?: () => any) => {
  const mountRef = useRef(false)
  if (!mountRef.current) {
    mountRef.current = true
    fn?.()
  }
}
