import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshContext } from '../../pages/Home/Home';
import styles from './AddItemForm.module.scss'

const AddItemForm = () => {
  const [formVisibility, setFormVisibility] = useState(false)

  const { refresh, setRefresh } = useContext(RefreshContext)

  const navigate = useNavigate()

  const nameRef = useRef()
  const qtyRef = useRef()
  const noteRef = useRef()
  const typeRef = useRef()
  const sourceRef = useRef()
  const ownerRef = useRef()
  const dueRef = useRef()


  useEffect(() => {
    if (formVisibility) nameRef.current.focus()
  }, [formVisibility])


  const addItem = async (event) => {
    event.preventDefault()

    const formData = {
      name: nameRef.current.value,
      qty: qtyRef.current.value,
      note: noteRef.current.value,
      type: typeRef.current.value,
      source: sourceRef.current.value,
      owner: ownerRef.current.value,
      due: dueRef.current.value,
      active: true,
      edited: new Date().toISOString()
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        nameRef.current.value = ""
        qtyRef.current.value = ""
        noteRef.current.value = ""
        typeRef.current.value = "einkauf"
        sourceRef.current.value = "su-markt"
        ownerRef.current.value = ""
        dueRef.current.value = ""
        setFormVisibility(prev => !prev)
        setRefresh(prev => !prev)
      } else {
        navigate("/login")
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <section className={styles.additem_form}>
      <div className={styles.container_form}>
        {formVisibility &&
          <form onSubmit={addItem}>
            <input ref={nameRef} type="text" name="name" id="name" placeholder="Name" required />
            <input ref={qtyRef} type="text" name="qty" id="qty" placeholder="Menge" />
            <input ref={noteRef} type="text" name="note" id="note" placeholder="Info" />
            <select ref={typeRef} name="type" id="type">
              <option value="einkauf">Einkauf</option>
              <option value="todo">ToDo</option>
            </select>
            <select ref={sourceRef} name="source" id="source">
              <option value="su-markt">Su-Markt</option>
              <option value="apotheke">Apotheke</option>
              <option value="drogerie">Drogerie</option>
              <option value="s.Info">s.Info</option>
            </select>
            <select ref={ownerRef} name="owner" id="owner">
              <option value=""></option>
              <option value="kersi">K</option>
              <option value="matze">M</option>
            </select>
            <input ref={dueRef} type="date" id="due" name="due" />
            <button type="submit">Hinzufügen</button>
          </form>
        }
      </div>
      <div className={styles.container_btn}>
        <button onClick={() => setFormVisibility(prev => !prev)}>+</button>
      </div>
    </section>
  );
}

export default AddItemForm;