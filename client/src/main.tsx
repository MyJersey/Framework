import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/app.css'
import App from './App.tsx'

// The '!' tells TypeScript the element definitely exists (it's in index.html).
// StrictMode renders every component twice in development to help catch bugs —
// this is expected behaviour and does not happen in production builds.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
