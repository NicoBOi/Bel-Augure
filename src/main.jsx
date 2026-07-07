import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/bodoni-moda/500.css'
import '@fontsource/bodoni-moda/600.css'
import '@fontsource/bodoni-moda/500-italic.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
