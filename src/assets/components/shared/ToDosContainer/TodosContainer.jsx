import { useState, useEffect } from 'react'

import ToDoItem from '../ToDoItem/ToDoItem';
import styles from './ToDosContainer.module.scss'

const ToDosContainer = ({ filteredToDos }) => {

  const [sortedToDos, setSortedToDos] = useState([])
  const [sortBy, setSortBy] = useState("editedAsc")

  const nameAsc = (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  const nameDes = (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
  const dueAsc = (a, b) => new Date(a.due) - new Date(b.due)
  const dueDes = (a, b) => new Date(b.due) - new Date(a.due)
  const editedAsc = (a, b) =>  new Date(a.edited) - new Date(b.edited)
  const editedDes = (a, b) => new Date(b.edited) - new Date(a.edited)
  const sortFunctions = { nameAsc, nameDes, dueAsc, dueDes, editedAsc, editedDes }

  useEffect(() => {
    const sorted = [...filteredToDos].sort(sortFunctions[sortBy])
    setSortedToDos(sorted)
  }, [filteredToDos, sortBy])

  const sortedActiveToDos = sortedToDos.filter(item => item.active === true)
  const sortedInactiveToDos = sortedToDos.filter(item => item.active === false)

  return (
    <section className={styles.toDos_container}>
      <div>
        <button onClick={() => setSortBy("nameAsc")}>Name</button>
        <button onClick={() => setSortBy("editedAsc")}>Edit</button>
        <button onClick={() => setSortBy("dueAsc")}>Due</button>
      </div>
      <div className={styles.active}>
        {sortedActiveToDos.map((item) => (
          <ToDoItem
            key={item._id}
            item={item}
          />
        ))}
      </div>
      <div className={styles.inactive}>
        {sortedInactiveToDos.map((item) => (
          <ToDoItem
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default ToDosContainer;