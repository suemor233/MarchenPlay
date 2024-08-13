import './styles/main.css'

import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router/router'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <ClickToComponent /> */}
  </React.StrictMode>,
)
