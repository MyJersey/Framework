import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// load CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/app.css'  // order matters
import App from './App.tsx'

// the '!' tells TypeScript the element definitely exists (div in index.html)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
