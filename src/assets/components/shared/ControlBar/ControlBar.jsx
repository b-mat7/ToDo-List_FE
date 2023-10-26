import { useState, useEffect } from 'react';
import ToDosContainer from '../ToDosContainer/TodosContainer';

import styles from './ControlBar.module.scss'

const ControlBar = ({ toDos }) => {
  // search States
  const [searchTerm, setSearchTerm] = useState("")
  const [postSearchTodos, setPostSearchTodos] = useState([])
  const [isSearchActive, setIsSearchActive] = useState(false)

  // filterBtn States
  const [filterBtn, setFilterBtn] = useState("")
  const [postFilterBtnTodos, setPostFilterBtnTodos] = useState([])
  const [isFilterBtnActive, setIsFilterBtnActive] = useState(false)

  // from our last try together...
  // const [filteredToDos, setFilteredToDos] = useState([])
  // const [isFiltered, setIsFiltered] = useState(false)



  // search functions
  useEffect(() => {
    setPostSearchTodos(toDos)
    if (isSearchActive) {
      const filtered = [...toDos].filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setPostSearchTodos(filtered)
    }
  }, [toDos]) // isSearchActive needed ?

  const handleSearch = (event) => {
    const searchValue = event.target.value
    setSearchTerm(searchValue)

    if (searchValue) {
      const filtered = [...toDos].filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
      setPostSearchTodos(filtered)
      setIsSearchActive(true)
    } else {
      setPostSearchTodos(toDos)
      setIsSearchActive(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setPostSearchTodos(toDos)
    setIsSearchActive(false)
  }



  // filterBtn functions (also s.u.)
  useEffect(() => {
    setPostFilterBtnTodos(toDos)
    if (isFilterBtnActive) {
      const filtered = [...toDos].filter(item => item.source === filterBtn)
      setPostFilterBtnTodos(filtered)
    }
  }, [toDos]) // isFilterBtnActive needed ?

  const handleFilterBtn = (filterType) => {
    if (filterType === "") {
      setFilterBtn("")
      setPostFilterBtnTodos(toDos)
      setIsFilterBtnActive(false)
    } else {
      setFilterBtn(filterType)
      const filtered = [...toDos].filter(item => item.source === filterType)
      setPostFilterBtnTodos(filtered)
      setIsFilterBtnActive(true)
    }
  }



  // from our last try together...
  // useEffect(() => {
  //   setFilteredToDos(toDos)
  //   if (isFiltered) {
  //     const filteredToDosItems = [...toDos].filter(item => item.type === "todo")
  //     setFilteredToDos(filteredToDosItems)
  //   }
  // }, [toDos, isFiltered])

  // const filterByType = () => {
  //   if (isFiltered) {
  //     setFilteredToDos(toDos)
  //     setIsFiltered(prev => !prev)
  //   } else {
  //     const filteredToDosItems = [...toDos].filter(item => item.type === "todo")
  //     setFilteredToDos(filteredToDosItems)
  //     setIsFiltered(prev => !prev)
  //   }
  // }

  return (
    <section className={styles.controlbar}>
      <div className={styles.controlPanel}>
        <input onChange={handleSearch} type="text" name="search" id="search" placeholder="Suche" value={searchTerm} />

        {searchTerm && <button onClick={clearSearch}>X</button>}

        <select value={filterBtn} onChange={(event) => handleFilterBtn(event.target.value)}>
          <option value="">Ort</option>
          <option value="su-markt">Su-Markt</option>
          <option value="apotheke">Apotheke</option>
          <option value="drogerie">Drogerie</option>
          <option value="s.Info">s.Info</option>
        </select>
        <button onClick={(event) => handleFilterBtn("")}>Reset</button>
      </div>
      {/* <div>
        <button onClick={filterByType}>Type</button>
      </div>
      <ToDosContainer filteredToDos={filteredToDos} /> */}

      {isSearchActive
        ? <ToDosContainer filteredToDos={postSearchTodos} />
        : <ToDosContainer filteredToDos={postFilterBtnTodos} />
      }
    </section>
  );
}

export default ControlBar;

/*
  mit Übernahme postSearchTodos -> postFilterBtnTodos:

  useEffect(() => {
    setPostFilterBtnTodos(postSearchTodos)
  }, [postSearchTodos])

  const handleFilterBtn = (filterType) => {
    if (filterType === "") {
      filterBtn("")
      setPostFilterBtnTodos(postSearchTodos)
    } else {
      setFilterBtn(filterType)
      const filtered = [...postSearchTodos].filter(item => item.source === filterType)
      setPostFilterBtnTodos(filtered)
    }
  }

*/