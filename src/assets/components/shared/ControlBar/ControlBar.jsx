import { useState, useEffect } from 'react';
import ToDosContainer from '../ToDosContainer/TodosContainer';

import styles from './ControlBar.module.scss'

const ControlBar = ({ toDos }) => {
  // const [searchTerm, setSearchTerm] = useState("")
  const [postSearchFilterTodos, setPostSearchFilterTodos] = useState([])

  const [filteredToDos, setFilteredToDos] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(()=> {
    setPostSearchFilterTodos(toDos)
  },[toDos])

  const handleSearch = (event) => {
    const searchValue = event.target.value
    // setSearchTerm(searchValue)

    if(searchValue) {
      const filtered = [...toDos].filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
      setPostSearchFilterTodos(filtered)
    } else {
      setPostSearchFilterTodos(toDos)
    }
  }
  

  
  useEffect(() => {
    setFilteredToDos(toDos)
    if (isFiltered) {
      const filteredToDosItems = [...toDos].filter(item => item.type === "todo")
      setFilteredToDos(filteredToDosItems)
    }
  }, [toDos, isFiltered])


  const filterByType = () => {
    if (isFiltered) {
      setFilteredToDos(toDos)
      setIsFiltered(prev => !prev)
    } else {
      const filteredToDosItems = [...toDos].filter(item => item.type === "todo")
      setFilteredToDos(filteredToDosItems)
      setIsFiltered(prev => !prev)
    }
  }

  return (
    <section className={styles.controlbar}>
      <div>
        <input onChange={handleSearch} type="text" name="search" id="search" placeholder="Suche" />
      </div>
      <div>
        <button onClick={filterByType}>Type</button>
      </div>
      <ToDosContainer filteredToDos={filteredToDos} />

      <ToDosContainer filteredToDos={postSearchFilterTodos} />
    </section>
  );
}

export default ControlBar;