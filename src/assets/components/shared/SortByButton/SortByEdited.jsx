import SortIcon from '../Icon/SortIcon'
import SortUpIcon from '../Icon/SortUpIcon'
import SortDownIcon from '../Icon/SortDownIcon'
import styles from './SortByEdited.module.scss'

const SortByEdited = ({ sortBy, setSortBy }) => {

  const changeSorting = () => {
    if (sortBy !== "editedDes") {
      setSortBy("editedDes")
    }

    if (sortBy === "editedDes") {
      setSortBy("editedAsc")
    }

    if (sortBy === "editedAsc") {
      setSortBy("")
    }
  }

  return (
    <>
      {sortBy === "editedDes"
        ? <button className={styles.active} onClick={changeSorting}>Bearbeitet <SortDownIcon /></button>
        : sortBy === "editedAsc"
          ? <button className={styles.active} onClick={changeSorting}>Bearbeitet <SortUpIcon /></button>
          : <button onClick={changeSorting}>Bearbeitet <SortIcon /></button>
      }
    </>
  );
}

export default SortByEdited;