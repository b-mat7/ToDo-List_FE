import { createContext, useEffect, useState } from 'react'
import AddItemForm from '../../shared/AddItemForm/AddItemForm';
import ControlBar from '../../shared/ControlBar/ControlBar';
import styles from './Home.module.scss';

export const RefreshContext = createContext()

const Home = () => {
  const [refresh, setRefresh] = useState(false)
  const [toDos, setToDos] = useState([])
  const [err, setErr] = useState("")

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
          setErr("Failed to retreive content")
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
        <ControlBar toDos={toDos} />
        {err && <p>{err}</p>}
        <AddItemForm />
      </RefreshContext.Provider>
    </section>
  );
}

export default Home;