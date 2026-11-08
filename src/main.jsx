import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Bienvenida from './components/Bienvenida.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Bienvenida />
  </StrictMode>,
)
