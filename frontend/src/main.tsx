import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProjectState } from './context/projectState.tsx'

createRoot(document.getElementById('root')!).render(
  <ProjectState>
    <App />
  </ProjectState>,
)
