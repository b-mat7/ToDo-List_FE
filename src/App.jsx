import { createContext, useEffect, useState } from 'react'

import LandingPage from './assets/components/LandingPage/LandingPage'
import AddItemForm from './assets/components/AddItemForm/AddItemForm'
import ControlBar from './assets/components/ControlBar/ControlBar'
import ToDosContainer from './assets/components/TodosContainer/TodosContainer'

import './App.scss'

export const RefreshContext = createContext()

function App() {
  const [refresh, setRefresh] = useState(false)
  const [toDos, setToDos] = useState([])

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`)

        if (response.ok) {
          const result = await response.json()
          setToDos(result)
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    getItems()
  }, [refresh])

  return (
    <main>
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <AddItemForm />
        <ControlBar toDos={toDos} />
        {/* <ToDosContainer /> */}
      </RefreshContext.Provider>
    </main>
  )
}

export default App
