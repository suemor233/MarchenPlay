import './styles/main.css'

import { ClickToComponent } from 'click-to-react-component'
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { reactRouter } from './router'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={reactRouter} />
    <ClickToComponent />
  </React.StrictMode>,
)
