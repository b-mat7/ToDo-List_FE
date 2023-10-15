import { useState } from 'react'

import ToDoItem from '../ToDoItem/ToDoItem';
import styles from './ToDosContainer.module.scss'

const ToDosContainer = ({ filteredToDos }) => {

  const [sortBy, setSortBy] = useState(null)

  const sortedToDos = [...filteredToDos].sort(dueAsc)

  const sortedActiveToDos = sortedToDos.filter(item => item.active === true)
  const sortedInactiveToDos = sortedToDos.filter(item => item.active === false)

  function nameAsc(a, b) { return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 }
  function nameDes(a, b) { return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1 }
  function dueAsc(a, b) { return new Date(a.due) - new Date(b.due) }
  function dueDes(a, b) { return new Date(b.due) - new Date(a.due) }
  function editedAsc(a, b) { return new Date(a.edited) - new Date(b.edited) }
  function editedDes(a, b) { return new Date(b.edited) - new Date(a.edited) }

  return (
    <section className={styles.toDos_container}>
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