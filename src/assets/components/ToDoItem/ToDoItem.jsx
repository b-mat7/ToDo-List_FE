import { useContext, useRef, useState } from 'react'
import { RefreshContext } from '../../../App'
import styles from './ToDoItem.module.scss'

const ToDoItem = ({ item }) => {

  const [editMode, setEditMode] = useState(false)
  const [editedItem, setEditedItem] = useState({ ...item })

  const { refresh, setRefresh } = useContext(RefreshContext)

  const nameRef = useRef()
  const qtyRef = useRef()
  const noteRef = useRef()
  const typeRef = useRef()
  const sourceRef = useRef()
  const ownerRef = useRef()
  const dueRef = useRef()


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

    const formData = {
      _id: item._id,
      name: nameRef.current.value,
      qty: qtyRef.current.value,
      note: noteRef.current.value,
      type: typeRef.current.value,
      source: sourceRef.current.value,
      owner: ownerRef.current.value,
      due: dueRef.current.value,
      // active: item.active,
      edited: new Date().toISOString()
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`, {
        method: "PUT",
        headers: {
          // "authorization": "Bearer " + localStorage.getItem('token'),
          "content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setEditMode(prev => !prev)
        setRefresh(prev => !prev)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const editActive = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`, {
        method: "PATCH",
        headers: {
          // "authorization": "Bearer " + localStorage.getItem('token'),
          "content-type": "application/json"
        },
        body: JSON.stringify({ _id: item._id, active: !item.active, edited: new Date().toISOString() })
      })

      if (response.ok) {
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
          // "authorization": "Bearer " + localStorage.getItem('token'),
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

        <form onSubmit={editItem} className={styles.edit}>
          <button type="submit">Save</button>
          <div>
            <div className={styles.edit_line1}>
              <input ref={nameRef} type="text" name="name" id="name" value={editedItem.name} onChange={handleInputChange} required />
              <input ref={qtyRef} type="text" name="qty" id="qty" placeholder="Menge" value={editedItem.qty} onChange={handleInputChange} />
            </div>
            <div className={styles.edit_line2}>
              <select ref={typeRef} name="type" id="type" value={editedItem.type} onChange={handleInputChange}>
                <option value="einkauf">Einkauf</option>
                <option value="todo">ToDo</option>
              </select>
              <select ref={sourceRef} name="source" id="source" value={editedItem.source} onChange={handleInputChange}>
                <option value="supermarkt">Supermarkt</option>
                <option value="apotheke">Apotheke</option>
                <option value="drogerie">Drogerie</option>
                <option value="sieheInfo">Siehe Info</option>
              </select>
            </div>
            <div className={styles.edit_line3}>
              <select ref={ownerRef} name="owner" id="owner" value={editedItem.owner} onChange={handleInputChange}>
                <option value=""></option>
                <option value="kersi">Kersi</option>
                <option value="matze">Matze</option>
              </select>
              <input ref={dueRef} type="date" id="due" name="due" value={editedItem.due} onChange={handleInputChange} />
            </div>
            <div className={styles.edit_line4}>
              <input ref={noteRef} type="text" name="note" id="note" placeholder="Info" value={editedItem.note} onChange={handleInputChange} />
            </div>
          </div>
        </form>

        :

        <div className={`${styles.display} ${item.active === true ? styles.active : styles.inactive}`}>
          {item.active === true &&
            <button onClick={() => setEditMode(prev => !prev)}>Edit</button>
          }

          <div onClick={editActive}>
            <div className={styles.display_line1}>
              <p>{item.name}</p>
              <p>{item.qty}</p>
            </div>
            <div className={styles.display_line2}>
              <p>{item.type}</p>
              <p>{item.source}</p>
            </div>
            <div className={styles.display_line3}>
              <p>{item.owner}</p>
              <p>{item.due}</p>
            </div>
            <div className={styles.display_line4}>
              <p>{item.note}</p>
            </div>
          </div>

          {item.active === false &&
            <button onClick={deleteItem}>Del</button>
          }
        </div>
      }
    </article>
  );
}

export default ToDoItem;