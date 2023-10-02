import { useContext, useState } from 'react';
import { RefreshContext } from '../../../App';
import styles from './AddItemForm.module.scss'

const AddItemForm = () => {
  const [addItemFormVisibility, setAddItemFormVisibility] = useState(false)

  const { refresh, setRefresh } = useContext(RefreshContext)

  const toggleAddItemFormVisibility = () => {
    setAddItemFormVisibility(prev => !prev)
  }

  const addItem = async (event) => {
    event.preventDefault()

    const form = new FormData(event.target)
    // form.added = new Date()
    // console.log(form)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/todos`, {
        method: "POST",
        // headers: {
        //   authorization
        // },
        body: form
      })

      if (response.ok) {
        event.target.reset()
        toggleAddItemFormVisibility()
        setRefresh(prev => !prev)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <section className={styles.additem_form}>
      <div>
        <button onClick={toggleAddItemFormVisibility}>+</button>
      </div>
      {addItemFormVisibility &&
        <form onSubmit={addItem}>
          <select name="typ" id="typ">
            <option value="einkauf">Einkauf</option>
            <option value="todo">ToDo</option>
          </select>
          <select name="ort" id="ort">
            <option value="supermarkt">Supermarkt</option>
            <option value="apotheke">Apotheke</option>
            <option value="drogerie">Drogerie</option>
            <option value="seeInfo">Siehe Info</option>
          </select>
          <input type="text" name="name" id="name" placeholder="Name" />
          <input type="text" name="menge" id="menge" placeholder="Menge" />
          <input type="text" name="info" id="info" placeholder="Info" />
          <select name="status" id="status">
            <option value="active">Aktiv</option>
            <option value="inactive">Inaktiv</option>
          </select>
          <button type="submit">Add</button>
        </form>
      }
    </section>
  );
}

export default AddItemForm;