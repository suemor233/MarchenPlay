import App from '@renderer/App'
import NotFound from '@renderer/components/common/NotFound'
import { RootLoader } from '@renderer/libs/loading'
import Contact from '@renderer/page/contact'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    loader: RootLoader,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
      {
        index: true,
        element: <div>1111111111</div>,
      },
    ],
  },

])
