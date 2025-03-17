import './App.css'
import { AddModal } from './components/AddModal'
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
