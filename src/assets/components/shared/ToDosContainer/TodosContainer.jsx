import { useState, useEffect, useRef } from 'react'
import ToDoItem from '../ToDoItem/ToDoItem';
import styles from './ToDosContainer.module.scss'

import SortByName from '../SortByButton/SortByName';

const ToDosContainer = ({ filteredToDos }) => {
  const [sortBy, setSortBy] = useState("editedDes")
  const [sortedToDos, setSortedToDos] = useState([])

  const containerRef = useRef()

  const nameAsc = (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  const nameDes = (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
  const dueAsc = (a, b) => new Date(a.due) - new Date(b.due)
  const dueDes = (a, b) => new Date(b.due) - new Date(a.due)
  const editedAsc = (a, b) => new Date(a.edited) - new Date(b.edited)
  const editedDes = (a, b) => new Date(b.edited) - new Date(a.edited)
  const sortFunctions = { nameAsc, nameDes, dueAsc, dueDes, editedAsc, editedDes }


  // set container's scrollTop prop = its scrollHeight -> scrolls to container bottom
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [filteredToDos])


  useEffect(() => {
    const sorted = [...filteredToDos].sort(sortFunctions[sortBy])
    setSortedToDos(sorted)
  }, [filteredToDos, sortBy])

  const sortedActiveToDos = sortedToDos.filter(item => item.active === true)
  const sortedInactiveToDos = sortedToDos.filter(item => item.active === false)

  return (
    <section className={styles.toDos_container} ref={containerRef}>
      <div className={styles.item_container}>
        <div className={styles.inactive}>
          {sortedInactiveToDos.map((item) => (
            <ToDoItem
              key={item._id}
              item={item}
            />
          ))}
        </div>
        <div className={styles.active}>
          {sortedActiveToDos.map((item) => (
            <ToDoItem
              key={item._id}
              item={item}
            />
          ))}
        </div>
      </div>
      <div className={styles.sortByPanel}>
        <button onClick={() => setSortBy("nameAsc")}>Name</button>
        <button onClick={() => setSortBy("editedAsc")}>Bearbeitet</button>
        <button onClick={() => setSortBy("dueAsc")}>Fällig</button>

        <SortByName
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

      </div>
    </section>
  );
}

export default ToDosContainer;