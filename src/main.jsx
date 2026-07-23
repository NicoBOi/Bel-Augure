import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Site en français : on ne charge que les sous-ensembles latin et latin-ext
// (é, è, ç, œ, guillemets…). Les jeux cyrillique et vietnamien de Montserrat
// sont écartés — 18 fichiers de police et autant de blocs @font-face en moins.
import '@fontsource/montserrat/latin-300.css'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/latin-500.css'
import '@fontsource/montserrat/latin-ext-300.css'
import '@fontsource/montserrat/latin-ext-400.css'
import '@fontsource/montserrat/latin-ext-500.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
