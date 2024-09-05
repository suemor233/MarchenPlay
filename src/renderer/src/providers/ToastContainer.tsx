'use client'

// import { useTheme } from 'next-themes'
import type { ToastContainerProps } from 'react-toastify'
import { ToastContainer as ReactToastContainer } from 'react-toastify'

export const ToastContainer = () => {
  // const { resolvedTheme } = useTheme()
  const toastConfig = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: false,
    hideProgressBar: true,
    // theme: resolvedTheme,
    closeOnClick: true,
    closeButton: false,
  } satisfies ToastContainerProps

  return <ReactToastContainer {...toastConfig} />
}
