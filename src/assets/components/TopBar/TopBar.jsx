import { useState } from 'react';
import styles from './TopBar.module.scss'

const TopBar = () => {
  const [addItemVisibility, setAddItemVIsibility] = useState(false)

  const toggleAddItemVisibility = () => {
    setAddItemVIsibility(prev => !prev)
  }

  const addItem = (event) => {
    event.preventDefault()
  } 

  return (
    <section className={styles.topbar}>
      <div>
        <div>
          <input type="text" name="search" id="search" placeholder='Suche' />
        </div>
        <div>
          <button onClick={toggleAddItemVisibility}>+</button>
        </div>
      </div>
      {addItemVisibility &&
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
          <input type="text" name="name" id="name" placeholder='Name' />
          <input type="text" name="menge" id="menge" placeholder='Menge' />
          <input type="text" name="info" id="info" placeholder='Info'/>
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

export default TopBar;