import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource/pinyon-script/latin-400.css'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/nanum-pen-script/latin-400.css'
import './styles/tokens.css'
import './styles/global.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
