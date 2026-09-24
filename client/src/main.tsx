import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './context/TaskContext.tsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </TaskProvider>
)
