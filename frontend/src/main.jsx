import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Initialize axios defaults and interceptors
import './lib/axiosClient';
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './contexts/UserContext.jsx'
import { CaptainContextProvider } from './contexts/CaptainContext.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContextProvider>
      <UserContextProvider>
        <SocketProvider>
          <BrowserRouter>
          <App />
        </BrowserRouter>
        </SocketProvider>
      </UserContextProvider>
    </CaptainContextProvider>
  </StrictMode>
)
