import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './context/TaskContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryclient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  
  <QueryClientProvider client={queryclient}>
  <TaskProvider>
    <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </TaskProvider>
  </QueryClientProvider>
)