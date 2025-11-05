import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import RandomDogShower from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RandomDogShower />
  </StrictMode>,
)