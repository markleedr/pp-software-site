import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Onboarding } from './pages/Onboarding.tsx'
import { OnboardingSuccess } from './pages/OnboardingSuccess.tsx'
import './index.css'

// Three routes, so no router dependency. vercel.json rewrites every path to index.html.
function Root() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/get-started/success') return <OnboardingSuccess />
  if (path === '/get-started') return <Onboarding />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
