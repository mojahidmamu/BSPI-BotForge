import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <div className="w-full">
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </div>
    </HelmetProvider>
  </StrictMode>,
)
