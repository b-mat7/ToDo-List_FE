import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import AddItemForm from "../../shared/AddItemForm/AddItemForm";
import ControlBar from "../../shared/ControlBar/ControlBar";

export const RefreshContext = createContext()

const Home = () => {
  const [refresh, setRefresh] = useState(false)
  const [toDos, setToDos] = useState([])

  const navigate = useNavigate()

  
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`,
          {
            credentials: "include"
          })

        if (response.ok) {
          const result = await response.json()
          setToDos(result)
        } else {
          navigate("/")
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    getItems()
  }, [refresh])

  return (
    <section>
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <AddItemForm />
        <ControlBar toDos={toDos} />
      </RefreshContext.Provider>
    </section>
  );
}

export default Home;