import './App.css'
import { Projects } from './components/Projects'
import { ToasterProvider } from './components/ToasterProvider'

function App() {
  return (
    <>
      <ToasterProvider />
      <Projects />
    </>
  )
}

export default App
