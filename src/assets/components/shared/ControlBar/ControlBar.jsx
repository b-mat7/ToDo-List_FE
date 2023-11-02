import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import ToDosContainer from '../ToDosContainer/TodosContainer';
// import LogoutIcon from '../Icon/LogoutIcon'
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

  // const navigate = useNavigate()


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
      const filtered = [...toDos].filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.note.toLowerCase().includes(searchValue.toLowerCase()))
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
      const filtered = [...toDos].filter(item => item.source === filterBtn || item.owner === filterBtn || item.type === filterBtn)
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
      const filtered = [...toDos].filter(item => item.source === filterType || item.owner === filterType || item.type === filterType)
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


  // cookie expire / -clear does not work on render.com
  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_LINK}/logout`, {
  //       credentials: "include"
  //     })

  //     if (response.ok) navigate("/login")

  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }

  return (
    <>
      {isSearchActive
        ? <ToDosContainer filteredToDos={postSearchTodos} />
        : <ToDosContainer filteredToDos={postFilterBtnTodos} />
      }

      <section className={styles.control_bar}>
        <div className={styles.control_panel}>
          <div className={styles.search_container}>
            {/* <button onClick={handleLogout} className={styles.logout_btn}><LogoutIcon /></button> */}
            <input
              onChange={handleSearch}
              type="text"
              name="search"
              id="search"
              className={styles.search_input} placeholder="Suche"
              value={searchTerm} />
            {searchTerm && <button onClick={clearSearch} className={styles.search_clear}>X</button>}
          </div>
          <div className={styles.filter_container}>
            <select className={`${isFilterBtnActive ? styles.isSelected : null}`} value={filterBtn} onChange={(event) => handleFilterBtn(event.target.value)}>
              <option value="">Filter</option>
              <option value="Su-Markt">Su-M</option>
              <option value="Apotheke">Apo</option>
              <option value="Drogerie">Drog</option>
              <option value="s.Info">Info</option>
              <option value="KB">KB</option>
              <option value="MB">MB</option>
              <option value="Kauf">Kauf</option>
              <option value="Todo">Todo</option>
            </select>
            <button onClick={(event) => handleFilterBtn("")}>Reset</button>
          </div>
        </div>
        {/* // from our last try together... */}
        {/* <div>
        <button onClick={filterByType}>Type</button>
      </div>
      <ToDosContainer filteredToDos={filteredToDos} /> */}
      </section>
    </>
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