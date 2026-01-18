import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeConfig } from '@/lib/config-loader'
import { applyTheme } from '@/lib/theme-loader'
import './styles/theme.css'
import './styles/index.css'
import App from './App.tsx'

// 初始化配置和主题
initializeConfig()
applyTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
