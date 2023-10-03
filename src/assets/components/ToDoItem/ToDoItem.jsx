import { useContext } from 'react'

import { RefreshContext } from '../../../App'

import styles from './ToDoItem.module.scss'

const ToDoItem = ({ item }) => {

  const { refresh, setRefresh } = useContext(RefreshContext)

  const deleteItem = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`, {
        method: "DELETE",
        headers: {
          // authorization
          "content-type": "application/json"
        },
        body: JSON.stringify({ _id: item._id })
      })

      if (response.ok) {
        setRefresh(prev => !prev)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <article className={styles.todo_item}>
      <div>
        <p>{item.name}</p>
        <p>{item.menge}</p>
        <p>{item.typ}</p>
        <p>{item.ort}</p>
        <p>{item.info}</p>
        <button onClick={deleteItem}>X</button>
      </div>

      {/* edit button */}
      {/* item.status= inaktive -> zeige delete button */}

    </article>
  );
}

export default ToDoItem;