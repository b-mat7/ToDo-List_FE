import { useContext, useState } from 'react'
import { RefreshContext } from '../../../App'
import styles from './ToDoItem.module.scss'

const ToDoItem = ({ item }) => {

  const [editMode, setEditMode] = useState(false)
  const [editedItem, setEditedItem] = useState({ ...item })

  const { refresh, setRefresh } = useContext(RefreshContext)


  const toggleEditMode = () => setEditMode(prev => !prev)

  // Update the edited item's fields while typing
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const editItem = async (event) => {
    event.preventDefault()

    const form = new FormData(event.target)
    form.append("bearbeitet", new Date().toISOString())
    form.append("_id", item._id)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`, {
        method: "PUT",
        // headers: {
        //   authorization
        // },
        body: form
      })

      if (response.ok) {
        toggleEditMode()
        setRefresh(prev => !prev)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

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

      {editMode ?

        <form onSubmit={editItem}>
          <button type="submit">Save</button>
          <input type="text" name="name" id="name" value={editedItem.name} onChange={handleInputChange} required />
          <input type="text" name="menge" id="menge" placeholder="Menge" value={editedItem.menge} onChange={handleInputChange} />
          <input type="text" name="info" id="info" placeholder="Info" value={editedItem.info} onChange={handleInputChange} />
          <select name="typ" id="typ" value={editedItem.typ} onChange={handleInputChange}>
            <option value="einkauf">Einkauf</option>
            <option value="todo">ToDo</option>
          </select>
          <select name="ort" id="ort" value={editedItem.ort} onChange={handleInputChange}>
            <option value="supermarkt">Supermarkt</option>
            <option value="apotheke">Apotheke</option>
            <option value="drogerie">Drogerie</option>
            <option value="seeInfo">Siehe Info</option>
          </select>
          <select name="wer" id="wer" value={editedItem.wer} onChange={handleInputChange}>
            <option value=""></option>
            <option value="kersi">Kersi</option>
            <option value="matze">Matze</option>
          </select>
          <input type="date" id="faellig" name="faellig" value={editedItem.faellig} onChange={handleInputChange} />
          <select name="status" id="status" value={editedItem.status} onChange={handleInputChange}>
            <option value="aktiv">Aktiv</option>
            <option value="inaktiv">Inaktiv</option>
          </select>
        </form>

        :

        <div>
          {item.status === "aktiv" &&
            <button onClick={toggleEditMode}>Edit</button>
          }
          <p>{item.name}</p>
          <p>{item.menge}</p>

          <p>{item.typ}</p>
          <p>{item.ort}</p>

          <p>{item.wer}</p>
          <p>{item.faellig}</p>

          <p>{item.info}</p>

          {item.status === "inaktiv" &&
            <button onClick={deleteItem}>X</button>
          }
        </div>
      }
    </article>
  );
}

export default ToDoItem;