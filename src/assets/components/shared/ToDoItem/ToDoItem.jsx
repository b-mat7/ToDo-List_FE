import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshContext } from '../../pages/Home/Home'
import styles from './ToDoItem.module.scss'

const ToDoItem = ({ item }) => {
  const [editMode, setEditMode] = useState(false)
  const [editedItem, setEditedItem] = useState({ ...item })

  const { refresh, setRefresh } = useContext(RefreshContext)

  const navigate = useNavigate()

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
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setEditMode(prev => !prev)
        setRefresh(prev => !prev)
      } else {
        navigate("/")
      }
    } catch (error) {
      console.error(error.message)
    }
  }


  const editItemStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          _id: item._id,
          active: !item.active,
          edited: new Date().toISOString()
        })
      })

      if (response.ok) {
        setRefresh(prev => !prev)
      } else {
        navigate("/")
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
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ _id: item._id })
      })

      if (response.ok) {
        setRefresh(prev => !prev)
      } else {
        navigate("/")
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <article className={styles.todo_item}>

      {editMode ?

        <form onSubmit={editItem} className={styles.editView}>
          <div className={styles.editView_container}>
            <div className={styles.editView_line1}>
              <input ref={nameRef} type="text" name="name" id="name" value={editedItem.name} onChange={handleInputChange} required />
              <input ref={qtyRef} type="text" name="qty" id="qty" placeholder="Menge" value={editedItem.qty} onChange={handleInputChange} />
            </div>
            <div className={styles.editView_line2}>
              <input ref={noteRef} type="text" name="note" id="note" placeholder="Info" value={editedItem.note} onChange={handleInputChange} />
            </div>
            <div className={styles.editView_line3}>
              <select ref={typeRef} name="type" id="type" value={editedItem.type} onChange={handleInputChange}>
                <option value="Kauf">Kauf</option>
                <option value="Todo">ToDo</option>
              </select>
              <select ref={sourceRef} name="source" id="source" value={editedItem.source} onChange={handleInputChange}>
                <option value="Su-Markt">Su-Markt</option>
                <option value="Apotheke">Apotheke</option>
                <option value="Drogerie">Drogerie</option>
                <option value="s.Info">s.Info</option>
              </select>
            </div>
            <div className={styles.editView_line4}>
              <select ref={ownerRef} name="owner" id="owner" value={editedItem.owner} onChange={handleInputChange}>
                <option value=""></option>
                <option value="KB">KB</option>
                <option value="MB">MB</option>
              </select>
              <input ref={dueRef} type="date" name="due" id="due" value={editedItem.due} onChange={handleInputChange} />
            </div>
          </div>
          <button type="submit" className={styles.editSaveBtn}>Save</button>
        </form>

        :

        <div className={`${styles.displayView} ${item.active === true ? styles.active : styles.inactive}`}>

          {item.active === false &&
            <button onClick={deleteItem} className={styles.delete_btn}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px" fill={"hsla(0, 0%, 100%, 1)"}><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
            </button>
          }

          <div onClick={editItemStatus} className={styles.displayView_container}>
            <div className={styles.displayView_line1}>
              <p>{item.name}</p>
              <p>{item.qty}</p>
            </div>
            <div className={styles.displayView_line2}>
              <p>{item.note}</p>
            </div>
            <div className={styles.displayView_line3}>
              {/* <p>{item.type}</p> */}
              {/* <p>{item.source}</p> */}
            </div>
            <div className={styles.displayView_line4}>
              <p>{item.owner}</p>
              <p>{item.due}</p>
            </div>
            <div className={styles.displayView_line5}>
              {/* <p>{item.edited}</p> */}
            </div>
          </div>

          {item.active === true &&
            <button onClick={() => setEditMode(prev => !prev)} className={styles.editSave_btn}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12px" height="12px" fill={"hsla(0, 0%, 100%, 1)"}><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>
            </button>
          }
        </div>
      }
    </article>
  );
}

export default ToDoItem;