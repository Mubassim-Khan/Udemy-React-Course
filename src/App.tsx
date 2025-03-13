import './App.css'
import Button from "./components/Button"
import { ToasterProvider } from './components/ToasterProvider'
function App() {

  return (
    <>
      <ToasterProvider />
        <h1 className='text-xl font-bold underline mb-5 mt-6'>Hi this is</h1>
        <p className="text-lg font-semibold text-sky-500">Mubassim Ahmed Khan</p>
      <Button text="nothing" />
    </>
  )
}

export default App
